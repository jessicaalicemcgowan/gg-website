import type { Metadata } from "next";
import { albertus } from "@/lib/fonts";
import { NavThemeProvider } from "@/lib/navTheme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geoffrey Grunfeld",
  description:
    "A creative practice of forgotten crafts focused on experiential spaces and functional objects.",
  // Site is still in build/review with the client — keep it out of search
  // results until it's ready to go live on the real domain. Remove this
  // (and robots.ts) when launching for real.
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={albertus.variable}>
      <body className="bg-beige text-brown">
        <NavThemeProvider>{children}</NavThemeProvider>
      </body>
    </html>
  );
}
