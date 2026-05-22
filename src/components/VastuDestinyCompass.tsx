import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Map, 
  Sparkles, 
  User, 
  Workflow, 
  CheckCircle, 
  Calculator, 
  Heart, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Sunset
} from "lucide-react";

interface VastuSector {
  direction: string;
  hindiName: string;
  deity: string;
  element: string;
  vibe: string;
  rulingPlanet: string;
  workspaceTip: string;
  alignmentRating: string;
  colorTheme: string;
  angle: number;
}

const VASTU_SECTORS: VastuSector[] = [
  {
    direction: "North",
    hindiName: "उत्तर दिशा (Kubera Sector)",
    deity: "Lord Kubera (Treasure & Abundance)",
    element: "Water (जल तत्व)",
    vibe: "Career surges, high-scaling startups, massive financial opportunities, and sovereign software consulting client inflow.",
    rulingPlanet: "Mercury (बुध देव - Speed & Writing Code)",
    workspaceTip: "Keep your laptop, high-priority ledgers, and cash registers in this sector. Keeps ideas extremely fresh and client streams flowing with steel-firm trust.",
    alignmentRating: "98% Auspicious",
    colorTheme: "from-emerald-950/40 via-teal-950/20 to-black/50 p-5 rounded-xl border border-emerald-500/20",
    angle: 0
  },
  {
    direction: "Northeast",
    hindiName: "ईशान कोण (Eshana Devastanam)",
    deity: "Lord Shiva (Supreme Mindfulness)",
    element: "Water & Ether (जल और आकाश)",
    vibe: "Supreme spiritual awakening, elite foresight, absolute clarity in high-pressure situations, and architectural wizardry.",
    rulingPlanet: "Jupiter (गुरु देव - Sovereign Knowledge & Wisdom)",
    workspaceTip: "This is the absolute divine locus of the home. Ideal for deep meditative pauses, writing core algorithms, and hosting strategic thinking sessions with your brothers.",
    alignmentRating: "100% Divine Harmony",
    colorTheme: "from-indigo-950/40 via-blue-950/20 to-black/50 p-5 rounded-xl border border-indigo-505/30",
    angle: 45
  },
  {
    direction: "East",
    hindiName: "पूर्व दिशा (Indra Portal)",
    deity: "Lord Indra (Sovereign Power & Kingship)",
    element: "Air & Sun Light (वायु और प्रकाश)",
    vibe: "Unstoppable public recognition, massive social status, unmatched administrative aura, inborn leadership amongst peers.",
    rulingPlanet: "Sun (सूर्य देव - Aura, Identity & Radiance)",
    workspaceTip: "Perfect sector to place outstanding awards, master diplomas, and family portrait frames. Facing East while coding ensures your output gets high-value recognition in global arenas.",
    alignmentRating: "96% Glorious Support",
    colorTheme: "from-amber-950/40 via-orange-950/20 to-black/50 p-5 rounded-xl border border-amber-500/20",
    angle: 90
  },
  {
    direction: "Southeast",
    hindiName: "आग्नेय कोण (Agni Sthala)",
    deity: "Lord Agni (Sacred Fire & Dynamo)",
    element: "Fire (अग्नि तत्व)",
    vibe: "High physical stamina, rapid problem execution, burning tech zeal, mental sharpness, and heavy calorie burn.",
    rulingPlanet: "Venus & Mars (शुक्र और मंगल - Passion & Vitality)",
    workspaceTip: "Keep core server units, high-performance computing hardware, or aesthetic copper candle clusters here. Agni fuels the active drive needed to pull off 48-hour sprints with effortless charm.",
    alignmentRating: "94% Dynamic Energy",
    colorTheme: "from-rose-950/40 via-orange-950/20 to-black/50 p-5 rounded-xl border border-rose-500/20",
    angle: 135
  }
];

interface VastuDestinyCompassProps {
  playSFX: (type: "pop" | "sparkle") => void;
}

