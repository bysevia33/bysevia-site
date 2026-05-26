import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const cinzel = Cinzel({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bysevia33.com"),
  title: "By SevIA – Créations originales, vidéos & musiques",
  description:
    "Explore les mondes de Seviah : créations visuelles, vidéos et musiques originales de By SevIA.",
  openGraph: {
    title: "By SevIA – Créations originales, vidéos & musiques",
    description:
      "Explore les mondes de Seviah : créations visuelles, vidéos et musiques originales de By SevIA.",
    url: "https://www.bysevia33.com",
    siteName: "By SevIA",
    images: [
      {
        url: "https://www.bysevia33.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Les mondes féeriques de By SevIA",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "By SevIA – Créations originales, vidéos & musiques",
    description:
      "Explore les mondes de Seviah : créations visuelles, vidéos et musiques originales de By SevIA.",
    images: ["https://www.bysevia33.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cinzel.variable}`}>
      <body className="bg-nuit text-etoile min-h-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
