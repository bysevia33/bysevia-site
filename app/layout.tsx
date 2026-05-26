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
  title: "By SevIA – Univers Féerique Bioluminescent",
  description:
    "Plongez dans l'univers magique de By SevIA : musique, personnages féeriques, NFT et peintures.",
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
