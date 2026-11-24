/** Marigold "highlighter" stroke behind a word — draws in once on load (static under reduced motion). */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span
        aria-hidden
        className="absolute inset-x-[-0.08em] bottom-[0.1em] h-[0.38em] origin-left -rotate-[1.5deg] rounded-[0.2em] bg-accent/75 motion-safe:animate-mark dark:bg-accent/45"
      />
      <span className="relative">{children}</span>
    </span>
  );
}
