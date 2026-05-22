import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, BookOpen, Clock, Heart, ArrowRight, ShieldCheck, Stars } from "lucide-react";

interface DecadeMilestone {
  id: string;
  titleHindi: string;
  titleEng: string;
  years: string;
  summary: string;
  highlights: string[];
  geminiWisdom: string;
  visualEmoji: string;
  soundscapeDesc: string;
}

const DECADES: DecadeMilestone[] = [
  {
    id: "decade1",
    titleHindi: "बाल्यावस्था और संस्कार (The Natal Spark)",
    titleEng: "Decade 1: Childhood & Vedic Roots",
    years: "1996 – 2006",
    summary: "Born on May 23, 1996, in Bihar/Varanasi heritage under the protective, soft shade of Cancer moon/Pushya constellation. These early years shaped Ankit's deep traditional value system, quiet observing intelligence, and profound emotional empathy.",
    highlights: [
      "Born in sacred family coordinates, inheriting ancient values and Sanskrit slokas.",
      "Early schooling days in scenic landscapes of North India, showcasing exceptional logic talent.",
      "Developed an early lifelong fascination for stars, electronics, and local folk literature."
    ],
    geminiWisdom: "Blessed by Chandra Dev's gentle gravity, Ankit's early decade was defined by deep curiosity, high integrity, and an innate desire to help, respect, and build bonds.",
    visualEmoji: "🎨",
    soundscapeDesc: "Traditional sitar loops paired with holy Ganga high temple bells."
  },
  {
    id: "decade2",
    titleHindi: "विद्यार्थी जीवन एवं तकनीकी उदय (Academic Horizon)",
    titleEng: "Decade 2: Engineering Mind & True Bonds",
    years: "2006 – 2016",
    summary: "From high-school challenges to the engineering campus corridors of North India. This decade catalyzed his transition from a silent student into a stellar tech wizard, software craftsman, and the ultimate reliable friend of his generation.",
    highlights: [
      "Cracked prestige science exams, finding deep passion in software codes and math systems.",
      "Wrote those first legendary lines of code in C and Java, laying the bedrock for his current career.",
      "Cemented deep bonds with brothers and friends, acting as the protective shield in every tight spot."
    ],
    geminiWisdom: "As Mars charged his career/karma sector, this decade turned raw talent into hardened skill, instilling a highly structured strategic problem-solving compass.",
    visualEmoji: "💻",
    soundscapeDesc: "Retro synthesis beats fused with late-night hostel guitar jams."
  },
  {
    id: "decade3",
    titleHindi: "कर्मयोग एवं सफलता (The Professional Zenith)",
    titleEng: "Decade 3: Career Mastery & Golden 30 Ingress",
    years: "2016 – 2026",
    summary: "A rise to absolute elite software engineer and mentor status! Under Taurus Sun, Ankit took on national-scale software backends, mentored juniors with deep generosity, and enters milestone chapter thirty at his absolute peak of productivity.",
    highlights: [
      "Pioneered critical systems, solving grand cloud scaling issues for global projects with absolute calm.",
      "Acted as the ultimate mentor and guide, constantly lifting friends and juniors with massive generosity.",
      "Entering Milestone Chapter 30 with stable wisdom, peak physical fitness, and cosmic prosperity."
    ],
    geminiWisdom: "Under Jupiter's divine watch in the 9th house, Ankit steps into his golden decade of maximum influence, ready to establish deep sovereign success! मङ्गलं भगवान् विष्णुः।",
    visualEmoji: "🦁",
    soundscapeDesc: "Elite orchestral drones blending into modern cinematic synthesizers."
  }
];

interface ThreeDecadesTimelineProps {
  playSFX: (type: "pop" | "sparkle") => void;
}

