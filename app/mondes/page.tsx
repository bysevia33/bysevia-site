"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Personnage {
  nom: string;
  img: string;
}

interface Monde {
  id: number;
  nom: string;
  emoji: string;
  image: string;
  personnages: Personnage[];
  couleur: string;
  videos: string[];
}

// État popup unifié
type PopupState =
  | { kind: "personnage"; personnage: Personnage; pinned: boolean }
  | { kind: "paysage"; monde: Monde; pinned: boolean }
  | null;

const YOUTUBE_CHANNEL = "https://www.youtube.com/@bysevia33";
const TIKTOK_CHANNEL = "https://www.tiktok.com/@bysevia33";
const LOGO = "/LOGO BYSEVIA/LOGO BYSEVIA.PNG?v=2";
const LOGO_POPUP = "/LOGO BYSEVIA/LOGO BYSEVIA.PNG?v=2";

const mondes: Monde[] = [
  // Ligne 1
  {
    id: 1,
    nom: "Monde Bleu",
    emoji: "🔵",
    image: "/MONDES BYSEVIA/PAYSAGES/Monde bleu.PNG?v=2",
    personnages: [
      { nom: "VARKAN'TEY", img: "/MONDES BYSEVIA/PERSONNAGES/VARKANTEY.PNG?v=2" },
      { nom: "SAHALI",     img: "/MONDES BYSEVIA/PERSONNAGES/SAHALI.PNG?v=2" },
      { nom: "NEY'KARA",  img: "/MONDES BYSEVIA/PERSONNAGES/NEYKARA.PNG?v=2" },
      { nom: "TIHNAË",    img: "/MONDES BYSEVIA/PERSONNAGES/TIHNAE.PNG?v=1" },
      { nom: "AURALHYA",  img: "/MONDES BYSEVIA/PERSONNAGES/AURALHYA.jpg?v=1" },
      { nom: "NAELYA",    img: "/MONDES BYSEVIA/PERSONNAGES/NAELYA.PNG?v=1" },
    ],
    couleur: "#00B4D8",
    videos: [
      "If9D3rV0s4A", "lUlElkJ9c1M", "PLKZh2kw5lw", "RPADe3zn0Fk",
      "1TFeI0XaGRE", "ZJfHRRcJjow", "N4sDxvzRFR0",
      "ovqTHbvp2AI", "0WfXUQApneY", "UCNxMFZvJ5c",
      "cQlJs5FZvOk", "EUNlR3u5CeM", "-_QT52utqGM",
    ],
  },
  {
    id: 2,
    nom: "Monde Vert",
    emoji: "🌿",
    image: "/MONDES BYSEVIA/PAYSAGES/Monde vert.PNG?v=2",
    personnages: [
      { nom: "VALKARÎN",              img: "/MONDES BYSEVIA/PERSONNAGES/VALKARIN.PNG?v=2" },
      { nom: "VAËRON",                img: "/MONDES BYSEVIA/PERSONNAGES/VAERON.jpg?v=2" },
      { nom: "TORIEK",                img: "/MONDES BYSEVIA/PERSONNAGES/TORIEK.jpg?v=2" },
      { nom: "NEYVAR",                img: "/MONDES BYSEVIA/PERSONNAGES/NEYVAR.jpg?v=2" },
      { nom: "KAËLTHORN ET SYRRAKA", img: "/MONDES BYSEVIA/PERSONNAGES/KAELTHORN ET SYRRAKA.jpg?v=2" },
      { nom: "ELYNDRÉA",             img: "/MONDES BYSEVIA/PERSONNAGES/ELYNDREA.PNG?v=1" },
      { nom: "LISSANDRAH",           img: "/MONDES BYSEVIA/PERSONNAGES/LISSANDRAH.PNG?v=1" },
    ],
    couleur: "#4CAF50",
    videos: [
      "6bLSOPmH47E", "zCWtOWNUdc0", "tHPifcnTbCU", "HxVaNGEDNtc",
      "WG5V_40AI5A", "Ws8NE-6h3GE", "Fm_cmjPx_Gw", "anUCa7rAz3w",
      "jL3vlXTU6lI", "RhK-YpDBKi0", "S39a6l-6auk",
    ],
  },
  {
    id: 3,
    nom: "Monde Rose",
    emoji: "🌸",
    image: "/MONDES BYSEVIA/PAYSAGES/Monde rose.PNG?v=2",
    personnages: [
      { nom: "VEYLÄHNA", img: "/MONDES BYSEVIA/PERSONNAGES/VEYLAHNA.PNG?v=2" },
      { nom: "SYLHËA",   img: "/MONDES BYSEVIA/PERSONNAGES/SYLHEA.PNG?v=2" },
      { nom: "FILEOR",   img: "/MONDES BYSEVIA/PERSONNAGES/FILEOR.PNG?v=2" },
      { nom: "SHAYLÜN",  img: "/MONDES BYSEVIA/PERSONNAGES/SHAYLUN.PNG?v=2" },
      { nom: "HYPOKAN",  img: "/MONDES BYSEVIA/PERSONNAGES/HYPOKAN.jpg?v=1" },
    ],
    couleur: "#E8A0BF",
    videos: [
      "oVH2VxIzxhc", "uHHUvJTANas", "k5DNSz_ismg", "7olvRprP41k", "_RhxOc8ZKT8",
      "bCd9_XjxskU", "6LA1P25zmoE", "AlqAH_mrXek", "3_fqswjC-Eg",
      "dQXNFCXcT-o", "Gsjhwfz6IEw", "RytQ25xFvJw", "7JrugEI-EnU", "4w4k-uMc6I4",
      "B_Jp8EWlaRk", "SLGyuEIqh6M", "evysUhDIPp8", "YUCa-xRR1_E",
      "zVycugbj1Hw",
    ],
  },
  // Ligne 2
  {
    id: 4,
    nom: "Monde Blanc",
    emoji: "⬜",
    image: "/MONDES BYSEVIA/PAYSAGES/Monde blanc.PNG?v=2",
    personnages: [
      { nom: "SYLPHARA", img: "/MONDES BYSEVIA/PERSONNAGES/SYLPHARA.PNG?v=2" },
      { nom: "LYSIAN",   img: "/MONDES BYSEVIA/PERSONNAGES/LYSIAN.PNG?v=2" },
      { nom: "ERYÄN",    img: "/MONDES BYSEVIA/PERSONNAGES/ERYAN.PNG?v=3" },
      { nom: "ELOHÀM",   img: "/MONDES BYSEVIA/PERSONNAGES/ELOHAM.PNG?v=3" },
      { nom: "FÉLIN",    img: "/MONDES BYSEVIA/PERSONNAGES/FELIN.PNG?v=2" },
    ],
    couleur: "#F0F4FF",
    videos: [
      "IsHy1xkuXT8", "diUo8jSWiCE", "WVtoI9-Y8yY", "pvBLJeJCJwo",
      "TrYVY62FUMI", "mg2TQ_IPwZs", "b9lK2Fz1ji4", "zV4CBO9mXQg",
      "zVycugbj1Hw",
    ],
  },
  {
    id: 5,
    nom: "Monde Marin",
    emoji: "🌊",
    image: "/MONDES BYSEVIA/PAYSAGES/Monde marin.PNG?v=2",
    personnages: [
      { nom: "OCÉANÀ",   img: "/MONDES BYSEVIA/PERSONNAGES/OCEANA.PNG?v=3" },
      { nom: "THAËLORN", img: "/MONDES BYSEVIA/PERSONNAGES/THAELORN.PNG?v=3" },
      { nom: "FLUVIA",   img: "/MONDES BYSEVIA/PERSONNAGES/FLUVIA.PNG?v=3" },
      { nom: "LUMYA",    img: "/MONDES BYSEVIA/PERSONNAGES/LUMYA.PNG?v=2" },
      { nom: "VALÖRIS",  img: "/MONDES BYSEVIA/PERSONNAGES/VALORIS.PNG?v=2" },
      { nom: "EROSIÁN",  img: "/MONDES BYSEVIA/PERSONNAGES/EROSIAN.jpg?v=2" },
    ],
    couleur: "#00B4D8",
    videos: [
      "vd6GdTbLFoo", "SOzzGDjvREY", "aNWszVNy-7E", "6CTNe0A37Ps",
      "JgorhAhksG4", "GI2o3G6QLkg", "bd8jrwnmth4",
    ],
  },
  {
    id: 6,
    nom: "Monde de la Forêt",
    emoji: "🌳",
    image: "/MONDES BYSEVIA/PAYSAGES/Monde foret.JPG?v=2",
    personnages: [
      { nom: "SAPHYRA", img: "/MONDES BYSEVIA/PERSONNAGES/SAPHYRA.jpg?v=2" },
      { nom: "TAËRON",  img: "/MONDES BYSEVIA/PERSONNAGES/TAERON.PNG?v=2" },
      { nom: "NOKKI",   img: "/MONDES BYSEVIA/PERSONNAGES/NOKKI.PNG?v=2" },
    ],
    couleur: "#2E7D32",
    videos: [
      "8YB1fgDsYfY", "acQgKsTenLY", "nMvNdcZolqg", "r3TZn2jURGE", "QQhVXlEZODo",
      "gM9mmTWrIFI", "Mk3r9xMvqzc", "-G_JxDlMabA", "Mc8YxPs3Msc", "hLOP6lWdXro",
      "cc0gb1Qmfnc", "0HEnzrY0JXk", "M8mlhvf4uPs", "YRzO5i79TRA", "aG-kF94Tczs",
      "QozBaPHNq5U", "ryLicRm5R-8",
    ],
  },
  {
    id: 7,
    nom: "Monde Jaune",
    emoji: "🌟",
    image: "/MONDES BYSEVIA/PAYSAGES/Monde jaune.PNG?v=1",
    personnages: [
      { nom: "KAHLEM", img: "/MONDES BYSEVIA/PERSONNAGES/KAHLEM.PNG?v=1" },
      { nom: "ORYAH",  img: "/MONDES BYSEVIA/PERSONNAGES/ORYAH.jpg?v=1" },
    ],
    couleur: "#F4D03F",
    videos: ["OdC4L8e2IWQ"],
  },
  // En dessous
  {
    id: 8,
    nom: "Monde Violet",
    emoji: "🔮",
    image: "/MONDES BYSEVIA/PAYSAGES/Monde violet.PNG?v=2",
    personnages: [
      { nom: "DRAHVËN", img: "/MONDES BYSEVIA/PERSONNAGES/DRAHVEN.png?v=3" },
      { nom: "SERENA",  img: "/MONDES BYSEVIA/PERSONNAGES/SERENA.jpg?v=2" },
    ],
    couleur: "#9B59B6",
    videos: ["0B3WoRxLrRY", "JmuiHhkIzmg"],
  },
];

