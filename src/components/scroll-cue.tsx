"use client";

/** A real button, not a decorative hint — a pointer-events-none div caused a
 * genuine desktop bug on the expense tracker's login demo (see that repo's
 * ScrollCue), so this one is a real <button> from the start. Scrolls the
 * nearest <main> forward by exactly one viewport. */
export default function ScrollCue() {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const main = e.currentTarget.closest("main");
    if (!main) return;
    main.scrollTo({ top: main.scrollTop + main.clientHeight });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to next section"
      className="absolute inset-x-0 bottom-8 flex justify-center"
      style={{ color: "var(--accent)" }}
    >
      <svg
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-bounce"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}
