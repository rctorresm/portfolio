import type { CSSProperties } from "react";

/** One full-screen, snap-to card. Each section carries its own palette:
 * `accent` (headings, links), `bg` (the page color while this section is on
 * screen; SiteNav morphs <main>'s background to it as you scroll) and `dim`
 * (secondary text tinted from the same hue rather than a flat gray). */
export default function Section({
  id,
  accent,
  bg,
  dim,
  kicker,
  children,
  next,
  wide = false,
}: {
  id: string;
  accent: string;
  bg: string;
  dim: string;
  kicker: string;
  children: React.ReactNode;
  next?: string;
  wide?: boolean;
}) {
  const style = {
    "--accent": accent,
    "--dim": dim,
    "--glow": `color-mix(in srgb, ${accent} 16%, transparent)`,
  } as CSSProperties;
  return (
    <section
      id={id}
      data-bg={bg}
      data-accent={accent}
      data-next={next}
      style={style}
      className="section-glow relative flex min-h-[100dvh] w-full shrink-0 snap-start flex-col items-center justify-center pb-32 pl-6 pr-14 pt-16 md:px-16"
    >
      <div className={`reveal ${wide ? "w-full max-w-5xl" : "w-full max-w-xl"}`}>
        <p
          className="mb-4 text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          {kicker}
        </p>
        {children}
      </div>
    </section>
  );
}
