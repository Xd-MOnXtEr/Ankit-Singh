import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, Compass, Camera, ZoomIn, ArrowLeft, ArrowRight, X } from "lucide-react";

interface PolaroidGalleryShowcaseProps {
  playSFX: (type: "pop" | "sparkle") => void;
}

interface PhotoMemory {
  id: string;
  imageUrl: string;
  hindiCaption: string;
  englishCaption: string;
  category: "allies" | "adventure" | "peak" | "all";
  tag: string;
  location: string;
  astralSync: string;
  detailedStory: string;
}

const POLAROID_PHOTOS: PhotoMemory[] = [
  {
    id: "photo1",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468196653-e013ff4b-5888-4158-aeb0-a8c56860da31.jpg",
    hindiCaption: "अनंत हँसी और बेफिक्र बातें ❤️",
    englishCaption: "Midnight laughter and golden conversations.",
    category: "allies",
    tag: "Heartfelt Bonds",
    location: "Siddharth Vihar Corridor",
    astralSync: "Chandra Moon 4th House (Domestic Happiness)",
    detailedStory: "A classic candid captured in the absolute peak of warmth. This photo encapsulates those golden hours where time stood still, and the simplicity of pure companionship dissolved every earthly concern."
  },
  {
    id: "photo2",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468245108-ea85eaeb-b8ff-40d9-ac8a-1653be8ffb48.jpg",
    hindiCaption: "नीले आसमान तले नए ख्वाब 🌌",
    englishCaption: "Chasing pristine dreams under broad daylight.",
    category: "adventure",
    tag: "Aspirations",
    location: "Varanasi Ganges Concourse",
    astralSync: "Jupiter in 9th (Dharma & Celestial expansion)",
    detailedStory: "Standing under the high blue canopy, this frame registers a precious moment of absolute perspective. Like flowing water, our group plans and visions surged with quiet trust for the stellar decade ahead."
  },
  {
    id: "photo3",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468370196-a96f25f3-372b-4485-a1b5-fbb2228b58ac.jpg",
    hindiCaption: "अटूट विश्वास और साया बनकर चलना 🤝",
    englishCaption: "Inseparable allies, shielding against the wind.",
    category: "allies",
    tag: "Brotherhood Steel",
    location: "The Strategic Hub",
    astralSync: "Saturn 7th House (Indestructible Alliances)",
    detailedStory: "A direct testament to loyalty. Out of all stellar constellations, true friendship remains the strongest shielding system on Earth. Here, Ankit and his brothers stand as an unbreakable wall."
  },
  {
    id: "photo4",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468409065-902be70d-d9e2-4f4c-9c64-7814008ab5fa.jpg",
    hindiCaption: "नक्षत्रों सा चमकता याराना ⭐",
    englishCaption: "Resonant alignment as permanent as stars.",
    category: "adventure",
    tag: "Infinite Synergy",
    location: "The Solstice Heights",
    astralSync: "Venus 4th House (Aesthetic & Emotional Abundance)",
    detailedStory: "A cheerful, vibrant sunset rendezvous that captured high energies, endless chuckles, and the rare mutual alignment that defines our elite childhood circles."
  },
  {
    id: "photo5",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468023662-6281e8f6-6640-47aa-b8ca-71c96ce747fd.jpg",
    hindiCaption: "उम्मीदों और नए कदमों का कारवां 🚀",
    englishCaption: "Charting pathways towards software conquest.",
    category: "peak",
    tag: "Tech Sovereignty",
    location: "Cloud Scaling Labs",
    astralSync: "Mars in 10th House (Executive Domination)",
    detailedStory: "Behind the software systems lies a relentless engine of technical execution. This frame immortalizes a highly productive design phase where major startup frameworks were engineered into reality."
  },
  {
    id: "photo6",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468579100-6dd3fe63-8ddf-43bb-8451-b29957e3ea1b.jpg",
    hindiCaption: "30वे सौर चक्र की महान शुरुआत 👑",
    englishCaption: "Ingress-entering his absolute prime era.",
    category: "peak",
    tag: "Chapter 30 Sovereign",
    location: "The Millennium Stage",
    astralSync: "Sun in 2nd House (Radiant Intellectual Treasury)",
    detailedStory: "The definitive landmark portrait celebrating his transition into the golden age. Clean composure, deep determination, and the secure aura of a modern Vedic leader ready to conquer his prime."
  }
];

