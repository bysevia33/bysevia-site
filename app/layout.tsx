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
  title: "By SevIA – Créations originales, vidéos & musiques",
  description:
    "Explore les mondes de Seviah : créations visuelles, vidéos et musiques originales de By SevIA.",
  openGraph: {
    title: "By SevIA – Créations originales, vidéos & musiques",
    description:
      "Explore les mondes de Seviah : créations visuelles, vidéos et musiques originales de By SevIA.",
    url: "https://bysevia-site.vercel.app",
    siteName: "By SevIA",
    images: [
      {
        url: "/MONDES BYSEVIA/PAYSAGES/Multi_mondes.PNG",
        width: 1200,
        height: 630,
        alt: "Les mondes féeriques de By SevIA",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "By SevIA – Créations originales, vidéos & musiques",
    description:
      "Explore les mondes de Seviah : créations visuelles, vidéos et musiques originales de By SevIA.",
    images: ["/MONDES BYSEVIA/PAYSAGES/Multi_mondes.PNG"],
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
