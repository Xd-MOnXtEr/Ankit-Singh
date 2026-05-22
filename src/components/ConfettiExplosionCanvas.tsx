import React, { useEffect, useRef, useState, useCallback } from "react";

interface ConfettiExplosionCanvasProps {
  isCelebrated: boolean;
  manualTriggerCount?: number;
}

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: "circle" | "rect" | "star";
  vx: number;
  vy: number;
  gravity: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  oscillation: number;
  oscillationSpeed: number;
  airResistance: number;
}

const CELESTIAL_PALETTE = [
  "#ffd700", // Gold
  "#ff9e00", // Orange
  "#ff007f", // Deep Pink
  "#00f5ff", // Electric Cyan
  "#a020f0", // Purple
  "#39ff14", // Neon Green
  "#ffffff"  // Silver
];

export default function ConfettiExplosionCanvas({
  isCelebrated,
  manualTriggerCount = 0
}: ConfettiExplosionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const isCelebratedPrevRef = useRef(false);
  const triggerCountPrevRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Helper to spawn a packet of particles at a given location with desired velocity vectors
  const spawnParticles = useCallback((
    startX: number,
    startY: number,
    count: number,
    baseAngle: number, // in radians
    spread: number,     // spread angle in radians
    basePower: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (let i = 0; i < count; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const power = basePower * (0.6 + Math.random() * 0.8);
      const size = Math.random() * 9 + 5;
      const color = CELESTIAL_PALETTE[Math.floor(Math.random() * CELESTIAL_PALETTE.length)];
      const shapes: Array<"circle" | "rect" | "star"> = ["circle", "rect", "star"];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      particlesRef.current.push({
        x: startX,
        y: startY,
        size,
        color,
        shape,
        vx: Math.cos(angle) * power,
        vy: Math.sin(angle) * power,
        gravity: 0.12 + Math.random() * 0.12,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        oscillation: Math.random() * Math.PI,
        oscillationSpeed: 0.05 + Math.random() * 0.1,
        airResistance: 0.97 + Math.random() * 0.02
      });
    }
  }, []);

  // Trigger high impact explosion
  const triggerFullBlast = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Burst from bottom-left corner shooting upwards-right
    spawnParticles(0, canvas.height, 90, -Math.PI / 4, Math.PI / 5, 22);

    // Burst from bottom-right corner shooting upwards-left
    spawnParticles(canvas.width, canvas.height, 90, -3 * Math.PI / 4, Math.PI / 5, 22);

    // Burst from middle top fountain
    spawnParticles(canvas.width / 2, canvas.height * 0.75, 120, -Math.PI / 2, Math.PI / 3, 16);
  }, [spawnParticles]);

  // Window click spawns a local burst
  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      // Find what was clicked. If they clicked the 'Back to Countdown' button, don't burst
      const target = e.target as HTMLElement | null;
      if (target && target.closest("#back_to_countdown_btn") || target?.closest("input") || target?.closest("select")) {
        return;
      }
      
      // Spawn burst at mouse click
      spawnParticles(e.clientX, e.clientY, 15, Math.random() * Math.PI * 2, Math.PI * 2, 7);
    };

    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [spawnParticles]);

  // Sync canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Animation Loop wrapper
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply physics
        p.vx *= p.airResistance;
        p.vy *= p.airResistance;
        p.vy += p.gravity;
        p.x += p.vx + Math.sin(p.oscillation) * 0.5;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.oscillation += p.oscillationSpeed;

        // Fade out as they fall near the bottom screen border
        if (p.y > canvas.height * 0.75) {
          p.opacity -= 0.015;
        }

        // Drop particles if they go off-screen or fade completely
        if (p.opacity <= 0 || p.x < -40 || p.x > canvas.width + 40 || p.y > canvas.height + 40) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "star") {
          // Sparkle star
          ctx.beginPath();
          for (let s = 0; s < 5; s++) {
            ctx.lineTo(Math.cos(((18 + s * 72) * Math.PI) / 180) * (p.size / 2), Math.sin(((18 + s * 72) * Math.PI) / 180) * (p.size / 2));
            ctx.lineTo(Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.size / 4), Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.size / 4));
          }
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      requestRef.current = requestAnimationFrame(updateAndDraw);
    };

    requestRef.current = requestAnimationFrame(updateAndDraw);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Watch triggers
  useEffect(() => {
    // If state switches to true (first celebration load or hits zero)
    if (isCelebrated && !isCelebratedPrevRef.current) {
      triggerFullBlast();
    }
    isCelebratedPrevRef.current = isCelebrated;
  }, [isCelebrated, triggerFullBlast]);

  useEffect(() => {
    // Watch manual triggers (clicks on "Celebrate Now!" increments manualTriggerCount)
    if (manualTriggerCount > triggerCountPrevRef.current) {
      triggerFullBlast();
    }
    triggerCountPrevRef.current = manualTriggerCount;
  }, [manualTriggerCount, triggerFullBlast]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[150] w-full h-full"
      style={{ mixBlendMode: "screen" }}
      id="confetti_celebration_explosion_canvas"
    />
  );
}
