import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Stars, HelpCircle, Key, Activity, Heart, Award } from "lucide-react";

interface HouseInfo {
  houseNum: number;
  signHindi: string;
  signEng: string;
  signLord: string;
  name: string;
  focus: string;
  influence: string;
  mantra: string;
}

const HOUSE_DATA: Record<number, HouseInfo> = {
  1: {
    houseNum: 1,
    signHindi: "कर्क (क)",
    signEng: "Cancer",
    signLord: "Moon (चंद्र देव)",
    name: "Lagna Bhava (तन भाव - Soul & Aura)",
    focus: "Charisma, pristine empathy, peace-making intuition, and absolute inner core strength.",
    influence: "Governed by the comforting, highly intuitive Moon. Giving Ankit an incredibly magnetic, sweet-spoken, supportive, and kind personality that effortlessly draws deep loyal friendships.",
    mantra: "ॐ सोमाय नमः || ॐ सों सोमाय नमः"
  },
  2: {
    houseNum: 2,
    signHindi: "सिंह (सि)",
    signEng: "Leo",
    signLord: "Sun (सूर्य)",
    name: "Dhana Bhava (धन भाव - Speech & Treasury)",
    focus: "Strategic reserves, family bonding values, oratory power, and sovereign success.",
    influence: "With Sun commanding this sector, Ankit's words carry heavy authority and warmth. Wealth flows through creative enterprise, bold leadership traits, and high-impact long-term decisions.",
    mantra: "ॐ घृणि सूर्याय नमः ||"
  },
  4: {
    houseNum: 4,
    signHindi: "तुला (तु)",
    signEng: "Libra",
    signLord: "Venus (शुक्र)",
    name: "Sukha Bhava (सुख भाव - Peace, Comforts & Vehicles)",
    focus: "Luxury acquisitions, domestic tranquility, maternal warmth, and grand aesthetics.",
    influence: "Venus guarantees a highly sophisticated artistic eye! He loves beautifully resolved tech, premium spaces, comfortable wheels, and surrounds himself with pure aesthetic harmony.",
    mantra: "ॐ शुक्राय नमः ||"
  },
  7: {
    houseNum: 7,
    signHindi: "मकर (म)",
    signEng: "Capricorn",
    signLord: "Saturn (शनि)",
    name: "Yuvati Bhava (जाया भाव - Public Alignments & Bonding)",
    focus: "Loyancy, heavy business partnerships, public trust, and stable alliances.",
    influence: "Saturn demands deep maturity, structure, and patience in mutual partnerships. Ankit values unwavering, decades-old steel-strong friendships above shallow temporal connections.",
    mantra: "ॐ शं शनैश्चराय नमः ||"
  },
  9: {
    houseNum: 9,
    signHindi: "मीन (मी)",
    signEng: "Pisces",
    signLord: "Jupiter (गुरु)",
    name: "Dharma Bhava (भाग्य भाव - Supreme Fortune & Wisdom)",
    focus: "Spiritual higher learning, destiny, divine protection, and moral philosophy.",
    influence: "Jupiter grants immense fortune and natural protective shield! He acts as the ultimate wise mentor to his brothers, constantly guided by a serene compass of dharma.",
    mantra: "ॐ बृहस्पतये नमः ||"
  },
  10: {
    houseNum: 10,
    signHindi: "मेष (मे)",
    signEng: "Aries",
    signLord: "Mars (मंगल)",
    name: "Karma Bhava (कर्म भाव - Career & Public Milestones)",
    focus: "Executive execution speed, relentless high impact, startup initiatives, and glory.",
    influence: "Mars charges Ankit's professional sector with unstoppable fire and action-oriented leadership. He is a fierce executor of grand projects, turning ambitious visions into fully scaleable realities.",
    mantra: "ॐ अं अङ्गारकाय नमः ||"
  }
};

interface VedicAstroChartProps {
  playSFX: (type: "pop" | "sparkle") => void;
}

