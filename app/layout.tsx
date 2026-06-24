import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yolkling.com"),
  title: {
    default: "Yolkling, a little creature that is secretly you",
    template: "%s · Yolkling",
  },
  description:
    "hatch a one of a kind creature from your vibe. it grows when you take care of yourself and visits your friends. the app that wants you off your phone. ios first, coming soon. join the waitlist.",
  keywords: [
    "yolkling", "virtual pet", "virtual pet app", "cozy app", "self care app",
    "tamagotchi", "creature companion", "ios app", "digital wellbeing",
    "screen time", "put your phone down", "cute app", "waitlist",
  ],
  applicationName: "Yolkling",
  creator: "Yolkling",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://yolkling.com",
    siteName: "Yolkling",
    title: "Yolkling, the little guy who is secretly you",
    description:
      "a tiny one of a kind creature you hatch from your vibe. it grows when you take care of yourself and gets sleepy when you doomscroll. ios, coming soon.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yolkling, the little guy who is secretly you",
    description:
      "a tiny one of a kind creature you hatch from your vibe. it grows when you take care of yourself. the app that wants you off your phone.",
    creator: "@sankeydadev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,400..600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