export default function VastuDestinyCompass({ playSFX }: VastuDestinyCompassProps) {
  const [activeTab, setActiveTab] = useState<"vastu" | "numerology">("numerology");
  
  // Vastu interaction states
  const [selectedDirection, setSelectedDirection] = useState<string>("Northeast");
  const activeSector = VASTU_SECTORS.find(s => s.direction === selectedDirection) || VASTU_SECTORS[1];

  // Numerology states
  const [visitorBirthdate, setVisitorBirthdate] = useState("");
  const [compatibilityResult, setCompatibilityResult] = useState<{
    score: number;
    visitorNum: number;
    nature: string;
    relationship: string;
    description: string;
  } | null>(null);

  const handleDirectionSelect = (dir: string) => {
    setSelectedDirection(dir);
    playSFX("pop");
  };

  const calculateCompatibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorBirthdate) return;

    playSFX("sparkle");

    // Clean numbers from date input
    const cleanNumbers = visitorBirthdate.replace(/[^0-9]/g, "");
    let sum = 0;
    for (let char of cleanNumbers) {
      sum += parseInt(char, 10);
    }

    // Reduce to single digit for Destiny Number (unless 11 or 22, but standard Vedic goes to 1-9)
    const getSingleDigit = (n: number): number => {
      while (n > 9) {
        let temp = 0;
        const s = String(n);
        for (let char of s) {
          temp += parseInt(char, 10);
        }
        n = temp;
      }
      return n;
    };

    const visitorDestinyNumber = getSingleDigit(sum);

    // Calculate Birth Day Number (Radix) from the day portion
    const dayPart = parseInt(visitorBirthdate.split("-")[2] || "0", 10);
    const visitorBirthNumber = getSingleDigit(dayPart);

    // Let's create an elegant, fun Vedic numerology relationship dynamic with Ankit's core indices
    // Ankit's Mulank (Birth day 23 -> 5, Mercury) and Bhagyank (Destiny -> 8, Saturn)
    // Vedic Relationship Grid with Ankit's Number 5 (Mercury) and Number 8 (Saturn):
    let score = 0;
    let relationship = "";
    let nature = "";
    let description = "";

    switch (visitorBirthNumber) {
      case 1: // Sun
        score = 88;
        nature = "Sovereign Alignment (शाही तालमेल)";
        relationship = "Sun & Mercury (Mercury is highly friendly with Sun!)";
        description = "You bring a dynamic blazing fire that complements Ankit's cool-headed strategic logic perfectly. Together, you form an executive power couple capable of scaling massive systems with sheer willpower.";
        break;
      case 2: // Moon
        score = 82;
        nature = "Intuitive Reflection (संवेदनशील दर्पण)";
        relationship = "Empathy Mirror (Cancer Moon connection)";
        description = "Deep emotional resonance. Ankit's soft Cancer Moon (Pushya) feels immediately understood by your supportive and healing lunar vibrations. A friendship based on quiet trust and unconditional backing.";
        break;
      case 3: // Jupiter
        score = 90;
        nature = "Mentor Synergy (दिव्य विद्या मेल)";
        relationship = "Gyan Yoga (Jupiter & Saturn/Mercury harmony)";
        description = "High intellectual and professional compatibility. Jupiter provides grand philosophical guidance that aligns beautifully with Ankit's analytical mindset. Ideal partners for discussing dharma and startup ideas.";
        break;
      case 4: // Rahu
        score = 78;
        nature = "Lightning Catalyst (अचानक बदलाव संवेग)";
        relationship = "Rahu & Mercury Quick Spark";
        description = "Highly unconventional, exciting, and filled with hyper-creative software hacks. Rahu loves Mercury's speedy compute capability. Beware of communications loops; keep agreements transparent.";
        break;
      case 5: // Mercury (Double 5!)
        score = 99;
        nature = "Intellectual Twins (बुद्धि का महाधमाका)";
        relationship = "Mercury-Mercury Mirror Resonance";
        description = "Absolute gold alignment! You share the identical lightning mental speed, love for humorous banter, and quick-witted solutions. Conversing with Ankit feels like a high-speed telemetry feed of pure joy.";
        break;
      case 6: // Venus
        score = 95;
        nature = "Aesthetic Abundance (सुंदर विलास योग)";
        relationship = "Venus & Mercury Premium Comforts";
        description = "Highly harmonious! Venus and Mercury are absolute bosom friends. You both love sophisticated tech, elegant graphic interfaces, luxury cars, and grand gourmet dinners. Together you attract cosmic comforts.";
        break;
      case 7: // Ketu
        score = 85;
        nature = "Mystical Concord (आध्यात्मिक जुड़ाव)";
        relationship = "Ketu & Saturn spiritual anchors";
        description = "Deep metaphysical friendship. Your intuitive understanding of hidden patterns feeds seamlessly into Ankit's structured problem solving. You both easily grasp the unspoken feelings of those around you.";
        break;
      case 8: // Saturn (Same as Destiny 8!)
        score = 92;
        nature = "The Steel Pillars (शनिवार वज्र मित्रता)";
        relationship = "Saturn Shielding Alliance";
        description = "An alliance written in stone. Dominated by Lord Saturn, this bond values deep-loyalty, long-term investments, and unwavering commitment over decades. You are the shielding force during life's high winds.";
        break;
      case 9: // Mars
        score = 75;
        nature = "The Fire & Logic Duel (तेजस्वी कर्म द्वंद्व)";
        relationship = "Mars & Saturn challenge vectors";
        description = "Exciting, action-oriented, and dynamic. Mars drives fast execution, but occasionally triggers Saturn's careful review systems. With mindful patience, you can co-pioneer revolutionary software backends.";
        break;
      default:
        score = 80;
        nature = "Auspicious Resonance (शुभ मैत्री)";
        relationship = "Planetary Harmony Grid";
        description = "A warm, protective bond that fits beautifully into the grand tapestry of Ankit's milestone orbit.";
    }

    setCompatibilityResult({
      score,
      visitorNum: visitorBirthNumber,
      nature,
      relationship,
      description
    });
  };

  return (
    <div className="bg-[#030214]/95 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl" id="vastu_destiny_compass_block">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-amber-500/5 blur-[80px] pointer-events-none" />

      {/* Title block */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-950/50 pb-5 mb-6">
        <div>
          <span className="bg-emerald-500/10 text-emerald-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-emerald-500/20 mb-2 inline-block">
            COSMIC COMPASS • वास्तु एवं अंक ज्योतिष
          </span>
          <h3 className="font-display text-xl sm:text-2xl text-yellow-250 font-black flex items-center gap-2 select-none">
            <Compass className="w-6 h-6 text-emerald-400 animate-spin-slow" />
            <span>Astro-Vastu & Destiny Numerology Hub</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Dive into the sacred geometry of Ankit Singh&apos;s workspace layout and calculate your own birthday compatibility with his cosmic Mercury-Saturn grid!
          </p>
        </div>

        {/* Tab triggers */}
        <div className="flex gap-1 bg-black/40 border border-indigo-950/80 p-1 rounded-lg">
          <button
            onClick={() => {
              setActiveTab("numerology");
              playSFX("pop");
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "numerology"
                ? "bg-emerald-500 text-black font-extrabold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            अंक ज्योतिष (Numerology)
          </button>
          <button
            onClick={() => {
              setActiveTab("vastu");
              playSFX("pop");
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "vastu"
                ? "bg-emerald-500 text-black font-extrabold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            वास्तु दिशा (Vastu Dial)
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="min-h-[380px]">
        {activeTab === "numerology" ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch" id="vastu_destiny_num_tab_view">
            {/* Left: Ankit's core numbers and explanations */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <h4 className="font-display text-sm font-bold text-yellow-150 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Ankit&apos;s Astrological Core Numbers</span>
                </h4>

                {/* Number grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/60 border border-indigo-950 p-4 rounded-xl text-center group hover:border-emerald-500/25 transition">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block tracking-wider">
                      मूलांक (Birth Day Key)
                    </span>
                    <strong className="text-3xl font-display font-black text-emerald-400 block my-1">
                      5
                    </strong>
                    <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-wider">
                      Ruling: Mercury (बुध)
                    </span>
                    <p className="text-[10px] text-neutral-400 leading-normal mt-2">
                      Governs lightning analytical speed, beautiful speech charisma, high-IQ logic, and tech master craftsmanship.
                    </p>
                  </div>

                  <div className="bg-black/60 border border-indigo-950 p-4 rounded-xl text-center group hover:border-emerald-500/25 transition">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block tracking-wider">
                      भाग्यांक (Destiny Key)
                    </span>
                    <strong className="text-3xl font-display font-black text-emerald-400 block my-1">
                      8
                    </strong>
                    <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-wider">
                      Ruling: Saturn (शनि)
                    </span>
                    <p className="text-[10px] text-neutral-400 leading-normal mt-2">
                      Ensures supreme persistence, deep loyalty, solid software architecture skills, and massive long-term success.
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-950/50 p-3.5 rounded-lg border border-indigo-950 text-xs leading-relaxed text-zinc-300">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold block mb-1">
                    🌟 PLANETARY BALANCE:
                  </span>
                  Ankit Singh enters chapter thirty under a pristine planetary synchronization where the speed of Mercury and the heavy authority of Saturn balance to yield monumental growth.
                </div>
              </div>
            </div>

            {/* Right: Compatibility Calculator */}
            <div className="md:col-span-6 bg-black/40 border border-indigo-950/85 p-6 rounded-xl flex flex-col justify-between">
              <div>
                <h4 className="font-display text-sm font-bold text-neutral-200 flex items-center gap-2 mb-3">
                  <Calculator className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Vedic Friendship Resonance Matcher</span>
                </h4>
                <p className="text-xs text-neutral-400 mb-4">
                  Enter your birthday below. We will calculate your Radix birth number and instantly predict your friendship compatibility rating with Ankit&apos;s core!
                </p>

                <form onSubmit={calculateCompatibility} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="date"
                      required
                      value={visitorBirthdate}
                      onChange={(e) => setVisitorBirthdate(e.target.value)}
                      className="bg-neutral-950 border border-indigo-900/60 rounded px-3 py-2 text-xs text-zinc-200 outline-none focus:border-emerald-500 flex-grow placeholder-neutral-600 cursor-pointer"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-400 text-black font-space font-extrabold text-xs px-4 py-2 rounded shadow-lg transition"
                      id="compatibility_calc_btn"
                    >
                      Sync Now
                    </button>
                  </div>
                </form>

                <AnimatePresence mode="wait">
                  {compatibilityResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 space-y-3 border-t border-indigo-950 pt-4"
                      id="compatibility_result_plate"
                    >
                      <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                        <div>
                          <span className="text-[8px] font-mono text-emerald-400 uppercase block">YOUR BIRTH ROOT NUMBER:</span>
                          <span className="text-xs font-bold font-mono text-neutral-200">Root Number {compatibilityResult.visitorNum}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-mono text-yellow-500 uppercase block">COMPATIBILITY POWER:</span>
                          <span className="text-sm font-black font-mono text-emerald-400">{compatibilityResult.score}% Resonance</span>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-indigo-950 p-3 rounded-lg text-xs space-y-1.5">
                        <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-extrabold block">
                          DYNAMIC: {compatibilityResult.nature}
                        </span>
                        <p className="text-neutral-300 font-sans leading-relaxed text-[11px]">
                          {compatibilityResult.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!compatibilityResult && (
                <div className="mt-8 text-center text-[10px] font-mono text-neutral-500">
                  ★ CALCULATOR IS PRIVATE & LOCAL • DATA NEVER TRANSMITTED ★
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center" id="vastu_compass_tab_view">
            {/* Left: The interactive rotating compass wheel */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-64 bg-neutral-950/70 border border-indigo-950 rounded-full flex items-center justify-center p-6 shadow-inner">
                {/* Visual wheel ring turning with respect to selected sector angle */}
                <motion.div 
                  animate={{ rotate: -activeSector.angle }}
                  transition={{ type: "spring", stiffness: 70, damping: 15 }}
                  className="absolute inset-[15px] border-2 border-emerald-500/10 rounded-full flex items-center justify-center"
                >
                  {/* Cardinal points label on the outer ring */}
                  <span className="absolute top-1 text-[10px] font-mono text-emerald-400/60 font-bold">N</span>
                  <span className="absolute bottom-1 text-[10px] font-mono text-emerald-400/60 font-bold">S</span>
                  <span className="absolute right-1 text-[10px] font-mono text-emerald-400/60 font-bold">E</span>
                  <span className="absolute left-1 text-[10px] font-mono text-emerald-400/60 font-bold">W</span>

                  {/* Inner diamond cross wires */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.01)_0%,_transparent_100%)] pointer-events-none" />
                  <div className="absolute top-1/2 inset-x-2 h-[1px] bg-indigo-950/80" />
                  <div className="absolute left-1/2 inset-y-2 w-[1px] bg-indigo-950/80" />
                  
                  {/* Subtle golden arrow pointer */}
                  <motion.div 
                    className="absolute -top-1 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-yellow-500"
                  />
                </motion.div>

                {/* Clickable sector triggers inside circle */}
                <div className="relative z-10 grid grid-cols-2 gap-2 text-[10px] font-mono">
                  {VASTU_SECTORS.map((sec) => (
                    <button
                      key={sec.direction}
                      onClick={() => handleDirectionSelect(sec.direction)}
                      className={`px-2 py-2 rounded-lg border text-center transition-all ${
                        selectedDirection === sec.direction
                          ? "bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-md scale-105"
                          : "bg-black/75 text-neutral-400 border-indigo-950 hover:text-white"
                      }`}
                      id={`vastu_btn_${sec.direction}`}
                    >
                      {sec.direction}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-[9px] font-mono text-emerald-500/60 uppercase tracking-widest mt-4">
                ★ CHOOSE CARDINAL DIRECTION ★
              </span>
            </div>

            {/* Right: Dynamic prediction panels */}
            <div className="md:col-span-7 h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDirection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className={`bg-gradient-to-br ${activeSector.colorTheme} flex flex-col justify-between h-full space-y-4`}
                  id={`vastu_sector_card_${selectedDirection}`}
                >
                  <div>
                    <div className="flex justify-between items-center border-b border-indigo-900/30 pb-3 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Map className="w-5 h-5 text-emerald-400 animate-pulse" />
                        <span className="font-display text-sm font-extrabold text-neutral-100">
                          {activeSector.hindiName}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 text-right">
                        {activeSector.alignmentRating}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono text-neutral-400 mb-4">
                      <div>
                        <span className="text-emerald-400 text-[9px] tracking-wider uppercase block font-bold">Sector Deity:</span>
                        <span className="text-zinc-200">{activeSector.deity}</span>
                      </div>
                      <div>
                        <span className="text-emerald-400 text-[9px] tracking-wider uppercase block font-bold">Natural Element:</span>
                        <span className="text-zinc-200">{activeSector.element}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] font-mono text-yellow-500 tracking-widest uppercase block font-bold mb-1">
                          COSMIC SPHERE OF INFLUENCE:
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          {activeSector.vibe}
                        </p>
                      </div>

                      <div className="p-3 bg-black/40 rounded-lg border border-indigo-950">
                        <span className="text-[9px] font-mono text-yellow-500 tracking-widest uppercase block font-bold mb-1">
                          WORKSPACE WORKAROUND & CODING SETUP:
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans italic">
                          &quot;{activeSector.workspaceTip}&quot;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-indigo-900/10 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                    <span>Ruling Celestial: {activeSector.rulingPlanet}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Sovereign Guard</span>
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
