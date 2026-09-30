"use client";

/** A real button, not a decorative hint (a pointer-events-none div caused a
 * genuine desktop bug on the expense tracker's login demo). Scrolls the next
 * section into view and names it, so the arrow says where it goes. */
export default function ScrollCue({ label }: { label?: string }) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.closest("section")?.nextElementSibling?.scrollIntoView({ block: "start" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label ? `Next: ${label}` : "Scroll to next section"}
      className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-xs font-medium"
      style={{ color: "var(--accent)" }}
    >
      {label && <span className="tracking-wide">{label}</span>}
      <svg
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scroll-cue-arrow"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}
