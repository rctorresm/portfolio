import Section from "@/components/section";

// TEMP CONTENT NOTICE: every heading/paragraph below is lorem ipsum
// placeholder text. Wording is on hold (Roberto's writing it separately);
// only structure, links, and layout are real. Links/emails ARE real.

// Sidebit's public Chrome Web Store listing. The source repository is
// private, so this is the only Sidebit link.
const SIDEBIT_STORE_URL =
  "https://chromewebstore.google.com/detail/sidebit/jjfbbgcgibcgoiamndgbkoodjdpbmmpl";

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium"
      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
    >
      {label}
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    </a>
  );
}

// A stand-in for real screenshots Roberto plans to add later. Purely a
// layout placeholder, never meant to ship as-is.
function ScreenshotPlaceholder({ count = 2 }: { count?: number }) {
  return (
    <div className="mt-6 flex gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex h-28 flex-1 items-center justify-center rounded-lg border border-dashed text-xs"
          style={{ borderColor: "var(--accent)", color: "var(--text-muted)" }}
        >
          Screenshot
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="h-[100dvh] w-full overflow-y-auto snap-y snap-proximity [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* 1. Hero / About */}
      <Section id="about" accent="#f2b134" kicker="Roberto Carlos Torres">
        <div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-medium"
          style={{ background: "var(--bg-card)", color: "var(--accent)" }}
        >
          RT
        </div>
        <h1 className="mb-4 text-3xl font-medium sm:text-4xl">
          Lorem ipsum dolor sit amet, consectetur.
        </h1>
        <p className="text-base leading-relaxed text-dim">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </Section>

      {/* 2. How I build */}
      <Section id="how-i-build" accent="#818cf8" kicker="How I build">
        <h2 className="mb-5 text-2xl font-medium sm:text-3xl">
          Lorem ipsum dolor sit amet.
        </h2>
        <p className="mb-4 text-base leading-relaxed text-dim">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="mb-4 text-base leading-relaxed text-dim">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore.
        </p>
        <p className="text-base leading-relaxed text-dim">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </Section>

      {/* 3. Expense Tracker */}
      <Section id="expense-tracker" accent="#0f766e" kicker="Project 01">
        <h2 className="mb-3 text-2xl font-medium sm:text-3xl">
          Expense Tracker
        </h2>
        <p className="mb-6 text-base leading-relaxed text-dim">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <ProjectLink href="https://expenses.nexbit.dev" label="Visit the app" />
      </Section>

      {/* 4. Sidebit */}
      <Section id="sidebit" accent="#fb7185" kicker="Project 02">
        <h2 className="mb-3 text-2xl font-medium sm:text-3xl">Sidebit</h2>
        <p className="mb-6 text-base leading-relaxed text-dim">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <div className="flex flex-wrap gap-3">
          <ProjectLink href={SIDEBIT_STORE_URL} label="Chrome Web Store" />
        </div>
        <ScreenshotPlaceholder />
      </Section>

      {/* 5. Calendar Reminder */}
      <Section id="calendar-reminder" accent="#38bdf8" kicker="Project 03">
        <h2 className="mb-3 text-2xl font-medium sm:text-3xl">
          Calendar Reminder
        </h2>
        <p className="mb-6 text-base leading-relaxed text-dim">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        {/* Not distributed anywhere: source and write-up only, no download
            link. Confirmed with Roberto 2026-09-22, not a placeholder gap. */}
        <ProjectLink
          href="https://github.com/rctorresm/calendar-reminder"
          label="View on GitHub"
        />
        <ScreenshotPlaceholder />
      </Section>

      {/* 6. Contact */}
      <Section id="contact" accent="#f2b134" kicker="Get in touch" last>
        <h2 className="mb-5 text-2xl font-medium sm:text-3xl">
          Lorem ipsum dolor sit amet.
        </h2>
        <div className="flex flex-wrap gap-3">
          <ProjectLink href="mailto:rob@nexbit.dev" label="rob@nexbit.dev" />
          <ProjectLink
            href="https://www.linkedin.com/in/rctorresm"
            label="LinkedIn"
          />
        </div>
      </Section>
    </main>
  );
}
