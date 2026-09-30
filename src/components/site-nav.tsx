"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "about", label: "About", includes: ["about"] },
  { href: "how-i-build", label: "How I build", includes: ["how-i-build"] },
  {
    href: "expense-tracker",
    label: "Projects",
    includes: ["expense-tracker", "your-information", "sidebit", "calendar-reminder"],
  },
  { href: "contact", label: "Contact", includes: ["contact"] },
];

const DOTS = [
  { id: "about", label: "About" },
  { id: "how-i-build", label: "How I build" },
  { id: "expense-tracker", label: "Expense Tracker" },
  { id: "your-information", label: "Your information" },
  { id: "sidebit", label: "Sidebit" },
  { id: "calendar-reminder", label: "Calendar Reminder" },
  { id: "contact", label: "Contact" },
];

/** Top nav plus a side rail of section dots. The page scrolls inside <main>,
 * not the window, so the observer is rooted on <main>. It also sets --stage
 * on <main>, which is what makes the background color morph between sections. */
export default function SiteNav() {
  const [current, setCurrent] = useState("about");

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
        }
      },
      { root: main, threshold: 0.5 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="site-nav fixed inset-x-0 top-0 z-10 flex justify-center gap-5 border-b border-white/10 px-4 py-4 text-sm"
      >
        {LINKS.map((l) => {
          const active = l.includes.includes(current);
          return (
            <a
              key={l.href}
              href={`#${l.href}`}
              aria-current={active ? "true" : undefined}
              className={`border-b-2 pb-0.5 transition-colors ${
                active ? "border-current text-ink" : "border-transparent text-dim hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          );
        })}
      </nav>
      <div
        role="navigation"
        aria-label="Sections"
        className="fixed right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {DOTS.map((d) => (
          <a
            key={d.id}
            href={`#${d.id}`}
            aria-label={d.label}
            title={d.label}
            aria-current={d.id === current ? "true" : undefined}
            className="section-dot block h-2.5 w-2.5 rounded-full border border-ink/60"
          />
        ))}
      </div>
    </>
  );
}