// ─── Logo watermark commun aux deux popups ─────────────────────────────────────

function PopupLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_POPUP}
      alt=""
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        width: 60,
        maxWidth: 60,
        opacity: 0.25,
        zIndex: 999,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Popup personnage ──────────────────────────────────────────────────────────

function PersonnagePopup({
  personnage,
  pinned,
  onClose,
}: {
  personnage: Personnage;
  pinned: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, pinned]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: pinned ? "rgba(0,0,0,0.82)" : "transparent",
        backdropFilter: pinned ? "blur(6px)" : "none",
        pointerEvents: pinned ? "auto" : "none",
      }}
      onClick={pinned ? onClose : undefined}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.84 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative flex flex-col items-center"
        style={{ maxWidth: 500, width: "100%", pointerEvents: pinned ? "auto" : "none" }}
        onClick={pinned ? (e) => e.stopPropagation() : undefined}
      >
        {pinned && (
          <button
            onClick={onClose}
            className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-opacity hover:opacity-70"
            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}
            aria-label="Fermer"
          >
            ✕
          </button>
        )}

        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ height: "min(70vh, 560px)" }}
        >
          <Image src={personnage.img} alt={personnage.nom} fill unoptimized className="object-contain" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/LOGO BYSEVIA/LOGO BYSEVIA.PNG?v=2"
            alt=""
            style={{
              position: "absolute",
              top: 10,
              right: "25%",
              width: 50,
              maxWidth: 50,
              opacity: 0.40,
              borderRadius: "50%",
              overflow: "hidden",
              background: "transparent",
              zIndex: 999,
              pointerEvents: "none",
            }}
          />
        </div>

        <p
          className="font-cinzel mt-4 text-base tracking-widest text-center"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
        >
          {personnage.nom}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Popup paysage ─────────────────────────────────────────────────────────────

