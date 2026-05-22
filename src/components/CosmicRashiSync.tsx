import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, RefreshCw, Check, Stars, Moon, Compass } from "lucide-react";

interface CosmicRashiSyncProps {
  playSFX: (type: "pop" | "sparkle") => void;
}

interface RashiInfo {
  id: string;
  nameHindi: string;
  nameEng: string;
  element: "Water" | "Earth" | "Air" | "Fire";
  rulingPlanet: string;
  symbol: string;
}

const RASHIS: RashiInfo[] = [
  { id: "mesh", nameHindi: "मेष", nameEng: "Aries", element: "Fire", rulingPlanet: "Mars (मंगल)", symbol: "♈" },
  { id: "vrishabh", nameHindi: "वृषभ", nameEng: "Taurus", element: "Earth", rulingPlanet: "Venus (शुक्र)", symbol: "♉" },
  { id: "mithun", nameHindi: "मिथुन", nameEng: "Gemini", element: "Air", rulingPlanet: "Mercury (बुध)", symbol: "♊" },
  { id: "kark", nameHindi: "कर्क", nameEng: "Cancer", element: "Water", rulingPlanet: "Moon (चंद्र देव)", symbol: "♋" },
  { id: "simha", nameHindi: "सिंह", nameEng: "Leo", element: "Fire", rulingPlanet: "Sun (सूर्य)", symbol: "♌" },
  { id: "kanya", nameHindi: "कन्या", nameEng: "Virgo", element: "Earth", rulingPlanet: "Mercury (बुध)", symbol: "♍" },
  { id: "tula", nameHindi: "तुला", nameEng: "Libra", element: "Air", rulingPlanet: "Venus (शुक्र)", symbol: "♎" },
  { id: "vrishchik", nameHindi: "वृश्चिक", nameEng: "Scorpio", element: "Water", rulingPlanet: "Mars/Pluto", symbol: "♏" },
  { id: "dhanu", nameHindi: "धनु", nameEng: "Sagittarius", element: "Fire", rulingPlanet: "Jupiter (गुरु)", symbol: "♐" },
  { id: "makar", nameHindi: "मकर", nameEng: "Capricorn", element: "Earth", rulingPlanet: "Saturn (शनि)", symbol: "♑" },
  { id: "kumbha", nameHindi: "कुंभ", nameEng: "Aquarius", element: "Air", rulingPlanet: "Saturn/Uranus", symbol: "♒" },
  { id: "meen", nameHindi: "मीन", nameEng: "Pisces", element: "Water", rulingPlanet: "Jupiter/Neptune", symbol: "♓" }
];

