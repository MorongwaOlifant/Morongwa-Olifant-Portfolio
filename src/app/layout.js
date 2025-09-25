// src/app/layout.js
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";  

export const metadata = {
  metadataBase: new URL("https://morongwa.dev"), // change after domain is live
  title: "Morongwa Olifant – Software Developer",
  description:
    "Portfolio of Morongwa Olifant: Next.js/React developer. Projects: Jobsta, PayTrckr, Zazi. Contact for internships and junior roles.",
  openGraph: {
    title: "Morongwa Olifant – Software Developer",
    description:
      "Portfolio of Morongwa Olifant: Next.js/React developer. Projects: Jobsta, PayTrckr, Zazi.",
    url: "https://morongwa.dev",
    siteName: "Morongwa Olifant",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Morongwa Olifant Portfolio",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morongwa Olifant – Software Developer",
    description:
      "Portfolio of Morongwa Olifant: Next.js/React developer. Projects: Jobsta, PayTrckr, Zazi.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics /> {/* 👈 Enables Vercel Analytics */}
      </body>
    </html>
  );
}