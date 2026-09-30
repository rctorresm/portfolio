"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type MediaItem =
  | { kind: "video"; src: string; poster: string; label: string; alt: string }
  | { kind: "image"; src: string; label: string; alt: string; portrait?: boolean };

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** One stage plus a strip of labeled buttons that swap what the stage shows,
 * with previous and next arrows. Clicking the stage opens a full-screen
 * viewer (same items, arrows, swipe, Esc to close). A video plays muted and
 * looped in the stage, only while on screen and only when the visitor has not
 * asked for reduced motion (then the poster shows with native controls). The
 * stage is 16:10 for landscape items and taller for portrait (phone)
 * screenshots so they stay readable; its height eases between the two. */
export default function ProjectMedia({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const item = items[index];
  const portrait = item.kind === "image" && item.portrait === true;
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [reduced, setReduced] = useState(false);
  const [width, setWidth] = useState(0);
  const [viewportH, setViewportH] = useState(800);

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      setWidth(stage.clientWidth);
      setViewportH(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced || open) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [item, reduced, open]);

  const landscapeH = width * 0.625;
  const portraitH = Math.max(landscapeH, Math.min(width * 1.3, viewportH * 0.6, 560));
  const height = width ? (portrait ? portraitH : landscapeH) : undefined;

  const arrowClass =
    "media-arrow absolute top-1/2 z-[1] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white";

  return (
    <div className="w-full">
      <div
        ref={stageRef}
        style={{ height: height ?? undefined, aspectRatio: height ? undefined : "16 / 10" }}
        className="media-stage relative flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/25 shadow-2xl"
      >
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
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge: ${item.label}`}
          className="media-enlarge absolute inset-0 cursor-zoom-in"
        >
          <span className="media-enlarge-badge absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white">
            <svg {...iconProps} width="16" height="16">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </button>
        {items.length > 1 && (
          <>
            <button type="button" onClick={() => step(-1)} aria-label="Previous" className={`${arrowClass} left-2`}>
              <svg {...iconProps} width="20" height="20">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next" className={`${arrowClass} right-2`}>
              <svg {...iconProps} width="20" height="20">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </>
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
      {open && (
        <Lightbox
          items={items}
          index={index}
          onStep={step}
          onClose={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        />
      )}
    </div>
  );
}

function Lightbox({
  items,
  index,
  onStep,
  onClose,
}: {
  items: MediaItem[];
  index: number;
  onStep: (dir: 1 | -1) => void;
  onClose: () => void;
}) {
  const item = items[index];
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => setZoomed(false), [index]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.label}, ${index + 1} of ${items.length}`}
      className="lightbox fixed inset-0 z-50 flex flex-col bg-black/95"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || zoomed) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white">
        <span className="font-medium">
          {item.label}
          <span className="ml-3 text-white/60">
            {index + 1} / {items.length}
          </span>
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={btn}>
          <svg {...iconProps} width="20" height="20">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div
          className={`flex h-full w-full px-2 pb-4 ${zoomed ? "overflow-auto" : "items-center justify-center overflow-hidden"}`}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {item.kind === "video" ? (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              aria-label={item.alt}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              onClick={() => setZoomed((z) => !z)}
              className={
                zoomed
                  ? "m-auto max-h-none max-w-none cursor-zoom-out rounded-lg"
                  : "max-h-full max-w-full cursor-zoom-in rounded-lg object-contain"
              }
            />
          )}
        </div>
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous"
              className={`${btn} absolute left-3 top-1/2 -translate-y-1/2`}
            >
              <svg {...iconProps} width="22" height="22">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next"
              className={`${btn} absolute right-3 top-1/2 -translate-y-1/2`}
            >
              <svg {...iconProps} width="22" height="22">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