export default function CosmicRashiSync({ playSFX }: CosmicRashiSyncProps) {
  const [userName, setUserName] = useState("");
  const [selectedRashi, setSelectedRashi] = useState<RashiInfo | null>(null);
  const [syncPercentage, setSyncPercentage] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [reading, setReading] = useState("");
  const [challenges, setChallenges] = useState<string[]>([]);

  const handleCalculateSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRashi) return;
    
    setIsCalculating(true);
    playSFX("sparkle");

    setTimeout(() => {
      // Compatibility Logic (with Ankit's Water element Rashi: Cancer / Nakshatra Pushya)
      let baseScore = 70;
      let calculatedReading = "";
      let recommendedChallenges: string[] = [];

      const visitorName = userName.trim() || 'शुभचिंतक (Wellwisher)';

      switch (selectedRashi.element) {
        case "Water": // Water + Water
          baseScore = Math.floor(Math.random() * 5) + 94; // 94 - 98%
          calculatedReading = `Incredible Harmony! Your flowing ${selectedRashi.nameEng} Water element merges beautifully with Ankit's deep Cancerian Ocean. Both of you thrive on profound empathy, unspoken understandings, and a fiercely loyal bond that resists any earthly storm.`;
          recommendedChallenges = [
            `Send ${AnkitPronoun()} a surprise middle-of-the-night voice note sharing a nostalgic inside joke.`,
            `Promise a dynamic evening meetups over hot chai, letting conversations float for hours.`,
            `Gift them a silver coin or pearl accent to honor your shared lunar connection.`
          ];
          break;
        case "Earth": // Water + Earth
          baseScore = Math.floor(Math.random() * 5) + 87; // 87 - 91%
          calculatedReading = `The Nurturing Shore! Your solid ${selectedRashi.nameEng} Earth element provides the stable, beautiful riverbanks that structure and comfort Ankit's infinite emotional tide. You grounded him, while he nourishes your secret high aspirations.`;
          recommendedChallenges = [
            `Buy ${AnkitPronoun()} sand-baked local kulhad sweets as an organic ground-sweet celebration.`,
            `Set an absolute silent pact: Call them if they are in trouble, standing like an unshakable wall.`,
            `Collaborate on a long-term grand project together — your combined output is practically invincible!`
          ];
          break;
        case "Air": // Water + Air
          baseScore = Math.floor(Math.random() * 8) + 75; // 75 - 82%
          calculatedReading = `The Whispering Breeze! Your versatile ${selectedRashi.nameEng} Air element stirs beautiful creative ripples on Ankit's receptive waters. Your quick-witted conversations spark absolute joy, keeping his deep mind forever curious and engaged.`;
          recommendedChallenges = [
            `Pen a funny, highly dramatic poem celebrating their milestone orbit 30 and publish it in your chats!`,
            `Introduce him to an obscure, rare retro music playlist or futuristic sci-fi movie.`,
            `Initiate a rapid-fire verbal trivia challenge in person — laughter is guaranteed!`
          ];
          break;
        case "Fire": // Water + Fire
          baseScore = Math.floor(Math.random() * 6) + 65; // 65 - 70%
          calculatedReading = `The Steam Catalyst! Your blazing ${selectedRashi.nameEng} Fire element heats up and accelerates Ankit's passive, peaceful Cancer calm, converting it into high-energy action. Beware of temporary splatters, but admire the immense drive and passion you bring out of each other.`;
          recommendedChallenges = [
            `Plan an exciting, energetic day-trip or a spontaneous road trip with high-tempo dhol beats.`,
            `Remind ${AnkitPronoun()} to take a mindful breath when they are working too hard in their absolute prime.`,
            `Gift them a designer incense set or copper item to harmonize fire & water energies.`
          ];
          break;
      }

      setSyncPercentage(baseScore);
      setReading(calculatedReading);
      setChallenges(recommendedChallenges);
      setIsCalculating(false);
      playSFX("pop");
    }, 1200);
  };

  const AnkitPronoun = () => "Ankit";

  const handleReset = () => {
    setUserName("");
    setSelectedRashi(null);
    setSyncPercentage(null);
    setReading("");
    setChallenges([]);
    playSFX("pop");
  };

  return (
    <div className="bg-[#030214]/90 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl" id="cosmic_rashi_sync_block">
      {/* Visual background decor */}
      <div className="absolute top-0 left-0 w-36 h-36 rounded-full bg-indigo-500/5 blur-[45px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-36 h-36 rounded-full bg-yellow-500/5 blur-[45px] pointer-events-none" />

      <div className="max-w-xl mb-6">
        <span className="bg-yellow-500/10 text-yellow-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-yellow-500/20 mb-3 inline-block">
          ZODIAC RESONANCE • राशि मैत्री चक्र
        </span>
        <h3 className="font-display text-xl sm:text-2xl text-yellow-200 flex items-center gap-2 font-bold select-none">
          <Moon className="w-6 h-6 text-yellow-500 animate-pulse" />
          <span>Vedic Friendship Sync Meter</span>
        </h3>
        <p className="text-xs text-neutral-400 mt-1 select-none">
          Determine your elemental synergy and compatibility with Ankit Singh's Cancer/Pushya solar footprint!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form controls */}
        <div className="lg:col-span-5 bg-black/40 border border-indigo-950/60 p-5 rounded-xl">
          <form onSubmit={handleCalculateSync} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-indigo-300 uppercase tracking-widest mb-1.5 font-bold">
                Your Earth Name / आपका नाम
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full text-xs bg-neutral-950 border border-indigo-900/40 rounded-lg p-2.5 text-neutral-200 outline-none focus:border-yellow-500/50 transition-all font-sans"
                id="sync_user_name_input"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-indigo-300 uppercase tracking-widest mb-1.5 font-bold">
                Select Your Moon Rashi / राशि चुने
              </label>
              <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {RASHIS.map((rashi) => (
                  <button
                    key={rashi.id}
                    type="button"
                    onClick={() => {
                      setSelectedRashi(rashi);
                      playSFX("pop");
                    }}
                    className={`p-2 rounded text-left border flex flex-col justify-between transition-all duration-300 ${
                      selectedRashi?.id === rashi.id
                        ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-200"
                        : "bg-neutral-950/85 border-neutral-900 text-neutral-400 hover:border-neutral-800"
                    }`}
                    id={`rashi_btn_${rashi.id}`}
                  >
                    <span className="text-sm self-end opacity-80">{rashi.symbol}</span>
                    <div className="leading-tight">
                      <span className="text-[10px] font-bold block">{rashi.nameHindi}</span>
                      <span className="text-[8px] font-mono opacity-60 block">{rashi.nameEng}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isCalculating || !selectedRashi || !userName.trim()}
                className="w-full py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 border border-indigo-700/40 transition duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                id="calculate_sync_submit_btn"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Star Grids...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                    <span>Calculate Aura Alignment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Output results representation */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {syncPercentage !== null && selectedRashi ? (
              <motion.div
                key="sync_results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-br from-[#0c051a] to-[#04010a] border border-indigo-950 p-5 rounded-xl flex flex-col gap-5 h-full relative"
              >
                <div className="flex flex-col sm:flex-row items-center gap-5 justify-between">
                  <div className="text-center sm:text-left">
                    <h4 className="text-sm font-space font-extrabold text-neutral-100 flex items-center gap-1.5 justify-center sm:justify-start">
                      <Stars className="w-4 h-4 text-yellow-400" />
                      <span>{userName || "Wellwisher"}&apos;s Sync Index</span>
                    </h4>
                    <span className="text-[10px] font-mono text-indigo-400 block mt-1">
                      {selectedRashi.symbol} {selectedRashi.nameHindi} ({selectedRashi.element} Element) ↔ कर्क (Water)
                    </span>
                  </div>

                  {/* Circular Dial Indicator with Framer Motion */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="38"
                        stroke="#1e1b4b"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="38"
                        stroke="#eab308"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 38}
                        initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 38 * (1 - syncPercentage / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-space font-black text-2xl text-yellow-200 tabular-nums">{syncPercentage}%</span>
                      <span className="text-[7px] text-neutral-500 font-mono uppercase tracking-widest">Aura Sync</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-black/40 border border-indigo-950/60 rounded-lg text-xs leading-relaxed text-neutral-300 font-sans">
                  {reading}
                </div>

                {/* Challenges */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-[#d4af37] tracking-widest uppercase block font-bold">
                    🚀 AUSPICIOUS BONDING MISSION FOR YOU:
                  </span>
                  <div className="space-y-1.5">
                    {challenges.map((challenge, cId) => (
                      <div key={cId} className="flex items-start gap-2 text-[11px] text-neutral-405 font-sans leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[10px] font-mono text-neutral-500 hover:text-yellow-405 flex items-center gap-1 transition"
                  >
                    <span>Recalculate Alignment</span>
                    <span>↺</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sync_intro"
                className="bg-black/30 border border-dashed border-indigo-950/60 rounded-xl p-8 flex flex-col items-center justify-center text-center h-[320px]"
              >
                <div className="w-14 h-14 rounded-full bg-indigo-950/20 border border-indigo-900/20 flex items-center justify-center text-indigo-400 mb-4 animate-pulse">
                  🔮
                </div>
                <h4 className="font-space text-sm font-semibold text-neutral-300">Resonance Shield Idle</h4>
                <p className="text-xs text-neutral-500 max-w-sm mt-1.5 leading-relaxed font-sans">
                  Provide your Earth name and select your moon sign on the left console panel to evaluate your spiritual sync matrix with Ankit Singh.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
