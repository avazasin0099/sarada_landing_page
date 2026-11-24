import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[transform,background-color,color,box-shadow,border-color] duration-200 ease-out-expo " +
  "motion-safe:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-on-brand shadow-card hover:bg-brand-strong",
  accent: "bg-accent text-on-accent shadow-card hover:brightness-95",
  secondary: "border border-line bg-surface text-ink hover:border-ink/30 hover:bg-surface-2",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-sm",
  lg: "min-h-12 px-6 text-[0.95rem]",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

export function Button({
  variant = "primary",
  size = "md",
  className,
  loading,
  children,
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      aria-busy={loading || undefined}
      disabled={loading || rest.disabled}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
        />
      )}
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Common & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );
}
