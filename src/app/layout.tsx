import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roberto Torres",
  description: "Operations professional. Independent builder.",
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
