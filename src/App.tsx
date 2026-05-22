import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Stars, 
  Moon, 
  Sun, 
  Flame, 
  Heart, 
  Clock, 
  Quote, 
  Volume2, 
  VolumeX, 
  PartyPopper, 
  Calendar, 
  ChevronRight, 
  Send, 
  RefreshCw, 
  Play, 
  Check,
  Compass,
  Award,
  BookOpen,
  Gift,
  Activity
} from "lucide-react";
import { MEMORIES, OFFLINE_PANCHANG, Memory, PanchangInfo } from "./data";
import CosmicRashiSync from "./components/CosmicRashiSync";
import TempleChimesSoundboard from "./components/TempleChimesSoundboard";
import SanskritCardCreator from "./components/SanskritCardCreator";
import VedicAstroChart from "./components/VedicAstroChart";
import ThreeDecadesTimeline from "./components/ThreeDecadesTimeline";
import PolaroidGalleryShowcase from "./components/PolaroidGalleryShowcase";
import VastuDestinyCompass from "./components/VastuDestinyCompass";
import ConfettiExplosionCanvas from "./components/ConfettiExplosionCanvas";
import VedicWishAltar from "./components/VedicWishAltar";

// Type definitions for interactive states
interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  hasPopped: boolean;
}

interface CustomWish {
  id: number;
  text: string;
  sender: string;
  starX: number;
  starY: number;
  timestamp: string;
}

