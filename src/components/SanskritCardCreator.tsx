import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, BookOpen, Check, Copy, Gift, Sparkles, RefreshCw } from "lucide-react";

interface SanskritCardCreatorProps {
  playSFX: (type: "pop" | "sparkle") => void;
}

interface ShlokaOption {
  id: string;
  titleHindi: string;
  titleEng: string;
  shloka: string;
  meaning: string;
}

const SHLOKAS: ShlokaOption[] = [
  {
    id: "mrityunjaya",
    titleHindi: "महामृत्युंजय मंत्र (Protection & Longevity)",
    titleEng: "Maha-Mrityunjaya Mantra",
    shloka: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
    meaning: "We worship the three-eyed Lord Shiva, who is fragrant and nurtures all beings. May He liberate us from death and bondages, leading us to immortality and absolute spiritual wellness."
  },
  {
    id: "gayatri",
    titleHindi: "मंत्र सिद्धि व्यास आशीर्वाद (Wisdom & Intellectual Might)",
    titleEng: "Guru Saraswati Prapti",
    shloka: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
    meaning: "We meditate on the divine, all-pervading solar light who guides our intellect. May His gentle, brilliant rays illuminate Ankit's strategic pathways and inspire grand wisdom in this golden decade."
  },
  {
    id: "mangalam",
    titleHindi: "शुभ मंगल श्लोक (Auspicious Sovereign Prosperity)",
    titleEng: "Mangalam Shloka",
    shloka: "मङ्गलं भगवान् विष्णुः मङ्गलं गरुडध्वजः।\nमङ्गलं पुण्डरीकाक्षः मङ्गलायतनो हरिः॥",
    meaning: "Auspiciousness belongs to Lord Vishnu, auspiciousness to the one with the mount Garuda. May Ankit’s prime life be a divine reservoir of pure, continuous auspiciousness, growth, and joy."
  }
];

