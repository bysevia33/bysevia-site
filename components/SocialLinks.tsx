"use client";

import { useState } from "react";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube, FaSpotify, FaFacebook, FaInstagram, FaPalette } from "react-icons/fa";
import { SiApplemusic, SiYoutubemusic } from "react-icons/si";
import type { IconType } from "react-icons";

interface SocialLinkItem {
  label: string;
  tooltip?: string;
  href: string;
  Icon: IconType | null;
  color: string;
  glow: string;
  sameTab?: boolean;
}

export const socialLinks: SocialLinkItem[] = [
  {
    label: "TikTok",
    tooltip: "TikTok By SevIA",
    href: "https://www.tiktok.com/@bysevia33",
    Icon: FaTiktok as IconType,
    color: "#ffffff",
    glow: "rgba(255,255,255,0.55)",
  },
  {
    label: "YouTube",
    tooltip: "Chaîne YouTube By SevIA",
    href: "https://www.youtube.com/@bysevia33",
    Icon: FaYoutube as IconType,
    color: "#FF0000",
    glow: "rgba(255,0,0,0.55)",
  },
  {
    label: "Instagram",
    tooltip: "Instagram By SevIA",
    href: "https://www.instagram.com/bysevia33",
    Icon: FaInstagram as IconType,
    color: "#E1306C",
    glow: "rgba(225,48,108,0.55)",
  },
  {
    label: "Facebook",
    tooltip: "Facebook By SevIA",
    href: "https://www.facebook.com/bysevia33",
    Icon: FaFacebook as IconType,
    color: "#1877F2",
    glow: "rgba(24,119,242,0.55)",
  },
  {
    label: "Spotify",
    tooltip: "By SevIA sur Spotify",
    href: "https://open.spotify.com/artist/2MuJgdOgJFb6K3QUWPhoG6",
    Icon: FaSpotify as IconType,
    color: "#1DB954",
    glow: "rgba(29,185,84,0.55)",
  },
  {
    label: "Deezer",
    tooltip: "By SevIA sur Deezer",
    href: "https://link.deezer.com/s/33jBP6tcTqw0FJDqIiqX8",
    Icon: null,
    color: "#A238FF",
    glow: "rgba(162,56,255,0.55)",
  },
  {
    label: "YouTube Music",
    tooltip: "YouTube Music By SevIA",
    href: "https://music.youtube.com/channel/UCUV-dLLUDV9ftnO20W13xHw",
    Icon: SiYoutubemusic as IconType,
    color: "#FF0000",
    glow: "rgba(255,0,0,0.55)",
  },
  {
    label: "Apple Music",
    tooltip: "By SevIA sur Apple Music",
    href: "https://music.apple.com/fr/artist/by-sevia/1823223524",
    Icon: SiApplemusic as IconType,
    color: "#FC3C44",
    glow: "rgba(252,60,68,0.55)",
  },
  {
    label: "ArtMajeur",
    tooltip: "Mes Peintures sur ArtMajeur",
    href: "https://www.artmajeur.com/severine-birs",
    Icon: FaPalette as IconType,
    color: "#E07B39",
    glow: "rgba(224,123,57,0.55)",
    sameTab: true,
  },
];

function DeezerIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} aria-hidden="true">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
    </svg>
  );
}

export function SocialIcon({
  label,
  tooltip,
  href,
  Icon,
  color,
  glow,
  sameTab,
  size = 28,
  showTooltip = true,
}: SocialLinkItem & { size?: number; showTooltip?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <a
        href={href}
        target={sameTab ? "_self" : "_blank"}
        rel={sameTab ? undefined : "noopener noreferrer"}
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          opacity: hovered ? 1 : 0.72,
          filter: hovered
            ? `drop-shadow(0 0 7px ${glow}) drop-shadow(0 0 14px ${glow})`
            : "none",
          transform: hovered ? "scale(1.25)" : "scale(1)",
          transition: "filter 0.25s ease, opacity 0.25s ease, transform 0.2s ease",
        }}
      >
        {Icon ? <Icon size={size} color={color} /> : <DeezerIcon size={size} color={color} />}
      </a>

      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            background: "rgba(5,10,30,0.88)",
            color: "#F0F4FF",
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "9px",
            letterSpacing: "0.1em",
            padding: "4px 9px",
            borderRadius: "4px",
            border: "1px solid rgba(0,180,216,0.35)",
            zIndex: 200,
          }}
        >
          {(showTooltip && (tooltip || label))}
        </div>
      )}
    </div>
  );
}
