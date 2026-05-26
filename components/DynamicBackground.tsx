"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// ─── Nébuleuse ─────────────────────────────────────────────────────────────────

const NEBULA_BLOBS = [
  { color: "#00B4D8", left: "15%", top: "10%", size: 620, dur: 20, x: [0, 60, -40, 0] as number[], y: [0, -40,  30, 0] as number[] },
  { color: "#E8A0BF", left: "68%", top: "22%", size: 520, dur: 27, x: [0, -50, 30, 0] as number[], y: [0,  30, -50, 0] as number[] },
  { color: "#C9A84C", left: "42%", top: "52%", size: 460, dur: 32, x: [0,  40,-60, 0] as number[], y: [0,  50, -30, 0] as number[] },
  { color: "#00B4D8", left: "83%", top: "68%", size: 560, dur: 23, x: [0, -70, 20, 0] as number[], y: [0, -20,  60, 0] as number[] },
  { color: "#E8A0BF", left: "7%",  top: "76%", size: 490, dur: 29, x: [0,  50,-30, 0] as number[], y: [0,  40, -50, 0] as number[] },
  { color: "#C9A84C", left: "54%", top: "88%", size: 410, dur: 18, x: [0, -40, 60, 0] as number[], y: [0, -60,  20, 0] as number[] },
];

// ─── Particules + étoiles filantes ────────────────────────────────────────────

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
interface TwinkleStar {
  x: number; y: number;
  r: number;
  op: number;
  speed: number;
  dir: number;
  phase: number;
}

function ParticlesCanvas() {
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

    // Étoiles scintillantes fixes
    const twinkleStars: TwinkleStar[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      op: Math.random(),
      speed: 0.004 + Math.random() * 0.012,
      dir: Math.random() > 0.5 ? 1 : -1,
      phase: Math.random() * Math.PI * 2,
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

      // Étoiles scintillantes
      for (const s of twinkleStars) {
        s.phase += s.speed;
        s.op = (Math.sin(s.phase) + 1) / 2;
        const glow = s.r > 0.9 ? s.r * 3 : 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#F0F4FF";
        ctx.globalAlpha = s.op * 0.85;
        if (glow > 0) { ctx.shadowBlur = glow; ctx.shadowColor = "#F0F4FF"; }
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

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

// ─── Export principal ──────────────────────────────────────────────────────────

export default function DynamicBackground() {
  return (
    <>
      {/* Vidéo */}
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
          <source src="/VIDEOS BYSEVIA/fond1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Nébuleuse */}
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

      {/* Particules + étoiles filantes */}
      <ParticlesCanvas />
    </>
  );
}
