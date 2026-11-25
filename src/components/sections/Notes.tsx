import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Eye, FilePlus2, FileText, ShoppingBag } from "lucide-react";
import { freeSample, notes, type Note } from "@/data/site";
import { bnNum, taka } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Button, LinkButton } from "../ui/Button";
import { AppBuyModal } from "./AppBuyModal";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";

const filters = [
  { id: "all", label: "সব নোটস" },
  { id: "NSOU", label: "NSOU" },
  { id: "RBU", label: "রবীন্দ্রভারতী (RBU)" },
];

export function Notes() {
  const [filter, setFilter] = useState("all");
  const [buying, setBuying] = useState<Note | null>(null);
  const list = useMemo(() => notes.filter((n) => filter === "all" || n.universityShort === filter), [filter]);

  return (
    <Section id="notes">
      <SectionHeader
        id="notes"
        eyebrow="ডিজিটাল নোটস"
        title="তোমার কোর্সের নোটস বেছে নাও"
        intro="প্রতিটি কন্টেন্ট শিক্ষার্থীদের মেধা ও চাহিদার কথা মাথায় রেখে বিশেষভাবে তৈরি করা হয়েছে, যা তাদের পরীক্ষায় সেরা ফলাফল করতে সাহায্য করবে।"
      />

      <div role="group" aria-label="বিশ্ববিদ্যালয় অনুযায়ী দেখো" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "relative min-h-11 shrink-0 rounded-full border px-4 font-semibold transition-colors duration-200",
              filter === f.id ? "border-transparent text-on-brand" : "border-line bg-surface text-muted hover:text-ink",
            )}
          >
            {filter === f.id && (
              <motion.span
                layoutId="note-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-brand"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {bnNum(list.length)}টি নোটস দেখানো হচ্ছে
      </p>

      <motion.ul layout className="grid gap-5 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((n) => (
            <motion.li
              key={n.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <NoteCard note={n} onBuy={setBuying} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AppBuyModal note={buying} onClose={() => setBuying(null)} />

      <FreeSample />

      <Reveal className="mt-5">
        <div className="flex flex-col items-start gap-4 rounded-card border border-dashed border-line bg-surface/60 p-6 sm:flex-row sm:items-center">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-2 text-muted">
            <FilePlus2 className="size-6" aria-hidden />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold">অন্য কোর্সের নোটস চাই?</h3>
            <p className="text-muted">তোমার বিশ্ববিদ্যালয়, কোর্স ও সেমিস্টার জানিয়ে অনুরোধ পাঠাও।</p>
          </div>
          <LinkButton href="#contact" variant="secondary">
            অনুরোধ পাঠাও
          </LinkButton>
        </div>
      </Reveal>
    </Section>
  );
}

function NoteCard({ note: n, onBuy }: { note: Note; onBuy: (n: Note) => void }) {
  const off = Math.round((1 - n.price / n.originalPrice) * 100);
  return (
    <article className="group grid h-full grid-cols-1 overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0 sm:grid-cols-[11rem_1fr]">
      <button
        type="button"
        onClick={() => onBuy(n)}
        className="relative flex cursor-pointer justify-center bg-surface-2 p-5 sm:items-start sm:p-4"
        tabIndex={-1}
        aria-hidden
      >
        <img
          src={n.cover}
          alt=""
          width={640}
          height={960}
          loading="lazy"
          className="block aspect-[2/3] w-40 rounded-lg object-cover shadow-card transition-transform duration-300 ease-out-expo group-hover:-rotate-2 motion-reduce:group-hover:rotate-0 sm:w-full"
        />
      </button>
      <div className="flex flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-sm font-bold text-brand">{n.universityShort}</span>
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-sm font-bold">{bnNum(off)}% ছাড়</span>
        </div>
        <p className="text-sm text-muted">{n.university}</p>
        <h3 className="font-display text-2xl font-bold leading-snug">
          {n.course} <span className="text-brand">· {n.part}</span>
        </h3>
        <p className="mt-2 text-[0.95rem] text-muted">{n.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="পত্র / পেপার">
          {n.papers.map((p) => (
            <li key={p} className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-sm font-medium">
              <FileText className="size-3.5 text-muted" aria-hidden /> {p}
            </li>
          ))}
        </ul>

        <p className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
          <span className="font-display text-3xl font-bold">{taka(n.price)}</span>
          <s className="text-muted">
            <span className="sr-only">আগের দাম </span>
            {taka(n.originalPrice)}
          </s>
        </p>

        <div className="mt-4 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">
          <LinkButton
            href={n.samplePdf ?? n.sampleUrl}
            target={n.samplePdf ? "_blank" : undefined}
            rel={n.samplePdf ? "noopener noreferrer" : undefined}
            variant="secondary"
            aria-label={`${n.course} ${n.part}: ফ্রি নমুনা দেখো`}
          >
            <Eye className="size-4" aria-hidden /> ফ্রি নমুনা
          </LinkButton>
          <Button
            onClick={() => onBuy(n)}
            aria-haspopup="dialog"
            aria-label={`${n.course} ${n.part} কিনুন, ${taka(n.price)}`}
          >
            <ShoppingBag className="size-4" aria-hidden /> কিনুন
            <ArrowUpRight className="size-4 opacity-80" aria-hidden />
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Spotlight for the RBU free-sample product (real cover + verbatim text + PDF). */
function FreeSample() {
  return (
    <Reveal className="mt-5">
      <div
        id="free-sample"
        className="band-ink relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-card bg-bg p-6 text-ink *:min-w-0 sm:grid-cols-[9rem_1fr] sm:p-8 lg:grid-cols-[9rem_1fr_auto]"
      >
        <div aria-hidden className="ruled pointer-events-none absolute inset-0 opacity-20" />
        <img
          src={freeSample.cover}
          alt="রবীন্দ্রভারতী বাংলা এম.এ ৪র্থ সেমিস্টার ফ্রি স্যাম্পেলের প্রচ্ছদ"
          width={640}
          height={960}
          loading="lazy"
          className="relative w-28 -rotate-3 rounded-xl shadow-lift sm:w-full"
        />
        <div className="relative">
          <p className="text-[0.95rem] font-bold text-brand">বিনামূল্যে · ₹০</p>
          <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">{freeSample.title}</h3>
          <p className="mt-2 text-muted">{freeSample.text}</p>
        </div>
        <div className="relative flex flex-col gap-2.5 sm:col-span-2 sm:flex-row lg:col-span-1 lg:flex-col">
          <a
            href={freeSample.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-on-accent shadow-card transition-[filter,transform] hover:brightness-95 motion-safe:active:scale-[0.97]"
          >
            <Eye className="size-4" aria-hidden /> নমুনা PDF দেখো
            <span className="sr-only">(নতুন ট্যাবে খুলবে)</span>
          </a>
          <a
            href={freeSample.pageUrl}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold ring-1 ring-ink/25 transition-colors hover:bg-ink/10"
          >
            স্যাম্পেল পেজ
          </a>
        </div>
      </div>
    </Reveal>
  );
}
