import { nav, site } from "@/data/site";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="ফুটার মেনু">
          <h2 className="mb-3 font-semibold text-muted">পাতাগুলি</h2>
          <ul className="grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="inline-flex min-h-10 items-center hover:text-brand">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 font-semibold text-muted">জরুরি লিংক</h2>
          <ul>
            <li>
              <a href={site.shopUrl} className="inline-flex min-h-10 items-center hover:text-brand">
                সব নোটস (শপ)
              </a>
            </li>
            <li>
              <a href={site.refundUrl} className="inline-flex min-h-10 items-center hover:text-brand">
                রিফান্ড ও বাতিলকরণ নীতি
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="inline-flex min-h-10 items-center tabular-nums hover:text-brand">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.nameEn} · {site.domain}
        </p>
      </div>
    </footer>
  );
}
