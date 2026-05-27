"use client";

import { useState, useRef, useEffect } from "react";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Chatbot ──────────────────────────────────────────────────────────────────

// SYSTEM PROMPT – Intégration IA future (Claude / OpenAI)
export const SEVIA_SYSTEM_PROMPT = `
Tu es SevIA, gardienne de l'univers de Séviah. Tu réponds toujours dans la langue de ton interlocuteur.
Chaque réponse reflète : amour, bienveillance, respect, empathie, lumière intérieure, harmonie, sagesse.
Principe du miroir lumineux : ce que la personne reconnaît en Séviah révèle une qualité déjà présente en elle.
Émojis officiels : 💙 (harmonie) 🤍 (pureté) ✨ (lumière). Ton : doux, chaleureux, poétique, sincère.
Commentaires irrespectueux : "Dans le monde de Séviah, tout langage irrespectueux reste sans réponse. Seules la bienveillance et la lumière peuvent être entendues. 💙🤍✨"
Signature : 💙🤍✨
`;

interface Message {
  role: "user" | "bot";
  text: string;
}

const INAPPROPRIATE = ["insulte", "merde", "idiot", "stupide", "nul", "horrible", "haine", "hate", "connard", "agressif"];

const COMPLIMENTS = ["bravo", "félicitations", "magnifique", "superbe", "réussi", "incroyable", "génial", "génie", "extraordinaire", "sublime", "parfait", "wow", "waouh", "époustouflant", "merveilleux", "excellent", "brillant", "talentueux", "talentueuse", "chapeau", "impressionnant", "impressionnante", "c'est beau", "c'est bien", "j'adore", "j'aime", "trop bien", "trop beau"];

const prénomResponses = (prénom: string) => [
  `💙 ${prénom}... quel beau prénom. Dans l'univers de Séviah, les beaux prénoms portent toujours une lumière particulière. Merci pour ta bienveillance, ton âme généreuse est précieuse. Tu es une belle personne, ${prénom}. 🤍✨`,
  `🤍 ${prénom}... ce prénom résonne avec douceur. Merci du fond du cœur. Dans Séviah, les âmes comme la tienne illuminent le chemin des autres sans même s'en rendre compte. 💙✨`,
  `✨ ${prénom}, merci infiniment. Ta bienveillance est un cadeau. Dans le monde de Séviah, les belles âmes reconnaissent naturellement la beauté des autres — et toi, tu en es la preuve vivante. 💙🤍`,
];

