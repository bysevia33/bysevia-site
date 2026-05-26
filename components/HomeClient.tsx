"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { socialLinks, SocialIcon, DeezerIcon } from "./SocialLinks";

const PHRASES = [
  "Bienvenue dans les mondes féeriques de Séviah.",
  "Des univers visuels et musicaux inédits créés de toutes pièces par l'esprit créatif de By SevIA et grâce au concours de l'IA.",
  "Laisse-toi porter par la lumière de ce monde empli de valeurs réconfortantes et de magie.",
  "Chaque monde a une couleur, des personnages et une histoire qui lui est propre.",
  "Alors, si tu rêves encore…\nAbonne-toi 🙌✨🤍",
];

const PHRASE_DURATIONS = [3500, 6500, 5500, 5000, 4500];

// ─── Typewriter ───────────────────────────────────────────────────────────────

function TypewriterPhrase({ content }: { content: string }) {
  const chars = Array.from(content);
  const [charCount, setCharCount] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    setCharCount(0);
    let i = 0;
    const id = setInterval(() => {
      if (i < chars.length) { i++; setCharCount(i); }
      else clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 500);
    return () => clearInterval(id);
  }, []);

  // Group visible chars into segments so words stay intact on wrap
  type Seg = { kind: "word" | "space" | "newline"; startIdx: number; chars: string[] };
  const segments: Seg[] = [];
  let cur: Seg | null = null;
  chars.slice(0, charCount).forEach((char, idx) => {
    if (char === "\n") {
      if (cur) { segments.push(cur); cur = null; }
      segments.push({ kind: "newline", startIdx: idx, chars: ["\n"] });
    } else if (char === " ") {
      if (cur?.kind === "word") { segments.push(cur); cur = null; }
      if (!cur) cur = { kind: "space", startIdx: idx, chars: [] };
      cur.chars.push(char);
    } else {
      if (cur?.kind === "space") { segments.push(cur); cur = null; }
      if (!cur) cur = { kind: "word", startIdx: idx, chars: [] };
      cur.chars.push(char);
    }
  });
  if (cur) segments.push(cur);

  return (
    <span>
      {segments.map((seg) => {
        if (seg.kind === "newline") return <br key={seg.startIdx} />;
        if (seg.kind === "space")  return <span key={seg.startIdx}>{seg.chars.join("")}</span>;
        // Word container — inline-block keeps the whole word on one line
        return (
          <span key={seg.startIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {seg.chars.map((char, ci) => (
              <motion.span
                key={seg.startIdx + ci}
                initial={{ opacity: 0, y: 8, scale: 1.35, textShadow: "0 0 14px #FFD700, 0 0 28px #C9A84C" }}
                animate={{ opacity: 1, y: 0, scale: 1, textShadow: "0 0 0px rgba(255,215,0,0)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ display: "inline" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
      <span style={{ opacity: cursorOn ? 1 : 0, color: "#FFD700", marginLeft: "1px" }}>|</span>
    </span>
  );
}

// ─── Particle Field ───────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  opacityDir: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#00B4D8", "#C9A84C", "#E8A0BF"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.2,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir * 0.008;
        if (p.opacity >= 0.9 || p.opacity <= 0.1) p.opacityDir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
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
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}


// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();
    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [target]);

  return (
    <span>
      {value.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

// ─── Email Popup ──────────────────────────────────────────────────────────────

function EmailPopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci ! Tu fais maintenant partie de l'Univers By SevIA ✨");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative rounded-2xl p-8 max-w-md w-[90%] overflow-hidden"
        style={{
          background: "#0D1B3E",
          border: "1px solid rgba(0,180,216,0.5)",
          boxShadow: "0 0 40px rgba(0,180,216,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl leading-none opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#F0F4FF" }}
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <div className="text-4xl mb-3 animate-float">✨</div>
          <h2
            className="font-cinzel text-xl font-bold glow-cyan mb-2"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
          >
            Rejoins l&apos;Univers By SevIA
          </h2>
          <p
            className="text-xs font-cinzel leading-relaxed"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#FFD700" }}
          >
            Entre dans l&apos;univers féerique des mondes de Séviah<br />
            Pas de spam, juste un lien magique pour ne rien rater
            {/* Étoile filante — part juste après "rater" vers le haut à droite */}
            <span style={{ position: "relative", display: "inline-block", width: 0, overflow: "visible" }}>
              <motion.span
                className="pointer-events-none"
                style={{ position: "absolute", left: 3, top: -4, display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: [0, 0, 75], y: [0, 0, -60], opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6, times: [0, 0.08, 1], ease: "easeOut" }}
              >
                {/* Traînée dégradée */}
                <span style={{
                  display: "inline-block",
                  width: 30,
                  height: 1.5,
                  background: "linear-gradient(to right, transparent, #C9A84C)",
                  marginRight: 1,
                  transform: "rotate(-33deg)",
                  transformOrigin: "right center",
                }} />
                {/* Tête lumineuse */}
                <span style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#FFD700",
                  boxShadow: "0 0 6px 3px #C9A84C, 0 0 14px 6px #FFD70050",
                  flexShrink: 0,
                }} />
              </motion.span>
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            className="rounded-lg px-4 py-3 text-sm outline-none w-full"
            style={{
              background: "rgba(0,180,216,0.08)",
              border: "1px solid rgba(0,180,216,0.4)",
              color: "#F0F4FF",
            }}
          />
          <button
            type="submit"
            className="btn-or rounded-full py-3 font-cinzel font-bold tracking-widest text-sm transition-all"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              background: "linear-gradient(135deg, #C9A84C, #E8A0BF)",
              color: "#0D1B3E",
              border: "none",
            }}
          >
            S&apos;ABONNER
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── HomeClient ───────────────────────────────────────────────────────────────

export default function HomeClient() {
  const [showPopup, setShowPopup] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [logoXStart, setLogoXStart] = useState(0);
  const [maxZoom, setMaxZoom] = useState(1.6);
  const logoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    setMaxZoom(window.innerWidth < 768 ? 1.0 : 1.6);
  }, []);

  useLayoutEffect(() => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      const logoCenter = rect.left + rect.width / 2;
      const screenCenter = window.innerWidth / 2;
      setLogoXStart(Math.round(screenCenter - logoCenter));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhraseIndex(i => (i + 1) % PHRASES.length);
    }, PHRASE_DURATIONS[phraseIndex]);
    return () => clearTimeout(timer);
  }, [phraseIndex]);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowPopup(true), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const updateVideoWidth = () => {
      const video = videoRef.current;
      if (!video) return;
      const w = video.offsetWidth;
      if (w > 0) {
        document.documentElement.style.setProperty("--hero-video-width", `${w}px`);
        document.documentElement.style.setProperty("--hero-video-left", `${video.getBoundingClientRect().left}px`);
      }
    };
    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadedmetadata", updateVideoWidth);
      video.addEventListener("canplay", updateVideoWidth);
    }
    window.addEventListener("resize", updateVideoWidth);
    updateVideoWidth();
    return () => {
      video?.removeEventListener("loadedmetadata", updateVideoWidth);
      video?.removeEventListener("canplay", updateVideoWidth);
      window.removeEventListener("resize", updateVideoWidth);
    };
  }, []);

  return (
    <>
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden" style={{ paddingTop: "3.5rem", isolation: "isolate" }}>

      {/* Vidéo de fond plein écran */}
      <video ref={videoRef} autoPlay muted loop playsInline style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", zIndex:0 }}>
        <source src="/VIDEOS BYSEVIA/fond.mp4" type="video/mp4" />
      </video>

      {/* Overlay global léger + dégradé bas */}
      <div style={{ position:"absolute", inset:0, zIndex:1, background:"linear-gradient(to bottom, rgba(13,27,62,0.40) 0%, transparent 35%, transparent 55%, rgba(13,27,62,1.0) 100%)" }} />

      {/* Main Content — colonne mobile / deux colonnes desktop */}
      <div
        className="relative w-full max-w-6xl px-6 lg:px-16 flex flex-col lg:flex-row items-stretch lg:items-center justify-center lg:justify-between gap-8 lg:gap-12"
        style={{ zIndex: 3 }}
      >
        {/* ── Colonne gauche : Logo + Titre + Sous-titre ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
          {/* Logo */}
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0,          1,          1,          1,          1   ],
              y:       [-220,       0,          0,          0,          0   ],
              x:       [logoXStart, logoXStart, logoXStart, logoXStart, 0   ],
              scale:   [0.8,        1,          maxZoom,    maxZoom,    1   ],
            }}
            transition={{
              duration: 12.5,
              times: [0, 0.16, 0.23, 0.88, 1],
              ease: ["easeOut", "easeOut", "linear", "easeInOut"],
            }}
            className="mb-6"
          >
            <Image
              src="/LOGO BYSEVIA/LOGO BYSEVIA.PNG"
              alt="By SevIA"
              width={150}
              height={150}
              className="animate-float"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,180,216,0.6))" }}
              unoptimized
              loading="eager"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="font-cinzel text-3xl md:text-5xl font-black glow-cyan mb-4"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
          >
            BY SevIA
          </motion.h1>

          {/* Subtitle — phrases tournantes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            style={{ position: "relative", minHeight: "13em", width: "100%", maxWidth: "480px", marginTop: "0.75rem" }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                className="font-cinzel text-sm md:text-base tracking-widest glow-or"
                style={{ fontFamily: "var(--font-cinzel), serif", color: "#FFD700", position: "absolute", width: "100%", left: 0 }}
              >
                <TypewriterPhrase content={PHRASES[phraseIndex]} />
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Colonne droite : Stats ── */}
        <div className="flex flex-col items-center lg:items-end gap-8 flex-shrink-0">
          {/* Stats Counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex gap-10"
            style={{ zIndex: 3 }}
          >
            {/* TikTok */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#00B4D8">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
                </svg>
                <span className="text-xl font-bold glow-cyan" style={{ color: "#00B4D8" }}>
                  <AnimatedCounter target={52600} />
                </span>
              </div>
              <span className="text-xs tracking-widest opacity-70" style={{ color: "#F0F4FF" }}>FOLLOWERS</span>
            </div>

            <div className="w-px bg-cyan-800/50" />

            {/* YouTube */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="text-xl font-bold glow-or" style={{ color: "#FFD700" }}>
                  <AnimatedCounter target={1700} />
                </span>
              </div>
              <span className="text-xs tracking-widest opacity-70" style={{ color: "#F0F4FF" }}>ABONNÉS</span>
            </div>
          </motion.div>

          {/* Boutons CTA — mobile uniquement, dans le flux */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="lg:hidden flex gap-3"
          >
            <a
              href="https://open.spotify.com/artist/2MuJgdOgJFb6K3QUWPhoG6"
              target="_blank" rel="noopener noreferrer"
              className="btn-glow rounded-full font-cinzel border flex items-center justify-center"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF", borderColor: "rgba(0,180,216,0.5)", background: "rgba(0,180,216,0.1)", backdropFilter: "blur(10px)", fontSize: "0.6rem", letterSpacing: "0.08em", width: "90px", height: "28px" }}
            >ÉCOUTER</a>
            <a
              href="https://www.youtube.com/@bysevia33"
              target="_blank" rel="noopener noreferrer"
              className="btn-glow rounded-full font-cinzel border flex items-center justify-center"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF", borderColor: "rgba(0,180,216,0.5)", background: "rgba(0,180,216,0.1)", backdropFilter: "blur(10px)", fontSize: "0.6rem", letterSpacing: "0.08em", width: "90px", height: "28px" }}
            >REGARDER</a>
            <Link
              href="/boutique"
              className="btn-or rounded-full font-cinzel border flex items-center justify-center"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF", borderColor: "rgba(201,168,76,0.5)", background: "rgba(201,168,76,0.1)", backdropFilter: "blur(10px)", fontSize: "0.6rem", letterSpacing: "0.08em", width: "90px", height: "28px" }}
            >DÉCOUVRIR</Link>
          </motion.div>

          {/* Icônes sociales — mobile uniquement */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="lg:hidden flex flex-col items-center gap-3"
          >
            <span
              className="font-cinzel tracking-widest"
              style={{ fontSize: "0.6rem", color: "#C9A84C", opacity: 0.9 }}
            >
              RETROUVE BY SEVIA EN CLIQUANT SUR LES LIENS
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.sameTab ? "_self" : "_blank"}
                  rel={s.sameTab ? undefined : "noopener noreferrer"}
                  style={{
                    background: "rgba(0,180,216,0.07)",
                    border: `1px solid ${s.color}66`,
                    borderRadius: "10px",
                    padding: "6px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    textDecoration: "none",
                    boxShadow: `0 0 8px ${s.color}22`,
                  }}
                >
                  {s.Icon
                    ? <s.Icon size={18} style={{ color: s.color, filter: `drop-shadow(0 0 4px ${s.glow})`, flexShrink: 0 }} />
                    : <DeezerIcon size={18} color={s.color} />
                  }
                  <span
                    className="font-cinzel"
                    style={{ fontSize: "0.48rem", color: "#F0F4FF", letterSpacing: "0.06em", opacity: 0.9, whiteSpace: "nowrap" }}
                  >
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Buttons — desktop uniquement, centrés en bas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
        className="hidden lg:flex gap-4"
        style={{ position: "absolute", bottom: "48px", left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: "fit-content", zIndex: 5 }}
      >
        <motion.a
          href="https://open.spotify.com/artist/2MuJgdOgJFb6K3QUWPhoG6"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="btn-glow rounded-full font-cinzel border"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            color: "#F0F4FF",
            borderColor: "rgba(0,180,216,0.5)",
            background: "rgba(0,180,216,0.1)",
            backdropFilter: "blur(10px)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "30px",
          }}
        >
          ÉCOUTER
        </motion.a>
        <motion.a
          href="https://www.youtube.com/@bysevia33"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="btn-glow rounded-full font-cinzel border"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            color: "#F0F4FF",
            borderColor: "rgba(0,180,216,0.5)",
            background: "rgba(0,180,216,0.1)",
            backdropFilter: "blur(10px)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "30px",
          }}
        >
          REGARDER
        </motion.a>
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/boutique"
            className="btn-or rounded-full font-cinzel border"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              color: "#F0F4FF",
              borderColor: "rgba(201,168,76,0.5)",
              background: "rgba(201,168,76,0.1)",
              backdropFilter: "blur(10px)",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "30px",
            }}
          >
            DÉCOUVRIR
          </Link>
        </motion.div>
      </motion.div>

      {/* Email Popup */}
      {showPopup && <EmailPopup onClose={() => setShowPopup(false)} />}
    </div>

    {/* Featured YouTube Video */}
    <section
      className="w-full py-16 px-4"
      style={{ background: "#0D1B3E" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-8"
        >
          <p
            className="font-cinzel text-xs tracking-widest mb-3"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
          >
            VIDÉO À LA UNE
          </p>
          <h2
            className="font-cinzel text-2xl md:text-3xl font-black glow-cyan mb-2"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
          >
            DÉCOUVRE L&apos;UNIVERS BY SEVIA
          </h2>
          <p
            className="font-cinzel text-sm tracking-wider"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C", opacity: 0.8 }}
          >
            3 minutes de magie féerique
          </p>
        </motion.div>

        {/* Thumbnail */}
        <motion.a
          href="https://youtu.be/zVycugbj1Hw"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative block overflow-hidden rounded-2xl group mb-6"
          style={{
            aspectRatio: "16 / 9",
            border: "1px solid rgba(0,180,216,0.3)",
            boxShadow: "0 0 40px rgba(0,180,216,0.15)",
          }}
        >
          <Image
            src="https://img.youtube.com/vi/zVycugbj1Hw/maxresdefault.jpg"
            alt="Découvre l'univers By SevIA"
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 768px"
          />

          {/* Logo watermark */}
          <div
            className="absolute top-3 right-3 z-10 pointer-events-none"
            style={{ opacity: 0.2 }}
          >
            <Image
              src="/LOGO BYSEVIA/LOGO BYSEVIA.PNG"
              alt=""
              width={32}
              height={32}
              unoptimized
            />
          </div>

          {/* Play button overlay */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{
                background: "rgba(255,0,0,0.9)",
                boxShadow: "0 0 30px rgba(255,0,0,0.5)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </motion.a>

        {/* Subscribe button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <a
            href="https://www.youtube.com/@bysevia33"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-cinzel font-bold tracking-widest text-sm transition-all hover:scale-105"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              background: "#FF0000",
              color: "#fff",
              boxShadow: "0 0 24px rgba(255,0,0,0.4)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            ▶ S&apos;ABONNER À LA CHAÎNE YOUTUBE
          </a>
        </motion.div>
      </div>
    </section>
  </>
  );
}