function PaysagePopup({
  monde,
  pinned,
  onClose,
}: {
  monde: Monde;
  pinned: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, pinned]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: pinned ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: pinned ? "blur(8px)" : "none",
        pointerEvents: pinned ? "auto" : "none",
      }}
      onClick={pinned ? onClose : undefined}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.84 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative flex flex-col items-center"
        style={{ maxWidth: 720, width: "100%", pointerEvents: pinned ? "auto" : "none" }}
        onClick={pinned ? (e) => e.stopPropagation() : undefined}
      >
        {pinned && (
          <button
            onClick={onClose}
            className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-opacity hover:opacity-70"
            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}
            aria-label="Fermer"
          >
            ✕
          </button>
        )}

        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            height: "min(60vh, 480px)",
            boxShadow: `0 0 40px ${monde.couleur}30`,
          }}
        >
          <Image src={monde.image} alt={monde.nom} fill unoptimized className="object-cover" />
        </div>

        <PopupLogo />

        <p
          className="font-cinzel mt-4 text-lg tracking-widest text-center"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#00B4D8" }}
        >
          {monde.nom.toUpperCase()}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Bulle personnage ──────────────────────────────────────────────────────────

function PersonnageBubble({
  p,
  couleur,
  onHoverOpen,
  onHoverClose,
  onPinnedOpen,
}: {
  p: Personnage;
  couleur: string;
  onHoverOpen: (p: Personnage) => void;
  onHoverClose: () => void;
  onPinnedOpen: (p: Personnage) => void;
}) {
  return (
    <div
      className="flex items-center gap-1 cursor-pointer select-none"
      onMouseEnter={() => onHoverOpen(p)}
      onMouseLeave={() => onHoverClose()}
      onDoubleClick={() => onPinnedOpen(p)}
    >
      <div
        className="relative w-6 h-6 rounded-full overflow-hidden border flex-shrink-0 transition-transform hover:scale-110"
        style={{ borderColor: couleur + "80" }}
      >
        <Image src={p.img} alt={p.nom} fill className="object-cover object-top" unoptimized />
      </div>
      <span
        className="font-cinzel"
        style={{
          fontFamily: "var(--font-cinzel), serif",
          color: "#F0F4FF",
          opacity: 0.75,
          fontSize: "0.48rem",
        }}
      >
        {p.nom}
      </span>
    </div>
  );
}

