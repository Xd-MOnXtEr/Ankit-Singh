import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Sparkles, 
  Heart, 
  Send, 
  Award, 
  Users, 
  Feather, 
  Smile, 
  Trash2, 
  Fingerprint, 
  Compass,
  Sunset
} from "lucide-react";

interface VedicWishAltarProps {
  playSFX: (type: "pop" | "sparkle") => void;
}

interface WishOffering {
  id: string;
  name: string;
  hindiLabel: string;
  symbol: string;
  meaning: string;
  glowColor: string;
  accent: string;
}

interface UserWish {
  id: string;
  sender: string;
  relation: string;
  offering: string;
  text: string;
  timestamp: string;
  isCustom?: boolean;
}

const SHANTI_OFFERINGS: WishOffering[] = [
  {
    id: "diya",
    name: "Divine Diya",
    hindiLabel: "स्वर्ण दीप (Glow of Wisdom)",
    symbol: "🪔",
    meaning: "Brings infinite clarity, high-scaling mental computation speed, and cosmic light to all systems.",
    glowColor: "shadow-[0_0_20px_rgba(245,158,11,0.5)] border-amber-500/40",
    accent: "text-amber-400"
  },
  {
    id: "lotus",
    name: "Sacred Blue Lotus",
    hindiLabel: "नील कमल (Lotus of Health)",
    symbol: "🪷",
    meaning: "Grants absolute deep-level healing, emotional resilience, Cancer-Moon peace, and physical vitality.",
    glowColor: "shadow-[0_0_20px_rgba(14,165,233,0.5)] border-sky-500/40",
    accent: "text-sky-400"
  },
  {
    id: "sandalwood",
    name: "Sandalwood Incense",
    hindiLabel: "चन्दन धूप (Sovereign Calm)",
    symbol: "🪵",
    meaning: "Diffuses heavy mental exhaustion, ensuring crisp architecture design blocks and calm leadership.",
    glowColor: "shadow-[0_0_20px_rgba(34,197,94,0.5)] border-emerald-500/40",
    accent: "text-emerald-400"
  },
  {
    id: "soma_nectar",
    name: "Golden Cardamom Elixir",
    hindiLabel: "अमृत कलश (Nectar of Joy)",
    symbol: "🏺",
    meaning: "Attracts financial milestones, luxury vintage cars, premium gourmet menus, and stellar laughs.",
    glowColor: "shadow-[0_0_20px_rgba(236,72,153,0.5)] border-pink-500/40",
    accent: "text-pink-400"
  }
];

const PRESET_WISHES = [
  "May your Mercury-Saturn alliance unlock legendary tech summits, flawless codes, and absolute deep peace!",
  "Wishing you a magnificent, joyful, and highly prosperous Chapter 30! May you scale systems with continuous smiles.",
  "May your inner fire burn brightly like a stable Vedic Agni, untouched by bugs or transient earthly storms!",
  "Absolute global recognition, stable startup empires, supreme health, and endless cosmic laughs with your brothers!"
];

const DEFAULT_PRELOADED_WISHES: UserWish[] = [
  {
    id: "p1",
    sender: "Shiva (Dev Brother)",
    relation: "Co-Pilot of Astral Systems",
    offering: "स्वर्ण दीप 🪔",
    text: "Happy 30th Ankit! To thirty more years of shipping rock-solid software and debating deep philosophies under midnight stars.",
    timestamp: "May 22, 12:00 AM",
  },
  {
    id: "p2",
    sender: "Pushya Constellation Guardian",
    relation: "Celestial Ally",
    offering: "चन्दन धूप 🪵",
    text: "May the Cancer Moon always guide your intuition with quiet power and stable administrative clarity.",
    timestamp: "May 22, 12:15 AM"
  },
  {
    id: "p3",
    sender: "Nikhil & Startup Crew",
    relation: "Enterprise Guild",
    offering: "अमृत कलश 🏺",
    text: "Wishing you exponential financial surges, sleek mechanical drives, and prime luxury gourmet celebrations!",
    timestamp: "May 22, 01:30 AM"
  }
];

