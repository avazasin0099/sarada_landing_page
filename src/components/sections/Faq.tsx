import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { faqs, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { LinkButton } from "../ui/Button";
import { Section, SectionHeader } from "../ui/Section";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <Section id="faq">
      <div className="grid grid-cols-1 gap-10 *:min-w-0 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeader id="faq" eyebrow="প্রশ্নোত্তর" title="তোমার মনে যে প্রশ্নগুলো আসে" />
          <div className="rounded-card border border-line bg-surface p-6 shadow-card sm:-mt-4">
            <p className="font-semibold">এখনও কিছু জানার আছে?</p>
            <p className="mt-1 text-[0.95rem] text-muted">নোটস বা পেমেন্ট নিয়ে সরাসরি কথা বলো।</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <LinkButton href={site.phoneHref} variant="secondary">
                ফোন করো
              </LinkButton>
              <LinkButton href={`mailto:${site.emails[0]}`} variant="ghost">
                ইমেল করো
              </LinkButton>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${base}-q${i}`;
            const panelId = `${base}-a${i}`;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-bold sm:text-xl"
                  >
                    {f.q}
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color] duration-300 ease-out-expo",
                        isOpen && "rotate-45 border-transparent bg-accent text-on-accent",
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  inert={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out-expo motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-6 pr-4 text-muted sm:pr-14">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
