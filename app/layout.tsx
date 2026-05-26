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
        url: "/LOGO BYSEVIA/LOGO BYSEVIA.PNG",
        width: 512,
        height: 512,
        alt: "By SevIA Logo",
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
    images: ["/LOGO BYSEVIA/LOGO BYSEVIA.PNG"],
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
