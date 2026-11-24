import { ArrowUpRight, MessagesSquare, PlaySquare, Users } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";

const search = (base: string, name: string) => base + encodeURIComponent(name);

// Channel names are published on the live site; URLs are not yet. Until they're added in site.ts,
// links open a search for the exact channel/page name.
const channels = [
  ...site.youtubeChannels.map((c) => ({
    icon: PlaySquare,
    kind: "ইউটিউব চ্যানেল",
    name: c.name,
    body: "পাঠ্য আলোচনা রয়েছে।",
    href: c.url || search("https://www.youtube.com/results?search_query=", c.name),
    cta: c.url ? "চ্যানেল দেখো" : "ইউটিউবে খোঁজো",
  })),
  {
    icon: MessagesSquare,
    kind: "ফেসবুক পেজ",
    name: site.facebookPage.name,
    body: "নতুন নোটস ও খবর।",
    href: site.facebookPage.url || search("https://www.facebook.com/search/pages?q=", site.facebookPage.name),
    cta: site.facebookPage.url ? "পেজ দেখো" : "ফেসবুকে খোঁজো",
  },
  {
    icon: Users,
    kind: "ফেসবুক গ্রুপ",
    name: site.facebookGroup.name,
    body: "প্রশ্ন ও আলোচনা।",
    href: site.facebookGroup.url || search("https://www.facebook.com/search/groups?q=", site.facebookGroup.name),
    cta: site.facebookGroup.url ? "গ্রুপে যোগ দাও" : "ফেসবুকে খোঁজো",
  },
];

/** Deep-ink band (same as Saksham's testimonials band). */
export function Community() {
  return (
    <Section id="community" className="band-ink bg-bg text-ink">
      <SectionHeader
        id="community"
        eyebrow="আমাদের সাথে থাকো"
        title="শুধু নোটস নয়, পাশে থাকা"
        intro="আমাদের ইউটিউব চ্যানেল “সারদা পাঠশালা”, “বাংলা পাঠশালা”-তে পাঠ্য আলোচনা রয়েছে। ফেসবুক পেজ ও গ্রুপেও যুক্ত থাকো।"
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c, i) => (
          <li key={c.kind + c.name}>
            <Reveal delay={i * 0.06} className="h-full">
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-card bg-ink/6 p-6 ring-1 ring-ink/15 transition-colors hover:bg-ink/10"
              >
                <c.icon className="mb-4 size-7 text-brand" aria-hidden />
                <p className="text-sm text-muted">{c.kind}</p>
                <h3 className="font-display text-xl font-bold">{c.name}</h3>
                <p className="mt-1 text-muted">{c.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand">
                  {c.cta}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">(নতুন ট্যাবে খুলবে)</span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
