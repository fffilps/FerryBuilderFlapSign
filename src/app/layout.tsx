import type { Metadata } from "next";
import { Barlow_Condensed, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlow = Barlow_Condensed({
  variable: "--font-flap",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FLAP — Split-Flap Board",
  description:
    "A living split-flap homepage with operator settings for rows, playlists, timing, and themes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${barlow.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-display)]">
        {children}
      </body>
    </html>
  );
}
