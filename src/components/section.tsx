import type { CSSProperties } from "react";
import ScrollCue from "@/components/scroll-cue";

/** One full-screen, snap-to card. `accent` becomes --accent, which children
 * reference via var(--accent) for headings, links and highlights, so each
 * section can carry its own color while sharing the same dark base. */
export default function Section({
  id,
  accent,
  kicker,
  children,
  last = false,
}: {
  id: string;
  accent: string;
  kicker: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  const style = { "--accent": accent } as CSSProperties;
  return (
    <section
      id={id}
      style={style}
      className="relative flex h-[100dvh] w-full shrink-0 snap-start flex-col items-center justify-center overflow-y-auto px-6 py-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="w-full max-w-xl">
        <p
          className="mb-4 text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          {kicker}
        </p>
        {children}
      </div>
      {!last && <ScrollCue />}
    </section>
  );
}