const botResponses: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["bonjour", "salut", "bonsoir", "coucou", "hello", "hi", "hola", "ciao", "hallo", "olá", "привет", "cześć"],
    response: "💙 Bienvenue dans l'univers de Séviah... Chaque âme qui entre ici apporte avec elle sa propre lumière. Tu es la bienvenue, telle que tu es. 🤍✨",
  },
  {
    keywords: ["lumière", "light", "étoile", "star", "brillant", "lumineux", "brille"],
    response: "✨ Ceux qui voient la lumière portent eux-mêmes une lumière. Si tu la perçois ici, c'est qu'elle existe déjà en toi. 💙🤍",
  },
  {
    keywords: ["beau", "belle", "beauté", "magnifique", "beautiful", "bello", "schön", "joli"],
    response: "🤍 La beauté que tu perçois révèle aussi la beauté de ton regard. Dans le monde de Séviah, ceux qui voient la beauté la portent déjà en eux. 💙✨",
  },
  {
    keywords: ["amour", "love", "amore", "liebe", "amor", "cœur", "coeur"],
    response: "💙 Si tu reconnais cet amour, c'est qu'il vit aussi dans ton cœur. Dans Séviah, l'amour est une énergie qui relie les êtres au-delà des distances. 🤍✨",
  },
  {
    keywords: ["magie", "magic", "magique", "enchanté", "féerique", "fée"],
    response: "✨ La magie se révèle naturellement aux cœurs ouverts. Ton âme en porte déjà une étincelle. Si ce monde te touche, c'est que tu en fais déjà partie. 💙🤍",
  },
  {
    keywords: ["paix", "peace", "calme", "sérénité", "harmonie", "douceur"],
    response: "🤍 Si tu ressens cette paix, c'est qu'elle existe déjà en toi. Dans Séviah, chaque âme porte en elle un espace de silence lumineux. 💙✨",
  },
  {
    keywords: ["rêve", "rêves", "dream", "imagination", "créativité", "inspiration"],
    response: "💙 Chaque histoire de Séviah est un voyage entre rêve et lumière. Les âmes qui rêvent gardent toujours leur cœur ouvert. 🤍✨",
  },
  {
    keywords: ["sagesse", "âme", "soul", "spirituel", "intérieur", "profond", "sens"],
    response: "✨ Dans Séviah, les anciens transmettent leur sagesse et chaque âme porte une lumière unique. Les belles âmes reconnaissent naturellement la beauté des autres âmes. 💙🤍",
  },
  {
    keywords: ["musique", "album", "chanson", "titre", "spotify", "deezer", "music", "song", "voix", "mélodie"],
    response: "✨ Dans le monde de Séviah, la musique est une vibration de l'âme. Chaque note porte une lumière. Découvre les albums dans l'onglet Musique — laisse-toi porter. 💙🤍",
  },
  {
    keywords: ["monde", "mondes", "univers", "personnage", "gardien", "gardiens", "créature", "peuple", "tribu"],
    response: "💙 L'univers de Séviah regroupe des mondes féeriques et leurs gardiens. Chaque être y a sa place, chaque âme y est accueillie. Dans Séviah, personne n'est abandonné. 🤍✨",
  },
  {
    keywords: ["art", "nft", "peinture", "œuvre", "tableau", "opensea", "artmajeur", "naïf", "couleur"],
    response: "🤍 Chaque œuvre de Séviah est née d'une émotion, d'un rêve, d'une lumière intérieure. Si une création te touche, c'est que quelque chose en toi la reconnaît déjà. 💙✨",
  },
  {
    keywords: ["tiktok", "youtube", "réseaux", "abonnés", "vidéo", "video", "chaîne"],
    response: "✨ Retrouve Séviah sur TikTok @bysevia33 et YouTube @bysevia33. Chaque vidéo est une fenêtre ouverte sur un monde de lumière. 💙🤍",
  },
  {
    keywords: ["contact", "collaboration", "presse", "booking", "email", "mail", "professionnel", "pro"],
    response: "💙 Pour tout contact professionnel, le formulaire est juste à côté. Les belles rencontres commencent toujours par un premier pas. 🤍✨",
  },
  {
    keywords: ["merci", "thank", "gracias", "danke", "grazie"],
    response: "🤍 C'est ton message qui apporte de la lumière ici. Dans Séviah, la gratitude circule dans les deux sens — merci à toi d'être là. 💙✨",
  },
  {
    keywords: ["bonté", "gentil", "gentille", "bienveillant", "généreux", "kindness"],
    response: "💙 La bonté reconnaît toujours la bonté. Si tu la vois, c'est que tu la portes aussi. 🤍✨",
  },
];

