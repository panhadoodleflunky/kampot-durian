import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Noto_Sans_Khmer,
} from "next/font/google";
import "./globals.css";
import collection from "../collection.config.js";
import { siteUrl } from "../content/site.js";

/* Display face: one weight only (400), meant for large sizes. */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

/* Body face: carries the long oral-history passages. */
const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

/* Khmer face. Inter and Instrument Serif carry no Khmer glyphs, so without
   this any Khmer entry falls through to whatever the device happens to have.

   Not preloaded. At 59 kB it was the heaviest file in the head of every page,
   in an English edition with no Khmer on it. Without the preload the browser
   still fetches it the moment a Khmer character actually needs it. */
const khmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["300", "400", "600"],
  display: "swap",
  preload: false,
  variable: "--font-khmer",
});

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
  openGraph: {
    title: `${collection.name} — Khmer Living Archive`,
    description: collection.description,
    type: "website",
    locale: "en_US",
    images: [{ url: "/harvest-ready-to-sell.jpg", width: 2048, height: 1536 }],
  },
};

/* Runs before anything paints. A reader who chose light mode (stored by
   ThemeToggle) would otherwise see a dark flash on every page load. Dark
   needs no marker — it is the default palette in globals.css. */
const themeInit = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${khmer.variable}`}
      /* the inline script above sets data-theme before React hydrates */
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
