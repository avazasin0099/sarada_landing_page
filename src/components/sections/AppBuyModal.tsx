import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpen, CheckCircle2, Download, ExternalLink, Smartphone, X } from "lucide-react";
import { ebookApp, site, type Note } from "@/data/site";
import { taka } from "@/lib/format";
import { Button, LinkButton } from "../ui/Button";

/**
 * checking  – working out whether the app is installed
 * probing   – first deep-link attempt while install state is unknown
 * opening   – "open in app" tapped, waiting for the app to take over
 * installed – app is (known to be) installed: offer "open in app"
 * install   – app not installed: offer the install file
 */
type Status = "checking" | "probing" | "opening" | "installed" | "install";

/** How long to wait for the app to take over the screen before assuming it isn't installed. */
const APP_TIMEOUT_MS = 1800;
const INSTALLED_KEY = "avazas-app-installed";

const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

function deepLinkFor(note: Note) {
  return ebookApp.deepLink ? ebookApp.deepLink.replace("{id}", encodeURIComponent(note.id)) : "";
}

const remembered = {
  get: () => {
    try {
      return localStorage.getItem(INSTALLED_KEY) === "1";
    } catch {
      return false;
    }
  },
  set: (v: boolean) => {
    try {
      if (v) localStorage.setItem(INSTALLED_KEY, "1");
      else localStorage.removeItem(INSTALLED_KEY);
    } catch {
      /* storage blocked: nothing to remember */
    }
  },
};

/**
 * Android Chrome can report the installed app directly, but only when the app declares this
 * website in its asset statements and /manifest.webmanifest lists the app (related_applications).
 */
async function relatedAppInstalled(): Promise<boolean> {
  const nav = navigator as Navigator & {
    getInstalledRelatedApps?: () => Promise<{ platform: string; id?: string }[]>;
  };
  if (!nav.getInstalledRelatedApps) return false;
  try {
    const apps = await nav.getInstalledRelatedApps();
    return apps.some((a) => !a.id || a.id === ebookApp.androidPackage);
  } catch {
    return false;
  }
}

/**
 * "কিনুন" modal. If the Avazas app is known to be installed it says so and offers "open in app";
 * otherwise it tries the deep link once and falls back to the install step if the app doesn't open.
 * Never navigates away to a separate page.
 */
