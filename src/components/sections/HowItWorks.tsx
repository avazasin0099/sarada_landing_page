import { CreditCard, Eye, MonitorSmartphone, ShieldAlert } from "lucide-react";
import { refundPolicy, site, steps } from "@/data/site";
import { bnNum } from "@/lib/format";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";

const icons = [Eye, CreditCard, MonitorSmartphone];

export function HowItWorks() {
  return (
    <Section id="how" className="bg-surface-2/60">
      <SectionHeader id="how" eyebrow="কীভাবে কিনবে" title="তিন ধাপে নোটস তোমার হাতে" align="center" />
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = icons[i];
          return (
            <li key={s.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="relative flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
                  <span aria-hidden className="absolute right-6 top-4 font-display text-6xl font-bold leading-none text-brand/10">
                    {bnNum(i + 1)}
                  </span>
                  <span className="mb-5 grid size-12 place-items-center rounded-xl bg-brand text-on-brand">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <p className="text-sm font-bold text-brand">ধাপ {bnNum(i + 1)}</p>
                  <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Reveal delay={0.15}>
        <section
          aria-labelledby="refund-title"
          className="mx-auto mt-10 max-w-4xl rounded-card border border-accent/50 bg-accent-soft/70 p-6 sm:p-8"
        >
          <h3 id="refund-title" className="flex items-center gap-2 font-display text-xl font-bold">
            <ShieldAlert className="size-6 text-brand" aria-hidden /> রিফান্ড ও বাতিলকরণ নীতি
          </h3>
          {refundPolicy.map((p) => (
            <p key={p.slice(0, 20)} className="mt-3 leading-[1.85]">
              {p}
            </p>
          ))}
          <a href={site.refundUrl} className="mt-4 inline-block font-semibold text-brand underline underline-offset-4">
            পুরো নীতি ওয়েবসাইটে পড়ো
          </a>
        </section>
      </Reveal>
    </Section>
  );
}
