import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Sparkles, Volume2, Music } from "lucide-react";

interface TempleChimesSoundboardProps {
  playSFX: (type: "pop" | "sparkle") => void;
}

export default function TempleChimesSoundboard({ playSFX }: TempleChimesSoundboardProps) {
  const [activeInstruments, setActiveInstruments] = useState<Record<string, boolean>>({});
  const [, setFeedbackMessage] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const tanpuraDroneRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gainNode: GainNode } | null>(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtxClass();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const showAuraMessage = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  // 1. CONCH SHELL SWELL (शंखनाद) - Deep wind frequency sweeping
  const triggerShankhNaad = () => {
    const ctx = initAudio();
    if (!ctx) return;
    
    showAuraMessage("🐚 शंखनाद: Auspicious Resonance Active!");
    playSFX("sparkle");

    const osc = ctx.createOscillator();
    const bandpass = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc.type = "sawtooth";
    // Deep conch resonance start at A2 (110Hz) sweeping to C3 (130Hz)
    osc.frequency.setValueAtTime(105, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(133, ctx.currentTime + 1.2);
    osc.frequency.linearRampToValueAtTime(129, ctx.currentTime + 3.0);

    // Bandpass filter to make it vocal & wind-like
    bandpass.type = "bandpass";
    bandpass.Q.setValueAtTime(4.0, ctx.currentTime);
    bandpass.frequency.setValueAtTime(320, ctx.currentTime);
    bandpass.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 1.2);
    bandpass.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 3.2);

    // Gain envelope (soft swell, prolonged sustain, slow decay)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.8);
    gainNode.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 3.5);

    osc.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 3.6);

    // Set active animation trigger
    setActiveInstruments(prev => ({ ...prev, shankh: true }));
    setTimeout(() => {
      setActiveInstruments(prev => ({ ...prev, shankh: false }));
    }, 3500);
  };

  // 2. TEMPLE GREAT BELL (महाघंटा) - Rich harmonic overtones
  const triggerTempleBell = () => {
    const ctx = initAudio();
    if (!ctx) return;

    showAuraMessage("🔔 महाघंटा: Sacred Ringing Chime!");
    playSFX("pop");

    const now = ctx.currentTime;
    const frequencies = [220, 220 * 1.5, 220 * 2.15, 220 * 2.8, 220 * 3.6]; // Inharmonic overtones of metallic bronze
    
    // Fire multiple oscillators simultaneously to create bell richness
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const biquad = ctx.createBiquadFilter();

      // Use triangle or sine wave
      osc.type = idx === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now);

      biquad.type = "lowpass";
      biquad.frequency.setValueAtTime(1200, now);

      gainNode.gain.setValueAtTime(0, now);
      // Main fundamental has longer decay, upper partials decay very quickly
      const decayTime = idx === 0 ? 5.0 : (4.0 / (idx + 1));
      const peakVolume = idx === 0 ? 0.25 : (0.15 / idx);

      gainNode.gain.linearRampToValueAtTime(peakVolume, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

      osc.connect(biquad);
      biquad.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decayTime + 0.5);
    });

    setActiveInstruments(prev => ({ ...prev, bell: true }));
    setTimeout(() => {
      setActiveInstruments(prev => ({ ...prev, bell: false }));
    }, 4500);
  };

  // 3. CELESTIAL FLUTE PATH (बांसुरी की स्वर लहरी) - Arpeggio sequence melody
  const triggerFluteMelody = () => {
    const ctx = initAudio();
    if (!ctx) return;

    showAuraMessage("🎼 बांसुरी: Celestial Pentatonic Sequence!");
    playSFX("sparkle");

    const now = ctx.currentTime;
    // Raga Pentatonic Notes: D5 (587.33), E5 (659.25), G5 (783.99), A5 (880.00), B5 (987.77)
    const melody = [587.33, 659.25, 783.99, 880.00, 987.77, 880.00, 783.99, 587.33];
    const delays = [0, 0.22, 0.44, 0.66, 0.88, 1.10, 1.32, 1.54];

    melody.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delays[idx]);
      
      // Vibrato simulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 6.5; // Vibrato Speed
      lfoGain.gain.value = 4.5; // Vibrato Depth
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(now + delays[idx]);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1500, now + delays[idx]);

      // Soft attack & soft release for realistic woodwind breath
      gainNode.gain.setValueAtTime(0, now + delays[idx]);
      gainNode.gain.linearRampToValueAtTime(0.12, now + delays[idx] + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delays[idx] + 0.45);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + delays[idx]);
      osc.stop(now + delays[idx] + 0.5);
      lfo.stop(now + delays[idx] + 0.5);
    });

    setActiveInstruments(prev => ({ ...prev, flute: true }));
    setTimeout(() => {
      setActiveInstruments(prev => ({ ...prev, flute: false }));
    }, 2000);
  };

  // 4. SANDALWOOD DRONE (चंदन राग तानपुरा) - Persistent meditative healing loop
  const toggleSandalwoodDrone = () => {
    const ctx = initAudio();
    if (!ctx) return;

    if (activeInstruments.drone) {
      // Turn off
      if (tanpuraDroneRef.current) {
        tanpuraDroneRef.current.gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        const ref = tanpuraDroneRef.current;
        setTimeout(() => {
          ref.osc1.stop();
          ref.osc2.stop();
        }, 1300);
        tanpuraDroneRef.current = null;
      }
      setActiveInstruments(prev => ({ ...prev, drone: false }));
      showAuraMessage("Drone Deactivated");
      playSFX("pop");
    } else {
      // Turn on Tanpura Drone
      showAuraMessage("📿 चंदन राग: Meditative Ambient Tanpura active!");
      playSFX("sparkle");

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3 fundamental
      
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(220.00, ctx.currentTime); // A3 perfect fifth

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);

      tanpuraDroneRef.current = { osc1, osc2, gainNode };
      setActiveInstruments(prev => ({ ...prev, drone: true }));
    }
  };

  return (
    <div className="bg-[#030214]/90 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl" id="temple_chimes_soundboard_block">
      {/* Decorative cosmic aura glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent blur-[50px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-[#9945FF]/10 to-transparent blur-[50px] pointer-events-none" />

      {/* Header section of the board */}
      <div className="max-w-xl mb-6">
        <span className="bg-indigo-500/10 text-indigo-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-indigo-500/20 mb-3 inline-block">
          TEMPLE ACOUSTICS • मंगल स्वर यंत्र
        </span>
        <h3 className="font-display text-xl sm:text-2xl text-amber-200 flex items-center gap-2 font-black select-none">
          <Music className="w-6 h-6 text-yellow-500 animate-bounce" />
          <span>Vedic Temple Acoustic Sanctum</span>
        </h3>
        <p className="text-xs text-neutral-400 mt-1 select-none">
          Interact with actual Web Audio synthesizers to play auspicious chimes, blow the Shankh Naad, or activate a sandalwood Tanpura drone! No microphone is required; simply tap any vessel element.
        </p>
      </div>

      {/* Physical Sanctum Board Plate Mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gradient-to-br from-amber-950/20 to-neutral-950 border border-amber-900/40 rounded-xl relative overflow-hidden shadow-inner">
        
        {/* Vessel 1: Shankh Naad */}
        <button
          type="button"
          onClick={triggerShankhNaad}
          className={`flex flex-col items-center justify-center p-6 rounded-lg border text-center transition-all duration-500 relative overflow-hidden ${
            activeInstruments.shankh 
              ? "bg-amber-500/15 border-amber-500 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.03]" 
              : "bg-black/30 border-neutral-900 text-neutral-400 hover:border-amber-900/60 hover:text-neutral-200"
          }`}
          id="shankh_naad_trigger_btn"
        >
          {activeInstruments.shankh && (
            <motion.div 
              layoutId="ripple_shankh" 
              className="absolute inset-0 border-2 border-amber-500/40 rounded-lg animate-ping pointer-events-none" 
            />
          )}
          <span className="text-4xl mb-3 block select-none">🐚</span>
          <span className="font-display text-sm font-bold block mb-0.5">Shankh Naad</span>
          <span className="text-[10px] text-zinc-500 font-mono tracking-wide">महान शंखनाद</span>
        </button>

        {/* Vessel 2: Temple Bell */}
        <button
          type="button"
          onClick={triggerTempleBell}
          className={`flex flex-col items-center justify-center p-6 rounded-lg border text-center transition-all duration-500 relative overflow-hidden ${
            activeInstruments.bell 
              ? "bg-yellow-500/15 border-yellow-500 text-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.3)] scale-[1.03]" 
              : "bg-black/30 border-neutral-900 text-neutral-400 hover:border-amber-900/60 hover:text-neutral-200"
          }`}
          id="temple_bell_trigger_btn"
        >
          {activeInstruments.bell && (
            <motion.div 
              layoutId="ripple_bell" 
              className="absolute inset-0 border-2 border-yellow-500/40 rounded-lg animate-ping pointer-events-none" 
            />
          )}
          <span className="text-4xl mb-3 block select-none">🔔</span>
          <span className="font-display text-sm font-bold block mb-0.5">Maha-Ghanta</span>
          <span className="text-[10px] text-zinc-500 font-mono tracking-wide">मंदिर की बड़ी घंटा</span>
        </button>

        {/* Vessel 3: Celestial Flute */}
        <button
          type="button"
          onClick={triggerFluteMelody}
          className={`flex flex-col items-center justify-center p-6 rounded-lg border text-center transition-all duration-500 relative overflow-hidden ${
            activeInstruments.flute 
              ? "bg-indigo-500/15 border-indigo-500 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-[1.03]" 
              : "bg-black/30 border-neutral-900 text-neutral-400 hover:border-amber-900/60 hover:text-neutral-200"
          }`}
          id="celestial_flute_trigger_btn"
        >
          {activeInstruments.flute && (
            <motion.div 
              layoutId="ripple_flute" 
              className="absolute inset-0 border-2 border-indigo-500/40 rounded-lg animate-ping pointer-events-none" 
            />
          )}
          <span className="text-4xl mb-3 block select-none">🎼</span>
          <span className="font-display text-sm font-bold block mb-0.5">Celestial Flute</span>
          <span className="text-[10px] text-zinc-500 font-mono tracking-wide">बांसुरी स्वर</span>
        </button>

        {/* Vessel 4: Sandalwood Tanpura Drone Modulator */}
        <button
          type="button"
          onClick={toggleSandalwoodDrone}
          className={`flex flex-col items-center justify-center p-6 rounded-lg border text-center transition-all duration-500 relative overflow-hidden ${
            activeInstruments.drone 
              ? "bg-rose-500/15 border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] scale-[1.03]" 
              : "bg-black/30 border-neutral-900 text-neutral-400 hover:border-amber-900/60 hover:text-neutral-200"
          }`}
          id="tanpura_drone_trigger_btn"
        >
          <span className="text-4xl mb-3 block select-none relative">
            📿
            {activeInstruments.drone && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
            )}
          </span>
          <span className="font-display text-sm font-bold block mb-0.5">
            {activeInstruments.drone ? "Drone Playing" : "Sandalwood Tanpura"}
          </span>
          <span className="text-[10px] text-zinc-500 font-mono tracking-wide">
            {activeInstruments.drone ? "TAP TO SHUT SILENT" : "चंदन राग तानपुरा"}
          </span>
        </button>

      </div>

      {/* Acoustic footer message */}
      <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase px-1">
        <span className="flex items-center gap-1.5 animate-pulse">
          <Flame className="w-3 h-3 text-yellow-500" />
          <span>Solstice Audio Frequency active</span>
        </span>
        <span>Acoustics Engine: Web Audio API</span>
      </div>

    </div>
  );
}
