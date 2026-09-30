import Section from "@/components/section";
import ProjectMedia, { type MediaItem } from "@/components/project-media";
import SiteNav from "@/components/site-nav";

// Project descriptions and personal introduction for Rob's portfolio.

// Sidebit's public Chrome Web Store listing. The source repository is
// private, so this is the only Sidebit link.
const SIDEBIT_STORE_URL =
  "https://chromewebstore.google.com/detail/sidebit/jjfbbgcgibcgoiamndgbkoodjdpbmmpl";

// Per-section palettes: accent (headings, links), bg (page color while the
// section is on screen), dim (secondary text, tinted from the same hue).
const THEMES = {
  amber: { accent: "#f2b134", bg: "#2a1f0c", dim: "#e6d3a8" },
  indigo: { accent: "#818cf8", bg: "#1c1d48", dim: "#c7caf5" },
  teal: { accent: "#2dd4bf", bg: "#0a3b38", dim: "#ade0da" },
  tealDeep: { accent: "#2dd4bf", bg: "#072e2c", dim: "#ade0da" },
  coral: { accent: "#fb7185", bg: "#431824", dim: "#f3c6cd" },
  sky: { accent: "#38bdf8", bg: "#0a3550", dim: "#b9dff2" },
};

const EXPENSE_MEDIA: MediaItem[] = [
  { kind: "video", src: "/video/expense-tracker.mp4", poster: "/img/expenses-poster.webp", label: "Demo", alt: "A short screen recording of Expense Tracker in use" },
  { kind: "image", src: "/img/expenses-personal.webp", label: "Personal", alt: "Expense Tracker's personal view: monthly total, category budgets and an Add expense button" },
  { kind: "image", src: "/img/expenses-group.webp", label: "Shared group", alt: "The Roommates group with an invite code and a shared expense list" },
  { kind: "image", src: "/img/x-goals.webp", label: "Goals", alt: "Savings goals with target amounts and dates" },
  { kind: "image", src: "/img/x-dark.webp", label: "Dark mode", alt: "Expense Tracker in dark mode" },
  { kind: "image", src: "/img/x-spanish.webp", label: "Spanish", alt: "Expense Tracker in Spanish" },
];

const SIDEBIT_MEDIA: MediaItem[] = [
  { kind: "video", src: "/video/sidebit.mp4", poster: "/img/sidebit-poster.webp", label: "Overview", alt: "A short overview video of Sidebit" },
  { kind: "image", src: "/img/sidebit-docked.webp", label: "Beside your work", alt: "Sidebit docked in Chrome's side panel beside a web page, with saved snippets, a highlight and notes" },
  { kind: "image", src: "/img/s-panel.webp", label: "The panel", alt: "The Sidebit side panel with notes, snippets and saved highlights" },
  { kind: "image", src: "/img/s-reminder.webp", label: "Reminders", alt: "Setting a reminder in Sidebit" },
  { kind: "image", src: "/img/s-dark.webp", label: "Dark theme", alt: "Sidebit in its dark theme" },
  { kind: "image", src: "/img/s-spanish.webp", label: "Spanish", alt: "Sidebit in Spanish" },
];

const CALENDAR_MEDIA: MediaItem[] = [
  { kind: "image", src: "/img/calendar-alert.webp", label: "The alert", alt: "Calendar Reminder on Windows: an upcoming-events list with a red-bordered alert that stays on top until acknowledged" },
  { kind: "image", src: "/img/c-events.webp", label: "Upcoming events", alt: "The list of upcoming events across shared calendars" },
  { kind: "image", src: "/img/c-picker.webp", label: "Pick calendars", alt: "Choosing which calendars to watch" },
  { kind: "image", src: "/img/c-settings.webp", label: "Settings", alt: "Calendar Reminder settings" },
];

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