export default function VedicWishAltar({ playSFX }: VedicWishAltarProps) {
  const [selectedOffering, setSelectedOffering] = useState<WishOffering>(SHANTI_OFFERINGS[0]);
  const [senderName, setSenderName] = useState("");
  const [relation, setRelation] = useState("Wellwisher");
  const [customWishText, setCustomWishText] = useState("");
  const [altarWishes, setAltarWishes] = useState<UserWish[]>([]);
  const [firePulse, setFirePulse] = useState(1);
  const [showFlameSparks, setShowFlameSparks] = useState(false);

  // Load from local storage or preloads on startup
  useEffect(() => {
    const saved = localStorage.getItem("ankit_30_altar_wishes");
    if (saved) {
      try {
        setAltarWishes(JSON.parse(saved));
      } catch (e) {
        setAltarWishes(DEFAULT_PRELOADED_WISHES);
      }
    } else {
      setAltarWishes(DEFAULT_PRELOADED_WISHES);
    }
  }, []);

  // Pulsing flame animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFirePulse((p) => (p === 1 ? 1.08 : 1));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const handleSelectPreset = (txt: string) => {
    setCustomWishText(txt);
    playSFX("pop");
  };

  const handleOfferBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSender = senderName.trim() ||"Benevolent Wellwisher";
    const finalWish = customWishText.trim() || "Wishing you spectacular architectural heights and divine peace in your 30s!";

    playSFX("sparkle");
    setShowFlameSparks(true);
    setTimeout(() => setShowFlameSparks(false), 1200);

    const newWish: UserWish = {
      id: "wish_" + Date.now(),
      sender: finalSender,
      relation: relation,
      offering: `${selectedOffering.hindiLabel.split(" ")[0]} ${selectedOffering.symbol}`,
      text: finalWish,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCustom: true
    };

    const updated = [newWish, ...altarWishes];
    setAltarWishes(updated);
    localStorage.setItem("ankit_30_altar_wishes", JSON.stringify(updated));

    // Reset inputs
    setSenderName("");
    setCustomWishText("");
  };

  const handleClearCustomWishes = () => {
    const defaultList = DEFAULT_PRELOADED_WISHES;
    setAltarWishes(defaultList);
    localStorage.setItem("ankit_30_altar_wishes", JSON.stringify(defaultList));
    playSFX("pop");
  };

  return (
    <div className="bg-[#030214]/95 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl mt-12" id="vedic_wish_altar_block">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] pointer-events-none" />

      {/* Header and context block */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-950/50 pb-5 mb-6">
        <div>
          <span className="bg-amber-500/10 text-amber-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-amber-500/20 mb-2 inline-block">
            SACRED FIRE SERVICE • यज्ञ वेदि मञ्च
          </span>
          <h3 className="font-display text-xl sm:text-2xl text-yellow-250 font-black flex items-center gap-2 select-none">
            <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
            <span>Sacred Wishes Altar & Fire Sim</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Offer sacred virtual ingredients into the dynamic high-vibe Yagna fire to send warm cosmic blessings straight to Ankit Singh&apos;s chapter thirty path!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Altar Visualizer and Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Visualizer: The Glowing Fire Altar */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-black/60 border border-indigo-950 p-4 rounded-xl relative h-[210px] overflow-hidden group">
              
              {/* Rotating background mandala element */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-44 h-44 rounded-full border border-dashed border-amber-500/10 flex items-center justify-center opacity-30"
              />

              {/* Pulsing halo */}
              <motion.div 
                animate={{ scale: firePulse }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className={`absolute w-16 h-16 rounded-full bg-orange-500/10 blur-[20px] pointer-events-none transition-all duration-300 ${
                  selectedOffering.id === "lotus" ? "bg-sky-500/10" :
                  selectedOffering.id === "sandalwood" ? "bg-emerald-500/10" :
                  selectedOffering.id === "soma_nectar" ? "bg-pink-500/10" : "bg-amber-500/10"
                }`}
              />

              {/* Fire Flame Representation */}
              <div className="relative z-10 flex flex-col items-center select-none cursor-pointer" onClick={() => playSFX("pop")}>
                <motion.div 
                  animate={{ 
                    scale: firePulse,
                    y: [0, -3, 0]
                  }}
                  transition={{ 
                    scale: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
                    y: { duration: 1.2, repeat: Infinity, repeatType: "reverse" }
                  }}
                  className="relative"
                >
                  {/* Outer glow aura */}
                  <span className="text-5xl drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] font-semibold select-none">
                    🔥
                  </span>

                  {/* Spark particles showing up during casting */}
                  <AnimatePresence>
                    {showFlameSparks && (
                      <>
                        <motion.span 
                          initial={{ opacity: 0, y: 0, scale: 0.5 }}
                          animate={{ opacity: 0.8, y: -45, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute -top-4 left-2 text-xl pointer-events-none"
                        >
                          ✨
                        </motion.span>
                        <motion.span 
                          initial={{ opacity: 0, y: 0, scale: 0.5 }}
                          animate={{ opacity: 0.8, y: -35, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="absolute -top-6 -left-3 text-lg pointer-events-none"
                        >
                          ✴️
                        </motion.span>
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="mt-3 text-center">
                  <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-widest block">
                    ACTIVE AGNI KUND
                  </span>
                  <span className={`text-[9px] font-mono transition-colors text-neutral-400 block mt-0.5 mt-1 px-2 py-0.5 rounded border border-indigo-950 bg-black/80`}>
                    Currently Offering: {selectedOffering.symbol} {selectedOffering.name}
                  </span>
                </div>
              </div>

              {/* Decorative base coordinates */}
              <span className="absolute bottom-1 right-2 text-[7px] font-mono text-indigo-950 select-none">
                30.00° N • CELESTIAL AXIS
              </span>
            </div>

            {/* Selection Grid coordinates */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                1. Select Sacred Offering Variant:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SHANTI_OFFERINGS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedOffering(item);
                      playSFX("pop");
                    }}
                    className={`p-2 rounded-lg border text-left transition duration-300 flex flex-col justify-between ${
                      selectedOffering.id === item.id
                        ? `bg-neutral-950 border-amber-400/50 ${item.glowColor}`
                        : "bg-neutral-950/40 border-neutral-900 text-neutral-400 hover:border-indigo-950 hover:bg-black/60"
                    }`}
                    id={`offering_${item.id}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base select-none">{item.symbol}</span>
                      <span className={`text-[10px] font-bold ${selectedOffering.id === item.id ? item.accent : 'text-neutral-300'}`}>
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[8px] opacity-75 font-mono line-clamp-1 mt-1 block">
                      {item.hindiLabel}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-zinc-400 leading-normal italic bg-neutral-950 p-2.5 rounded border border-indigo-950/60 font-sans">
                &rdquo;{selectedOffering.meaning}&rdquo;
              </p>
            </div>

          </div>

          {/* Form Entry */}
          <form onSubmit={handleOfferBlessing} className="bg-black/40 border border-indigo-950 p-5 rounded-xl space-y-4">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block font-bold">
              2. Draft Your Cosmic Blessing:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Your Name / प्रेषक:</label>
                <input
                  type="text"
                  maxLength={40}
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Siddhartha or Mataji"
                  className="bg-neutral-950 border border-indigo-900/60 rounded px-2.5 py-1.5 w-full text-xs text-zinc-200 outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Affiliation / संबन्ध:</label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="bg-neutral-950 border border-indigo-900/60 rounded px-2.5 py-1.5 w-full text-xs text-zinc-200 outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Wellwisher">Kind Wellwisher</option>
                  <option value="Dev Brother">Dev / Code Brother</option>
                  <option value="Startup Mate">Co-Founder / Startup Mate</option>
                  <option value="Childhood Friend">Childhood Brother</option>
                  <option value="Family Member">Family Member</option>
                </select>
              </div>
            </div>

            {/* Custom wish box */}
            <div>
              <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Your Custom Heartfelt Wish / शुभकामना मंत्र:</label>
              <textarea
                value={customWishText}
                maxLength={250}
                onChange={(e) => setCustomWishText(e.target.value)}
                placeholder="Type your pure heart blessings or select from pre-crafted presets below..."
                className="bg-neutral-950 border border-indigo-900/60 rounded px-2.5 py-1.5 w-full h-16 text-xs text-zinc-200 outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* Quick Presets row */}
            <div className="space-y-1.5">
              <span className="text-[8px] font-mono text-neutral-500 uppercase block tracking-wider">Quick Select Blessing Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_WISHES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="bg-neutral-950 hover:bg-neutral-900 text-neutral-300 border border-indigo-950 rounded px-2 py-1 text-[9px] text-left leading-relaxed max-w-full truncate transition-all duration-300"
                    title={preset}
                  >
                    🕊️ &ldquo;{preset.substring(0, 45)}...&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-space font-black uppercase text-xs py-2 px-4 rounded shadow-xl tracking-wider flex items-center justify-center gap-2 transition"
                id="submit_altar_blessing_btn"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Cosmic Fire (यज्ञ आहुति)</span>
              </button>
            </div>
          </form>

        </div>

        {/* Right Column: Live Stream scroll list of Wishes */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
          <div className="flex justify-between items-center bg-black/40 border border-indigo-950 px-3.5 py-2 rounded-lg">
            <span className="text-[10px] font-mono text-yellow-500 uppercase font-black flex items-center gap-1 tracking-wider">
              <Users className="w-3.5 h-3.5 text-orange-500" />
              <span>Consecrated Blessings Flow</span>
            </span>

            <button
              onClick={handleClearCustomWishes}
              className="text-neutral-500 hover:text-rose-400 transition"
              title="Reset wishes board to preloaded defaults"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* scroll panel containment */}
          <div className="space-y-2 border border-indigo-950 p-2 rounded-xl bg-black/60 h-[380px] overflow-y-auto custom-scrollbar-hide">
            <AnimatePresence initial={false}>
              {altarWishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-3.5 rounded-lg border text-xs leading-relaxed flex flex-col justify-between space-y-2 ${
                    wish.isCustom 
                      ? "bg-amber-500/5 border-amber-500/20 shadow-lg shadow-amber-500/5" 
                      : "bg-neutral-950/80 border-indigo-950"
                  }`}
                  id={`scroll_wish_card_${wish.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-sans">
                      <span className="font-bold text-neutral-100 text-[11px] sm:text-xs tracking-tight">
                        {wish.sender}
                      </span>
                      <span className="text-[9px] text-zinc-400 block font-mono">
                        {wish.relation}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono bg-indigo-950/50 px-1.5 py-0.5 rounded text-amber-400 font-bold shrink-0">
                      📜 Offering: {wish.offering}
                    </span>
                  </div>

                  <p className="text-zinc-300 font-sans leading-relaxed text-[11px] font-medium italic">
                    &ldquo;{wish.text}&rdquo;
                  </p>

                  <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 border-t border-indigo-900/10 pt-1.5">
                    <span className="flex items-center gap-0.5">
                      <Fingerprint className="w-2.5 h-2.5 text-zinc-600" />
                      <span>SECURE • SHANTI SIGND</span>
                    </span>
                    <span>{wish.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center text-[9px] font-mono text-zinc-500 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500 animate-spin-slow" />
            <span>Blessings are stored locally was part of this browser sandbox</span>
          </div>

        </div>

      </div>

    </div>
  );
}
