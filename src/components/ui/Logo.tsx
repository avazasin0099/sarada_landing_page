import { site } from "@/data/site";

export function Logo() {
  return (
    <a href="#top" className="group inline-flex min-h-11 items-center gap-2.5" aria-label={`${site.name} — প্রথম পাতা`}>
      <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="9" className="fill-brand" />
        <path
          d="M6 11.5c3.5-1.2 7-.8 10 1.5v11c-3-2.3-6.5-2.7-10-1.5zM26 11.5c-3.5-1.2-7-.8-10 1.5v11c3-2.3 6.5-2.7 10-1.5z"
          className="fill-on-brand"
        />
        <circle cx="16" cy="7" r="2.2" className="fill-accent transition-transform duration-300 group-hover:-translate-y-0.5" />
      </svg>
      <span className="whitespace-nowrap font-display text-xl font-bold">{site.name}</span>
    </a>
  );
}