export default function ThreeDecadesTimeline({ playSFX }: ThreeDecadesTimelineProps) {
  const [activeDecadeId, setActiveDecadeId] = useState<string>("decade3");
  const activeDecade = DECADES.find(d => d.id === activeDecadeId) || DECADES[2];

  const handleDecadeClick = (id: string) => {
    setActiveDecadeId(id);
    playSFX("sparkle");
  };

  return (
    <div className="bg-[#030214]/90 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl" id="three_decades_biography_timeline_block">
      {/* Decorative starry aura overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-[#9945FF]/5 to-transparent blur-[60px] pointer-events-none -z-10" />

      <div className="max-w-xl mb-6">
        <span className="bg-yellow-500/10 text-yellow-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-yellow-500/20 mb-3 inline-block">
          TEMPORAL ODYSSEY • तीन स्वर्णिम दशक
        </span>
        <h3 className="font-display text-xl sm:text-2xl text-yellow-250 flex items-center gap-2 font-black select-none font-bold">
          <BookOpen className="w-6 h-6 text-yellow-500 animate-pulse" />
          <span>The Three Decades of Grace (1996 - 2026)</span>
        </h3>
        <p className="text-xs text-neutral-400 mt-1 select-none">
          Explore the chronological landmarks and astrological transformations shaping Ankit Singh&apos;s odyssey as he ingress-enters Milestone Chapter 30.
        </p>
      </div>

      {/* Horizontal timeline scale controls */}
      <div className="relative mb-8 flex justify-between items-center max-w-xl mx-auto px-4">
        {/* Horizontal background scale line */}
        <div className="absolute top-[22px] inset-x-8 h-[2px] bg-indigo-950/85 -z-10" />
        
        {DECADES.map((dec) => (
          <button
            key={dec.id}
            type="button"
            onClick={() => handleDecadeClick(dec.id)}
            className="flex flex-col items-center group relative outline-none"
            id={`timeline_node_${dec.id}`}
          >
            {/* Decadal node dot indicator */}
            <div 
              className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                activeDecadeId === dec.id 
                  ? "bg-[#0b0c2a] border-yellow-500 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.4)] scale-110" 
                  : "bg-neutral-950 border-indigo-950/60 text-neutral-500 hover:border-indigo-400/55 hover:text-neutral-300"
              }`}
            >
              <span className="text-[15px] select-none">{dec.visualEmoji}</span>
            </div>
            
            {/* Year Stamp */}
            <span 
              className={`font-space font-extrabold text-[10px] mt-2 tracking-wide transition ${
                activeDecadeId === dec.id ? "text-yellow-200" : "text-neutral-500 group-hover:text-neutral-300"
              }`}
            >
              {dec.years}
            </span>
          </button>
        ))}
      </div>

      {/* Dynamic Content Display Plate */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDecadeId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
          id={`timeline_decade_card_${activeDecadeId}`}
        >
          {/* Left Summary Grid Box */}
          <div className="md:col-span-7 bg-black/40 border border-indigo-950/60 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono tracking-widest uppercase mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeDecade.years} ERA</span>
              </div>
              <h4 className="font-display text-lg font-bold text-neutral-100 mb-2">
                {activeDecade.titleHindi}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4">
                {activeDecade.summary}
              </p>

              {/* Highlights */}
              <div className="space-y-2 mt-4 bg-[#050414] p-3.5 rounded-lg border border-indigo-950/40">
                <span className="text-[10px] font-mono text-[#d4af37] tracking-widest uppercase block font-bold">
                  🌟 MILESTONES SECURED:
                </span>
                <div className="space-y-1.5">
                  {activeDecade.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-[11px] text-neutral-300 font-sans leading-relaxed">
                      <ArrowRight className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-indigo-950/40 text-[9px] font-mono text-indigo-500 tracking-wider">
              <span>ACOUSTICS FREQUENCY: {activeDecade.soundscapeDesc}</span>
            </div>
          </div>

          {/* Right Astro Wisdom Shield */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#120516] to-[#04010a] border border-indigo-950 p-5 rounded-xl flex flex-col justify-between overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.02)_0%,_transparent_100%)] pointer-events-none" />
            
            <div className="flex justify-between items-center mb-4 select-none">
              <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ASTRA WISDOM PROFILE</span>
              </span>
              <span className="text-[8px] font-mono bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/30 text-yellow-300">
                Lagna Harmony
              </span>
            </div>

            {/* Quote block */}
            <div className="my-auto text-center py-4">
              <div className="text-3xl mb-2 animate-bounce">🧘</div>
              <p className="text-xs italic leading-relaxed text-yellow-101 font-sans">
                &quot;{activeDecade.geminiWisdom}&quot;
              </p>
            </div>

            {/* Sacred footer badge */}
            <div className="p-3 bg-black/60 border border-indigo-950/50 rounded-lg text-center mt-4">
              <p className="text-[10px] text-yellow-150 leading-relaxed font-sans font-bold uppercase tracking-widest">
                🏆 ORBIT SECURED WITH HIGHEST INTEGRITY
              </p>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
