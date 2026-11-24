import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { LinkButton } from "../ui/Button";

/** Thumb-reach bar on phones: appears after the hero, hides while notes or contact are on screen. */
export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen: Record<string, boolean> = {};
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => (seen[e.target.id] = e.isIntersecting));
      setShow(!seen.top && !seen.notes && !seen.contact);
    });
    ["top", "notes", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
        >
          <div className="flex gap-2">
            <LinkButton href={site.phoneHref} variant="secondary" size="lg" aria-label="ফোন করো" className="px-4">
              <Phone className="size-5" aria-hidden />
            </LinkButton>
            <LinkButton href="#notes" size="lg" className="flex-1">
              নোটস সংগ্রহ করো
            </LinkButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
