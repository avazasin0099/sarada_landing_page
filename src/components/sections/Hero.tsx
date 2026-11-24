import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Eye } from "lucide-react";
import { notes, site, stats, teacher } from "@/data/site";
import { bnNum } from "@/lib/format";
import { LinkButton } from "../ui/Button";
import { Highlight } from "../ui/Highlight";

const ease = [0.16, 1, 0.3, 1] as const;
const fade = (delay: number, y = 14) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="ruled pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute left-[max(1rem,calc(50%-36rem))] top-0 -z-10 h-full w-px bg-danger/25" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pb-16 pt-12 *:min-w-0 sm:px-6 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <motion.p
            {...fade(0, 10)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.95rem] font-medium shadow-card"
          >
            <span className="size-2 rounded-full bg-success motion-safe:animate-pulse-dot" />
            {site.welcome}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fade(0.05, 18)}
            className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-bold leading-[1.22] text-balance"
          >
            শিক্ষার আঙিনায়
            <br />
            তোমাকে <Highlight>অভিনন্দন</Highlight>।
          </motion.h1>

          <motion.p {...fade(0.15)} className="mt-6 max-w-[52ch] text-lg text-muted text-pretty sm:text-xl">
            ঘরে বসেই সম্পূর্ণ আধুনিক সিলেবাস অনুযায়ী তৈরি ডিজিটাল স্টাডি মেটেরিয়াল ও গুরুত্বপূর্ণ নোটস, অত্যন্ত সাশ্রয়ী মূল্যে।
            NSOU এডুকেশন এম.এ ও রবীন্দ্রভারতী বাংলা এম.এ (দূরশিক্ষা)।
          </motion.p>

          <motion.div {...fade(0.25)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#notes" size="lg" className="group">
              এখনি সংগ্রহ করো
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </LinkButton>
            <LinkButton href="#free-sample" size="lg" variant="secondary">
              <Eye className="size-4" aria-hidden /> ফ্রি নমুনা দেখো
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex items-center gap-3 text-[0.95rem] text-muted"
          >
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-bg bg-brand font-display font-bold text-on-brand"
            >
              অ
            </span>
            <p className="leading-snug">
              <span className="font-semibold text-ink">{teacher.name}</span> · {teacher.titleLine}
              <br />
              {bnNum(teacher.years)} বছর শিক্ষকতার অভিজ্ঞতা
            </p>
          </motion.div>
        </div>

        <HeroCovers />
      </div>

      <StatsStrip />
    </section>
  );
}

/** The two real book covers from the live site, as tilted floating cards. */
function HeroCovers() {
  const [nsou, rbu] = notes;
  return (
    <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[30rem]">
      <motion.a
        href="#notes"
        aria-label={`${nsou.university} ${nsou.course} ${nsou.part} নোটস`}
        className="absolute left-0 top-0 w-[58%] overflow-hidden rounded-card border border-line bg-surface shadow-lift"
        initial={{ opacity: 0, y: 28, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: -5 }}
        whileHover={{ rotate: -3, y: -4 }}
        transition={{ duration: 0.8, ease, delay: 0.15 }}
      >
        <img src={nsou.cover} alt="" width={640} height={960} className="block aspect-[2/3] w-full object-cover" />
      </motion.a>
      <motion.a
        href="#notes"
        aria-label={`${rbu.university} ${rbu.course} ${rbu.part} নোটস`}
        className="absolute right-0 top-[8%] w-[58%] overflow-hidden rounded-card border border-line bg-surface shadow-lift"
        initial={{ opacity: 0, y: 28, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 4 }}
        whileHover={{ rotate: 2, y: -4 }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
      >
        <img src={rbu.cover} alt="" width={640} height={960} className="block aspect-[2/3] w-full object-cover" />
      </motion.a>

      <motion.div
        className="absolute bottom-0 left-[6%] w-[64%] rounded-card border border-line bg-surface p-4 shadow-lift"
        initial={{ opacity: 0, y: 20, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-bold text-on-brand">
            অ
          </span>
          <div className="min-w-0 leading-snug">
            <p className="font-semibold">{teacher.name}</p>
            <p className="text-sm text-muted">{teacher.titleLine}</p>
          </div>
        </div>
        <p className="mt-3 rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-medium">
          {bnNum(teacher.years)} বছর শিক্ষকতার সাথে যুক্ত
        </p>
      </motion.div>

      <motion.a
        href="#free-sample"
        className="absolute bottom-[22%] right-[2%] grid size-22 place-items-center rounded-full bg-accent text-center font-display text-sm font-bold leading-tight text-on-accent shadow-lift sm:size-24"
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -10 }}
        whileHover={{ rotate: -2, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.8 }}
      >
        ফ্রি
        <br />
        নমুনা
      </motion.a>
    </div>
  );
}

function StatsStrip() {
  return (
    <div className="border-y border-line bg-surface">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 bg-surface px-4 py-7 sm:px-8 sm:py-9">
            <dt className="order-2 text-[0.95rem] text-muted">{s.label}</dt>
            <dd className="order-1 font-display text-4xl font-bold tabular-nums sm:text-5xl">
              <span className="sr-only">
                {s.prefix}
                {bnNum(s.value)}
                {s.suffix}
              </span>
              <span aria-hidden>
                <span className="text-brand">{s.prefix}</span>
                <CountUp to={s.value} />
                <span className="text-brand">{s.suffix}</span>
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const c = animate(0, to, { duration: 1.4, ease, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{bnNum(val)}</span>;
}
