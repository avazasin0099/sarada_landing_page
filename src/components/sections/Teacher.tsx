import { GraduationCap, PlaySquare, Quote, School } from "lucide-react";
import { about, teacher } from "@/data/site";
import { bnNum } from "@/lib/format";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";

/** "আমাদের পরিচয়" — single teacher, About page content verbatim. */
export function Teacher() {
  return (
    <Section id="teacher">
      <SectionHeader id="teacher" eyebrow="আমাদের পরিচয়" title={about.greeting} />

      <div className="grid grid-cols-1 items-start gap-6 *:min-w-0 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28">
          <article className="group overflow-hidden rounded-card border border-line bg-surface shadow-card">
            <div className="relative grid aspect-[4/3.4] place-items-center overflow-hidden bg-brand-soft">
              {teacher.photo ? (
                <img
                  src={teacher.photo}
                  alt={`${teacher.name}, ${teacher.role}`}
                  width={600}
                  height={510}
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <>
                  <div aria-hidden className="ruled absolute inset-0 opacity-70 [mask-image:none]" />
                  <span
                    aria-hidden
                    className="relative font-display text-[8rem] font-bold leading-none text-brand transition-transform duration-500 ease-out-expo group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  >
                    অ
                  </span>
                </>
              )}
              <span className="absolute bottom-3 left-3 rounded-full bg-accent px-3 py-1 text-sm font-bold text-on-accent shadow-card">
                {bnNum(teacher.years)} বছর শিক্ষকতা
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold">{teacher.name}</h3>
              <p className="mt-0.5 font-semibold text-brand">{teacher.titleLine}</p>
              <p className="mt-1 text-muted">{teacher.role}</p>
            </div>
          </article>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.05}>
            <blockquote className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
              <Quote className="mb-3 size-7 text-accent" aria-hidden />
              <p className="font-display text-xl leading-[1.7]">{about.intro}</p>
              <p className="mt-4 leading-[1.85] text-muted">{about.body}</p>
              <footer className="mt-5 font-semibold">— {teacher.name}</footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
              <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-bold">
                <GraduationCap className="size-6 text-brand" aria-hidden /> শিক্ষাগত যোগ্যতা
              </h3>
              <ol className="grid gap-3 sm:grid-cols-2">
                {teacher.degrees.map((d) => (
                  <li key={d.degree} className="flex items-center gap-3 rounded-xl border border-line/70 bg-bg/60 p-3">
                    <span className="grid h-10 min-w-14 place-items-center rounded-lg bg-brand-soft px-2 text-sm font-bold text-brand">
                      {d.short}
                    </span>
                    <div className="min-w-0 leading-snug">
                      <p className="font-semibold">{d.degree}</p>
                      <p className="text-sm text-muted">{d.from}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
                <p className="flex gap-3">
                  <School className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                  <span>
                    <span className="block font-semibold">শিক্ষকতার অভিজ্ঞতা</span>
                    <span className="text-muted">
                      {teacher.experience} দীর্ঘ {bnNum(teacher.years)} বছর বিশ্ববিদ্যালয়ের ছাত্র পড়ানোর দক্ষতা।
                    </span>
                  </span>
                </p>
                <div className="flex gap-3">
                  <PlaySquare className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <p className="font-semibold">পরিচালক</p>
                    <ul className="text-muted">
                      {teacher.roles.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
