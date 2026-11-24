import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Section({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  action,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-6 sm:mb-14",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {/* No letter-spacing: it breaks Bengali conjuncts */}
        <p className="mb-3 inline-flex items-center gap-2 text-[0.95rem] font-bold text-brand">
          <span aria-hidden className="h-px w-6 bg-current" />
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold text-balance">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-[60ch] text-lg text-muted text-pretty">{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}
