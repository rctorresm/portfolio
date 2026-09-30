"use client";

import { useEffect, useRef, useState } from "react";

const icon = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// One entry per dock button. `includes` lets a button stay lit across several
// sections if a project ever spans more than one.
const DOCK = [
  {
    href: "about",
    label: "About",
    includes: ["about"],
    svg: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </>
    ),
  },
  {
    href: "how-i-build",
    label: "How I build",
    includes: ["how-i-build"],
    svg: (
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
    ),
  },
  {
    href: "expense-tracker",
    label: "Expense Tracker",
    includes: ["expense-tracker"],
    svg: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <circle cx="16.5" cy="14.5" r="1" />
      </>
    ),
  },
  {
    href: "sidebit",
    label: "Sidebit",
    includes: ["sidebit"],
    svg: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M15 4v16" />
      </>
    ),
  },
  {
    href: "calendar-reminder",
    label: "Calendar Reminder",
    includes: ["calendar-reminder"],
    svg: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    href: "contact",
    label: "Contact",
    includes: ["contact"],
    svg: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
];

/** Right-edge dock (thumb side on a phone) plus a "next" pill. The page
 * scrolls inside <main>, not the window, so the observer is rooted on <main>.
 * It also sets --stage (room color) and --cue (accent) on <main>, which is
 * what makes the background morph and the dock take each section's colors. */
export default function SiteNav() {
  const [current, setCurrent] = useState("about");
  const [nextLabel, setNextLabel] = useState<string | undefined>("How I build");
  const [peek, setPeek] = useState(true);
  const peekTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const sections = Array.from(main.querySelectorAll<HTMLElement>("section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          setCurrent(el.id);
          if (el.dataset.bg) main.style.setProperty("--stage", el.dataset.bg);
          if (el.dataset.accent) main.style.setProperty("--cue", el.dataset.accent);
          setNextLabel(el.dataset.next);
          // Show the current label briefly whenever the section changes.
          setPeek(true);
          clearTimeout(peekTimer.current);
          peekTimer.current = setTimeout(() => setPeek(false), 1800);
        }
      },
      { root: main, threshold: 0.5 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      clearTimeout(peekTimer.current);
    };
  }, []);

  function goNext() {
    document.getElementById(current)?.nextElementSibling?.scrollIntoView({ block: "start" });
  }

  return (
    <>
      <nav
        aria-label="Sections"
        className="dock fixed right-1.5 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1 rounded-full border border-white/15 p-1"
      >
        {DOCK.map((d) => {
          const active = d.includes.includes(current);
          return (
            <a
              key={d.href}
              href={`#${d.href}`}
              aria-label={d.label}
              aria-current={active ? "true" : undefined}
              className="dock-item group relative flex h-10 w-10 items-center justify-center rounded-full"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...icon}>
                {d.svg}
              </svg>
              <span
                className={`dock-label pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-full border border-white/15 px-3 py-1 text-xs font-medium ${
                  active && peek ? "dock-label-on" : ""
                }`}
              >
                {d.label}
              </span>
            </a>
          );
        })}
      </nav>
      {nextLabel && (
        <button
          type="button"
          onClick={goNext}
          aria-label={`Next: ${nextLabel}`}
          className="next-pill fixed left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium"
        >
          {nextLabel}
          <svg viewBox="0 0 24 24" width="18" height="18" className="next-pill-arrow" aria-hidden="true" {...icon} strokeWidth={2.4}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </>
  );
}