export default function VedicAstroChart({ playSFX }: VedicAstroChartProps) {
  const [selectedHouseNum, setSelectedHouseNum] = useState<number>(1);
  const activeHouse = HOUSE_DATA[selectedHouseNum] || HOUSE_DATA[1];

  const handleHouseSelect = (num: number) => {
    setSelectedHouseNum(num);
    playSFX("pop");
  };

  return (
    <div className="bg-[#030214]/95 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl" id="vedic_astro_kundali_chart_block">
      {/* Decorative cosmic background */}
      <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-indigo-500/5 blur-[55px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-rose-500/5 blur-[55px] pointer-events-none" />

      <div className="max-w-xl mb-6">
        <span className="bg-yellow-500/10 text-yellow-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-yellow-500/20 mb-3 inline-block">
          VEDIC BLUEPRINT • कुंडली महायंत्र
        </span>
        <h3 className="font-display text-xl sm:text-2xl text-yellow-250 flex items-center gap-2 font-black select-none">
          <Compass className="w-6 h-6 text-yellow-500 animate-spin-slow" />
          <span>Ankit's Interactive Lagna Chart (Kundali)</span>
        </h3>
        <p className="text-xs text-neutral-400 mt-1 select-none">
          Tap individual house indices on the sacred Vedic diamond grid below to query precise house elements, planetary lords, and future predictions tailored for his 30th Solstice orbit!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: SVG Diamond Kundali Chart representing traditional South/North Indian chart layout */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-80 h-80 bg-neutral-950/60 border-2 border-yellow-800/20 rounded-xl p-4 shadow-inner flex items-center justify-center">
            {/* Draw traditional North Indian Diamond grid using clear SVG */}
            <svg 
              viewBox="0 0 300 300" 
              className="w-full h-full stroke-[#ebd4be]/30 fill-none"
              strokeWidth="2"
            >
              {/* Main outer boundary square */}
              <rect x="10" y="10" width="280" height="280" stroke="#f59e0b" strokeWidth="2.5" />
              
              {/* Diagonal lines to make the core structure */}
              <line x1="10" y1="10" x2="290" y2="290" />
              <line x1="290" y1="10" x2="10" y2="290" />
              
              {/* Diamond lines connecting inner midpoints */}
              <polygon points="150,10 290,150 150,290 10,150" stroke="#ebd4be" strokeWidth="1.5" />

              {/* CORE INTERACTIVE TRIGGER HIGHLIGHTS (SVG Polygon overlays) */}
              {/* House 1: Top Core Triangle */}
              <polygon 
                points="150,10 220,80 150,150 80,80" 
                onClick={() => handleHouseSelect(1)}
                className={`cursor-pointer transition-all ${selectedHouseNum === 1 ? 'fill-yellow-500/10 stroke-yellow-400 stroke-[2]' : 'fill-black/0 hover:fill-yellow-500/5'}`}
              />
              <text x="150" y="65" textAnchor="middle" className="fill-yellow-200 font-bold text-xs select-none pointer-events-none">1 (क)</text>
              <text x="150" y="80" textAnchor="middle" className="fill-neutral-400/80 font-mono text-[9px] select-none pointer-events-none">Aura</text>

              {/* House 2: Top-Right Triangle */}
              <polygon 
                points="150,10 220,80 290,10" 
                onClick={() => handleHouseSelect(2)}
                className={`cursor-pointer transition-all ${selectedHouseNum === 2 ? 'fill-yellow-500/10 stroke-yellow-400 stroke-[2]' : 'fill-black/0 hover:fill-yellow-500/5'}`}
              />
              <text x="220" y="32" textAnchor="middle" className="fill-yellow-250 font-bold text-xs pointer-events-none">2 (सि)</text>
              <text x="220" y="45" textAnchor="middle" className="fill-neutral-400/80 font-mono text-[8px] pointer-events-none">Wealth</text>

              {/* House 4: Top-Left Triangle */}
              <polygon 
                points="150,10 80,80 10,10" 
                onClick={() => handleHouseSelect(4)}
                className={`cursor-pointer transition-all ${selectedHouseNum === 4 ? 'fill-yellow-500/10 stroke-yellow-400 stroke-[2]' : 'fill-black/0 hover:fill-yellow-500/5'}`}
              />
              <text x="80" y="32" textAnchor="middle" className="fill-yellow-250 font-bold text-xs pointer-events-none">4 (तु)</text>
              <text x="80" y="45" textAnchor="middle" className="fill-neutral-400/80 font-mono text-[8px] pointer-events-none">Peace</text>

              {/* House 7: Bottom Core Triangle */}
              <polygon 
                points="150,290 82,220 150,150 218,220" 
                onClick={() => handleHouseSelect(7)}
                className={`cursor-pointer transition-all ${selectedHouseNum === 7 ? 'fill-yellow-500/10 stroke-yellow-400 stroke-[2]' : 'fill-black/0 hover:fill-yellow-500/5'}`}
              />
              <text x="150" y="222" textAnchor="middle" className="fill-yellow-250 font-bold text-xs pointer-events-none">7 (म)</text>
              <text x="150" y="235" textAnchor="middle" className="fill-neutral-400/80 font-mono text-[8px] pointer-events-none">Allies</text>

              {/* House 9: Bottom-Left Triangle */}
              <polygon 
                points="10,290 80,220 150,290" 
                onClick={() => handleHouseSelect(9)}
                className={`cursor-pointer transition-all ${selectedHouseNum === 9 ? 'fill-yellow-500/10 stroke-yellow-400 stroke-[2]' : 'fill-black/0 hover:fill-yellow-500/5'}`}
              />
              <text x="80" y="272" textAnchor="middle" className="fill-yellow-250 font-bold text-xs pointer-events-none">9 (मी)</text>
              <text x="80" y="283" textAnchor="middle" className="fill-neutral-400/80 font-mono text-[8px] pointer-events-none">Dharma</text>

              {/* House 10: Bottom-Right Triangle */}
              <polygon 
                points="290,290 220,220 150,290" 
                onClick={() => handleHouseSelect(10)}
                className={`cursor-pointer transition-all ${selectedHouseNum === 10 ? 'fill-yellow-500/10 stroke-yellow-400 stroke-[2]' : 'fill-black/0 hover:fill-yellow-500/5'}`}
              />
              <text x="220" y="272" textAnchor="middle" className="fill-yellow-250 font-bold text-xs pointer-events-none">10 (मे)</text>
              <text x="220" y="283" textAnchor="middle" className="fill-neutral-400/80 font-mono text-[8px] pointer-events-none">Karma</text>

              {/* Inner Chandra center emblem */}
              <circle cx="150" cy="150" r="16" className="fill-[#0c0525] stroke-yellow-500/40" />
              <text x="150" y="153" textAnchor="middle" className="fill-yellow-400 text-[10px] pointer-events-none font-bold">चंद्र</text>
            </svg>

            {/* Float helper absolute badge */}
            <div className="absolute inset-x-0 bottom-2 text-center text-[10px] font-mono text-amber-500/60 uppercase tracking-widest select-none">
              ★ TAP GRID CHAMBERS ★
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic prediction outputs based on selection */}
        <div className="lg:col-span-6 w-full h-full flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHouseNum}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-black/40 border border-indigo-950 p-5 rounded-xl space-y-4 flex flex-col justify-between h-full relative"
              id={`house_prediction_box_${selectedHouseNum}`}
            >
              <div>
                <div className="flex justify-between items-center border-b border-indigo-900/30 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Stars className="w-5 h-5 text-yellow-400 animate-pulse" />
                    <span className="font-space text-sm font-black text-yellow-105 tracking-wide uppercase">
                      {activeHouse.name}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/30 text-yellow-400">
                    House {selectedHouseNum}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-4 text-neutral-400">
                  <div>
                    <span className="block text-indigo-400 text-[10px] uppercase font-bold">Sign (Moon Rashi):</span>
                    <span className="text-neutral-200">{activeHouse.signHindi} / {activeHouse.signEng}</span>
                  </div>
                  <div>
                    <span className="block text-indigo-400 text-[10px] uppercase font-bold">Ruling Planet:</span>
                    <span className="text-neutral-200">{activeHouse.signLord}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block font-extrabold mb-1">
                      CORE SPECTRUM ATTRIBUTES:
                    </span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {activeHouse.focus}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block font-extrabold mb-1">
                      30TH MILESTONE INGRESS HOROSCOPE:
                    </span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed italic bg-neutral-950/40 p-3 rounded-lg border border-indigo-950">
                      &quot;{activeHouse.influence}&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-indigo-950/60 mt-4">
                <div className="bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-900/40 flex items-center justify-between text-xs">
                  <strong className="text-[10px] font-mono text-indigo-300 uppercase font-bold">Remedy Chime Mantra:</strong>
                  <span className="font-sans text-yellow-300 font-bold text-[11px] text-right truncate">
                    {activeHouse.mantra}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
