import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Phone, Sun, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";
import { LinkButton } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Mobile menu: scroll lock, Esc, focus trap, focus restore
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const btn = menuBtn.current;
    const focusables = () => Array.from(panel.current?.querySelectorAll<HTMLElement>("a,button") ?? []);
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand"
      >
        মূল অংশে যাও
      </a>
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="প্রধান মেনু" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "location" : undefined}
                  className="relative inline-flex min-h-11 items-center rounded-full px-3.5 font-medium text-muted transition-colors hover:text-ink aria-[current=location]:text-ink"
                >
                  {n.label}
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-dot"
                      aria-hidden
                      className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.phoneHref}
            className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold hover:bg-ink/5 xl:inline-flex"
          >
            <Phone className="size-4 text-brand" aria-hidden />
            {site.phone}
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "লাইট থিম চালু করো" : "ডার্ক থিম চালু করো"}
            className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
          >
            {theme === "dark" ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
          </button>
          <LinkButton href="#notes" className="hidden sm:inline-flex">
            নোটস দেখো
          </LinkButton>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="মেনু খোলো"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/5 lg:hidden"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="panel"
              ref={panel}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="মেনু"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-bg p-5 shadow-lift lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg font-bold">মেনু</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="মেনু বন্ধ করো"
                  className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ink/5"
                >
                  <X className="size-6" aria-hidden />
                </button>
              </div>
              <nav aria-label="মোবাইল মেনু">
                <ul className="flex flex-col">
                  {nav.map((n) => (
                    <li key={n.id}>
                      <a
                        href={`#${n.id}`}
                        onClick={() => setOpen(false)}
                        className="flex min-h-14 items-center border-b border-line font-display text-2xl font-semibold"
                      >
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <LinkButton href="#notes" size="lg" onClick={() => setOpen(false)}>
                  নোটস সংগ্রহ করো
                </LinkButton>
                <LinkButton href={site.phoneHref} variant="secondary" size="lg">
                  <Phone className="size-4" aria-hidden /> ফোন করো {site.phone}
                </LinkButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