export default function Home() {
  return (
    <main className="h-[100dvh] w-full overflow-y-auto snap-y snap-proximity">
      <SiteNav />
      {/* 1. Hero / About */}
      <Section id="about" {...THEMES.amber} next="How I build" kicker="Operations professional. Independent builder." wide>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/rob.webp"
            alt="Rob, smiling, wearing glasses and a navy zip sweater"
            width={640}
            height={640}
            className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-[var(--accent)] md:h-72 md:w-72"
          />
          <div className="max-w-xl">
            <h1 className="mb-4 text-3xl font-medium sm:text-4xl">
              Hi, I’m Rob. I build things people can use.
            </h1>
            <p className="text-base leading-relaxed text-dim">
              Nexbit is where I share the projects I’m building. Some start with
              an idea I’ve had for a while. Others start with someone asking,
              “Could you make this?” If you’ve used one of my apps and wondered
              who’s behind it, you’re in the right place.
            </p>
          </div>
        </div>
      </Section>

      {/* 2. How I build */}
      <Section id="how-i-build" {...THEMES.indigo} next="Expense Tracker" kicker="How I build">
        <h2 className="mb-5 text-2xl font-medium sm:text-3xl">
          How I build
        </h2>
        <p className="mb-4 text-base leading-relaxed text-dim">
          I work in operations. When a tool is missing or broken, I build it.
          I’m not a developer, and I don’t write the code myself. I take the
          product manager’s seat: I define the problem, set the priorities,
          and decide what ships.
        </p>
        <p className="mb-4 text-base leading-relaxed text-dim">
          AI writes the code, and it’s very good at it. I bring what years of
          operations work teach you: how things break on a busy day, what
          people actually need, and what has to be safe before anything ships.
          Safety, security and privacy get decided on day one, not added at
          the end, and I test on real setups, not just the easy case.
        </p>
        <p className="text-base leading-relaxed text-dim">
          Then I ship it, watch how it gets used, and simplify. I write down
          the trade-offs so a decision never looks like an accident. Here’s
          where they went.
        </p>
      </Section>

      {/* 3. Expense Tracker */}
      <Section id="expense-tracker" {...THEMES.teal} next="Your information" kicker="Project 01 · Web app" wide>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
          <div className="md:w-2/5">
            <h2 className="mb-3 text-2xl font-medium sm:text-3xl">
              Expense Tracker
            </h2>
            <p className="mb-6 text-base leading-relaxed text-dim">
              Built for my brother, now shared with you. Record expenses, set
              budgets and goals, and keep track of shared spending with family,
              roommates, or a group. You enter what you want to track; it doesn’t
              connect to your bank account.
            </p>
            <ProjectLink href="https://expenses.nexbit.dev" label="Visit the app" />
          </div>
          <div className="md:w-3/5">
            <ProjectMedia items={EXPENSE_MEDIA} />
          </div>
        </div>
      </Section>

      <Section id="your-information" {...THEMES.tealDeep} next="Sidebit" kicker="A note about your information">
        <h2 className="mb-5 text-2xl font-medium sm:text-3xl">You should know where your information goes.</h2>
        <p className="mb-5 text-base leading-relaxed text-dim">
          I built Expense Tracker to help with everyday spending. I have no
          interest in using your personal information for anything beyond
          running the app. It’s a project I build and run myself.
        </p>
        <dl className="mb-6 space-y-4 rounded-xl border border-white/10 bg-black/25 p-5 text-sm leading-relaxed">
          <div><dt className="font-medium">Where it lives</dt><dd className="mt-1 text-dim">The app is hosted on Vercel. The information you enter is stored in Supabase’s hosted database.</dd></div>
          <div><dt className="font-medium">What you share</dt><dd className="mt-1 text-dim">Personal entries are separate from shared groups. Members can see the information entered in their group.</dd></div>
          <div><dt className="font-medium">If you decide to leave</dt><dd className="mt-1 text-dim">You can delete your account in the app. Shared group entries remain for the other members, detached from your account. The privacy page explains the details.</dd></div>
        </dl>
        <div className="flex flex-wrap gap-3">
          <ProjectLink href="https://expenses.nexbit.dev/privacy" label="Read about privacy" />
          <ProjectLink href="mailto:expenses@nexbit.dev" label="Ask me a question" />
        </div>
      </Section>

      {/* 4. Sidebit */}
      <Section id="sidebit" {...THEMES.coral} next="Calendar Reminder" kicker="Project 02 · Chrome extension" wide>
        <div className="flex flex-col gap-8 md:flex-row-reverse md:items-center md:gap-12">
          <div className="md:w-3/5">
            <ProjectMedia items={SIDEBIT_MEDIA} />
          </div>
          <div className="md:w-2/5">
            <h2 className="mb-3 text-2xl font-medium sm:text-3xl">Sidebit</h2>
            <p className="mb-6 text-base leading-relaxed text-dim">
              A Chrome side panel that keeps your notes beside what you’re doing.
              Organize tasks in separate note tabs, save highlights and screenshots,
              keep reusable snippets, and set reminders. Your notes are stored
              locally in your browser.
            </p>
            <div className="flex flex-wrap gap-3">
              <ProjectLink href={SIDEBIT_STORE_URL} label="Chrome Web Store" />
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Calendar Reminder */}
      <Section id="calendar-reminder" {...THEMES.sky} next="Contact" kicker="Project 03 · Windows app" wide>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="md:w-2/5">
            <h2 className="mb-3 text-2xl font-medium sm:text-3xl">
              Calendar Reminder
            </h2>
            <p className="mb-4 text-base leading-relaxed text-dim">
              Busy days bury reminders. Calendar Reminder watches the Google
              Calendars you choose, shared ones included, and lists what’s
              coming up with a countdown for each event. When one is close, an
              alert stays on top of your other windows until you acknowledge
              it, so it can’t get lost behind everything else you have open.
            </p>
            <p className="mb-6 text-base leading-relaxed text-dim">
              It’s a Windows app and it isn’t available to download. If you’re
              curious about it, or would like to look at the code, get in
              touch and we can talk.
            </p>
            <ProjectLink
              href="mailto:rob@nexbit.dev?subject=Calendar%20Reminder"
              label="Get in touch"
            />
          </div>
          <div className="md:w-3/5">
            <ProjectMedia items={CALENDAR_MEDIA} />
          </div>
        </div>
      </Section>

      {/* 6. Contact */}
      <Section id="contact" {...THEMES.amber} kicker="Get in touch" last>
        <h2 className="mb-5 text-2xl font-medium sm:text-3xl">
          You can talk to the person who built it.
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
