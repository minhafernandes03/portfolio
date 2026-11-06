import React, { useEffect, useRef } from 'react';
import { ThemeConfig } from '../types/portfolio';
import { waterAudio } from '../utils/waterAudio';

export type BackgroundStyle = 'waves' | 'dewdrops' | 'aurora' | 'zen';

interface WaterBackgroundProps {
  theme: ThemeConfig;
  intensity?: 'off' | 'subtle' | 'medium' | 'flowing';
  speed?: number;
  interactive?: boolean;
  bgStyle?: BackgroundStyle;
  soundOnClick?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color?: string;
}

interface DewDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  phase: number;
}

export const WaterBackground: React.FC<WaterBackgroundProps> = ({
  theme,
  intensity = 'subtle',
  speed = 1,
  interactive = true,
  bgStyle = 'waves',
  soundOnClick = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const dewDropsRef = useRef<DewDrop[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; prevX: number; prevY: number; lastMoveTime: number }>({
    x: -999,
    y: -999,
    prevX: -999,
    prevY: -999,
    lastMoveTime: 0,
  });

  useEffect(() => {
    if (intensity === 'off') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDewDrops();
    };

    const initDewDrops = () => {
      const dropCount = bgStyle === 'dewdrops' ? 45 : 22;
      dewDropsRef.current = [];
      for (let i = 0; i < dropCount; i++) {
        dewDropsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.15 - Math.random() * 0.35,
          size: 1.5 + Math.random() * 3.5,
          baseAlpha: 0.15 + Math.random() * 0.4,
          alpha: 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    initDewDrops();
    window.addEventListener('resize', handleResize);

    // Initial ambient ripples
    ripplesRef.current = [
      {
        x: width * 0.3,
        y: height * 0.4,
        radius: 30,
        maxRadius: 220,
        alpha: 0.25,
        speed: 0.45,
      },
      {
        x: width * 0.72,
        y: height * 0.55,
        radius: 60,
        maxRadius: 260,
        alpha: 0.2,
        speed: 0.38,
      },
    ];

    let time = 0;
    const intensityMultiplier = intensity === 'subtle' ? 0.7 : intensity === 'medium' ? 1.05 : 1.45;

    const render = () => {
      time += 0.009 * speed;
      ctx.clearRect(0, 0, width, height);

      // --- 1. AURORA / ORGANIC LIGHT CURRENT BACKGROUND ---
      if (bgStyle === 'aurora' || bgStyle === 'waves') {
        const auroraCount = bgStyle === 'aurora' ? 4 : 2;
        for (let a = 0; a < auroraCount; a++) {
          const ax = width * (0.2 + a * 0.3) + Math.sin(time * 0.5 + a * 2) * 120;
          const ay = height * (0.25 + a * 0.22) + Math.cos(time * 0.4 + a) * 90;
          const aRadius = 260 * intensityMultiplier;

          const grad = ctx.createRadialGradient(ax, ay, 0, ax, ay, aRadius);
          grad.addColorStop(0, theme.accentSoft);
          grad.addColorStop(0.6, theme.isLight ? 'rgba(82, 183, 136, 0.05)' : 'rgba(82, 183, 136, 0.08)');
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(ax, ay, aRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- 2. DYNAMIC WATER WAVE CAUSTICS ---
      if (bgStyle === 'waves' || bgStyle === 'zen' || bgStyle === 'aurora') {
        const waveLayers = bgStyle === 'zen' ? 2 : 4;
        for (let i = 0; i < waveLayers; i++) {
          ctx.beginPath();
          const yBase = height * (0.18 + i * 0.2);
          ctx.moveTo(0, yBase);

          const step = 20;
          for (let x = 0; x <= width; x += step) {
            const w1 = Math.sin(x * 0.0028 + time * 1.1 + i * 1.8) * 16 * intensityMultiplier;
            const w2 = Math.cos(x * 0.0055 - time * 0.8 + i) * 9 * intensityMultiplier;
            const y = yBase + w1 + w2;
            ctx.lineTo(x, y);
          }

          ctx.strokeStyle = theme.borderHover;
          ctx.lineWidth = 1.1;
          ctx.globalAlpha = (0.06 + (i % 2) * 0.035) * intensityMultiplier;
          ctx.stroke();
        }
      }

      // --- 3. FLOATING BIOLUMINESCENT DEWDROPS / WATER ORBS ---
      const dewDrops = dewDropsRef.current;
      for (let i = 0; i < dewDrops.length; i++) {
        const d = dewDrops[i];
        d.x += d.vx * speed;
        d.y += d.vy * speed;
        d.phase += 0.02 * speed;
        d.alpha = d.baseAlpha * (0.6 + 0.4 * Math.sin(d.phase)) * intensityMultiplier;

        // Mouse avoidance micro-interaction (playful repulsion!)
        if (interactive && mouseRef.current.x > 0) {
          const dx = d.x - mouseRef.current.x;
          const dy = d.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130 && dist > 1) {
            const force = (130 - dist) / 130;
            d.x += (dx / dist) * force * 3;
            d.y += (dy / dist) * force * 3;
            d.alpha = Math.min(0.9, d.alpha * 1.8);
          }
        }

        // Screen wrap
        if (d.y < -20) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        if (d.x < -20) d.x = width + 10;
        if (d.x > width + 20) d.x = -10;

        // Draw dewdrop particle
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = theme.waterHighlight;
        ctx.globalAlpha = Math.max(0, d.alpha);
        ctx.fill();

        // Subtle glow halo for larger droplets
        if (d.size > 2.8) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = theme.accentSoft;
          ctx.globalAlpha = Math.max(0, d.alpha * 0.35);
          ctx.fill();
        }
      }

      // --- 4. RIPPLE PROPAGATION & CONCENTRIC WAVES ---
      const currentRipples = ripplesRef.current;
      for (let i = currentRipples.length - 1; i >= 0; i--) {
        const r = currentRipples[i];
        r.radius += r.speed * speed;
        r.alpha -= 0.0022 * speed;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          currentRipples.splice(i, 1);
          continue;
        }

        // Primary outer ripple ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color || theme.waterHighlight;
        ctx.lineWidth = 1.3;
        ctx.globalAlpha = Math.max(0, r.alpha * intensityMultiplier);
        ctx.stroke();

        // Secondary concentric inner ring
        if (r.radius > 20) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.68, 0, Math.PI * 2);
          ctx.strokeStyle = theme.accent;
          ctx.lineWidth = 0.9;
          ctx.globalAlpha = Math.max(0, r.alpha * 0.5 * intensityMultiplier);
          ctx.stroke();
        }

        // Third faint center wake
        if (r.radius > 45) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.38, 0, Math.PI * 2);
          ctx.strokeStyle = theme.borderHover;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = Math.max(0, r.alpha * 0.3 * intensityMultiplier);
          ctx.stroke();
        }
      }

      // Random serene ambient water droplet ripple
      if (Math.random() < 0.008 * speed && currentRipples.length < 9) {
        currentRipples.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 6,
          maxRadius: 120 + Math.random() * 110,
          alpha: 0.18,
          speed: 0.38 + Math.random() * 0.28,
        });
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse movement micro-interaction
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const now = performance.now();

      const dx = clientX - mouseRef.current.prevX;
      const dy = clientY - mouseRef.current.prevY;
      const dist = Math.hypot(dx, dy);

      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;

      if (dist > 70 || now - mouseRef.current.lastMoveTime > 380) {
        mouseRef.current.prevX = clientX;
        mouseRef.current.prevY = clientY;
        mouseRef.current.lastMoveTime = now;

        if (ripplesRef.current.length < 14) {
          ripplesRef.current.push({
            x: clientX,
            y: clientY,
            radius: 8,
            maxRadius: 140 + Math.min(dist * 0.5, 70),
            alpha: 0.24,
            speed: 0.65,
          });
        }
      }
    };

    // Click anywhere to spawn water ripple + gentle droplet sound!
    const handleClick = (e: MouseEvent) => {
      if (!interactive) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      ripplesRef.current.push({
        x: clientX,
        y: clientY,
        radius: 4,
        maxRadius: 190,
        alpha: 0.45,
        speed: 0.85,
        color: theme.accent,
      });

      // Scatter nearby dewdrops with a playful splash!
      dewDropsRef.current.forEach((d) => {
        const dx = d.x - clientX;
        const dy = d.y - clientY;
        const dist = Math.hypot(dx, dy);
        if (dist < 180 && dist > 1) {
          const force = (180 - dist) / 180;
          d.vx += (dx / dist) * force * 4;
          d.vy += (dy / dist) * force * 4;
        }
      });

      if (soundOnClick) {
        waterAudio.playSingleDroplet();
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [theme, intensity, speed, interactive, bgStyle, soundOnClick]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700 select-none"
      aria-hidden="true"
      style={{
        backgroundColor: theme.bgBase,
      }}
    >
      {/* HTML5 Canvas for dynamic water ripples, caustics, and floating dewdrops */}
      {intensity !== 'off' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-85 pointer-events-none"
          style={{ mixBlendMode: theme.isLight ? 'multiply' : 'screen' }}
        />
      )}

      {/* Gentle organic radial mist vignette */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: theme.isLight
            ? 'radial-gradient(ellipse 95% 85% at 50% 12%, rgba(255,255,255,0.45) 0%, rgba(240,247,243,0.85) 100%)'
            : 'radial-gradient(ellipse 95% 85% at 50% 15%, rgba(18, 38, 29, 0.42) 0%, rgba(8, 16, 12, 0.9) 100%)',
        }}
      />

      {/* Organic micro-texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
};