// ─── VideoThumbnail ────────────────────────────────────────────────────────────

function VideoThumbnail({ videoId }: { videoId: string }) {
  return (
    <a
      href={`https://youtube.com/shorts/${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden rounded-lg group"
      style={{ aspectRatio: "9 / 16" }}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="Extrait"
        fill
        unoptimized
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 28vw, (max-width: 1024px) 12vw, 9vw"
      />

      {/* Petit logo YouTube discret en haut à gauche */}
      <div
        className="absolute top-1.5 left-1.5 z-10 w-5 h-5 rounded flex items-center justify-center pointer-events-none"
        style={{ background: "#FF0000", opacity: 0.5 }}
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
      </div>

      {/* Overlay hover : fond assombri + logo YouTube rouge + texte */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.48)" }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "7px",
            color: "#F0F4FF",
            letterSpacing: "0.06em",
          }}
        >
          Voir sur YouTube
        </span>
      </div>
    </a>
  );
}

// ─── WorldCard ─────────────────────────────────────────────────────────────────

function WorldCard({
  monde,
  index,
  onPersonnageHoverOpen,
  onPersonnageHoverClose,
  onPersonnagePinnedOpen,
  onPaysageHoverOpen,
  onPaysageHoverClose,
  onPaysagePinnedOpen,
}: {
  monde: Monde;
  index: number;
  onPersonnageHoverOpen: (p: Personnage) => void;
  onPersonnageHoverClose: () => void;
  onPersonnagePinnedOpen: (p: Personnage) => void;
  onPaysageHoverOpen: (m: Monde) => void;
  onPaysageHoverClose: () => void;
  onPaysagePinnedOpen: (m: Monde) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{ border: `1px solid ${monde.couleur}30` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${encodeURI(monde.image)}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(28px)",
          opacity: 0.15,
          transform: "scale(1.15)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(6,10,30,0.84)" }} />

      <div className="relative z-10 p-4 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-4">
          {/* Vignette paysage — hover + double clic */}
          <div
            className="relative rounded-xl overflow-hidden flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
            style={{ width: 56, height: 56, border: `2px solid ${monde.couleur}50` }}
            onMouseEnter={() => onPaysageHoverOpen(monde)}
            onMouseLeave={() => onPaysageHoverClose()}
            onDoubleClick={() => onPaysagePinnedOpen(monde)}
          >
            <Image src={monde.image} alt={monde.nom} fill className="object-cover" unoptimized />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{monde.emoji}</span>
              <h2
                className="font-cinzel text-sm font-black leading-tight"
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  color: monde.couleur,
                  textShadow: `0 0 14px ${monde.couleur}50`,
                }}
              >
                {monde.nom.toUpperCase()}
              </h2>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {monde.personnages.map((p) => (
                <PersonnageBubble
                  key={p.nom}
                  p={p}
                  couleur={monde.couleur}
                  onHoverOpen={onPersonnageHoverOpen}
                  onHoverClose={onPersonnageHoverClose}
                  onPinnedOpen={onPersonnagePinnedOpen}
                />
              ))}
            </div>
          </div>
        </div>

        {monde.videos.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 mb-4">
            {monde.videos.map((id) => (
              <VideoThumbnail key={id} videoId={id} />
            ))}
          </div>
        ) : (
          <div
            className="flex items-center justify-center py-8 mb-4 rounded-xl"
            style={{ background: `${monde.couleur}10`, border: `1px dashed ${monde.couleur}30` }}
          >
            <span
              className="font-cinzel text-xs tracking-widest"
              style={{ fontFamily: "var(--font-cinzel), serif", color: monde.couleur, opacity: 0.6 }}
            >
              BIENTÔT...
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-cinzel text-xs font-bold tracking-wider transition-all hover:scale-105"
            style={{ fontFamily: "var(--font-cinzel), serif", background: "#FF0000", color: "#fff" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YOUTUBE
          </a>
          <a
            href={TIKTOK_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-cinzel text-xs font-bold tracking-wider transition-all hover:scale-105"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${monde.couleur}50`,
              color: "#F0F4FF",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
            </svg>
            TIKTOK
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Fond : vidéo ─────────────────────────────────────────────────────────────

function VideoBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          transform: "translate(-50%, -50%) scale(1.08)",
          filter: "blur(2px)",
          opacity: 0.12,
        }}
      >
        <source src="/VIDEOS BYSEVIA/SAHALI ET LE CYGNE.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

// ─── Fond : nébuleuse animée ───────────────────────────────────────────────────

const NEBULA_BLOBS = [
  { color: "#00B4D8", left: "15%", top: "10%",  size: 620, dur: 20, x: [0, 60, -40, 0] as number[], y: [0, -40, 30, 0]  as number[] },
  { color: "#E8A0BF", left: "68%", top: "22%",  size: 520, dur: 27, x: [0, -50, 30, 0] as number[], y: [0,  30,-50, 0]  as number[] },
  { color: "#C9A84C", left: "42%", top: "52%",  size: 460, dur: 32, x: [0,  40,-60, 0] as number[], y: [0,  50,-30, 0]  as number[] },
  { color: "#00B4D8", left: "83%", top: "68%",  size: 560, dur: 23, x: [0, -70, 20, 0] as number[], y: [0, -20, 60, 0]  as number[] },
  { color: "#E8A0BF", left: "7%",  top: "76%",  size: 490, dur: 29, x: [0,  50,-30, 0] as number[], y: [0,  40,-50, 0]  as number[] },
  { color: "#C9A84C", left: "54%", top: "88%",  size: 410, dur: 18, x: [0, -40, 60, 0] as number[], y: [0, -60, 20, 0]  as number[] },
];

function NebulaLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {NEBULA_BLOBS.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color}16 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            filter: "blur(2px)",
          }}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
      ))}
    </div>
  );
}

