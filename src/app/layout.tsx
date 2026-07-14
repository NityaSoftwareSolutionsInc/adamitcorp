import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/site.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://adamitcorp.com";

const title = "Adam IT Corp | Enterprise Software & Oracle Consulting";
const description =
  "Adam IT Corp — software development, Oracle Application practice, and IT consulting for manufacturing and service industries.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Adam IT Corp",
  },
  description,
  applicationName: "Adam IT Corp",
  keywords: [
    "Adam IT Corp",
    "Oracle Applications",
    "ERP",
    "software development",
    "IT consulting",
    "enterprise software",
  ],
  authors: [{ name: "Adam IT Corp" }],
  creator: "Adam IT Corp",
  publisher: "Adam IT Corp",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Adam IT Corp",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
