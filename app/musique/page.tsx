"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import DynamicBackground from "@/components/DynamicBackground";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Track {
  titre: string;
  star?: boolean;
  spotifyUrl: string;
}

interface Album {
  id: string;
  nom: string;
  star?: boolean;
  comingSoon?: boolean;
  genre: string;
  accentColor: string;
  trackCount: number;
  cover: string;
  spotifyEmbed: string;
  spotifyUrl: string;
  deezerUrl: string;
  tracks: Track[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const albums: Album[] = [
  {
    id: "gardiens",
    nom: "GARDIENS DES MONDES",
    star: true,
    genre: "Album des Mondes de Séviah",
    accentColor: "#0d2455",
    trackCount: 10,
    cover: "/MUSIQUES BYSEVIA/COUVERTURES ALBUMS BYSEVIA/COVER GARDIENS DES MONDES.PNG",
    spotifyEmbed: "https://open.spotify.com/embed/album/6nfU06WMR3k6hH0KjoDDrY",
    spotifyUrl: "https://open.spotify.com/album/6nfU06WMR3k6hH0KjoDDrY",
    deezerUrl: "https://link.deezer.com/s/337uyJ8VgAvCzAqPAaFi1",
    tracks: [
      { titre: "ELYNDRÉA",   spotifyUrl: "https://open.spotify.com/track/4wS3oicOqioCrW3MEIZ0X7" },
      { titre: "VARKAN'TEY", spotifyUrl: "https://open.spotify.com/track/3zawQmzycoL1K9TuJE2K4E" },
      { titre: "NAELHYA",    spotifyUrl: "https://open.spotify.com/track/5fKNE2Rm7JMOycUByubt8E" },
      { titre: "SAHALI",     spotifyUrl: "https://open.spotify.com/track/3fuijn3GilfZOqheJ81Fbc", star: true },
      { titre: "NOKKI",      spotifyUrl: "https://open.spotify.com/track/1Kq8Pakbs6lp3ZnYKADITS" },
      { titre: "TORIEK",     spotifyUrl: "https://open.spotify.com/track/1mABIO20Rtyi5XMgFd9sHg" },
      { titre: "TIHNAE",     spotifyUrl: "https://open.spotify.com/track/0NA9hsEy0Q6aNXcmzrEWHR", star: true },
      { titre: "NEY'KARA",   spotifyUrl: "https://open.spotify.com/track/4xcFphY84L45nlcr6enIk2", star: true },
      { titre: "AURALHYA",   spotifyUrl: "https://open.spotify.com/track/6t1RdTMWnKsgGGtJLf42LC" },
      { titre: "ELOHÀM",     spotifyUrl: "https://open.spotify.com/track/0fL4IkekeVReulMBTwwNHa" },
    ],
  },
  {
    id: "breaking",
    nom: "THE BREAKING POINT",
    genre: "Alternative",
    accentColor: "#b84a40",
    trackCount: 16,
    cover: "/MUSIQUES BYSEVIA/COUVERTURES ALBUMS BYSEVIA/COVER THE BREAKING POINT.PNG",
    spotifyEmbed: "https://open.spotify.com/embed/album/2Yfj8Ar03UdmHJPQBbn8EP",
    spotifyUrl: "https://open.spotify.com/album/2Yfj8Ar03UdmHJPQBbn8EP",
    deezerUrl: "https://link.deezer.com/s/337uCFm150BX2Vmk01l4I",
    tracks: [
      { titre: "DAYLIGHT FADES",         spotifyUrl: "https://open.spotify.com/intl-fr/track/3yQtITCPpkcJyWSbkWsnjE" },
      { titre: "LIGHT AFTER LOVE",       spotifyUrl: "https://open.spotify.com/intl-fr/track/2IKyuHxXYCkgZkqF0pNsQq" },
      { titre: "LIGHT AFTER LOVE 2",     spotifyUrl: "https://open.spotify.com/intl-fr/track/38B7jaT6xodsM1wBO1T1WZ" },
      { titre: "KEEP THE LIGHT",         spotifyUrl: "https://open.spotify.com/intl-fr/track/1d6A9CkVvGOQPdlmzzR3I8" },
      { titre: "KEEP THE LIGHT 2",       spotifyUrl: "https://open.spotify.com/intl-fr/track/3f0hKUwLG3ZYsiYZcd3wMQ" },
      { titre: "WONT SPEAK YOUR NAME",   spotifyUrl: "https://open.spotify.com/intl-fr/track/4Lad9GUWP7yifoISgMSlB8" },
      { titre: "LOST SOMETHING REAL",    spotifyUrl: "https://open.spotify.com/intl-fr/track/7qiADGF9Q1EEuxFgN538Wh" },
      { titre: "LESSONS YOU DIDNT HEAR", spotifyUrl: "https://open.spotify.com/intl-fr/track/4iWW2vBa2MZ5u7Oieu3UpH" },
      { titre: "MEMORY WITHOUT PAIN",    spotifyUrl: "https://open.spotify.com/intl-fr/track/4FCfRU0Rc55it8bwhxNTuS" },
      { titre: "SOMEDAY U LL KNOW",      spotifyUrl: "https://open.spotify.com/intl-fr/track/2OKo1SKNzAHcv9ojfMJCYG" },
      { titre: "WALK STRAIGHT",          spotifyUrl: "https://open.spotify.com/intl-fr/track/7rQQehevzSyiwRjZQZNDaE" },
      { titre: "RELEASE U",              spotifyUrl: "https://open.spotify.com/intl-fr/track/0KMY2GcVqnotvGUxVsRe72" },
      { titre: "MIDNIGHT STATIC",        spotifyUrl: "https://open.spotify.com/intl-fr/track/6QVL7GQ2BfFCqm6sYOcNih" },
      { titre: "LOVE DOESNT DIE",        spotifyUrl: "https://open.spotify.com/intl-fr/track/32VID4xVCiqQFeJPmCaJcB" },
      { titre: "WHEN LIGHTS COMES",      spotifyUrl: "https://open.spotify.com/intl-fr/track/2if4lGyKKAuxw98uKVKNHg" },
      { titre: "LIGHTS GO ON",           spotifyUrl: "https://open.spotify.com/intl-fr/track/03mysFsR6IcejEN8O4muw6" },
    ],
  },
  {
    id: "end",
    nom: "END OF BEGINNING",
    genre: "Pop Rock",
    accentColor: "#8b1a35",
    trackCount: 12,
    cover: "/MUSIQUES BYSEVIA/COUVERTURES ALBUMS BYSEVIA/COVER END OF BEGINNING.PNG",
    spotifyEmbed: "https://open.spotify.com/embed/album/20KdGnBkYLnBVY46MYFUVg",
    spotifyUrl: "https://open.spotify.com/album/20KdGnBkYLnBVY46MYFUVg",
    deezerUrl: "https://link.deezer.com/s/337uE7PNLpJlrJtY3dlv7",
    tracks: [
      { titre: "OUT MY HEAD",       spotifyUrl: "https://open.spotify.com/track/4UQ3NiMX930ciPh6dajB3O" },
      { titre: "LET IT FADE",       spotifyUrl: "https://open.spotify.com/track/3Vf3T2ZXBKKqxt8eBXAeZA" },
      { titre: "COLD SILENCE",      spotifyUrl: "https://open.spotify.com/track/2Gx4kLgni97NM1oj9fKLh5" },
      { titre: "STAY FOR A MOMENT", spotifyUrl: "https://open.spotify.com/track/7CYZ29mJX3benvjYz0LLu6" },
      { titre: "MOVING ON",         spotifyUrl: "https://open.spotify.com/track/1a2kFn3XsBGGzaAXQdSSvu" },
      { titre: "UNTOUCHABLE",       spotifyUrl: "https://open.spotify.com/track/766sInLAJ4Z49sttQa2X3Y" },
      { titre: "UNTOUCHABLE 2",     spotifyUrl: "https://open.spotify.com/track/1r8JsRbUWXeRDbryccUuD2" },
      { titre: "I CHOOSE MY PATH",  spotifyUrl: "https://open.spotify.com/track/3HEbHMjBuMpDNfXh2O1NwB" },
      { titre: "NO TRACE",          spotifyUrl: "https://open.spotify.com/track/65INJswljayKefSr1ySmxz" },
      { titre: "OUT MY HEAD 2",     spotifyUrl: "https://open.spotify.com/track/2ixzxncQHxElrx4DpNOW5O" },
      { titre: "MOVING ON 2",       spotifyUrl: "https://open.spotify.com/track/2nRQwSLJ2k2jR4O2bolpAb" },
      { titre: "GOLDEN QUIET",      spotifyUrl: "https://open.spotify.com/track/7kdBeNf0C0y07gxQZtrqV9" },
    ],
  },
  {
    id: "gravity",
    nom: "ETERNAL GRAVITY",
    genre: "Dream Lofi",
    accentColor: "#a35015",
    trackCount: 16,
    cover: "/MUSIQUES BYSEVIA/COUVERTURES ALBUMS BYSEVIA/COVER ETERNAL GRAVITY.PNG",
    spotifyEmbed: "https://open.spotify.com/embed/album/3oAB3pBzza4AUAQ0YDk5df",
    spotifyUrl: "https://open.spotify.com/album/3oAB3pBzza4AUAQ0YDk5df",
    deezerUrl: "https://link.deezer.com/s/337uI2zz2uGt4jXZ9oZ4o",
    tracks: [
      { titre: "DREAMIN U",                 spotifyUrl: "https://open.spotify.com/track/2X9sKDyyvnme4eHdhOx4Rh" },
      { titre: "VELVET DISTANCE",           spotifyUrl: "https://open.spotify.com/track/41mF2PMEUPOEdlV5YcevUW" },
      { titre: "DANGEROUS GRAVITY",         spotifyUrl: "https://open.spotify.com/track/6Bn8POTACW4gsHWpExK36w" },
      { titre: "FORBIDDEN",                 spotifyUrl: "https://open.spotify.com/track/6r7tZeO4ELlWhioWaHuMhA" },
      { titre: "HIDDEN VIBES",              spotifyUrl: "https://open.spotify.com/track/2CudXEeZ1Fk2kNdrMsD9FZ" },
      { titre: "SWEET ADDICTION",           spotifyUrl: "https://open.spotify.com/track/6SOLn9gNStszi2EsboNuEB" },
      { titre: "UNSPOKEN WONDER",           spotifyUrl: "https://open.spotify.com/track/2Cs2JKsaLVZYmFnjYT58iZ" },
      { titre: "MY DREAM IS REAL",          spotifyUrl: "https://open.spotify.com/track/3VU1tfZBC8BWKrhl4ievHB" },
      { titre: "LETTER TO THE ONE",         spotifyUrl: "https://open.spotify.com/track/5FfX7CsnwNKgmndEd88mnz" },
      { titre: "LETTER TO THE ONE I FOUND", spotifyUrl: "https://open.spotify.com/track/3qgcWcFdCvobcdu45Rl9bq" },
      { titre: "MEMORY WITHOUT PAIN SOFT",  spotifyUrl: "https://open.spotify.com/track/6tKt3DcezYhNwPr2SdxT8h" },
      { titre: "MEMORY WITHOUT PAIN",       spotifyUrl: "https://open.spotify.com/track/4xxPXcXwZ0bjDacesmhQaO" },
      { titre: "MEMORY WITHOUT PAIN 2",     spotifyUrl: "https://open.spotify.com/track/5TSQ7RwBEGBgpG9KlSzOWQ" },
      { titre: "FOREVER STARTS",            spotifyUrl: "https://open.spotify.com/track/73jwRjq5LKn42Ay5vzn0gq" },
      { titre: "MIDNIGHT STATIC DUO",       spotifyUrl: "https://open.spotify.com/track/2hRR8BiSvZjbkmt94MI3HP" },
      { titre: "LOVE APPEARS",              spotifyUrl: "https://open.spotify.com/track/4EGlsvWY1Jgl4lMGtblIdU" },
    ],
  },
  {
    id: "light",
    nom: "LIGHT INSIDE",
    genre: "Alternatif Pop Rock",
    accentColor: "#c4782a",
    trackCount: 13,
    cover: "/MUSIQUES BYSEVIA/COUVERTURES ALBUMS BYSEVIA/COVER LIGHT INSIDE.jpg",
    spotifyEmbed: "https://open.spotify.com/embed/album/1JpduYBxImJrnc2vhMIYf4",
    spotifyUrl: "https://open.spotify.com/album/1JpduYBxImJrnc2vhMIYf4",
    deezerUrl: "https://link.deezer.com/s/337uK3kTQBU0hgFLO5A5L",
    tracks: [
      { titre: "INNER FLAME",           spotifyUrl: "https://open.spotify.com/track/08E30nXboUE5ShM9fhXOcW" },
      { titre: "THEIR EYES",            spotifyUrl: "https://open.spotify.com/track/4Gj9ZNcBp6BGdcqwPutMpt" },
      { titre: "GROUNDED SOUL",         spotifyUrl: "https://open.spotify.com/track/5mrbBCdoN1qKINymoOmHgg" },
      { titre: "DEEP INSIDE",           spotifyUrl: "https://open.spotify.com/track/2ca81FfqEaCsSsJm23oMLh" },
      { titre: "LET IT FALL",           spotifyUrl: "https://open.spotify.com/track/5IEA9cNEqfeMYtEUW7t09H" },
      { titre: "RISE FROM WITHIN",      spotifyUrl: "https://open.spotify.com/track/1VgvMGSGUzLNbIm9k4DW8G" },
      { titre: "DIVINE LOVE",           spotifyUrl: "https://open.spotify.com/track/1Pt2B7ZH7MYMaYXek0zFWH" },
      { titre: "TRUST THE FLOW",        spotifyUrl: "https://open.spotify.com/track/7cARBAgW6mO6cBzLgILrfS" },
      { titre: "STILL I RISE",          spotifyUrl: "https://open.spotify.com/track/4NuDDncNAoudKxBwiVlcvb" },
      { titre: "STILL I RISE STEADY",   spotifyUrl: "https://open.spotify.com/track/0FWGmYF3VvcDK3pKHeoqEN" },
      { titre: "LET IT FALL VS 2",      spotifyUrl: "https://open.spotify.com/track/03Y7Q1Qt3cqFcCt63SJNmF" },
      { titre: "WHERE I BELONG",        spotifyUrl: "https://open.spotify.com/track/0OOsIBQ3whcYXS8aXn3lz7" },
      { titre: "TRUST THE FLOW LOUNGE", spotifyUrl: "https://open.spotify.com/track/3QyOJsUdT2NOI4T4fJWA6F" },
    ],
  },
  {
    id: "gardiens2",
    nom: "GARDIENS DES MONDES II",
    comingSoon: true,
    genre: "Album des Mondes de Séviah",
    accentColor: "#1e5a8a",
    trackCount: 0,
    cover: "/MUSIQUES BYSEVIA/COUVERTURES ALBUMS BYSEVIA/COVER GARDIENS DES MONDES.PNG",
    spotifyEmbed: "",
    spotifyUrl: "",
    deezerUrl: "",
    tracks: [],
  },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function SpotifyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function DeezerIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.03h5.19V8.38H6.27zm6.27 0v3.03h5.19V8.38h-5.19zm6.27 0v3.03H24V8.38h-5.19zM6.27 12.6v3.04h5.19V12.6H6.27zm6.27 0v3.04h5.19V12.6h-5.19zm6.27 0v3.04H24V12.6h-5.19zM0 16.81v3.03h5.19v-3.03H0zm6.27 0v3.03h5.19v-3.03H6.27zm6.27 0v3.03h5.19v-3.03h-5.19zm6.27 0v3.03H24v-3.03h-5.19z" />
    </svg>
  );
}

// ─── AlbumContent ─────────────────────────────────────────────────────────────

function AlbumContent({ album }: { album: Album }) {
  return (
    <motion.div
      key={album.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(0,180,216,0.2)" }}
    >
      {/* Glassmorphism bg */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${encodeURI(album.cover)}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(28px)",
          opacity: 0.18,
          transform: "scale(1.15)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(6,10,30,0.82)", backdropFilter: "blur(2px)" }}
      />

      {/* Page bientôt disponible */}
      {album.comingSoon && (
        <div className="relative z-10 p-10 flex flex-col items-center justify-center text-center" style={{ minHeight: 400 }}>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85], rotate: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 64, marginBottom: 24, display: "inline-block", filter: "drop-shadow(0 0 25px rgba(255,255,255,1)) drop-shadow(0 0 55px rgba(255,255,255,1)) drop-shadow(0 0 80px rgba(0,180,216,0.9)) drop-shadow(0 0 120px rgba(0,180,216,0.6))" }}
          >
            ✨
          </motion.div>
          <h2 className="font-cinzel text-2xl md:text-3xl font-black mb-4" style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF", textShadow: "0 0 25px rgba(0,180,216,0.8)" }}>
            {album.nom}
          </h2>
          <p className="font-cinzel text-base tracking-widest mb-2" style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}>
            BIENTÔT DISPONIBLE
          </p>
          <p className="font-cinzel text-sm" style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF", opacity: 0.6 }}>
            Le prochain chapitre des Mondes de Séviah arrive bientôt...
          </p>
        </div>
      )}

      {!album.comingSoon && <>
      {/* Badges SACEM + MUSICSTART */}
      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 20, display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(6,10,30,0.55)", borderRadius: 10, padding: "6px 10px", backdropFilter: "blur(4px)" }}>
        <Image src="/SACEM/SACEM.svg" alt="SACEM" width={96} height={42} style={{ objectFit: "contain" }} title="Droits d'auteur protégés par la SACEM — Tous droits réservés" unoptimized />
        <div title="Œuvre certifiée et protégée par MusicStart — Tous droits réservés" style={{ background: "#ffffff", borderRadius: 6, padding: "3px 6px", display: "flex", alignItems: "center", cursor: "default" }}>
          <Image src="/SACEM/MUSICSTART.png" alt="MusicStart" width={72} height={24} style={{ objectFit: "contain" }} unoptimized />
        </div>
      </div>

      <div className="relative z-10 p-6 md:p-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">

          {/* Infos + badges */}
          <div className="flex flex-col justify-between flex-1 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {album.star && <span className="text-2xl animate-pulse">⭐</span>}
                <h2
                  className="font-cinzel text-2xl md:text-3xl font-black"
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    color: "#F0F4FF",
                    textShadow: "0 0 25px rgba(0,180,216,0.8), 0 0 10px rgba(0,180,216,0.5)",
                  }}
                >
                  {album.nom}
                </h2>
              </div>
              <p
                className="font-cinzel text-sm tracking-widest mb-1"
                style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
              >
                {album.genre}
              </p>
              <p
                className="font-cinzel text-xs tracking-wider"
                style={{ fontFamily: "var(--font-cinzel), serif", color: "#00B4D8", opacity: 0.7 }}
              >
                {album.trackCount} titres
              </p>
            </div>

            {/* Badges Spotify + Deezer */}
            <div className="flex flex-wrap gap-3">
              <a
                href={album.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel font-bold text-xs tracking-wider transition-all hover:scale-105 hover:brightness-110"
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  background: "#1DB954",
                  color: "#000",
                }}
              >
                <SpotifyIcon size={14} />
                Écouter sur Spotify
              </a>
              <a
                href={album.deezerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel font-bold text-xs tracking-wider transition-all hover:scale-105 hover:brightness-110"
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  background: "#9B59B6",
                  color: "#fff",
                }}
              >
                <DeezerIcon size={14} />
                Écouter sur Deezer
              </a>
            </div>
          </div>
        </div>

        {/* ── Spotify Embed (album/artist widget) ── */}
        <div className="mb-8">
          <iframe
            src={album.spotifyEmbed}
            width="100%"
            height="380"
            allow="encrypted-media"
            style={{ borderRadius: 12, display: "block", border: "none" }}
            loading="lazy"
          />
        </div>

        {/* ── Tracklist ── */}
        <div>
          <h3
            className="font-cinzel text-sm font-bold tracking-widest mb-4"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
          >
            TITRES · ÉCOUTER SUR SPOTIFY
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {album.tracks.map((track, i) => (
              <motion.button
                key={track.titre}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => window.open(track.spotifyUrl, "_blank")}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-150"
                style={{
                  background: "rgba(0,180,216,0.04)",
                  border: "1px solid rgba(0,180,216,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,180,216,0.12)";
                  (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(0,180,216,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 12px rgba(0,180,216,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,180,216,0.04)";
                  (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(0,180,216,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {/* Logo Spotify */}
                <span style={{ color: "#1DB954", flexShrink: 0 }}>
                  <SpotifyIcon size={14} />
                </span>

                {/* Numéro */}
                <span
                  className="font-cinzel text-sm font-bold flex-shrink-0 w-5 text-right"
                  style={{ color: "#C9A84C", fontFamily: "var(--font-cinzel), serif" }}
                >
                  {i + 1}
                </span>

                {/* Titre */}
                <span
                  className="font-cinzel text-sm font-bold flex-1 truncate group-hover:text-cyan-300 transition-colors"
                  style={{ color: "#F0F4FF", fontFamily: "var(--font-cinzel), serif" }}
                >
                  {track.titre}
                </span>

                {/* Badge TOP */}
                {track.star && (
                  <span className="flex-shrink-0 text-xs" title="TOP">⭐</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      </>}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MusiquePage() {
  const [activeTab, setActiveTab] = useState("gardiens");
  const activeAlbum = albums.find((a) => a.id === activeTab)!;

  return (
    <main
      className="min-h-screen pt-24 pb-20 relative"
      style={{ background: "linear-gradient(180deg, #0D1B3E 0%, #061020 100%)" }}
    >
      <DynamicBackground />

      {/* ── Header ── */}
      <div className="relative z-10 text-center px-4 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-cinzel text-3xl md:text-4xl font-black mb-4 glow-cyan"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            color: "#F0F4FF",
          }}
        >
          MUSIQUE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-cinzel text-lg"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            color: "#C9A84C",
            textShadow: "0 0 14px rgba(201,168,76,0.5)",
          }}
        >
          Découvre les albums disponibles sur toutes les plateformes — By SevIA
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-4 h-px w-48"
          style={{
            background: "linear-gradient(to right, transparent, #00B4D8, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">

        {/* ── Onglets ── */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {albums.map((album, i) => (
            <motion.button
              key={album.id}
              onClick={() => setActiveTab(album.id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="relative flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-cinzel text-xs font-bold tracking-wider focus:outline-none"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                color: activeTab === album.id ? "#ffffff" : album.accentColor,
                textShadow: activeTab === album.id ? "none" : "0 0 1px rgba(13,27,62,0.6), 0 1px 2px rgba(13,27,62,0.4)",
                background: activeTab === album.id
                  ? `linear-gradient(180deg, ${album.accentColor} 0%, ${album.accentColor}bb 100%)`
                  : "linear-gradient(135deg, #ffffff 0%, #cff4fc 60%, #7de8f8 100%)",
                border: `0.7px solid ${activeTab === album.id ? "#ffffff" : "#00B4D8"}`,
                boxShadow: activeTab === album.id
                  ? `0 0 18px ${album.accentColor}99, inset 0 5px 10px rgba(255,255,255,0.25), inset 0 -5px 10px rgba(0,0,0,0.35), 0 6px 14px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)`
                  : "0 0 14px rgba(0,180,216,0.6), inset 0 5px 10px rgba(255,255,255,1), inset 0 -5px 10px rgba(0,100,160,0.7), 0 6px 14px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {album.star && "⭐ "}
              {album.nom}
              {album.comingSoon && (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontSize: 8, background: "#C9A84C", color: "#0d1b3e", borderRadius: 4, padding: "1px 4px", marginLeft: 4, fontWeight: "bold", letterSpacing: 0.5, display: "inline-block" }}
                >
                  BIENTÔT
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {/* ── Contenu ── */}
        <AnimatePresence mode="wait">
          <AlbumContent key={activeTab} album={activeAlbum} />
        </AnimatePresence>
      </div>
    </main>
  );
}