// ─── Fond : particules + étoiles filantes ─────────────────────────────────────

interface BgParticle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; color: string;
  op: number; dir: number;
}
interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  trailLen: number;
  life: number; maxLife: number;
}

function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#00B4D8", "#C9A84C"];
    const particles: BgParticle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * 2)],
      op: Math.random() * 0.5 + 0.15,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    let stars: ShootingStar[] = [];
    let nextStarAt = Date.now() + 5000 + Math.random() * 3000;

    const spawnStar = () => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
      const speed = 7 + Math.random() * 5;
      stars.push({
        x: Math.random() * canvas.width * 0.65,
        y: Math.random() * canvas.height * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        trailLen: 90 + Math.random() * 70,
        life: 0,
        maxLife: Math.floor(80 + Math.random() * 50),
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.op += p.dir * 0.005;
        if (p.op > 0.7 || p.op < 0.1) p.dir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        // Halo radial cyan
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        halo.addColorStop(0,    `rgba(255,255,255,${p.op * 0.95})`);
        halo.addColorStop(0.25, `rgba(0,200,230,${p.op * 0.5})`);
        halo.addColorStop(1,    `rgba(0,180,216,0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = halo; ctx.fill();

        // Noyau blanc brillant
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = p.op;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00B4D8";
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      const now = Date.now();
      if (now >= nextStarAt) {
        spawnStar();
        nextStarAt = now + 5000 + Math.random() * 3000;
      }

      stars = stars.filter(s => s.life <= s.maxLife);
      for (const s of stars) {
        s.life++;
        const t = s.life / s.maxLife;
        const op = t < 0.15 ? t / 0.15 : t > 0.65 ? Math.max(0, (1 - t) / 0.35) : 1;
        const norm = Math.hypot(s.vx, s.vy);
        const tailX = s.x - (s.vx / norm) * s.trailLen;
        const tailY = s.y - (s.vy / norm) * s.trailLen;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0,    `rgba(255,255,255,0)`);
        grad.addColorStop(0.6,  `rgba(0,200,230,${op * 0.3})`);
        grad.addColorStop(1,    `rgba(255,255,255,${op * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00B4D8";
        ctx.stroke();
        ctx.shadowBlur = 0;

        const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 2.5 * 5);
        halo.addColorStop(0,    `rgba(255,255,255,${op * 0.95})`);
        halo.addColorStop(0.25, `rgba(0,200,230,${op * 0.5})`);
        halo.addColorStop(1,    `rgba(0,180,216,0)`);
        ctx.beginPath(); ctx.arc(s.x, s.y, 2.5 * 5, 0, Math.PI * 2);
        ctx.fillStyle = halo; ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#00B4D8";
        ctx.fill();
        ctx.shadowBlur = 0;

        s.x += s.vx;
        s.y += s.vy;
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MondesPage() {
  const lignes = mondes.slice(0, 6);
  const mondesSpeciaux = mondes.slice(6);

  const [popup, setPopup] = useState<PopupState>(null);

  // ── Personnage handlers ──
  const onPersonnageHoverOpen = (p: Personnage) => {
    if (popup?.pinned) return;
    setPopup({ kind: "personnage", personnage: p, pinned: false });
  };
  const onPersonnageHoverClose = () => {
    setPopup((prev) => (prev && !prev.pinned ? null : prev));
  };
  const onPersonnagePinnedOpen = (p: Personnage) => {
    setPopup({ kind: "personnage", personnage: p, pinned: true });
  };

  // ── Paysage handlers ──
  const onPaysageHoverOpen = (m: Monde) => {
    if (popup?.pinned) return;
    setPopup({ kind: "paysage", monde: m, pinned: false });
  };
  const onPaysageHoverClose = () => {
    setPopup((prev) => (prev && !prev.pinned ? null : prev));
  };
  const onPaysagePinnedOpen = (m: Monde) => {
    setPopup({ kind: "paysage", monde: m, pinned: true });
  };

  const handleClose = () => setPopup(null);

  const cardProps = {
    onPersonnageHoverOpen,
    onPersonnageHoverClose,
    onPersonnagePinnedOpen,
    onPaysageHoverOpen,
    onPaysageHoverClose,
    onPaysagePinnedOpen,
  };

  return (
    <main
      className="min-h-screen pt-24 pb-20"
      style={{ background: "linear-gradient(180deg, #0D1B3E 0%, #061020 100%)" }}
    >
      <VideoBackground />
      <NebulaLayer />
      <BackgroundCanvas />

      <div style={{ position: "relative", zIndex: 10 }}>
      {/* Header */}
      <div className="text-center px-4 mb-14">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-cinzel text-3xl md:text-4xl font-black glow-cyan mb-4"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
        >
          LES MONDES DE SÉVIAH
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-cinzel text-lg glow-or"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
        >
          Univers Féeriques
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-4 h-px w-48"
          style={{ background: "linear-gradient(to right, transparent, #00B4D8, transparent)" }}
        />
      </div>

      {/* Grille 3x2 */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lignes.map((monde, i) => (
            <WorldCard key={monde.id} monde={monde} index={i} {...cardProps} />
          ))}
        </div>

        {mondesSpeciaux.length > 0 && (
          <div className="mt-5 flex flex-wrap justify-center gap-5">
            {mondesSpeciaux.map((m, i) => (
              <div key={m.id} className="w-full max-w-sm">
                <WorldCard monde={m} index={6 + i} {...cardProps} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA global */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-wrap gap-4 justify-center mt-12 px-4"
      >
        <a
          href={TIKTOK_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 rounded-full font-cinzel font-bold tracking-widest text-sm transition-all hover:scale-105"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            background: "linear-gradient(135deg, rgba(0,180,216,0.15), rgba(0,180,216,0.05))",
            border: "1px solid rgba(0,180,216,0.5)",
            color: "#F0F4FF",
            boxShadow: "0 0 20px rgba(0,180,216,0.2)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#00B4D8">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
          </svg>
          S&apos;ABONNER sur TikTok
        </a>
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 rounded-full font-cinzel font-bold tracking-widest text-sm transition-all hover:scale-105"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
            border: "1px solid rgba(201,168,76,0.5)",
            color: "#F0F4FF",
            boxShadow: "0 0 20px rgba(201,168,76,0.2)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#C9A84C">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          S&apos;ABONNER sur YouTube
        </a>
      </motion.div>

      </div>

      {/* Popups */}
      <AnimatePresence>
        {popup?.kind === "personnage" && (
          <PersonnagePopup
            key="personnage"
            personnage={popup.personnage}
            pinned={popup.pinned}
            onClose={handleClose}
          />
        )}
        {popup?.kind === "paysage" && (
          <PaysagePopup
            key="paysage"
            monde={popup.monde}
            pinned={popup.pinned}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