export default function PolaroidGalleryShowcase({ playSFX }: PolaroidGalleryShowcaseProps) {
  const [filter, setFilter] = useState<"all" | "allies" | "adventure" | "peak">("all");
  const [activePhoto, setActivePhoto] = useState<PhotoMemory | null>(null);

  const filteredPhotos = filter === "all" 
    ? POLAROID_PHOTOS 
    : POLAROID_PHOTOS.filter(p => p.category === filter);

  const handlePhotoClick = (photo: PhotoMemory) => {
    setActivePhoto(photo);
    playSFX("sparkle");
  };

  const handleCloseLightbox = () => {
    setActivePhoto(null);
    playSFX("pop");
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!activePhoto) return;
    const currentIndex = POLAROID_PHOTOS.findIndex(p => p.id === activePhoto.id);
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= POLAROID_PHOTOS.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = POLAROID_PHOTOS.length - 1;

    setActivePhoto(POLAROID_PHOTOS[nextIndex]);
    playSFX("sparkle");
  };

  return (
    <div className="bg-[#030214]/90 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl" id="polaroid_interactive_memories_spotlight">
      {/* Decorative cosmic aura halos */}
      <div className="absolute top-0 right-1/4 w-52 h-52 bg-indigo-500/5 blur-[55px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-52 h-52 bg-pink-500/5 blur-[55px] pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-955/50 pb-5 mb-6">
        <div>
          <span className="bg-rose-500/10 text-rose-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-rose-500/20 mb-2 inline-block">
            MEMENTOS • स्मृतियों का झरोखा
          </span>
          <h3 className="font-display text-xl sm:text-2xl text-yellow-200 font-extrabold flex items-center gap-2 select-none">
            <Camera className="w-6 h-6 text-yellow-500 animate-pulse" />
            <span>Interactive Polaroid Nostalgia Desk</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Hover, tilt, and tap these premium photographic cards mapping Ankit&apos;s stellar lifespan.
          </p>
        </div>

        {/* Categories Tab Pill Controllers */}
        <div className="flex flex-wrap gap-1.5 bg-black/40 border border-indigo-950/80 p-1 rounded-lg select-none">
          {[
            { id: "all", label: "All Memories" },
            { id: "allies", label: "Brotherhood" },
            { id: "adventure", label: "Pathways" },
            { id: "peak", label: "The Zenith" }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                setFilter(btn.id as any);
                playSFX("pop");
              }}
              className={`text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded transition-all ${
                filter === btn.id
                  ? "bg-yellow-500 text-black font-extrabold shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
              id={`polaroid_filter_${btn.id}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid containing high impact polaroids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center py-4 px-1" id="polaroid_shelf_grid">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => {
            // Alternating natural structural tilt angles for classic physics-board look
            const tilts = [
              "-rotate-2 hover:rotate-2 hover:scale-[1.025] hover:-translate-y-2",
              "rotate-3 hover:rotate-[-2deg] hover:scale-[1.025] hover:-translate-y-2",
              "-rotate-1 hover:rotate-3 hover:scale-[1.025] hover:-translate-y-2",
              "rotate-2 hover:rotate-[-1deg] hover:scale-[1.025] hover:-translate-y-2",
              "-rotate-3 hover:rotate-1 hover:scale-[1.025] hover:-translate-y-2"
            ];
            const activeTilt = tilts[index % tilts.length];

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                onClick={() => handlePhotoClick(photo)}
                className={`cursor-pointer bg-[#faf8f5] text-neutral-950 p-4 pb-8 rounded shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-neutral-300 relative transition-all duration-300 select-none group transform ${activeTilt}`}
                id={`polaroid_frame_${photo.id}`}
              >
                {/* Washi pin tape simulation at top */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-yellow-500/15 border border-yellow-500/10 skew-x-12 opacity-85 select-none pointer-events-none" />

                {/* Main high fidelity image display with modern zoom effect on hover */}
                <div className="relative aspect-[4/3] w-full bg-neutral-900 rounded-sm overflow-hidden border border-neutral-200/60 shadow-inner group">
                  <img
                    src={photo.imageUrl}
                    alt={photo.englishCaption}
                    className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1"
                    referrerPolicy="no-referrer"
                  />
                  {/* Absolute badge mapping location */}
                  <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[8px] font-mono tracking-wider text-yellow-300 flex items-center gap-1">
                    <Compass className="w-2.5 h-2.5 text-yellow-500 animate-pulse" />
                    <span>{photo.location}</span>
                  </div>
                  {/* Subtle Zoom Hover Icon overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hand-lettered marker font style labeling */}
                <div className="mt-4 pt-1.5 text-center">
                  <p className="font-sans font-bold text-sm tracking-tight text-neutral-900 leading-tight">
                    {photo.hindiCaption}
                  </p>
                  <p className="font-serif text-[11px] leading-tight text-neutral-500 mt-1 italic">
                    &quot;{photo.englishCaption}&quot;
                  </p>
                </div>

                {/* Retro polaroid timestamp bar */}
                <div className="absolute bottom-1 right-2 text-[7px] font-mono uppercase tracking-widest text-neutral-400">
                  {photo.tag}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* FULL SCREEN IMMERSIVE COSMIC LIGHTBOX PORTAL */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 bg-neutral-950/98 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 sm:p-6"
            id="polaroid_lightbox_portal"
          >
            {/* Close button absolute control */}
            <button
              type="button"
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/5 hover:bg-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 outline-none hover:scale-105"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left/Right Absolute Arrows for dynamic cycling */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto("prev");
              }}
              className="absolute left-2 sm:left-6 text-white/50 hover:text-white p-3 hover:bg-white/5 rounded-full transition outline-none hidden md:block"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto("next");
              }}
              className="absolute right-2 sm:right-6 text-white/50 hover:text-white p-3 hover:bg-white/5 rounded-full transition outline-none hidden md:block"
            >
              <ArrowRight className="w-8 h-8" />
            </button>

            {/* Lightbox grid canvas container */}
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-neutral-900 border border-indigo-950 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-[0_0_50px_rgba(30,27,75,0.4)] relative"
            >
              {/* Photo Display Panel (Col-7) */}
              <div className="md:col-span-7 bg-black flex items-center justify-center relative min-h-[250px] sm:min-h-[400px]">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.englishCaption}
                  className="max-h-[70vh] w-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating image data badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded border border-neutral-800 text-xs font-mono text-neutral-300">
                  📷 {activePhoto.location}
                </div>
              </div>

              {/* Text Detailed Narrative Panel (Col-5) */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-indigo-955/35 bg-[#0a0518]">
                <div className="space-y-5">
                  <div className="flex justify-between items-center select-none">
                    <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest font-extrabold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{activePhoto.tag}</span>
                    </span>
                    <span className="text-[8px] font-mono bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30 text-indigo-300">
                      MEMENTO SHIELD
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-neutral-100 flex items-center gap-2">
                      {activePhoto.hindiCaption}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 italic font-serif">
                      &quot;{activePhoto.englishCaption}&quot;
                    </p>
                  </div>

                  <div className="h-[1px] bg-gradient-to-r from-indigo-950 via-indigo-900/40 to-transparent" />

                  <div>
                    <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-widest block font-bold mb-1">
                      Celestial Orbit Sync Check:
                    </span>
                    <p className="text-xs font-mono text-indigo-300 leading-normal">
                      ⚜️ {activePhoto.astralSync}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-widest block font-bold mb-1">
                      The Untold Chapter Narrative:
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {activePhoto.detailedStory}
                    </p>
                  </div>
                </div>

                {/* Footer and mobile swipe controllers */}
                <div className="pt-6 mt-6 border-t border-indigo-955/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-neutral-500 uppercase">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                    <span>LIFESPAN ORBIT 30</span>
                  </span>
                  
                  {/* Swipe tips helper */}
                  <div className="flex items-center gap-2 md:hidden">
                    <button
                      onClick={() => navigatePhoto("prev")}
                      className="px-2 py-1 bg-white/5 rounded border border-white/10 hover:text-white"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => navigatePhoto("next")}
                      className="px-2 py-1 bg-white/5 rounded border border-white/10 hover:text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