export default function SanskritCardCreator({ playSFX }: SanskritCardCreatorProps) {
  const [selectedShloka, setSelectedShloka] = useState<ShlokaOption>(SHLOKAS[0]);
  const [cardTheme, setCardTheme] = useState<"saffron" | "stardust" | "sandalwood">("saffron");
  const [dedicationFrom, setDedicationFrom] = useState("");
  const [isEngraved, setIsEngraved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEngrave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEngraved(true);
    playSFX("sparkle");
  };

  const handleCopyText = () => {
    const textToCopy = `✨ CELESTIAL BLESSINGS FOR ANKIT SINGH (CHAPTER 30) ✨\n\n` +
      `📖 Blessing: ${selectedShloka.titleEng}\n\n` +
      `"${selectedShloka.shloka}"\n\n` +
      `Meaning: ${selectedShloka.meaning}\n\n` +
      `🕊️ Dedicated with pure hearts by: ${dedicationFrom || "Your Dear wellwisher"}\n\n` +
      `🌌 Solstice Stars celebrate Ankit's entry into his Prime Golden Decade!`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    playSFX("pop");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setIsEngraved(false);
    setDedicationFrom("");
    playSFX("pop");
  };

  return (
    <div className="bg-[#030214]/90 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl" id="sanskrit_card_creator_block">
      {/* Background radial overlays */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-yellow-500/5 blur-[45px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-pink-500/5 blur-[45px] pointer-events-none" />

      {/* Title block */}
      <div className="max-w-xl mb-6">
        <span className="bg-yellow-500/10 text-yellow-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-yellow-500/20 mb-3 inline-block">
          SACRED BLESSING DESK • श्लोक चित्रकला मंच
        </span>
        <h3 className="font-display text-xl sm:text-2xl text-yellow-250 flex items-center gap-2 font-bold select-none">
          <Award className="w-6 h-6 text-yellow-500 animate-pulse" />
          <span>Sanskrit Shloka Blessing Creator</span>
        </h3>
        <p className="text-xs text-neutral-400 mt-1 select-none">
          Engrave a personalized Sanskrit mantra scroll with premium thematic card backing. Copy the finalized blessing code to send directly to Ankit!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Choice Selectors */}
        {!isEngraved ? (
          <form onSubmit={handleEngrave} className="lg:col-span-5 bg-black/40 border border-indigo-950/60 p-5 rounded-xl space-y-4">
            
            {/* Shloka Selector */}
            <div>
              <label className="block text-[10px] font-mono text-indigo-300 uppercase tracking-widest mb-1.5 font-bold">
                Select Sacred Blessing / श्लोक चुने
              </label>
              <div className="space-y-1.5">
                {SHLOKAS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedShloka(item);
                      playSFX("pop");
                    }}
                    className={`w-full p-2.5 rounded-lg border text-left transition duration-300 flex items-center justify-between text-xs ${
                      selectedShloka.id === item.id
                        ? "bg-yellow-500/10 border-yellow-500/40 text-yellow-200"
                        : "bg-neutral-950 border-neutral-900 text-neutral-400 hover:border-neutral-800"
                    }`}
                    id={`shloka_btn_${item.id}`}
                  >
                    <div className="leading-tight pr-1">
                      <span className="font-bold block text-[10px] sm:text-xs">{item.titleHindi}</span>
                      <span className="text-[8px] font-mono opacity-60 block mt-0.5">{item.titleEng}</span>
                    </div>
                    {selectedShloka.id === item.id && <Check className="w-3.5 h-3.5 text-yellow-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Design style choice */}
            <div>
              <label className="block text-[10px] font-mono text-indigo-300 uppercase tracking-widest mb-1.5 font-bold">
                Aesthetic Card Wrapping / चित्रक पृष्ठभूमि
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "saffron", label: "Saffron Gold" },
                  { id: "stardust", label: "Midnight Blue" },
                  { id: "sandalwood", label: "Parchment Silk" }
                ].map((tc) => (
                  <button
                    key={tc.id}
                    type="button"
                    onClick={() => {
                      setCardTheme(tc.id as any);
                      playSFX("pop");
                    }}
                    className={`p-2 rounded text-center text-[10px] font-mono border transition duration-300 ${
                      cardTheme === tc.id
                        ? "bg-yellow-500/10 border-yellow-500/40 text-yellow-300"
                        : "bg-neutral-950 border-neutral-900 text-neutral-400"
                    }`}
                    id={`card_theme_btn_${tc.id}`}
                  >
                    {tc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom dedication */}
            <div>
              <label className="block text-[10px] font-mono text-indigo-300 uppercase tracking-widest mb-1.5 font-bold">
                Your Signature / आपका नाम
              </label>
              <input
                type="text"
                required
                maxLength={40}
                value={dedicationFrom}
                onChange={(e) => setDedicationFrom(e.target.value)}
                placeholder="e.g. Your brother Shaurya"
                className="w-full text-xs bg-neutral-950 border border-indigo-900/40 rounded-lg p-2.5 text-neutral-200 outline-none focus:border-yellow-500/50 transition font-sans"
                id="sanskrit_author_input"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
              id="engrave_scroll_submit_btn"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Engrave & Seal Holy Plaque</span>
            </button>

          </form>
        ) : (
          /* Card engraved active display */
          <div className="lg:col-span-5 bg-black/40 border border-indigo-950/60 p-5 rounded-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-2 animate-bounce">
              ✓
            </div>
            <h4 className="font-space text-sm font-semibold text-neutral-200">Seal Engraved Successfully!</h4>
            <p className="text-xs text-neutral-405 font-sans leading-relaxed">
              Your sacred parchment has been encrypted on solid coordinates. Review your design on the canvas right side and copy text below.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyText}
                className="flex-grow py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition"
                id="copy_engraved_text_btn"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-yellow-350" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied Swaha!" : "Copy Holy Blessing"}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 bg-neutral-900 border border-neutral-700 hover:bg-neutral-850 rounded-lg text-neutral-300 text-xs transition"
                id="redo_engraving_btn"
              >
                Redo
              </button>
            </div>
          </div>
        )}

        {/* Right Preview canvas render */}
        <div className="lg:col-span-7 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={cardTheme}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`border-4 rounded-xl p-6 sm:p-8 relative shadow-2xl transition duration-500 min-h-[300px] flex flex-col justify-between w-full select-none ${
                cardTheme === "stardust"
                  ? "bg-gradient-to-br from-[#020216] via-[#090831] to-neutral-950 text-indigo-100 border-indigo-800/40"
                  : cardTheme === "sandalwood"
                  ? "bg-gradient-to-br from-[#1f160e] via-[#332214] to-[#120a05] text-[#ebd4be] border-[#c09971]/30"
                  : "bg-gradient-to-br from-[#1e0d04] via-[#4d2508] to-neutral-950 text-yellow-105 border-yellow-800/30"
              }`}
              id="blessing_canvas_preview_area"
            >
              {/* Gold borders mimicking dynamic leaf scrolls */}
              <div className="absolute top-1 right-1 font-mono text-[7px] text-yellow-600/50 uppercase tracking-widest">
                Milestone Chapter 30
              </div>
              
              {/* Inner scrolls graphics decor */}
              <div className="absolute inset-x-2 top-2 h-[2px] bg-gradient-to-r from-yellow-600/30 via-transparent to-yellow-600/30" />
              <div className="absolute inset-x-2 bottom-2 h-[2px] bg-gradient-to-r from-yellow-600/30 via-transparent to-yellow-600/30" />

              <div className="space-y-4 text-center">
                <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
                  {selectedShloka.titleEng.toUpperCase()}
                </span>
                
                {/* Visual calligraphy shloka block */}
                <div className="py-4 px-3 text-center bg-black/40 rounded-xl border border-yellow-905/10 shadow-inner">
                  <p className="text-sm sm:text-base md:text-lg font-bold text-yellow-300 italic whitespace-pre-line leading-relaxed tracking-wider font-display">
                    &quot;{selectedShloka.shloka}&quot;
                  </p>
                </div>

                <div className="h-[1px] bg-gradient-to-r from-transparent via-yellow-600/20 to-transparent" />

                <p className="text-xs italic leading-relaxed max-w-md mx-auto text-neutral-300 font-sans">
                  {selectedShloka.meaning}
                </p>
              </div>

              {/* Plaque footer */}
              <div className="mt-6 pt-3 border-t border-yellow-950/45 text-[10px] font-mono text-center flex justify-between text-neutral-400">
                <span>DEDICATED BY: <strong className="text-yellow-450 uppercase">{dedicationFrom || "A WELLWISHER"}</strong></span>
                <span>TAURUS SUN SOLSTICE</span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
