import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Copy, Mail, MapPin, Phone, RotateCcw, Send } from "lucide-react";
import { contactIntro, site } from "@/data/site";
import { ContactApiError, normalisePhone, submitContact } from "@/lib/api";
import { cn } from "@/lib/cn";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

type Values = { name: string; phone: string; topic: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const topics = ["নোটস সংক্রান্ত প্রশ্ন", "পেমেন্ট সংক্রান্ত সমস্যা", "নতুন নোটসের অনুরোধ", "অন্যান্য"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "তোমার নাম লেখো।";
  // Phone is required by the backend (POST /contacts)
  if (!/^[6-9]\d{9}$/.test(normalisePhone(v.phone))) e.phone = "সঠিক ১০ সংখ্যার মোবাইল নম্বর দাও।";
  if (v.message.trim().length < 5) e.message = "তোমার প্রশ্ন বা অনুরোধটি লেখো।";
  return e;
}

export function Contact() {
  const empty: Values = { name: "", phone: "", topic: topics[0], message: "" };
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const sent = status === "sent";

  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (errors[k]) setErrors(validate(next));
  };

  const focusField = (k: keyof Values) => formRef.current?.querySelector<HTMLElement>(`[name="${k}"]`)?.focus();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validate(v);
    setErrors(errs);
    const first = (Object.keys(errs) as (keyof Values)[])[0];
    if (first) {
      focusField(first);
      return;
    }

    setStatus("sending");
    try {
      // Payload agreed with the backend: POST /api/v1/contacts
      await submitContact({
        name: v.name.trim(),
        phone: normalisePhone(v.phone),
        topic: v.topic,
        message: v.message.trim(),
        submittedAt: new Date().toISOString(),
      });
      setStatus("sent");
    } catch (err) {
      // Server-side validation errors → show under the matching field
      const fieldErrs = err instanceof ContactApiError ? err.fieldErrors : {};
      const keys = (Object.keys(fieldErrs) as (keyof Values)[]).filter((k) => k in v);
      if (keys.length) {
        setErrors(fieldErrs);
        setStatus("idle");
        focusField(keys[0]);
        return;
      }
      setStatus("error");
    }
  };

  const copyEmail = async (em: string) => {
    try {
      await navigator.clipboard.writeText(em);
      setCopied(em);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      /* clipboard blocked; the address is visible anyway */
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-lift *:min-w-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="band-ink relative flex flex-col bg-bg p-8 text-ink sm:p-10">
            <div aria-hidden className="ruled pointer-events-none absolute inset-0 opacity-25" />
            <Reveal className="relative">
              <p className="mb-3 text-[0.95rem] font-bold text-brand">যোগাযোগ</p>
              <h2 id="contact-title" className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.25]">
                প্রশ্ন আছে? সরাসরি জানাও
              </h2>
              <p className="mt-4 text-muted">
                {contactIntro}
              </p>
            </Reveal>
            <ul className="relative mt-10 space-y-4 lg:mt-auto lg:pt-10">
              <li className="flex gap-3">
                <Phone className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                <a href={site.phoneHref} className="font-semibold underline-offset-4 hover:underline">
                  {site.phone}
                </a>
              </li>
              {site.emails.map((em) => (
                <li key={em} className="flex items-start gap-3">
                  <Mail className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                  <a href={`mailto:${em}`} className="break-all underline-offset-4 hover:underline">
                    {em}
                  </a>
                  <button
                    type="button"
                    onClick={() => copyEmail(em)}
                    className="-my-2.5 inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-ink/10"
                    aria-label={copied === em ? "ইমেল ঠিকানা কপি হয়েছে" : `${em} কপি করো`}
                  >
                    {copied === em ? <CheckCircle2 className="size-4 text-brand" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                  </button>
                </li>
              ))}
              <li className="sr-only" aria-live="polite">
                {copied ? "ইমেল ঠিকানা কপি হয়েছে" : ""}
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                {site.address}
              </li>
            </ul>
          </div>

          <div className="relative p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="done"
                  // Focus when it mounts (after the form's exit animation) so screen readers announce it
                  ref={(el: HTMLDivElement | null) => el?.focus()}
                  tabIndex={-1}
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-96 flex-col items-center justify-center text-center outline-none"
                >
                  <span className="mb-5 grid size-16 place-items-center rounded-full bg-success/12 text-success">
                    <CheckCircle2 className="size-8" aria-hidden />
                  </span>
                  <h3 className="font-display text-3xl font-bold">ধন্যবাদ, {v.name.split(" ")[0]}!</h3>
                  <p className="mt-3 max-w-sm text-muted">
                    তোমার বার্তা আমাদের কাছে পৌঁছেছে। আমরা দ্রুত তোমার সাথে যোগাযোগ করার চেষ্টা করব।
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-8"
                    onClick={() => {
                      setV(empty);
                      setErrors({});
                      setStatus("idle");
                    }}
                  >
                    আরেকটি বার্তা লেখো
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <p className="text-[0.95rem] text-muted sm:col-span-2">
                    <span className="text-danger">*</span> চিহ্নিত ঘরগুলি পূরণ করা আবশ্যক।
                  </p>
                  <Field id={`${uid}-name`} label="তোমার নাম" required error={errors.name}>
                    {(p) => <input {...p} name="name" autoComplete="name" value={v.name} onChange={set("name")} />}
                  </Field>
                  <Field id={`${uid}-phone`} label="মোবাইল নম্বর" required hint="এই নম্বরে তোমার সাথে যোগাযোগ করা হবে" error={errors.phone}>
                    {(p) => (
                      <input {...p} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" value={v.phone} onChange={set("phone")} />
                    )}
                  </Field>
                  <Field id={`${uid}-topic`} label="বিষয়" className="sm:col-span-2">
                    {(p) => (
                      <select {...p} name="topic" value={v.topic} onChange={set("topic")}>
                        {topics.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    )}
                  </Field>
                  <Field
                    id={`${uid}-msg`}
                    label="তোমার প্রশ্ন বা অনুরোধ"
                    required
                    error={errors.message}
                    hint="যেমন: বিশ্ববিদ্যালয়, কোর্স, সেমিস্টার"
                    className="sm:col-span-2"
                  >
                    {(p) => <textarea {...p} name="message" rows={4} value={v.message} onChange={set("message")} />}
                  </Field>
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        ref={errorRef}
                        tabIndex={-1}
                        role="alert"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/8 p-4 text-[0.95rem] outline-none sm:col-span-2"
                      >
                        <AlertCircle className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden />
                        <div>
                          <p className="font-semibold">বার্তাটি পাঠানো যায়নি।</p>
                          <p className="text-muted">
                            ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করো, অথবা সরাসরি{" "}
                            <a href={site.phoneHref} className="font-semibold text-ink underline underline-offset-4">
                              ফোন করো
                            </a>{" "}
                            বা{" "}
                            <a href={`mailto:${site.emails[0]}`} className="break-all font-semibold text-ink underline underline-offset-4">
                              {site.emails[0]}
                            </a>{" "}
                            ঠিকানায় লেখো।
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col-reverse items-stretch gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted">তোমার নম্বর কারও সাথে শেয়ার করা হয় না।</p>
                    <Button type="submit" size="lg" loading={status === "sending"}>
                      {status === "sending" ? (
                        "পাঠানো হচ্ছে…"
                      ) : status === "error" ? (
                        <>
                          <RotateCcw className="size-4" aria-hidden /> আবার চেষ্টা করো
                        </>
                      ) : (
                        <>
                          <Send className="size-4" aria-hidden /> পাঠাও
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = { id: string; className: string; "aria-invalid"?: boolean; "aria-describedby"?: string; "aria-required"?: boolean };

function Field({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (p: FieldProps) => React.ReactNode;
}) {
  const describedBy = [hint && !error && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-semibold">
        {label} {required && <span className="text-danger" aria-hidden>*</span>}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
        className: cn(
          "min-h-12 w-full rounded-xl border bg-bg px-4 py-2.5 text-base text-ink placeholder:text-muted/70",
          "transition-[border-color,box-shadow] duration-150 focus:outline-none focus-visible:ring-4",
          error
            ? "border-danger focus-visible:border-danger focus-visible:ring-danger/15"
            : "border-line hover:border-ink/25 focus-visible:border-brand focus-visible:ring-brand/15",
        ),
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="flex items-center gap-1.5 text-sm font-semibold text-danger">
          <AlertCircle className="size-4 shrink-0" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}
