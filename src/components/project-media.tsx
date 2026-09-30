"use client";

import { useEffect, useRef, useState } from "react";

export type MediaItem =
  | { kind: "video"; src: string; poster: string; label: string; alt: string }
  | { kind: "image"; src: string; label: string; alt: string };

/** One stage plus a strip of labeled thumbnails that swap what the stage
 * shows. A video plays muted and looped, but only while it is on screen and
 * only when the visitor has not asked for reduced motion (then the poster
 * shows with native controls instead). */
export default function ProjectMedia({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [item, reduced]);

  return (
    <div className="w-full">
      <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/25 shadow-2xl">
        {item.kind === "video" ? (
          <video
            key={item.src}
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            aria-label={item.alt}
            muted
            loop
            playsInline
            preload="metadata"
            controls={reduced}
            className="h-full w-full object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <div role="group" aria-label="Choose what to view" className="mt-3 flex flex-wrap gap-2">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            className="rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
            style={
              i === index
                ? { borderColor: "var(--accent)", color: "var(--accent)" }
                : { borderColor: "rgb(255 255 255 / 0.1)", color: "var(--text-muted)" }
            }
          >
            {it.kind === "video" ? "▶ " : ""}
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
