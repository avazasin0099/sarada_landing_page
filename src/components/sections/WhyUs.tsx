import { BadgeCheck, Eye, IndianRupee, ListChecks } from "lucide-react";
import { promises, site } from "@/data/site";
import { bnNum } from "@/lib/format";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";

const icons = [BadgeCheck, ListChecks, IndianRupee, Eye];

export function WhyUs() {
  return (
    <Section id="why" className="bg-surface-2/60">
      <div className="grid grid-cols-1 gap-12 *:min-w-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="why"
            eyebrow="কেন সারদা পাঠশালা"
            title={
              <>
                পড়াশোনা হোক <em className="font-semibold not-italic text-brand">সহজ</em>, আধুনিক ও আনন্দদায়ক
              </>
            }
            intro="ছাত্র-ছাত্রীদের পড়াশোনাকে আরও সহজ, আধুনিক এবং আনন্দদায়ক করে তোলাই আমাদের মূল উদ্দেশ্য।"
          />
          <Reveal delay={0.1}>
            <figure className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
              <img
                src="/images/banner.jpg"
                alt="বই হাতে দুই শিক্ষার্থী, পাশে সারদা পাঠশালার নাম"
                width={1024}
                height={576}
                loading="lazy"
                className="block aspect-video w-full object-cover"
              />
              <figcaption className="flex items-center justify-between gap-3 p-4">
                <span className="font-display font-bold">{site.name}</span>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold">{site.slogan}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line">
          {promises.map((r, i) => {
            const Icon = icons[i];
            return (
              <li key={r.title} className="bg-surface">
                <Reveal delay={i * 0.06} className="flex gap-5 p-6 sm:p-8">
                  <span className="font-display text-sm font-semibold tabular-nums text-muted">০{bnNum(i + 1)}</span>
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="font-display text-xl font-bold sm:text-2xl">{r.title}</h3>
                    </div>
                    <p className="max-w-[52ch] text-muted">{r.body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
