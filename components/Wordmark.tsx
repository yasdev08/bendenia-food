type Props = {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  as?: "div" | "p" | "span";
};

const sizes = {
  sm: { main: "text-2xl", sub: "text-[0.55rem] tracking-[0.55em]", rule: "w-5" },
  md: { main: "text-[2rem]", sub: "text-[0.62rem] tracking-[0.6em]", rule: "w-7" },
  lg: { main: "text-5xl sm:text-6xl", sub: "text-xs tracking-[0.7em]", rule: "w-10" },
};

/**
 * Typographic wordmark — set purely in type, deliberately not a logo.
 * Replace with the official logo once Bendenia Food has one.
 */
export function Wordmark({ tone = "light", size = "md", className = "", as: Tag = "div" }: Props) {
  const s = sizes[size];
  const main = tone === "light" ? "text-cream" : "text-burgundy";
  return (
    <Tag
      className={`inline-flex flex-col items-center leading-none select-none ${className}`}
      aria-label="Bendenia Food"
    >
      <span
        aria-hidden="true"
        className={`font-display font-black uppercase tracking-[0.02em] ${s.main} ${main}`}
        style={{ fontVariationSettings: '"SOFT" 30, "opsz" 144' }}
      >
        Bendenia
      </span>
      <span aria-hidden="true" className="mt-1.5 flex items-center gap-2 text-orange">
        <span className={`h-px ${s.rule} bg-current opacity-80`} />
        <span className={`font-sans font-extrabold uppercase ${s.sub} -mr-[0.6em]`}>Food</span>
        <span className={`h-px ${s.rule} bg-current opacity-80`} />
      </span>
    </Tag>
  );
}