export function AppBuyModal({ note, onClose }: { note: Note | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("checking");
  const cleanup = useRef<() => void>(() => {});

  const tryOpenApp = useCallback((n: Note, probing = false) => {
    cleanup.current();
    const link = deepLinkFor(n);
    // The app is mobile-only; without a deep link or on desktop, go straight to install.
    if (!link || !isMobile()) {
      setStatus("install");
      return;
    }
    setStatus(probing ? "probing" : "opening");

    const onHide = () => {
      if (document.visibilityState === "hidden") {
        window.clearTimeout(timer);
        remembered.set(true);
        setStatus("installed");
      }
    };
    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        remembered.set(false); // it was uninstalled, or never there
        setStatus("install");
      }
    }, APP_TIMEOUT_MS);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    cleanup.current = () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
    };

    window.location.href = link;
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (!note) {
      if (d.open) d.close();
      return;
    }
    if (!d.open) d.showModal();

    let cancelled = false;
    if (!deepLinkFor(note) || !isMobile()) {
      setStatus("install");
    } else if (remembered.get()) {
      setStatus("installed");
    } else {
      setStatus("checking");
      relatedAppInstalled().then((yes) => {
        if (cancelled) return;
        if (yes) {
          remembered.set(true);
          setStatus("installed");
        } else {
          tryOpenApp(note, true); // unknown: try once, fall back to install
        }
      });
    }
    return () => {
      cancelled = true;
      cleanup.current();
    };
  }, [note, tryOpenApp]);

  const isApk = /\.apk(\?|#|$)/i.test(ebookApp.downloadUrl);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      aria-labelledby="buy-title"
      className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-card bg-surface p-0 text-ink shadow-lift outline-none backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      {note && (
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img src={note.cover} alt="" width={640} height={960} className="w-16 shrink-0 rounded-md shadow-card" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted">{note.university}</p>
              <h2 id="buy-title" className="font-display text-xl font-bold leading-snug">
                {note.course} <span className="text-brand">· {note.part}</span>
              </h2>
              <p className="mt-1 font-display text-lg font-bold">{taka(note.price)}</p>
            </div>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="বন্ধ করো"
              className="-mr-2 -mt-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-ink/5"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="mt-5 border-t border-line pt-5" aria-live="polite">
            {(status === "checking" || status === "probing") && (
              <p className="flex items-center gap-3 font-semibold">
                <Spinner /> {ebookApp.name} অ্যাপে খোলা হচ্ছে…
              </p>
            )}

            {(status === "installed" || status === "opening") && (
              <div className="flex flex-col gap-4">
                <p className="text-[0.95rem] text-muted">
                  তোমার ফোনে <span className="font-semibold text-ink">{ebookApp.name}</span> অ্যাপ ইনস্টল করা আছে। অ্যাপে খুলে
                  কেনা সম্পূর্ণ করো।
                </p>
                <AppCard installed opening={status === "opening"} onOpen={() => tryOpenApp(note)} isApk={isApk} />
              </div>
            )}

            {status === "install" && (
              <div className="flex flex-col gap-4">
                <p className="text-[0.95rem] text-muted">
                  এই নোটস কিনতে ও পড়তে <span className="font-semibold text-ink">{ebookApp.name}</span> অ্যাপ লাগবে। অ্যাপটি
                  ইনস্টল করে আবার ‘কিনুন’ চাপো।
                </p>

                <AppCard isApk={isApk} />

                {isApk && (
                  <ol className="list-decimal space-y-1 pl-5 text-sm text-muted">
                    <li>ডাউনলোড শেষ হলে ফাইলটি খোলো।</li>
                    <li>জিজ্ঞাসা করলে ‘Install unknown apps’ অনুমতি দাও।</li>
                    <li>ইনস্টল হয়ে গেলে আবার ‘কিনুন’ চাপো।</li>
                  </ol>
                )}

                {!ebookApp.downloadUrl && (
                  <p className="text-sm text-muted">
                    এখনই কিনতে চাইলে{" "}
                    <a href={site.phoneHref} className="font-semibold text-ink underline">
                      {site.phone}
                    </a>{" "}
                    নম্বরে যোগাযোগ করো।
                  </p>
                )}

                {deepLinkFor(note) && isMobile() && (
                  <Button variant="secondary" onClick={() => tryOpenApp(note)}>
                    <Smartphone className="size-4" aria-hidden /> অ্যাপ ইনস্টল করা আছে? অ্যাপে খোলো
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="size-5 animate-spin rounded-full border-2 border-brand border-r-transparent motion-reduce:animate-none"
    />
  );
}

/** Store-style listing for the Avazas ebook app: install button, or "installed" + open button. */
function AppCard({
  isApk,
  installed = false,
  opening = false,
  onOpen,
}: {
  isApk: boolean;
  installed?: boolean;
  opening?: boolean;
  onOpen?: () => void;
}) {
  const url = ebookApp.downloadUrl;
  return (
    <div className="rounded-2xl border border-line bg-surface-2 p-4">
      <div className="flex items-center gap-3.5">
        {ebookApp.icon ? (
          <img src={ebookApp.icon} alt="" width={64} height={64} className="size-16 shrink-0 rounded-2xl shadow-card" />
        ) : (
          <span
            aria-hidden
            className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-strong text-on-brand shadow-card"
          >
            <BookOpen className="size-8" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold leading-tight">{ebookApp.name}</h3>
          <p className="text-sm text-muted">{ebookApp.tagline}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs font-semibold text-muted">
            {installed ? (
              <span className="inline-flex items-center gap-1 text-success">
                <CheckCircle2 className="size-3.5" aria-hidden /> ইনস্টল করা আছে
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1">
                  <Smartphone className="size-3.5" aria-hidden /> {ebookApp.platform}
                </span>
                <span aria-hidden>·</span>
                <span>ফ্রি</span>
              </>
            )}
          </p>
        </div>
      </div>

      {!installed && (
        <ul className="mt-3.5 space-y-1.5 text-sm">
          {ebookApp.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden /> {f}
            </li>
          ))}
        </ul>
      )}

      {installed ? (
        <Button size="lg" className="mt-4 w-full" onClick={onOpen} loading={opening}>
          {!opening && <ExternalLink className="size-4" aria-hidden />}
          {opening ? "অ্যাপ খোলা হচ্ছে…" : `${ebookApp.name} অ্যাপে খোলো`}
        </Button>
      ) : url ? (
        <LinkButton
          href={url}
          size="lg"
          className="mt-4 w-full"
          {...(isApk ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {isApk ? <Download className="size-4" aria-hidden /> : <ExternalLink className="size-4" aria-hidden />}
          অ্যাপ ইনস্টল করো{isApk ? " (APK)" : ""}
        </LinkButton>
      ) : (
        <Button size="lg" className="mt-4 w-full" disabled>
          <Download className="size-4" aria-hidden /> শীঘ্রই আসছে
        </Button>
      )}
    </div>
  );
}