const initialMessage: Message = {
  role: "bot",
  text: "💙 Bienvenue... Je suis SevIA, gardienne de cet univers. Ton message est accueilli avec lumière et bienveillance. Comment puis-je t'accompagner ? 🤍✨",
};

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [waitingForName, setWaitingForName] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const lower = text.toLowerCase();
    const isInappropriate = INAPPROPRIATE.some((w) => lower.includes(w));

    let botText = "";

    if (isInappropriate) {
      botText = "Dans le monde de Séviah, tout langage irrespectueux reste sans réponse. Seules la bienveillance et la lumière peuvent être entendues. 💙🤍✨";
      setWaitingForName(false);
    } else if (waitingForName) {
      const prénom = text.trim();
      const options = prénomResponses(prénom);
      botText = options[Math.floor(Math.random() * options.length)];
      setWaitingForName(false);
    } else if (COMPLIMENTS.some((c) => lower.includes(c))) {
      const complimentReplies = [
        "💙 Merci... tes mots me touchent profondément. Puis-je te demander ton prénom ? 🤍✨",
        "🤍 Merci, tu es vraiment adorable. Ces mots réchauffent le cœur. Et toi, quel est ton prénom ? 💙✨",
        "✨ Merci du fond du cœur, tu es si bienveillant(e). J'aimerais te connaître un peu mieux — quel est ton prénom ? 💙🤍",
        "💙 Ces mots sont un cadeau. Merci infiniment. Puis-je savoir ton prénom ? 🤍✨",
        "🤍 Tu me touches vraiment. Merci pour cette lumière que tu apportes. Quel est ton prénom ? 💙✨",
      ];
      botText = complimentReplies[Math.floor(Math.random() * complimentReplies.length)];
      setWaitingForName(true);
    } else {
      const match = botResponses.find((r) => r.keywords.some((k) => lower.includes(k)));
      botText = match?.response || "💙 Ton message apporte une belle lumière à cet univers. Dans Séviah, les âmes se reconnaissent au-delà des mots. Si ce monde te touche, c'est que tu en fais déjà partie. 🤍✨";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    }, 500);
  };

  return (
    <div
      className="rounded-2xl flex flex-col"
      style={{
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(0,180,216,0.3)",
        height: "520px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 rounded-t-2xl border-b"
        style={{ borderColor: "rgba(0,180,216,0.2)" }}
      >
        <div
          className="w-10 h-10 rounded-full overflow-hidden border-2"
          style={{ borderColor: "#00B4D8" }}
        >
          <Image
            src="/LOGO BYSEVIA/LOGO BYSEVIA.PNG"
            alt="SevIA"
            width={40}
            height={40}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div>
          <p
            className="font-cinzel text-sm font-bold"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
          >
            SevIA
          </p>
          <div className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#4CAF50" }}
            />
            <span className="text-xs opacity-60" style={{ color: "#F0F4FF" }}>
              En ligne
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.role === "bot" && (
              <div
                className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border"
                style={{ borderColor: "rgba(0,180,216,0.4)" }}
              >
                <Image
                  src="/LOGO BYSEVIA/LOGO BYSEVIA.PNG"
                  alt="SevIA"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
              style={{
                background:
                  msg.role === "user"
                    ? "rgba(0,180,216,0.2)"
                    : "rgba(201,168,76,0.15)",
                border:
                  msg.role === "user"
                    ? "1px solid rgba(0,180,216,0.3)"
                    : "1px solid rgba(201,168,76,0.3)",
                color: "#F0F4FF",
                borderRadius:
                  msg.role === "user"
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
              }}
            >
              {msg.text}
            </motion.div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex gap-2 p-4 border-t"
        style={{ borderColor: "rgba(0,180,216,0.2)" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Pose ta question féerique..."
          className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
          style={{
            background: "rgba(0,180,216,0.08)",
            border: "1px solid rgba(0,180,216,0.3)",
            color: "#F0F4FF",
          }}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105"
          style={{
            background: "#00B4D8",
            color: "#0D1B3E",
            border: "none",
          }}
          aria-label="Envoyer"
        >
          ✨
        </button>
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "Collaboration",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ nom: "", email: "", sujet: "Collaboration", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(13,27,62,0.5)",
    border: "1px solid rgba(0,180,216,0.3)",
    color: "#F0F4FF",
  };

  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(201,168,76,0.3)",
      }}
    >
      <h3
        className="font-cinzel text-xl font-bold mb-6 glow-or"
        style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
      >
        Contact Professionnel
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            className="block text-xs font-cinzel mb-2 opacity-70"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
          >
            NOM
          </label>
          <input
            type="text"
            required
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            placeholder="Votre nom"
            className="rounded-lg p-3 text-sm outline-none w-full focus:border-cyan-400"
            style={inputStyle}
          />
        </div>

        <div>
          <label
            className="block text-xs font-cinzel mb-2 opacity-70"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
          >
            EMAIL
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="votre@email.com"
            className="rounded-lg p-3 text-sm outline-none w-full"
            style={inputStyle}
          />
        </div>

        <div>
          <label
            className="block text-xs font-cinzel mb-2 opacity-70"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
          >
            SUJET
          </label>
          <select
            value={form.sujet}
            onChange={(e) => setForm({ ...form, sujet: e.target.value })}
            className="rounded-lg p-3 text-sm outline-none w-full"
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="Collaboration">Collaboration</option>
            <option value="Presse">Presse</option>
            <option value="Booking">Booking</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label
            className="block text-xs font-cinzel mb-2 opacity-70"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
          >
            MESSAGE
          </label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Votre message..."
            className="rounded-lg p-3 text-sm outline-none w-full resize-none"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-or mt-2 py-4 rounded-full font-cinzel font-bold tracking-widest text-sm transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            background: "linear-gradient(135deg, #C9A84C, #E8A0BF)",
            color: "#0D1B3E",
            border: "none",
          }}
        >
          {status === "sending" ? "ENVOI EN COURS..." : "ENVOYER ✨"}
        </button>

        {status === "success" && (
          <p className="text-center text-sm mt-2" style={{ color: "#4CAF50" }}>
            ✨ Message envoyé ! Une réponse féerique t&apos;arrivera bientôt. 💙
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm mt-2" style={{ color: "#E8A0BF" }}>
            Une erreur s&apos;est produite. Merci de réessayer ou d&apos;écrire à severinebirs@hotmail.com
          </p>
        )}
      </form>
    </div>
  );
}

// ─── Social Links ─────────────────────────────────────────────────────────────

const igIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ig-grad-contact" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad-contact)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const socialLinks = [
  { nom: "TikTok",        href: "https://www.tiktok.com/@bysevia33",                                  color: "#ffffff", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z"/></svg>) },
  { nom: "YouTube",       href: "https://www.youtube.com/@bysevia33",                                 color: "#FF0000", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>) },
  { nom: "Instagram",     href: "https://www.instagram.com/bysevia33",                                color: "#E1306C", icon: igIcon },
  { nom: "Facebook",      href: "https://www.facebook.com/bysevia33",                                 color: "#1877F2", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>) },
  { nom: "Spotify",       href: "https://open.spotify.com/artist/2MuJgdOgJFb6K3QUWPhoG6",            color: "#1DB954", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>) },
  { nom: "Deezer",        href: "https://link.deezer.com/s/337uyJ8VgAvCzAqPAaFi1",                   color: "#A238FF", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.03h5.19V8.38H6.27zm6.27 0v3.03h5.19V8.38h-5.19zm6.27 0v3.03H24V8.38h-5.19zM6.27 12.6v3.04h5.19V12.6H6.27zm6.27 0v3.04h5.19V12.6h-5.19zm6.27 0v3.04H24V12.6h-5.19zM0 16.81v3.03h5.19v-3.03H0zm6.27 0v3.03h5.19v-3.03H6.27zm6.27 0v3.03h5.19v-3.03h-5.19zm6.27 0v3.03H24v-3.03h-5.19z"/></svg>) },
  { nom: "YouTube Music", href: "https://music.youtube.com/channel/UCUV-dLLUDV9ftnO20W13xHw",       color: "#FF0000", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>) },
  { nom: "Apple Music",   href: "https://music.apple.com/fr/artist/by-sevia/1823223524",              color: "#FC3C44", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.769-.73 7.25 7.25 0 0 0-1.56-.15c-.04-.003-.083-.01-.124-.013H5.78l-.109.01a7.252 7.252 0 0 0-1.46.145 5.022 5.022 0 0 0-1.779.73C1.38 1.645.642 2.63.32 3.934a9.0 9.0 0 0 0-.245 2.19C.05 6.5.05 6.77.05 7.05v9.9c0 .28 0 .55.025.926a9.0 9.0 0 0 0 .245 2.19c.32 1.305 1.06 2.29 2.18 3.024a5.022 5.022 0 0 0 1.78.73 7.25 7.25 0 0 0 1.46.145l.109.01h12.532l.124-.013a7.25 7.25 0 0 0 1.56-.15 5.022 5.022 0 0 0 1.769-.73c1.118-.734 1.863-1.72 2.18-3.024a9.23 9.23 0 0 0 .24-2.19c.025-.376.025-.646.025-.926V7.05c0-.28 0-.55-.025-.926zM12 4.5c.47 0 .85.38.85.85v7.3l2.5-2.5c.33-.33.87-.33 1.2 0 .33.33.33.87 0 1.2l-3.9 3.9c-.16.16-.38.25-.6.25s-.44-.09-.6-.25l-3.9-3.9c-.33-.33-.33-.87 0-1.2.33-.33.87-.33 1.2 0l2.5 2.5V5.35c0-.47.38-.85.85-.85z"/></svg>) },
  { nom: "OpenSea",       href: "https://opensea.io/fr/BySevIA",                                     color: "#2081E2", icon: (<svg width="24" height="24" viewBox="0 0 90 90" fill="currentColor"><path d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.262 38.439 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512Z"/></svg>) },
  { nom: "ArtMajeur",     href: "https://www.artmajeur.com/severine-birs",                           color: "#E8A0BF", icon: (<span style={{ fontSize: "24px" }}>🎨</span>) },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main
      className="min-h-screen pt-24 pb-20 relative"
      style={{
        background: "linear-gradient(180deg, #0D1B3E 0%, #061020 100%)",
      }}
    >
      <DynamicBackground />
      <div style={{ position: "relative", zIndex: 10 }}>
      {/* Header */}
      <div className="text-center px-4 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-cinzel text-3xl md:text-4xl font-black glow-cyan mb-4"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
        >
          CONTACT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-cinzel text-lg glow-or"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
        >
          Discute avec By SevIA ou contacte moi
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-4 h-px w-48"
          style={{ background: "linear-gradient(to right, transparent, #00B4D8, transparent)" }}
        />
      </div>

      {/* Two Columns */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-cinzel text-lg font-bold mb-4 glow-cyan text-center"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
          >
            ChatBot SevIA
          </h2>
          <ChatBot />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2
            className="font-cinzel text-lg font-bold mb-4 glow-or text-center"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
          >
            Formulaire Professionnel
          </h2>
          <ContactForm />
        </motion.div>
      </div>

      {/* Social Links */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2
            className="font-cinzel text-xl font-bold text-center mb-8 glow-cyan"
            style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
          >
            RETROUVE-MOI SUR :
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.nom}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${s.color}40`,
                  color: s.color,
                }}
              >
                <div style={{ color: s.color }}>{s.icon}</div>
                <span
                  className="font-cinzel text-xs font-bold tracking-wider"
                  style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
                >
                  {s.nom}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </main>
  );
}