export default function App() {
  // Navigation / Tab Selection
  const [activeTab, setActiveTab] = useState<"celebration" | "horoscope" | "gallery" | "panchang">("celebration");
  
  // Immersive sound controllers
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscillatorsRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  // Birthday state
  const [isCelebrated, setIsCelebrated] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [manualTriggerCount, setManualTriggerCount] = useState(0);

  // Horoscope state
  const [horoscopeFocus, setHoroscopeFocus] = useState<"celestial" | "love" | "career" | "growth" | "health">("celestial");
  const [horoscopeData, setHoroscopeData] = useState<{ reading: string; mantra: string; advice: string; isLive: boolean }>({
    reading: "चंद्र देव और देवगुरु बृहस्पति की कृपा से आपकी जन्मराशि कर्क पर शुभ प्रभाव बढ़ रहे हैं। विशेषकर पुष्य नक्षत्र में जन्म होने के कारण आज का दिन आपके जीवन की दिशा बदलने वाला सिद्ध हो सकता है।",
    mantra: "ॐ चन्द्राय नमः | ॐ पुष्याय नमः",
    advice: "सफेद रंग का धागा अपनी दाहिनी कलाई पर बांधें और बड़ों का आशीर्वाद लें।",
    isLive: false
  });
  const [loadingHoroscope, setLoadingHoroscope] = useState(false);

  // Quote State
  const [quoteStyle, setQuoteStyle] = useState<"spiritual" | "epic" | "retro" | "nostalgic">("spiritual");
  const [currentQuote, setCurrentQuote] = useState<string>("चन्द्रमा मनसो जातः। मन के अत्यंत पवित्र और गंभीर स्वामी चंद्र देव के शुभ प्रभाव में पलने वाले अंकित सिंह, आपके ३०वें सौर चक्र के आगमन पर सितारे आपका अभिनंदन करते हैं।");
  const [loadingQuote, setLoadingQuote] = useState(false);

  // Interactive Elements
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [diyaLit, setDiyaLit] = useState(false);
  const [diyaWishesCount, setDiyaWishesCount] = useState(0);

  // New Birthday Interactive States
  const [cakeFlavor, setCakeFlavor] = useState<"neptune" | "solar" | "cosmic">("neptune");
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [isCakeBlown, setIsCakeBlown] = useState(false);
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [giftBoxOpened, setGiftBoxOpened] = useState(false);
  const [giftPaper, setGiftPaper] = useState<"parchment" | "stardust" | "sandalwood">("sandalwood");

  // Gallery Context
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Starfield Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live clock tracker (IST)
  const [currentTime, setCurrentTime] = useState("");

  // Life Chronometer States
  const [preciseAge, setPreciseAge] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [heartbeats, setHeartbeats] = useState(0);
  const [restingBpm, setRestingBpm] = useState(72);

  // Target Birthday May 23, 1996 -> Let's calculate for May 23, 2026
  useEffect(() => {
    // Current Indian Standard Time (IST) is UTC+5:30. Let's make an accurate countdown in user time zone
    const targetBirthday = new Date("2026-05-23T00:00:00+05:30").getTime(); // May 23, 2026 at midnight Indian Standard Time
    const birthTime = new Date("1996-05-23T00:00:00+05:30");
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetBirthday - now;
      const currentDate = new Date();

      // Update current live time display
      const liveStr = currentDate.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });
      setCurrentTime(liveStr + " (IST)");

      // 1. Precise age calculation since May 23, 1996
      let yrs = currentDate.getFullYear() - birthTime.getFullYear();
      let mths = currentDate.getMonth() - birthTime.getMonth();
      let dys = currentDate.getDate() - birthTime.getDate();
      let hrs = currentDate.getHours() - birthTime.getHours();
      let mins = currentDate.getMinutes() - birthTime.getMinutes();
      let secs = currentDate.getSeconds() - birthTime.getSeconds();

      if (secs < 0) {
        secs += 60;
        mins--;
      }
      if (mins < 0) {
        mins += 60;
        hrs--;
      }
      if (hrs < 0) {
        hrs += 24;
        dys--;
      }
      if (dys < 0) {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        dys += prevMonth.getDate();
        mths--;
      }
      if (mths < 0) {
        mths += 12;
        yrs--;
      }

      setPreciseAge({ years: yrs, months: mths, days: dys, hours: hrs, minutes: mins, seconds: secs });

      // 2. Heartbeat calculation: total beats so far
      const totalSecondsSinceBirth = (currentDate.getTime() - birthTime.getTime()) / 1000;
      const calculatedBeats = Math.floor(totalSecondsSinceBirth * (restingBpm / 60));
      setHeartbeats(calculatedBeats);

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setTimeIsUp(true);
        setIsCelebrated(true);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
        setTimeIsUp(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [restingBpm]);

  // Twinkling Interactive Starfield logic with Shooting Stars & Click Particle Flares
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Array<{ x: number; y: number; radius: number; speed: number; alpha: number; dAlpha: number }> = [];
    const numStars = 135;

    // Shooting star emitters
    let shootingStars: Array<{
      x: number;
      y: number;
      dx: number;
      dy: number;
      length: number;
      speed: number;
      opacity: number;
    }> = [];

    // Click micro-flares
    let flares: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      decay: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.05 + 0.02,
          alpha: Math.random(),
          dAlpha: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
        });
      }
    };

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      // Create a gorgeous stardust explosion at clicked coordinate
      const numParticles = 14;
      const colors = ["#f59e0b", "#ebd4be", "#f5f5fa", "#6366f1", "#f43f5e", "#10b981"];
      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        flares.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.2 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          decay: Math.random() * 0.022 + 0.015
        });
      }
      playSynthSparkle();
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleCanvasClick);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background ambient dark space glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, "#080614");
      gradient.addColorStop(0.5, "#030208");
      gradient.addColorStop(1, "#010103");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.dAlpha;
        if (star.alpha <= 0.1 || star.alpha >= 0.95) {
          star.dAlpha = -star.dAlpha;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 255, ${Math.max(0.1, star.alpha)})`;
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = "#f5f5fa";
        ctx.fill();

        // Slow horizontal drifting
        star.x += star.speed;
        if (star.x > canvas.width) star.x = 0;
      });

      // Emitting shooting stars by low probability
      if (shootingStars.length < 2 && Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.7,
          y: Math.random() * canvas.height * 0.3,
          dx: Math.random() * 5 + 5,
          dy: Math.random() * 2.5 + 2.5,
          length: Math.random() * 90 + 50,
          speed: Math.random() * 2.2 + 3.2,
          opacity: 1.0
        });
      }

      // Update & Draw Shooting Stars
      shootingStars.forEach((s, idx) => {
        s.x += (s.dx * s.speed) * 0.15;
        s.y += (s.dy * s.speed) * 0.15;
        s.opacity -= 0.016;

        if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
          shootingStars.splice(idx, 1);
        } else {
          ctx.beginPath();
          const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.dx * (s.length / 5), s.y - s.dy * (s.length / 5));
          grad.addColorStop(0, `rgba(234, 179, 8, ${s.opacity})`); 
          grad.addColorStop(0.3, `rgba(236, 72, 153, ${s.opacity * 0.6})`); 
          grad.addColorStop(1, `rgba(99, 102, 241, 0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.dx * (s.length / 5), s.y - s.dy * (s.length / 5));
          ctx.stroke();
        }
      });

      // Particle Flares rendering
      flares.forEach((f, idx) => {
        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.04; // cosmic weight gravitational drift
        f.alpha -= f.decay;

        if (f.alpha <= 0) {
          flares.splice(idx, 1);
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.globalAlpha = Math.max(0, f.alpha);
          ctx.shadowBlur = f.radius * 3.5;
          ctx.shadowColor = f.color;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0; // Reset canvas global alpha safety
      ctx.shadowBlur = 0; // Reset shadow blur safety

      // Draw Constellation vectors connecting stars near the mouse cursor
      if (mouseX > 0 && mouseY > 0) {
        const mouseRadius = 150;
        stars.forEach((star) => {
          const dist = Math.hypot(star.x - mouseX, star.y - mouseY);
          if (dist < mouseRadius) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.18 * (1 - dist / mouseRadius)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Web Audio Synth setup for Space drone soundtrack
  const toggleAmbientSound = () => {
    if (soundEnabled) {
      // Turn off
      if (ambientOscillatorsRef.current) {
        try {
          ambientOscillatorsRef.current.osc1.stop();
          ambientOscillatorsRef.current.osc2.stop();
        } catch (e) {}
        ambientOscillatorsRef.current = null;
      }
      setSoundEnabled(false);
    } else {
      // Turn on
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Resume if suspended
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const biquadFilter = ctx.createBiquadFilter();
        const gainNode = ctx.createGain();

        // Peaceful low frequency harmony (A Major/Universal Cosmic 432hz ratios)
        osc1.frequency.setValueAtTime(108, ctx.currentTime); // A2 tuning pitch
        osc1.type = "sine";

        osc2.frequency.setValueAtTime(162, ctx.currentTime); // E3 perfect fifth
        osc2.type = "triangle";

        // Filter for warmth
        biquadFilter.type = "lowpass";
        biquadFilter.frequency.setValueAtTime(300, ctx.currentTime);
        
        // Quiet volume for delicate background drone
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

        osc1.connect(biquadFilter);
        osc2.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        ambientOscillatorsRef.current = { osc1, osc2, gain: gainNode };
        setSoundEnabled(true);
        playSynthSparkle();
      } catch (err) {
        console.error("Ambient sound activation failed: ", err);
      }
    }
  };

  // Synth SFX - Sparkling Bell Sound
  const playSynthSparkle = () => {
    try {
      const AudioCtx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = AudioCtx.createOscillator();
      const gain = AudioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, AudioCtx.currentTime); // High C
      osc.frequency.exponentialRampToValueAtTime(1046.50, AudioCtx.currentTime + 0.8); // High C octave
      
      gain.gain.setValueAtTime(0.12, AudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, AudioCtx.currentTime + 0.8);
      
      osc.connect(gain);
      gain.connect(AudioCtx.destination);
      
      osc.start();
      osc.stop(AudioCtx.currentTime + 0.8);
    } catch(e) {}
  };

  // Synth SFX - Bubble/Balloon Pop
  const playSynthPop = () => {
    try {
      const AudioCtx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = AudioCtx.createOscillator();
      const gain = AudioCtx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, AudioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, AudioCtx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.25, AudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, AudioCtx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(AudioCtx.destination);
      
      osc.start();
      osc.stop(AudioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  // Synth SFX - Holy Flame ignition for Diya
  const playHolyFlameSynth = () => {
    try {
      const AudioCtx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = AudioCtx.createOscillator();
      const gain = AudioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(160, AudioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(440, AudioCtx.currentTime + 0.5);
      
      gain.gain.setValueAtTime(0.1, AudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.002, AudioCtx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(AudioCtx.destination);
      
      osc.start();
      osc.stop(AudioCtx.currentTime + 0.6);
    } catch(e) {}
  };

  // Generate dynamic horoscope feed matching Panchang elements via Express endpoints
  const fetchHoroscope = async (focus: typeof horoscopeFocus) => {
    setLoadingHoroscope(true);
    setHoroscopeFocus(focus);
    try {
      const response = await fetch("/api/gemini/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focus })
      });
      const data = await response.json();
      setHoroscopeData({
        reading: data.reading,
        mantra: Math.random() > 0.5 ? "ॐ श्री गणेशाय नमः | " + data.mantra : data.mantra,
        advice: data.advice,
        isLive: !!data.isLive
      });
      playSynthSparkle();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHoroscope(false);
    }
  };

  // Generate custom quote styling
  const fetchQuote = async (style: typeof quoteStyle) => {
    setLoadingQuote(true);
    setQuoteStyle(style);
    try {
      const response = await fetch("/api/gemini/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style })
      });
      const data = await response.json();
      setCurrentQuote(data.quote);
      playSynthPop();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuote(false);
    }
  };

  // Load initial content
  useEffect(() => {
    fetchHoroscope("celestial");
    fetchQuote("spiritual");
    
    // Spawn initial balloons
    const initialBalloons: Balloon[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 110 + Math.random() * 100,
      color: ["#f59e0b", "#c084fc", "#ec4899", "#3b82f6", "#10b981", "#ef4444"][i],
      speed: 0.5 + Math.random() * 0.8,
      size: 40 + Math.random() * 25,
      hasPopped: false
    }));
    setBalloons(initialBalloons);
  }, []);

  // Pop interactive balloon logic
  const handlePopBalloon = (id: number) => {
    setBalloons(prev => prev.map(b => b.id === id ? { ...b, hasPopped: true } : b));
    playSynthPop();
    // Re-spawn balloon after 3 seconds
    setTimeout(() => {
      setBalloons(prev => prev.map(b => b.id === id ? {
        ...b,
        x: 10 + Math.random() * 80,
        y: 110,
        hasPopped: false,
        size: 40 + Math.random() * 25,
        speed: 0.5 + Math.random() * 0.8
      } : b));
    }, 3000);
  };

  // Floating balloons animation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons(prev => prev.map(b => {
        if (b.hasPopped) return b;
        let nextY = b.y + b.speed;
        if (nextY > 400) {
          // Reset bottom
          return { ...b, y: -20, x: 10 + Math.random() * 80 };
        }
        return { ...b, y: nextY };
      }));
    }, 35);
    return () => clearInterval(interval);
  }, []);

  // Light Diya
  const handleLightDiya = () => {
    setDiyaLit(true);
    setDiyaWishesCount(p => p + 1);
    playHolyFlameSynth();
  };

  // Toggle a single candle's state
  const handleToggleCandle = (index: number) => {
    setCandlesLit(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
    playSynthPop();
  };

  // Blow all candles together
  const handleBlowCandles = () => {
    setCandlesLit([false, false, false]);
    setIsCakeBlown(true);
    playSynthSparkle();
  };

  // Reset the cake candles
  const handleResetCake = () => {
    setCandlesLit([true, true, true]);
    setIsCakeBlown(false);
    playSynthPop();
  };

  // Answer Vedic Trivia question
  const handleAnswerQuiz = (selectedOpt: number, correctOpt: number) => {
    if (selectedQuizAnswer !== null) return; // Already answered this question
    setSelectedQuizAnswer(selectedOpt);
    if (selectedOpt === correctOpt) {
      setQuizScore(p => p + 1);
      playSynthSparkle();
    } else {
      playSynthPop();
    }
  };

  // Go to next quiz question or complete
  const handleNextQuizQuestion = (totalQuestionsCount: number) => {
    if (activeQuizIndex < totalQuestionsCount - 1) {
      setActiveQuizIndex(p => p + 1);
      setSelectedQuizAnswer(null);
    } else {
      setQuizCompleted(true);
    }
    playSynthSparkle();
  };

  // Reset complete quiz state
  const handleResetQuiz = () => {
    setActiveQuizIndex(0);
    setSelectedQuizAnswer(null);
    setQuizScore(0);
    setQuizCompleted(false);
    playSynthPop();
  };

  // Unbox Gift Box
  const handleToggleGiftBox = () => {
    setGiftBoxOpened(p => !p);
    playSynthSparkle();
  };

  return (
    <div className="relative min-h-screen selection:bg-yellow-500/30 selection:text-white" id="main_app_wrapper">
      {/* Background Starfield Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 bg-black" />

      {/* Canvas-Based Confetti Explosion Overlay */}
      <ConfettiExplosionCanvas 
        isCelebrated={isCelebrated} 
        manualTriggerCount={manualTriggerCount} 
      />

      {/* Deep Space Nebulae Backdrop Effects */}
      <div className="fixed top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-indigo-900/10 mix-blend-screen filter blur-[70px] -z-10 animate-pulse-glow" style={{ "--duration": "10s" } as any} />
      <div className="fixed bottom-1/3 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-yellow-900/5 mix-blend-screen filter blur-[80px] -z-10 animate-pulse-glow" style={{ "--duration": "14s" } as any} />

      {/* Floating System Controller (Sound / Quick Demo Celebrator) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button 
          onClick={toggleAmbientSound}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs tracking-wider uppercase font-space font-semibold transition-all duration-300 ${
            soundEnabled 
              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]" 
              : "bg-black/40 text-neutral-400 border-neutral-700/50 hover:bg-neutral-800"
          }`}
          title="Toggle Celestial Ambient Chimes"
          id="sound_toggle_btn"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{soundEnabled ? "Cosmic Drone Active" : "Ambient Drone Off"}</span>
        </button>

        {/* Secret Simulator Release Button to immediately trigger Chapter 30 celebration */}
        {!isCelebrated && (
          <button
            onClick={() => {
              setIsCelebrated(true);
              setTimeIsUp(true);
              setManualTriggerCount(prev => prev + 1);
              playSynthSparkle();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full font-space font-bold text-xs transition duration-300 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
            title="Fast Forward to Birthday Midnight"
            id="force_celebration_btn"
          >
            <PartyPopper className="w-3.5 h-3.5 animate-bounce" />
            <span>Celebrate Now! ✨</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8 relative">
        
        {/* UPPER CELESTIAL NAV-HEADER */}
        <header className="text-center mb-10 mt-6" id="app_header">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-700/30 text-indigo-200 text-xs font-space mb-4 tracking-widest backdrop-blur-md">
            <Stars className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span>अंकित सिंह ३०वां जन्मोत्सव • MILestone CHAPTER 30</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-wide bg-gradient-to-r from-neutral-100 via-yellow-200 to-neutral-200 bg-clip-text text-transparent drop-shadow-xl select-none leading-none">
            Ankit Singh
          </h1>
          <p className="font-space text-sm md:text-base text-neutral-400 tracking-[0.25em] uppercase font-light mt-3">
             Ascending to his 30th Cosmic Solar Alignment 🌟
          </p>

          <div className="mt-4 text-xs font-mono text-indigo-400 flex items-center justify-center gap-1.5">
            <span className="inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <span>PANCHANG SYS TIME: {currentTime || "Computing Astro-Clock..."}</span>
          </div>
        </header>

        {/* PRIMARY COUNTDOWN & BIRTHDAY ANNOUNCEMENT CARD */}
        <section className="mb-12 max-w-3xl mx-auto" id="countdown_section">
          <AnimatePresence mode="wait">
            {!isCelebrated ? (
              <motion.div 
                key="countdown_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-indigo-950/20 border border-indigo-500/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden text-center shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Decorative planetary orbit lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-yellow-500/5 -z-10 animate-rotate-slow pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-indigo-500/5 -z-10 animate-rotate-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

                <h3 className="font-display text-lg tracking-wider text-yellow-300 drop-shadow-sm mb-6 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>COUNTING DOWN TO MAY 23RD CELESTIAL SOLSTICE</span>
                </h3>

                {/* THE COUNTDOWN VISTA GRID */}
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto mb-6">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div key={unit} className="bg-black/50 border border-indigo-950/70 rounded-xl p-3 sm:p-4 text-center">
                      <div className="font-space text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-100 tabular-nums">
                        {String(value).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] sm:text-xs text-indigo-400/90 font-mono tracking-wider uppercase mt-1">
                        {unit}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-neutral-400 font-sans text-xs sm:text-sm max-w-md mx-auto">
                  Every star in the Hindu cosmic blueprint is shifting to realign on Ankit's birth coordinate (Taurus Solar/Cancer Lunar) on midnight.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="celebration_state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-b from-yellow-500/10 via-black/40 to-indigo-950/10 border border-yellow-500/30 rounded-2xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden text-center shadow-[0_0_50px_rgba(234,179,8,0.15)]"
              >
                {/* Magical stardust animations */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.08)_0%,_transparent_100%)] animate-pulse" />

                <div className="w-16 h-16 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)] border border-yellow-500/30">
                  <PartyPopper className="w-8 h-8 animate-bounce" />
                </div>

                <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-100 tracking-wider mb-4">
                  हैप्पी बर्थडे, अंकित सिंह! ✨
                </h2>
                <h3 className="font-space text-lg text-neutral-200 tracking-widest uppercase mb-6">
                  Celebrating 30 Glorious Rotations Under the Stars
                </h3>

                <div className="bg-black/60 border border-yellow-500/15 max-w-lg mx-auto py-5 px-6 rounded-xl relative mb-6">
                  <Quote className="w-8 h-8 text-yellow-500/10 absolute -top-2 left-4" />
                  <p className="text-yellow-100 font-marker text-2xl mb-2 text-center">
                    &quot;जन्मदिनस्य अनेकशः शुभकामनाः&quot;
                  </p>
                  <p className="text-neutral-300 font-sans text-sm italic leading-relaxed">
                    अंकित भाई, आपके इस ३०वें पावन जन्मदिवस पर ब्रह्मांड की समस्त कल्याणकारी शक्तियां और नक्षत्रों का आशीर्वाद आपको यश, स्वास्थ्य और अखंड सौभाग्य प्रदान करे। हमारा याराना युगों-युगों तक सितारों की तरह चमकता रहे।
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      playSynthSparkle();
                      setManualTriggerCount(prev => prev + 1);
                    }}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-yellow-500 text-black font-space font-bold rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch Astral Blessings</span>
                  </button>
                  <button
                    onClick={() => {
                        setDiyaLit(false);
                        setIsCelebrated(false);
                    }}
                    className="px-4 py-2.5 bg-neutral-900 border border-neutral-700/60 font-space text-neutral-300 rounded-lg text-sm transition hover:bg-neutral-800"
                  >
                    Back to Countdown
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* THE SACRED EARTH ODE & BIOMETRIC LIFE CHRONOMETER */}
        <section className="mb-12 max-w-3xl mx-auto" id="biometric_life_chronometer">
          <div className="bg-[#030214]/90 border border-indigo-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            {/* Glowing background circles for visual interest */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-500/5 blur-[50px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-rose-500/5 blur-[50px] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-955/50 pb-5 mb-6">
              <div>
                <span className="bg-indigo-500/10 text-indigo-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-indigo-500/20 mb-2 inline-block">
                  Vedic Life Odyssey • जीवन कालयात्रा
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-yellow-200 font-extrabold flex items-center gap-2 select-none">
                  🕰️ Ankit's Solstice Chronometer
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Absolute time spent on Earth since the moment of natal spark (May 23, 1996 00:00:00 IST).
                </p>
              </div>

              {/* Resting BPM toggle controller */}
              <div className="flex items-center gap-2 bg-black/40 border border-indigo-950/80 px-3 py-1.5 rounded-lg select-none">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Resting Heart Rate:</span>
                <select 
                  value={restingBpm} 
                  onChange={(e) => {
                    setRestingBpm(Number(e.target.value));
                    playSynthPop();
                  }}
                  className="bg-neutral-950 text-xs text-rose-450 font-mono outline-none border border-neutral-800/80 rounded px-1.5 py-0.5 cursor-pointer focus:ring-0"
                >
                  <option value={60}>60 BPM (Zen Sage)</option>
                  <option value={72}>72 BPM (Resting Peak)</option>
                  <option value={80}>80 BPM (Active Pulse)</option>
                  <option value={100}>100 BPM (Joy Walk)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Age Chronometer Counter Row */}
              <div className="md:col-span-7 bg-black/40 border border-indigo-950/50 p-5 rounded-xl flex flex-col justify-between">
                
                <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                  <span>TOTAL EARTH ORBITS SECURED</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "YEARS (वर्ष)", value: preciseAge.years, color: "text-amber-400" },
                    { label: "MONTHS (मास)", value: preciseAge.months, color: "text-neutral-200" },
                    { label: "DAYS (दिन)", value: preciseAge.days, color: "text-[#d4af37]" }
                  ].map((unit, idx) => (
                    <div key={idx} className="bg-neutral-950/60 border border-indigo-950/40 p-3 rounded-lg text-center relative overflow-hidden">
                      <div className={`font-space text-2xl sm:text-3xl font-black ${unit.color} tabular-nums`}>
                        {unit.value}
                      </div>
                      <div className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider mt-1">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "HOURS (घंटे)", value: preciseAge.hours },
                    { label: "MINUTES (मिनट)", value: preciseAge.minutes },
                    { label: "SECONDS (सेकंड)", value: preciseAge.seconds, highlight: true }
                  ].map((unit, idx) => (
                    <div key={idx} className="bg-neutral-950/60 border border-indigo-950/40 p-3 rounded-lg text-center overflow-hidden">
                      <div className={`font-space text-2xl sm:text-3xl font-black tabular-nums ${unit.highlight ? 'text-yellow-400 animate-pulse' : 'text-neutral-300'}`}>
                        {String(unit.value).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider mt-1">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Heartbeat Counter Shield */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#12050b] to-[#04010a] border border-red-950/45 p-5 rounded-xl flex flex-col justify-between overflow-hidden relative">
                {/* Background beating visual grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.03)_0%,_transparent_100%)] pointer-events-none" />
                
                <div className="flex justify-between items-center mb-4 select-none">
                  <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>LIFETIME CONCURRENCE</span>
                  </span>
                  <span className="text-[9px] font-mono bg-rose-950/20 px-1.5 py-0.5 rounded border border-rose-900/20 text-rose-300">
                    {restingBpm} BPM
                  </span>
                </div>

                {/* HEARTBEAT BIG COUNTER & LIVE BEATING ICON */}
                <div className="my-auto text-center py-2 flex flex-col items-center justify-center">
                  
                  {/* Dynamic pulse circle */}
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 60 / restingBpm, ease: "easeInOut" }}
                    className="w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/30 mb-3 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                  >
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  </motion.div>

                  <div className="font-space text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight tabular-nums select-all">
                    {heartbeats.toLocaleString("en-IN")}
                  </div>

                  <span className="text-[10px] text-[#b45309] uppercase tracking-widest font-mono mt-1 font-bold">
                    Heartbeats on Earth
                  </span>
                </div>

                <div className="p-2.5 bg-black/40 border border-red-950/20 rounded-lg text-center mt-3 select-none">
                  <p className="text-[10px] leading-relaxed text-zinc-400 font-sans italic">
                    &quot;अंकित भैया का हृदय सतत धड़क रहा है जो उनके परोपकारी, अत्यंत मिलनसार और दयालु स्वभाव को निरंतर गतिमान रखता है।&quot;
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* INTERACTIVE POLAROID NOSTALGIA GALLERY SHOWCASE */}
        <section className="mb-12 max-w-3xl mx-auto animate-fade-in" id="polaroid_interactive_gallery_section">
          <PolaroidGalleryShowcase playSFX={(type) => type === "sparkle" ? playSynthSparkle() : playSynthPop()} />
        </section>

        {/* THE THREE DECADES OF GRACE BIOGRAPHY TIMELINE MAP */}
        <section className="mb-12 max-w-3xl mx-auto animate-fade-in" id="three_decades_biography_timeline_section">
          <ThreeDecadesTimeline playSFX={(type) => type === "sparkle" ? playSynthSparkle() : playSynthPop()} />
        </section>

        {/* INTERACTIVE ANKIT'S VEDIC BIRTH HOROSCOPE KUNDALI CHART */}
        <section className="mb-12 max-w-3xl mx-auto animate-fade-in" id="vedic_birthday_kundali_chart_section">
          <VedicAstroChart playSFX={(type) => type === "sparkle" ? playSynthSparkle() : playSynthPop()} />
        </section>

        {/* INTERACTIVE COSMIC ASTRO-VASTU & DESTINY NUMEROLOGY COMPASS */}
        <section className="mb-12 max-w-3xl mx-auto animate-fade-in" id="cosmic_vastu_destiny_compass_section">
          <VastuDestinyCompass playSFX={(type) => type === "sparkle" ? playSynthSparkle() : playSynthPop()} />
        </section>

        {/* INTERACTIVE SANCTUM & COSMIC ACOUSTICS SOUNDBOARD */}
        <section className="mb-12 max-w-3xl mx-auto" id="temple_acoustics_soundboard_section" style={{ contentVisibility: "auto" }}>
          <TempleChimesSoundboard playSFX={(type) => type === "sparkle" ? playSynthSparkle() : playSynthPop()} />
        </section>

        {/* INTERACTIVE COMPATIBILITY RESONANCE */}
        <section className="mb-12 max-w-3xl mx-auto" id="cosmic_friendship_sync_section" style={{ contentVisibility: "auto" }}>
          <CosmicRashiSync playSFX={(type) => type === "sparkle" ? playSynthSparkle() : playSynthPop()} />
        </section>

        {/* INTERACTIVE SANSKRIT CARD CREATOR PLATFORM */}
        <section className="mb-12 max-w-3xl mx-auto" id="sanskrit_blessings_maker_section" style={{ contentVisibility: "auto" }}>
          <SanskritCardCreator playSFX={(type) => type === "sparkle" ? playSynthSparkle() : playSynthPop()} />
        </section>

        {/* VEDIC BIRTHDAY WISH ALTAR & FIRE SIMULATOR */}
        <section className="mb-12 max-w-3xl mx-auto" id="vedic_birthday_wish_altar_section" style={{ contentVisibility: "auto" }}>
          <VedicWishAltar playSFX={(type) => type === "sparkle" ? playSynthSparkle() : playSynthPop()} />
        </section>

        {/* SYSTEM TAB BAR SECTION - LUXURY DESIGN */}
        <section className="mb-8" id="navigation_tabs_wrapper">
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto border-b border-indigo-950 pb-2">
            {[
              { id: "celebration", label: "Celebration Hub", icon: Sparkles },
              { id: "panchang", label: "Hindu Panchang", icon: Compass },
              { id: "horoscope", label: "Panchang Horoscope", icon: BookOpen },
              { id: "gallery", label: "Memory Constellation", icon: Stars }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    playSynthSparkle();
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-space tracking-wide translate-y-[1px] transition-all duration-300 border-t border-x relative ${
                    activeTab === tab.id
                      ? "bg-[#0b0c2a] text-yellow-300 border-indigo-700/40 shadow-[0_-5px_15px_rgba(99,102,241,0.08)] bg-opacity-95"
                      : "bg-transparent text-neutral-400 border-transparent hover:text-neutral-200"
                  }`}
                  id={`tab_trigger_${tab.id}`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? "text-yellow-400" : ""}`} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-500"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </section>


        {/* DYNAMIC TAB OUTLETS */}
        <main className="min-h-[450px]" id="tab_outlets_view">
          
          {/* TAB 1: CELEBRATION CHANNELS / ACTIVE ACTIONS */}
          {activeTab === "celebration" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
              id="celebration_tab_view"
            >
              
              {/* THE ACTIVE PHOTO BANNER */}
              <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-indigo-900/40 shadow-2xl skew-y-0.5">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />
                <img 
                  src="https://www.image2url.com/r2/default/images/1779468117634-1a530c8c-0244-4c1b-8fae-f3a0b60f2722.jpg" 
                  alt="Ankit Singh Hero Portrait"
                  className="w-full h-[320px] sm:h-[480px] object-cover object-top filter scale-100 hover:scale-[1.02] transition duration-700"
                />
                
                {/* Floating details */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <span className="bg-yellow-500 text-black text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-widest mb-1.5 inline-block">
                      Core Solar Star
                    </span>
                    <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-neutral-100">
                      Ankit Singh
                    </h2>
                    <p className="font-space text-xs sm:text-base text-yellow-200 mt-1">
                      जन्म तिथि: 23 मई 1996 • Chapter 30 Ingress
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 rounded bg-black/70 border border-indigo-500/20 text-xs text-indigo-300 font-mono">
                      पुष्य नक्षत्र (Pushya)
                    </span>
                    <span className="px-3 py-1.5 rounded bg-black/70 border border-indigo-500/20 text-xs text-indigo-300 font-mono">
                      कर्क राशि (Cancer)
                    </span>
                  </div>
                </div>
              </div>


              {/* INTERACTIVE BENTO BLOCKS FOR CELEBRATING */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* DIA 1: POP BALLOONS ORBS */}
                <div className="bg-[#04051a] border border-indigo-950 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[280px]">
                  <div>
                    <h3 className="font-display text-lg text-neutral-100 flex items-center gap-2 mb-2">
                      <PartyPopper className="w-5 h-5 text-amber-500 animate-bounce" />
                      <span>Cosmic Orbs Popper</span>
                    </h3>
                    <p className="text-xs text-neutral-400 mb-4 h-8 overflow-hidden">
                      Click the celestial ascending floating balloons to release cosmic stardust with chimes.
                    </p>
                  </div>

                  <div className="relative w-full h-44 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                    {/* Render floating balloon orbs inside simple box boundary */}
                    {balloons.map((b) => (
                      <motion.button
                        key={b.id}
                        style={{ left: `${b.x}%`, bottom: `${b.y}px` }}
                        onClick={() => handlePopBalloon(b.id)}
                        className={`absolute rounded-full cursor-pointer transition-transform hover:scale-110 flex items-center justify-center`}
                        id={`balloon_${b.id}`}
                      >
                        {!b.hasPopped ? (
                          <div 
                            className="relative flex items-center justify-center text-[10px] select-none text-white font-bold rounded-full filter saturate-150 shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-float-slow"
                            style={{ 
                              backgroundColor: b.color, 
                              width: `${b.size}px`, 
                              height: `${b.size}px`,
                              animationDelay: `${b.id * 0.4}s`
                            }}
                          >
                            🎈
                          </div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            className="text-yellow-400 font-bold"
                          >
                            ✨
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                    <div className="absolute bottom-1.5 inset-x-0 text-[10px] text-center text-indigo-400/70 font-mono">
                      FLOAT FIELD ACTIVE
                    </div>
                  </div>
                </div>

                {/* DIA 2: THE SACRED DIYA CHAMBER */}
                <div className="bg-[#04051a] border border-indigo-950 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[280px]">
                  <div>
                    <h3 className="font-display text-lg text-neutral-100 flex items-center gap-2 mb-2">
                      <Flame className="w-5 h-5 text-yellow-500" />
                      <span>Sacred Diya Chambers</span>
                    </h3>
                    <p className="text-xs text-neutral-400 mb-4 h-8 overflow-hidden">
                      Light water-glowing digital diya to wish Ankit grand wisdom and longevity.
                    </p>
                  </div>

                  <div className="bg-black/50 rounded-lg p-5 flex flex-col items-center justify-center flex-grow">
                    <div className="relative mb-3">
                      {diyaLit ? (
                        <div className="flex flex-col items-center">
                          {/* Glowing Animated flame */}
                          <motion.div 
                            animate={{ scale: [1, 1.15, 1], y: [0, -2, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="h-10 w-4 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 rounded-full blur-[2px] shadow-[0_0_20px_#eab308] absolute -top-8 left-1/2 -translate-x-1/2"
                          />
                          <img 
                            src="https://www.image2url.com/r2/default/images/1779468579100-6dd3fe63-8ddf-43bb-8451-b29957e3ea1b.jpg" 
                            alt="Sacred lamp" 
                            className="w-14 h-14 rounded-full border border-yellow-500 object-cover shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-neutral-900 border border-dashed border-neutral-700 flex items-center justify-center text-neutral-500">
                          🔥
                        </div>
                      )}
                    </div>

                    <p className="text-center text-[11px] text-neutral-300 font-mono mb-3">
                      {diyaLit 
                        ? `✨ शुभम करोति कल्याणम (Wishes sent: ${diyaWishesCount})` 
                        : "Awaiter of the auspicious spark"}
                    </p>

                    <button
                      onClick={handleLightDiya}
                      disabled={diyaLit && diyaWishesCount > 20}
                      className="w-full py-2 px-4 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 text-xs font-bold font-space transition duration-300"
                    >
                      {diyaLit ? "Add More Auspicious Power 🔥" : "Light the Holy Diya for Ankit"}
                    </button>
                  </div>
                </div>

                {/* DIA 3: SPECIAL CELESTIAL BLESSINGS GENERATOR */}
                <div className="bg-[#04051a] border border-indigo-950 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[280px] lg:col-span-1 md:col-span-2">
                  <div>
                    <h3 className="font-display text-lg text-neutral-100 flex items-center gap-2 mb-2">
                      <Quote className="w-5 h-5 text-indigo-400" />
                      <span>Cosmic Quote of the Day</span>
                    </h3>
                    <p className="text-xs text-neutral-400 mb-4 h-8 overflow-hidden">
                      Generate a beautiful, original literary birthday quote or shloka for Ankit.
                    </p>
                  </div>

                  <div className="bg-black/60 border border-indigo-950 rounded-lg p-4 flex flex-col justify-between flex-grow">
                    <div className="max-h-24 overflow-y-auto mb-3">
                      {loadingQuote ? (
                        <div className="flex flex-col gap-1 items-center justify-center h-full py-4 text-xs text-neutral-400">
                          <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" />
                          <span>Gemini composing poetry...</span>
                        </div>
                      ) : (
                        <p className="text-xs text-amber-100 font-sans italic text-center whitespace-pre-line leading-relaxed">
                          &quot;{currentQuote}&quot;
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => fetchQuote("spiritual")}
                        className={`text-[10px] font-mono py-1 rounded transition ${quoteStyle === "spiritual" ? "bg-indigo-900/40 text-indigo-300 border border-indigo-700/50" : "bg-neutral-900 text-neutral-400"}`}
                      >
                        Spiritual
                      </button>
                      <button
                        onClick={() => fetchQuote("epic")}
                        className={`text-[10px] font-mono py-1 rounded transition ${quoteStyle === "epic" ? "bg-indigo-900/40 text-indigo-300 border border-indigo-700/50" : "bg-neutral-900 text-neutral-400"}`}
                      >
                        Epic Shloka
                      </button>
                      <button
                        onClick={() => fetchQuote("nostalgic")}
                        className={`text-[10px] font-mono py-1 rounded transition ${quoteStyle === "nostalgic" ? "bg-indigo-900/40 text-indigo-300 border border-indigo-700/50" : "bg-neutral-900 text-neutral-400"}`}
                      >
                        Nostalgic Bond
                      </button>
                      <button
                        onClick={() => fetchQuote("retro")}
                        className={`text-[10px] font-mono py-1 rounded transition ${quoteStyle === "retro" ? "bg-indigo-900/40 text-indigo-300 border border-indigo-700/50" : "bg-neutral-900 text-neutral-400"}`}
                      >
                        Philosophical
                      </button>
                    </div>
                  </div>
                </div>

              </div>


              {/* NEW INTERACTIVE BIRTHDAY HUB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="interactive_birthday_hub">
                
                {/* INTERACTIVE CARD 1: CELESTIAL CAKE SHIELD */}
                <div className="bg-[#030415] border border-indigo-950/85 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl" id="birthday_cake_panel">
                  {/* Glowing decorative gradient behind cake */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-500/10 to-yellow-500/5 blur-[40px] pointer-events-none -z-10" />
                  
                  <div className="mb-6">
                    <span className="bg-yellow-500/10 text-yellow-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-yellow-500/20 mb-3 inline-block">
                      Milestone Orbit 30
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-yellow-200 flex items-center gap-2 font-bold select-none">
                      🎂 Cosmic Solstice Cake
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 select-none">
                      Change flavors, tap individual candle coordinates to toggle flame ignition, or click blow out below!
                    </p>
                  </div>

                  {/* CAKE PICTORIAL SYSTEM */}
                  <div className="relative h-64 w-full bg-black/40 border border-indigo-950/50 rounded-xl flex flex-col items-center justify-end pb-8 overflow-hidden">
                    
                    {/* Stars in cake vault */}
                    <div className="absolute top-2 left-2 text-[9px] text-neutral-500 font-mono uppercase tracking-wider">
                      Flame Matrix: {candlesLit.filter(Boolean).length}/3 IGNITED
                    </div>

                    {/* Wind particles if cake blown */}
                    {isCakeBlown && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: [1, 0], scale: [1, 1.3] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-xl text-yellow-400"
                      >
                        ✨ Solstice Sparkles & Joy! ✨
                      </motion.div>
                    )}

                    {/* THREE INTERACTIVE SLENDER VERTICAL CANDLE COORDINATES */}
                    <div className="flex gap-10 mb-[-10px] z-20">
                      {[
                        { label: "0-10", desc: "Seed of Potential" },
                        { label: "10-20", desc: "Path of Learning" },
                        { label: "20-30", desc: "Orbit of Wisdom" }
                      ].map((candle, idx) => (
                        <div key={idx} className="flex flex-col items-center relative group">
                          {/* Interactive Hover Title */}
                          <span className="absolute -top-12 bg-black/95 text-[9px] text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-900/30 Logan font-mono opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none whitespace-nowrap">
                            {candle.label}: {candle.desc}
                          </span>

                          {/* Flame Ignition on true */}
                          {candlesLit[idx] ? (
                            <motion.button
                              type="button"
                              onClick={() => handleToggleCandle(idx)}
                              animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
                              transition={{ repeat: Infinity, duration: 1 + idx * 0.2 }}
                              className="w-4 h-8 bg-gradient-to-t from-orange-500/90 via-yellow-400/90 to-yellow-101 rounded-full filter blur-[1px] shadow-[0_0_15px_#f59e0b] cursor-pointer outline-none mb-1"
                              title="Click to blow out"
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleCandle(idx)}
                              className="w-4 h-8 flex items-center justify-center cursor-pointer outline-none text-xs text-neutral-600 mb-1 hover:text-yellow-400/60"
                              title="Click to reignite!"
                            >
                              🕯️
                            </button>
                          )}

                          {/* Candle Stick styled based on cake flavor */}
                          <div 
                            className={`w-3.5 h-16 rounded-t-sm shadow-md transition-colors duration-300 ${
                              cakeFlavor === "neptune" 
                                ? "bg-gradient-to-b from-blue-400 to-indigo-650" 
                                : cakeFlavor === "solar"
                                ? "bg-gradient-to-b from-amber-400 to-yellow-650"
                                : "bg-gradient-to-b from-pink-400 to-rose-650"
                            }`} 
                          />
                        </div>
                      ))}
                    </div>

                    {/* CAKE STRUCTURE DESIGNED BY LAYER GRID */}
                    <div className="w-56 flex flex-col items-center z-10">
                      {/* Top Cream Highlight layer */}
                      <div 
                        className={`w-36 h-5 rounded-t-lg transition duration-500 ${
                          cakeFlavor === "neptune" ? "bg-indigo-400 shadow-[0_2px_10px_rgba(129,140,248,0.4)]" :
                          cakeFlavor === "solar" ? "bg-amber-400 shadow-[0_2px_10px_rgba(245,158,11,0.4)]" :
                          "bg-pink-400 shadow-[0_2px_10px_rgba(244,114,182,0.4)]"
                        }`} 
                      />

                      {/* Main Cake Cylindrical Base */}
                      <div 
                        className={`w-48 h-12 relative flex items-center justify-around overflow-hidden transition duration-500 border-x border-b border-indigo-950/80 ${
                          cakeFlavor === "neptune" ? "bg-gradient-to-r from-indigo-900 via-indigo-950 to-indigo-900" :
                          cakeFlavor === "solar" ? "bg-gradient-to-r from-amber-900 via-yellow-950 to-amber-900" :
                          "bg-gradient-to-r from-pink-900 via-rose-950 to-pink-900"
                        }`}
                      >
                        {/* Star pattern decorations embed on cake */}
                        <span className="text-yellow-400/40 text-[10px] animate-pulse">✦</span>
                        <span className="font-display font-black text-white/50 text-xl tracking-wider select-none">30</span>
                        <span className="text-yellow-400/40 text-[10px] animate-pulse">✦</span>
                      </div>

                      {/* Giant Foundation Batter Layer */}
                      <div 
                        className={`w-56 h-8 rounded-b-xl transition duration-500 flex justify-around items-center px-4 ${
                          cakeFlavor === "neptune" ? "bg-indigo-950 border-t border-indigo-500/20" :
                          cakeFlavor === "solar" ? "bg-amber-950 border-t border-yellow-500/20" :
                          "bg-rose-950 border-t border-pink-500/20"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      </div>
                    </div>

                  </div>

                  {/* CONSOLE CONTROLS */}
                  <div className="mt-4 space-y-3">
                    {/* Flavor Selection Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "neptune", label: "🫐 Neptune Blue" },
                        { id: "solar", label: "🟡 Saffron Gold" },
                        { id: "cosmic", label: "🌸 Velvet Pink" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setCakeFlavor(item.id as any);
                            playSynthPop();
                          }}
                          className={`text-[10px] font-mono py-1.5 rounded border transition-all ${
                            cakeFlavor === item.id 
                              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50 shadow-inner" 
                              : "bg-black/30 border-neutral-800 text-neutral-400 hover:text-neutral-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Blowing Trigger Buttons */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleBlowCandles}
                        disabled={candlesLit.filter(Boolean).length === 0}
                        className="flex-grow py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-space font-bold text-xs flex items-center justify-center gap-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🌬️ Blow Candlesticks (Make Wish!)
                      </button>
                      <button
                        type="button"
                        onClick={handleResetCake}
                        className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs transition duration-300"
                      >
                        Reset 🕯️
                      </button>
                    </div>
                  </div>

                </div>

                {/* INTERACTIVE CARD 2: CELESTIAL QUIZ SYSTEM */}
                <div className="bg-[#030415] border border-indigo-950/85 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl" id="vedic_trivia_panel">
                  
                  <div className="mb-4">
                    <span className="bg-indigo-500/10 text-indigo-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-indigo-500/20 mb-3 inline-block">
                      Vedic Astro-Quiz
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-indigo-200 flex items-center gap-2 font-bold select-none">
                      🧠 Core Solstice Trivia
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 select-none">
                      Test your sync level with Ankit&apos;s natal pushya moon alignment parameters.
                    </p>
                  </div>

                  {/* QUIZ CORE RENDERING */}
                  <div className="bg-black/40 border border-indigo-950/50 rounded-xl p-5 min-h-[220px] flex flex-col justify-between relative overflow-hidden">
                    
                    {(() => {
                      const questions = [
                        {
                          q: "What is Ankit's moon sign (Rashi) according to Hindu Jyotish astrology?",
                          opts: ["कर्क राशि (Cancer)", "वृषभ राशि (Taurus)", "सिंह राशि (Leo)"],
                          correct: 0,
                          expl: "Correct! Cancer (कर्क) is Ankit's Moon Sign (Rashi), governed by the comforting Moon power and Water element."
                        },
                        {
                          q: "Which constellation (Nakshatra) was Ankit born under on May 23, 1996?",
                          opts: ["Ashlesha", "Pushya (पुष्य नक्षत्र)", "Punarvasu"],
                          correct: 1,
                          expl: "Spot on! Pushya is referred to as the King of Constellations, representing intelligence and moral depth."
                        },
                        {
                          q: "Which solar milestone cycle is Ankit Singh entering on this solstice?",
                          opts: ["28th solar cycle", "30th milestone orbit", "32nd solar loop"],
                          correct: 1,
                          expl: "Awesome! Ankit is entering milestone Chapter 30 under the stars. Here is to his prime golden decade!"
                        }
                      ];

                      const currentQuestion = questions[activeQuizIndex];

                      if (quizCompleted) {
                        return (
                          <div className="text-center py-4 flex flex-col justify-between h-full w-full">
                            <div>
                              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3 animate-bounce" />
                              <h4 className="font-display font-medium text-yellow-300">Aura Synced Successfully!</h4>
                              <p className="text-xs text-neutral-300 font-sans mt-2">
                                You scored <strong className="text-yellow-400">{quizScore}/{questions.length}</strong> on Ankit&apos;s Solstice Trivia.
                              </p>
                              <p className="text-[11px] text-neutral-400 italic mt-3 max-w-sm mx-auto">
                                &quot;Those who know his stars, know his highly generous and compassionate spirit.&quot;
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={handleResetQuiz}
                              className="w-full mt-6 py-2 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white font-space text-xs font-semibold border border-indigo-700/50 transition duration-300"
                            >
                              Play Trivia Desk Again
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-4 flex flex-col justify-between h-full w-full">
                          <div>
                            <div className="flex justify-between items-center text-[9px] text-[#d4af37] font-mono tracking-wider mb-2">
                              <span>QUESTION 0{activeQuizIndex + 1} OF 0{questions.length}</span>
                              <span>SCORE: {quizScore}</span>
                            </div>
                            <h4 className="font-space text-sm font-semibold text-neutral-100 leading-snug">
                              {currentQuestion.q}
                            </h4>
                          </div>

                          {/* Multiple Choice Options */}
                          <div className="space-y-2 py-1">
                            {currentQuestion.opts.map((opt, optIndex) => {
                              const isSelected = selectedQuizAnswer === optIndex;
                              const isCorrectAnswer = optIndex === currentQuestion.correct;
                              
                              let btnClass = "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-indigo-500/40";
                              if (selectedQuizAnswer !== null) {
                                if (isCorrectAnswer) {
                                  btnClass = "bg-emerald-950/50 border-emerald-500 text-emerald-300";
                                } else if (isSelected) {
                                  btnClass = "bg-rose-950/50 border-rose-500 text-rose-300";
                                } else {
                                  btnClass = "bg-neutral-950/75 border-neutral-900 text-neutral-500 opacity-60";
                                }
                              }

                              return (
                                <button
                                  key={optIndex}
                                  type="button"
                                  onClick={() => handleAnswerQuiz(optIndex, currentQuestion.correct)}
                                  disabled={selectedQuizAnswer !== null}
                                  className={`w-full p-2.5 text-left text-xs font-sans rounded-lg border flex items-center justify-between transition-all duration-300 ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {selectedQuizAnswer !== null && isCorrectAnswer && (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Dynamic Explanation Feed */}
                          {selectedQuizAnswer !== null && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }} 
                              animate={{ opacity: 1, y: 0 }}
                              className="p-3 bg-indigo-950/20 border-l-2 border-[#d4af37] text-[11px] text-neutral-300 leading-relaxed font-sans rounded-r"
                            >
                              {currentQuestion.expl}
                            </motion.div>
                          )}

                          {/* Next button */}
                          {selectedQuizAnswer !== null && (
                            <button
                              type="button"
                              onClick={() => handleNextQuizQuestion(questions.length)}
                              className="w-full mt-2 py-2 bg-neutral-900 hover:bg-neutral-850 text-[#d4af37] border border-indigo-700/20 rounded-lg text-xs font-mono flex items-center justify-center gap-1 transition"
                            >
                              <span>{activeQuizIndex === questions.length - 1 ? "Finish Sync" : "Observe Next Star Position"}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })()}

                  </div>

                </div>

              </div>


              {/* INTERACTIVE CARD 3: MYSTICAL GIFT SCRIPTS UNBOX */}
              <div className="bg-gradient-to-b from-[#090514] to-[#03010a] border border-indigo-900/40 rounded-2xl p-6 relative overflow-hidden shadow-2xl col-span-1 md:col-span-2" id="gift_unbox_block">
                
                <div className="absolute top-0 right-0 p-8 text-yellow-500/5 text-9xl pointer-events-none select-none font-sans font-black">
                  🎁
                </div>

                <div className="max-w-xl mb-6">
                  <h3 className="font-display text-xl sm:text-2xl text-yellow-300 flex items-center gap-2 mb-2 font-bold select-none">
                    <Gift className="w-6 h-6 text-yellow-500 animate-bounce" />
                    <span>Mystical Solstice Gift Scroll</span>
                  </h3>
                  <p className="text-xs text-neutral-400 select-none">
                    Choose an elegant astro background wrapping style and open the mysterious parchment scroll enclosing divine Sanskrit longevity shlokas!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Wrap Paper selector & Gift Box representation */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center bg-black/40 border border-indigo-950/60 rounded-xl p-6 space-y-4">
                    
                    {/* Choose Wrap Buttons */}
                    <div className="w-full space-y-2">
                      <span className="text-[10px] text-indigo-400 font-mono tracking-wider block mb-1">CHOOSE ASTRO STYLE:</span>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: "sandalwood", label: "Sandalwood" },
                          { id: "stardust", label: "Stardust" },
                          { id: "parchment", label: "Gold Silk" }
                        ].map((paper) => (
                          <button
                            key={paper.id}
                            type="button"
                            onClick={() => {
                              setGiftPaper(paper.id as any);
                              playSynthPop();
                            }}
                            className={`text-[9px] font-mono py-1 rounded transition text-center border ${
                              giftPaper === paper.id
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
                                : "bg-neutral-900 border-neutral-800 text-neutral-500"
                            }`}
                          >
                            {paper.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Animated Unboxing Box Graphic */}
                    <div className="relative">
                      <motion.button
                        type="button"
                        onClick={handleToggleGiftBox}
                        animate={giftBoxOpened ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : { scale: 1 }}
                        className="relative z-10 w-24 h-24 rounded-xl flex items-center justify-center cursor-pointer transition focus:outline-none"
                      >
                        {giftBoxOpened ? (
                          /* Opened Box visual */
                          <div className="text-7xl filter drop-shadow-[0_0_20px_rgba(234,179,8,0.4)] animate-pulse">
                            📜
                          </div>
                        ) : (
                          /* Sealed Box Visual matches paper style selection */
                          <div 
                            className={`w-20 h-20 rounded-lg flex items-center justify-center text-4xl shadow-xl border-2 transition duration-300 relative ${
                              giftPaper === "sandalwood" 
                                ? "bg-[#2c1b0c] border-[#8c6239] text-[#e3a857]" 
                                : giftPaper === "stardust"
                                ? "bg-[#0b0c26] border-indigo-500 text-indigo-300 shadow-indigo-500/10"
                                : "bg-[#2d250d] border-[#d4af37] text-yellow-100 shadow-yellow-500/10"
                            }`}
                          >
                            🎁
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-red-650" />
                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-red-655" />
                          </div>
                        )}
                      </motion.button>
                    </div>

                    <button
                      type="button"
                      onClick={handleToggleGiftBox}
                      className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-space font-bold text-xs rounded-lg shadow-lg transition duration-200"
                    >
                      {giftBoxOpened ? "🎁 Seal Scroll Back" : "✨ Tap to Open Mystic Scroll!"}
                    </button>

                  </div>

                  {/* Right Column: Scroll Content */}
                  <div className="md:col-span-7 w-full">
                    <AnimatePresence mode="wait">
                      {giftBoxOpened ? (
                        <motion.div
                          key="open_scroll"
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          className={`border-2 p-5 sm:p-6 rounded-xl relative shadow-2xl transition duration-500 min-h-[220px] flex flex-col justify-between w-full ${
                            giftPaper === "sandalwood"
                              ? "bg-[#1f1610] text-[#f4d1ad] border-[#c49a6c]/30 font-sans"
                              : giftPaper === "stardust"
                              ? "bg-[#03041c] text-indigo-100 border-indigo-900/60"
                              : "bg-[#1f1d11] text-yellow-105 border-yellow-800/30"
                          }`}
                        >
                          {/* Inner scroll margins decorations */}
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-yellow-600/30 via-transparent to-yellow-600/30" />
                          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-yellow-600/30 via-transparent to-yellow-600/30" />

                          <div className="space-y-4 text-center">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
                              SANSKRIT MITTRA BLESSINGS
                            </span>
                            <div className="py-2.5 px-2 text-center bg-black/40 rounded border border-yellow-905/10">
                              <p className="text-sm sm:text-base font-bold text-[#eab308] italic leading-relaxed">
                                &quot;शतञ्जीव शरदो वर्धमानः। आयुष्मन् भव सौम्य नित्यम्॥&quot;
                              </p>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed max-w-md mx-auto text-neutral-300">
                              &quot;May you live a hundred autumns, scaling continuous peaks of success. May you always possess supreme peace, outstanding health, stable wisdom, and cosmic prosperity, beloved brother!&quot;
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-yellow-950/45 text-[10px] font-mono text-center flex justify-between text-neutral-400">
                            <span>ALIGNMENT: TAURUS SUN / CANCER MOON</span>
                            <span>CHAPTER 30 DIVINE GRACE</span>
                          </div>

                        </motion.div>
                      ) : (
                        <motion.div
                          key="closed_gift_scroll"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-black/40 border border-indigo-950/60 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[220px]"
                        >
                          <Gift className="w-12 h-12 text-indigo-400/40 mb-3 animate-pulse" />
                          <h4 className="font-space text-sm font-semibold text-neutral-300">Unwrapping Pending</h4>
                          <p className="text-xs text-neutral-500 max-w-sm mt-1.5 leading-relaxed font-sans">
                            Tap the virtual gift parcel on the left column or select an style to roll open the protective sacred Sanskrit parchment.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </div>

            </motion.div>
          )}


          {/* TAB 2: HINDU PANCHANG & VEDIC traits */}
          {activeTab === "panchang" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-8"
              id="panchang_tab_view"
            >
              <div className="text-center max-w-xl mx-auto mb-6">
                <h2 className="font-display text-3xl font-bold text-yellow-200">
                  अंकित का वैदिक पंचांग प्रोफाइल
                </h2>
                <p className="text-xs sm:text-sm text-indigo-300 mt-1.5 leading-relaxed font-sans">
                  The precision of Hindu astronomical mathematics (Surya Siddhanta) mapping his exact natal coordinates for May 23, 1996.
                </p>
              </div>

              {/* ANCIENT SCROLLBOARD SCHEMATIC DESIGN */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                
                {/* Ancient Golden Table Block */}
                <div className="md:col-span-5 bg-gradient-to-b from-[#18110b] to-[#0a0604] border-2 border-yellow-800/40 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(217,119,6,0.06)] relative overflow-hidden">
                  
                  {/* Mandala graphic decorations */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-yellow-600/5 -z-10 animate-rotate-slow pointer-events-none" />

                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-yellow-800/10">
                      <Compass className="w-8 h-8 text-yellow-600 mx-auto mb-2 animate-pulse" />
                      <span className="font-display text-xs text-yellow-600 tracking-widest font-bold">NATAL COORDINATES</span>
                      <h4 className="font-display text-xl font-bold text-yellow-100">{OFFLINE_PANCHANG.name}</h4>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      {[
                        { label: "Rashi (Moon Sign)", val: OFFLINE_PANCHANG.rashi, key: "rashi" },
                        { label: "Nakshatra Group", val: OFFLINE_PANCHANG.nakshatra, key: "nak" },
                        { label: "Tithi Aspect", val: OFFLINE_PANCHANG.tithi, key: "tithi" },
                        { label: "Celestial Yoga", val: OFFLINE_PANCHANG.yoga, key: "yoga" },
                        { label: "Divine Karan", val: OFFLINE_PANCHANG.karan, key: "karan" },
                        { label: "Rashi Lord Planet", val: OFFLINE_PANCHANG.rashiLord, key: "lord" },
                        { label: "Cosmic Element", val: OFFLINE_PANCHANG.element, key: "elem" },
                        { label: "Lucky Matrix", val: `Colors: Silver, numbers: ${OFFLINE_PANCHANG.luckyNumber}`, key: "luck" }
                      ].map((item) => (
                        <div key={item.key} className="flex justify-between items-center py-1.5 border-b border-yellow-800/5">
                          <span className="text-yellow-600 font-sans">{item.label}:</span>
                          <span className="text-yellow-100 text-right font-medium max-w-[180px] truncate">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-yellow-800/15">
                    <div className="bg-yellow-905/30 border border-yellow-600/10 p-3 rounded-lg text-center">
                      <span className="text-[10px] text-amber-500/80 font-semibold uppercase tracking-widest block mb-1">
                        Auspicious Chanting Mantra
                      </span>
                      <p className="font-sans text-xs font-bold text-yellow-100">
                        {OFFLINE_PANCHANG.mantra}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Personality Traits List (Cancer & Pushya Alignment) */}
                <div className="md:col-span-7 space-y-4 flex flex-col justify-center">
                  <h3 className="font-display text-lg text-neutral-100 mb-2 border-b border-indigo-950 pb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-400" />
                    <span>Personality Markers & Celestial Traits</span>
                  </h3>

                  {OFFLINE_PANCHANG.traits.map((tr, index) => (
                    <div key={index} className="bg-indigo-950/10 border border-indigo-950/80 rounded-xl p-4 flex gap-4 items-start hover:border-indigo-800/50 transition">
                      <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700/30 font-display font-black text-sm text-yellow-400 flex items-center justify-center shrink-0">
                        0{index + 1}
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-sm text-neutral-200">
                          {tr.title}
                        </h4>
                        <p className="text-neutral-400 text-xs sm:text-sm mt-1 leading-relaxed font-sans">
                          {tr.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          )}


          {/* TAB 3: PERSONALIZED HOROSCOPE DAILY DESK */}
          {activeTab === "horoscope" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-8"
              id="horoscope_tab_view"
            >
              
              <div className="text-center max-w-xl mx-auto">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-indigo-200">
                  personalized horoscope desk
                </h2>
                <p className="text-xs text-neutral-400 mt-2">
                  Query the celestial orbits using Gemini AI to draw real-time blessings, horoscope readings, and stellar advices in pure Hindi.
                </p>
              </div>

              {/* CHOOSE A FOCUS AREA BAR */}
              <div className="flex flex-wrap items-center justify-center gap-2" id="horoscope_focus_selectors">
                {[
                  { id: "celestial", label: "Celestial Sync 🌌" },
                  { id: "love", label: "Bonds & Friendship ❤️" },
                  { id: "career", label: "Career & Ambitions 💼" },
                  { id: "growth", label: "Personal Growth 🧘" },
                  { id: "health", label: "Wellbeing & Prana 🍃" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => fetchHoroscope(item.id as any)}
                    disabled={loadingHoroscope}
                    className={`px-4 py-2 text-xs font-space font-medium tracking-wide rounded-full border transition-all duration-300 ${
                      horoscopeFocus === item.id
                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 shadow-inner"
                        : "bg-black/30 text-neutral-300 border-[#1e1430] hover:border-indigo-600/40"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>


              {/* THE HOROSCOPE BOARD OR PARCHMENT SCROLL */}
              <div className="bg-[#05061c]/70 border border-indigo-950 p-6 sm:p-8 rounded-2xl relative shadow-xl overflow-hidden min-h-[350px]">
                
                {/* Celestial watermarks */}
                <div className="absolute -bottom-10 -right-10 text-[180px] opacity-5 select-none font-sans font-black pointer-events-none text-indigo-500">
                  Ω
                </div>

                <AnimatePresence mode="wait">
                  {loadingHoroscope ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-3 items-center justify-center min-h-[250px] text-center"
                    >
                      <RefreshCw className="w-8 h-8 text-yellow-500 animate-spin" />
                      <h4 className="font-display font-medium text-yellow-400">Consulting Dev-Guru Preceptors</h4>
                      <p className="text-xs text-indigo-400 font-mono">CALCULATING CORRELATION RADIALS USING GEMINI AI...</p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="reading"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between border-b border-indigo-950 pb-4">
                        <div className="flex items-center gap-2">
                          <Stars className="w-5 h-5 text-yellow-400" />
                          <span className="font-space uppercase text-xs tracking-widest text-indigo-200">
                            Astrological Aura: <strong className="text-yellow-300">{horoscopeFocus}</strong>
                          </span>
                        </div>
                        <span className="px-2.5 py-1 bg-indigo-950/60 text-[#d4af37] text-[10px] uppercase font-bold rounded border border-indigo-700/30">
                          {horoscopeData.isLive ? "● LIVE ASTRO STREAM" : "OFFLINE COSMIC BLUEPRINT"}
                        </span>
                      </div>

                      {/* Main Paragraph reading in Hindi */}
                      <div className="bg-black/40 border border-indigo-950 rounded-xl p-5" id="astro_text_box">
                        <p className="font-sans text-neutral-100 text-sm sm:text-base leading-relaxed whitespace-pre-line text-justify select-none">
                          {horoscopeData.reading}
                        </p>
                      </div>

                      {/* Auxiliary Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Shloka Board */}
                        <div className="bg-yellow-950/20 border-l-4 border-yellow-500 rounded-r-xl p-4">
                          <span className="text-[10px] text-amber-500 font-semibold block uppercase tracking-wider mb-1">
                            Shubha Mantra Today / शुभ मंत्र आज
                          </span>
                          <p className="font-display text-sm font-semibold text-yellow-100">
                            {horoscopeData.mantra}
                          </p>
                        </div>

                        {/* Practical advice */}
                        <div className="bg-indigo-950/20 border-l-4 border-indigo-500 rounded-r-xl p-4">
                          <span className="text-[10px] text-indigo-300 font-semibold block uppercase tracking-wider mb-1">
                            Astro Advice / शुभ सलाह
                          </span>
                          <p className="font-sans text-xs text-neutral-300">
                            {horoscopeData.advice}
                          </p>
                        </div>

                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          )}


          {/* TAB 4: MEMORY CONSTELATIONS - POLAROIDS */}
          {activeTab === "gallery" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
              id="gallery_tab_view"
            >
              
              <div className="text-center max-w-xl mx-auto mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-yellow-200">
                  Ankit&apos;s Memory Constellations
                </h2>
                <p className="text-xs text-indigo-400 mt-2 font-sans">
                  Hover or touch any Polaroid memory item! Click on one to launch an immersive cosmos telescope view with customized story captioning.
                </p>
              </div>

              {/* POLAROID GRID DISPLAY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 justify-center">
                {MEMORIES.map((m, index) => {
                  const tilts = [
                    "-rotate-3 hover:rotate-1 hover:translate-y-[-5px]", 
                    "rotate-2 hover:rotate-[-1deg] hover:translate-y-[-5px]", 
                    "-rotate-1 hover:rotate-3 hover:translate-y-[-5px]", 
                    "rotate-3 hover:rotate-[-2deg] hover:translate-y-[-5px]"
                  ];
                  const tiltClass = tilts[index % tilts.length];
                  
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedMemory(m);
                        playSynthSparkle();
                      }}
                      className={`cursor-pointer bg-neutral-900 border border-neutral-800 p-3.5 pb-8 rounded-md transition-all duration-300 transform shadow-xl select-none relative group brightness-95 hover:brightness-100 hover:border-yellow-500/40 hover:shadow-2xl ${tiltClass}`}
                      id={`polaroid_card_${m.id}`}
                    >
                      {/* Magical push-pin tape simulation */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-yellow-500/20 border border-yellow-500/10 skew-x-12" />

                      <div className="relative aspect-square w-full rounded overflow-hidden mb-4 bg-black">
                        <img 
                          src={m.imageUrl} 
                          alt={m.englishCaption}
                          className="w-full h-full object-cover grayscale-10 group-hover:grayscale-0 transition duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[8px] font-mono border border-indigo-700/20 text-indigo-300">
                          {m.timePeriod}
                        </div>
                      </div>

                      {/* Handwritten Marker Caption */}
                      <div className="text-center">
                        <p className="font-marker text-xl text-yellow-100 flex items-center justify-center gap-1.5 leading-tight">
                          <span>{m.hindiCaption}</span>
                        </p>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mt-2 group-hover:text-indigo-400 transition">
                          Click to Orbit ✨
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

            </motion.div>
          )}

        </main>


        {/* IMMERSIVE POPUP LIGHTBOX FOR POLAROID PHOTOS */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
              onClick={() => setSelectedMemory(null)}
              id="memory_lightbox_overlay"
            >
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center font-space text-lg transition"
              >
                ✕
              </button>

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full bg-neutral-950 border border-indigo-900/40 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl relative"
              >
                
                <div className="lg:col-span-7 bg-black flex items-center justify-center min-h-[300px]">
                  <img 
                    src={selectedMemory.imageUrl} 
                    alt={selectedMemory.englishCaption} 
                    className="max-h-[80vh] w-full object-contain"
                  />
                </div>

                <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 text-[10px] font-mono tracking-widest uppercase rounded">
                        {selectedMemory.timePeriod}
                      </span>
                      <span className="text-neutral-500 font-mono text-[10px]">Telescopic View</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-yellow-300 leading-tight">
                      {selectedMemory.hindiCaption}
                    </h3>

                    <div className="h-[2px] bg-gradient-to-r from-yellow-500/40 to-transparent" />

                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans pt-1">
                      {selectedMemory.englishCaption}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-indigo-950/65">
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-center mb-4">
                      Cosmography Metadata
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="bg-neutral-900 p-2.5 rounded border border-indigo-950">
                        <span className="text-neutral-500 block">Anchor Target</span>
                        <strong className="text-yellow-105">Ankit Singh</strong>
                      </div>
                      <div className="bg-neutral-900 p-2.5 rounded border border-indigo-950">
                        <span className="text-neutral-500 block">Constellation Status</span>
                        <strong className="text-indigo-300">Shining 30y</strong>
                      </div>
                    </div>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* LUXURY BRUTALIST STATUS FOOTER */}
        <footer className="mt-20 border-t border-indigo-950/80 pt-8 pb-12 text-center text-xs text-neutral-500" id="app_footer">
          <p className="font-space tracking-[0.2em] uppercase font-bold text-neutral-400 mb-2">
            Ankit Singh &bull; Chapter 30
          </p>
          <p className="font-sans text-[11px] leading-relaxed max-w-md mx-auto text-neutral-400/80">
            A premium, custom-designed starry sanctuary celebrating his birth solstice. Crafted in modern full-stack React and powered by Gemini server-grounded systems.
          </p>
          <div className="mt-6 font-mono text-[10px] text-indigo-400">
            MAY 23, 2026 CEST &bull; ALL CELESTIAL ALIGNMENTS ARE COMPLIED GREEN.
          </div>
        </footer>

      </div>
    </div>
  );
}
