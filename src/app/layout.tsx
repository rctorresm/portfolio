import type { Metadata } from "next";
import "./globals.css";

const DESCRIPTION =
  "Meet Rob, the independent builder behind Nexbit, Expense Tracker, Sidebit, and Calendar Reminder.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rob.nexbit.dev"),
  title: "Roberto Torres",
  description: DESCRIPTION,
  openGraph: {
    title: "Roberto Torres",
    description: DESCRIPTION,
    url: "/",
    siteName: "Nexbit",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Roberto Torres, I build things people can use" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roberto Torres",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-deep text-ink antialiased">{children}</body>
    </html>
  );
}
