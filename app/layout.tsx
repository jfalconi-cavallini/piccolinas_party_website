import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piccolinas Party | Decoration & Rental — Merced, CA",
  description:
    "Since 2006, Piccolinas Party Decoration & Rental has been Merced's premier event design studio. Luxury weddings, celebrations, piñatas, and custom centerpieces.",
  keywords:
    "wedding planner Merced CA, party decoration rental Merced, event decorations, piñatas, custom centerpieces, Piccolinas Party",
  openGraph: {
    title: "Piccolinas Party | Decoration & Rental",
    description:
      "Merced's most prestigious event design studio since 2006. Weddings, celebrations, piñatas & more.",
    type: "website",
    images: [
      {
        url: "/images/og_logo.png",
        width: 1200,
        height: 630,
        alt: "Piccolinas Party Decoration & Rental",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Cinzel:wght@400;500;600;700;800;900&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}