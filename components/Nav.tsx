"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { socialLinks, SocialIcon } from "./SocialLinks";

const navLinks = [
  { label: "ACCUEIL", href: "/" },
  { label: "LES MONDES", href: "/mondes" },
  { label: "MUSIQUE", href: "/musique" },
  { label: "MON UNIVERS", href: "/boutique" },
  { label: "CONTACT", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes navBounce {
          0%   { transform: scale(1); }
          35%  { transform: scale(1.55); }
          60%  { transform: scale(0.94); }
          80%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .nav-link:hover {
          animation: navBounce 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
        }
      `}</style>

      <nav
        className="fixed top-0 w-full transition-all duration-300"
        style={{
          zIndex: 100,
          background: scrolled ? "rgba(13, 27, 62, 0.97)" : "rgba(13, 27, 62, 0.35)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(0,180,216,0.2)" : "none",
        }}
      >
        <div style={{ maxWidth: "100%", margin: "0 auto", padding: "0 16px" }}>

          {/* ── DESKTOP : une seule rangée ── */}
          <div className="hidden lg:flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/LOGO BYSEVIA/LOGO BYSEVIA.PNG"
                alt="By SevIA Logo"
                width={50}
                height={50}
                className="rounded-full animate-pulse-glow"
                unoptimized loading="eager" priority
              />
              <span
                className="font-cinzel text-lg font-bold glow-cyan"
                style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
              >
                BY SevIA
              </span>
            </Link>

            <div className="flex flex-1 items-center justify-around px-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link font-cinzel transition-colors duration-200 hover:text-cyan-400 whitespace-nowrap text-base"
                  style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF", letterSpacing: "0.02em", display: "inline-block" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {socialLinks.map((s) => (
                <SocialIcon key={s.label} {...s} size={28} showTooltip />
              ))}
            </div>
          </div>

          {/* ── MOBILE : deux rangées ── */}
          <div className="flex lg:hidden flex-col">
            {/* Rangée 1 : logo + titre */}
            <div className="flex items-center justify-center h-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/LOGO BYSEVIA/LOGO BYSEVIA.PNG"
                  alt="By SevIA Logo"
                  width={28}
                  height={28}
                  className="rounded-full animate-pulse-glow"
                  unoptimized loading="eager" priority
                />
                <span
                  className="font-cinzel font-bold glow-cyan"
                  style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF", fontSize: "0.75rem" }}
                >
                  BY SevIA
                </span>
              </Link>
            </div>

            {/* Rangée 2 : onglets toujours visibles */}
            <div
              className="flex items-center justify-around"
              style={{ borderTop: "1px solid rgba(0,180,216,0.12)" }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-cinzel hover:text-cyan-400 transition-colors duration-200 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    color: "#F0F4FF",
                    fontSize: "clamp(0.55rem, 1.8vw, 0.7rem)",
                    letterSpacing: "0.03em",
                    padding: "4px 1px",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </nav>
    </>
  );
}
