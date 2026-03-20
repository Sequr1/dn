import { useEffect, useRef, useCallback } from 'react';

interface LightWaterAnimationProps {
  active: boolean;
  onComplete?: () => void;
}

/* ===== PARTICLE SYSTEM ===== */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'orb' | 'dust' | 'debris' | 'stream' | 'tendril' | 'ring' | 'star';
  // Orb particles
  angle: number;
  angularSpeed: number;
  orbitRadius: number;
  orbitOffset: number;
  // Trail system
  trail: { x: number; y: number; opacity: number }[];
  trailMax: number;
  // Stream
  streamIndex: number;
  // Phase
  phase: number;
}

/* ===== NOISE (organic movement) ===== */
function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 1.2 + t * 0.7) * 0.5 +
    Math.cos(y * 0.9 + t * 0.5) * 0.5 +
    Math.sin((x + y) * 0.7 + t * 1.1) * 0.3 +
    Math.cos(x * 2.1 - t * 0.3) * 0.2
  ) / 1.5;
}

function noise1D(x: number): number {
  return Math.sin(x * 1.7) * 0.5 + Math.sin(x * 3.1) * 0.25 + Math.sin(x * 7.3) * 0.125;
}

/* ===== COLORS ===== */
const C = {
  purple: ['139,92,246', '167,139,250', '124,58,237', '109,40,217'],
  orange: ['249,115,22', '251,146,60', '234,88,12'],
  gold: ['251,191,36', '253,224,71', '245,158,11'],
  white: ['255,255,255', '248,250,252'],
  cyan: ['103,232,249', '165,243,252'],
};

function pickColor(set: string[]): string {
  return set[Math.floor(Math.random() * set.length)];
}

/* ===== TIMING ===== */
const T = {
  ORB_FORM: 0,       // 0-2.5s: orb forms
  BEAM_START: 2.5,   // 2.5-4.5s: beam descends
  IMPACT: 4.5,       // 4.5-6.5s: impact explosion
  STREAM: 6.5,       // 6.5-11s: upward stream
  FADE: 11,          // 11-13s: fade to stars
  END: 13.5,         // done
};

export default function LightWaterAnimation({ active, onComplete }: LightWaterAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const doneRef = useRef(false);
  const wRef = useRef(0);
  const hRef = useRef(0);
  const shakeRef = useRef({ x: 0, y: 0 });

  /* ===== PARTICLE FACTORIES ===== */

  const makeOrbParticle = useCallback((cx: number, cy: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const orbit = 20 + Math.random() * 65;
    const color = Math.random() > 0.35 ? pickColor(C.purple) : pickColor(C.cyan);
    return {
      x: cx + Math.cos(angle) * orbit,
      y: cy + Math.sin(angle) * orbit,
      vx: 0, vy: 0,
      radius: 1.5 + Math.random() * 4,
      opacity: 0,
      color,
      life: 0, maxLife: 9999,
      type: 'orb',
      angle,
      angularSpeed: (0.2 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1),
      orbitRadius: orbit,
      orbitOffset: Math.random() * Math.PI * 2,
      trail: [], trailMax: 0,
      streamIndex: 0, phase: 0,
    };
  }, []);

  const makeDust = useCallback((w: number, h: number): Particle => {
    return {
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.2,
      radius: 0.5 + Math.random() * 1.2,
      opacity: 0.05 + Math.random() * 0.15,
      color: pickColor(C.white),
      life: 0, maxLife: 500 + Math.random() * 300,
      type: 'dust',
      angle: 0, angularSpeed: 0, orbitRadius: 0, orbitOffset: 0,
      trail: [], trailMax: 0, streamIndex: 0, phase: 0,
    };
  }, []);

  const makeDebris = useCallback((cx: number, cy: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 10;
    const color = Math.random() > 0.4 ? pickColor(C.orange) : pickColor(C.gold);
    return {
      x: cx + (Math.random() - 0.5) * 20,
      y: cy + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 1 + Math.random() * 4,
      opacity: 0.8 + Math.random() * 0.2,
      color,
      life: 0, maxLife: 50 + Math.random() * 50,
      type: 'debris',
      angle: 0, angularSpeed: 0, orbitRadius: 0, orbitOffset: 0,
      trail: [], trailMax: 8, streamIndex: 0, phase: 0,
    };
  }, []);

  const makeStreamParticle = useCallback((cx: number, cy: number, streamIdx: number): Particle => {
    const colors = [...C.purple, ...C.orange, ...C.gold, ...C.cyan];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const spread = 35 + Math.random() * 25;
    const angleOffset = (streamIdx / 3) * Math.PI * 2;
    const baseX = cx + Math.cos(angleOffset) * spread * 0.4;

    return {
      x: baseX + (Math.random() - 0.5) * spread,
      y: cy + Math.random() * 30,
      vx: (Math.random() - 0.5) * 1.2,
      vy: -(2 + Math.random() * 5),
      radius: 1.2 + Math.random() * 4,
      opacity: 0.7 + Math.random() * 0.3,
      color,
      life: 0, maxLife: 90 + Math.random() * 80,
      type: 'stream',
      angle: angleOffset, angularSpeed: 0, orbitRadius: 0, orbitOffset: 0,
      trail: [], trailMax: 12 + Math.floor(Math.random() * 8),
      streamIndex: streamIdx, phase: 0,
    };
  }, []);

  const makeTendril = useCallback((cx: number, cy: number): Particle => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
    const speed = 4 + Math.random() * 6;
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 1, opacity: 1,
      color: pickColor(C.white),
      life: 0, maxLife: 30 + Math.random() * 20,
      type: 'tendril',
      angle: 0, angularSpeed: 0, orbitRadius: 0, orbitOffset: 0,
      trail: [], trailMax: 20,
      streamIndex: 0, phase: 0,
    };
  }, []);

  const makeRing = useCallback((cx: number, cy: number, delay: number): Particle => {
    return {
      x: cx, y: cy,
      vx: 0, vy: 0,
      radius: 0, opacity: 0.8,
      color: delay < 0.2 ? pickColor(C.orange) : pickColor(C.purple),
      life: -delay * 60, maxLife: 80,
      type: 'ring',
      angle: 0, angularSpeed: 0, orbitRadius: 0, orbitOffset: 0,
      trail: [], trailMax: 0, streamIndex: 0, phase: 0,
    };
  }, []);

  /* ===== DRAW HELPERS ===== */

  function drawGlow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${color}, ${alpha})`);
    g.addColorStop(0.5, `rgba(${color}, ${alpha * 0.3})`);
    g.addColorStop(1, `rgba(${color}, 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  function drawBeam(ctx: CanvasRenderingContext2D, cx: number, startY: number, endY: number, progress: number, t: number) {
    const intensity = Math.min(progress * 2, 1);

    // Outermost atmospheric glow
    const atmoWidth = 200 + Math.sin(t * 2) * 20;
    const atmo = ctx.createLinearGradient(cx - atmoWidth, 0, cx + atmoWidth, 0);
    atmo.addColorStop(0, 'rgba(249,115,22, 0)');
    atmo.addColorStop(0.3, `rgba(249,115,22, ${0.015 * intensity})`);
    atmo.addColorStop(0.5, `rgba(255,255,255, ${0.03 * intensity})`);
    atmo.addColorStop(0.7, `rgba(249,115,22, ${0.015 * intensity})`);
    atmo.addColorStop(1, 'rgba(249,115,22, 0)');
    ctx.fillStyle = atmo;
    ctx.fillRect(cx - atmoWidth, startY, atmoWidth * 2, endY - startY);

    // Wide outer glow
    const outerW = 80 + noise1D(t * 0.8) * 15;
    const outer = ctx.createLinearGradient(cx - outerW, 0, cx + outerW, 0);
    outer.addColorStop(0, 'rgba(249,115,22,0)');
    outer.addColorStop(0.35, `rgba(249,115,22, ${0.04 * intensity})`);
    outer.addColorStop(0.5, `rgba(253,186,116, ${0.08 * intensity})`);
    outer.addColorStop(0.65, `rgba(249,115,22, ${0.04 * intensity})`);
    outer.addColorStop(1, 'rgba(249,115,22,0)');
    ctx.fillStyle = outer;
    ctx.fillRect(cx - outerW, startY, outerW * 2, endY - startY);

    // Mid glow
    const midW = 20 + noise1D(t * 1.3) * 5;
    const mid = ctx.createLinearGradient(cx - midW, 0, cx + midW, 0);
    mid.addColorStop(0, 'rgba(253,186,116,0)');
    mid.addColorStop(0.3, `rgba(253,186,116, ${0.15 * intensity})`);
    mid.addColorStop(0.5, `rgba(255,255,255, ${0.3 * intensity})`);
    mid.addColorStop(0.7, `rgba(253,186,116, ${0.15 * intensity})`);
    mid.addColorStop(1, 'rgba(253,186,116,0)');
    ctx.fillStyle = mid;
    ctx.fillRect(cx - midW, startY, midW * 2, endY - startY);

    // Core beam (sharp bright line)
    const coreW = 3 + noise1D(t * 2) * 1;
    const core = ctx.createLinearGradient(cx, startY, cx, endY);
    core.addColorStop(0, `rgba(255,255,255, ${0.1 * intensity})`);
    core.addColorStop(0.5, `rgba(255,255,255, ${0.9 * intensity})`);
    core.addColorStop(1, `rgba(255,255,255, ${intensity})`);
    ctx.fillStyle = core;
    ctx.fillRect(cx - coreW / 2, startY, coreW, endY - startY);

    // God rays (diagonal lines spreading from beam)
    if (progress > 0.3) {
      const rayIntensity = (progress - 0.3) * 0.5;
      for (let i = 0; i < 6; i++) {
        const rayAngle = (i / 6) * Math.PI - Math.PI / 2 + noise1D(t + i) * 0.2;
        const rayLen = 60 + Math.sin(t * 1.5 + i * 2) * 20;
        const rayY = startY + (endY - startY) * (0.5 + noise1D(t * 0.5 + i) * 0.3);

        ctx.save();
        ctx.globalAlpha = rayIntensity * 0.15;
        ctx.strokeStyle = `rgba(253,186,116, 0.5)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, rayY);
        ctx.lineTo(cx + Math.cos(rayAngle) * rayLen, rayY + Math.sin(rayAngle) * rayLen);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Beam tip glow (where it hits)
    if (progress > 0.2) {
      const tipP = Math.min((progress - 0.2) * 2, 1);

      // Large warm halo
      drawGlow(ctx, cx, endY, 80 * tipP, '249,115,22', 0.2 * tipP);
      // Bright white center
      drawGlow(ctx, cx, endY, 30 * tipP, '255,255,255', 0.5 * tipP);
      // Lens flare cross
      ctx.save();
      ctx.globalAlpha = 0.3 * tipP;
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.5;
      const fLen = 40 * tipP;
      ctx.beginPath();
      ctx.moveTo(cx - fLen, endY); ctx.lineTo(cx + fLen, endY);
      ctx.moveTo(cx, endY - fLen * 0.6); ctx.lineTo(cx, endY + fLen * 0.6);
      ctx.stroke();
      ctx.restore();
    }

    // Source star at top
    const starPulse = 0.7 + Math.sin(t * 4) * 0.3;
    drawGlow(ctx, cx, startY + 10, 25 * starPulse * intensity, '255,255,255', 0.6 * intensity);
    drawGlow(ctx, cx, startY + 10, 60 * intensity, '249,115,22', 0.15 * intensity);
  }

  function drawOrbMembrane(ctx: CanvasRenderingContext2D, orbParticles: Particle[], cx: number, cy: number, t: number, alpha: number) {
    if (orbParticles.length < 3) return;

    // Sort by angle for membrane
    const sorted = [...orbParticles].sort((a, b) => {
      const aAngle = Math.atan2(a.y - cy, a.x - cx);
      const bAngle = Math.atan2(b.y - cy, b.x - cx);
      return aAngle - bAngle;
    });

    // Draw membrane (connecting outer particles)
    ctx.save();
    ctx.globalAlpha = 0.08 * alpha;
    ctx.strokeStyle = `rgba(167,139,250, 0.4)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    sorted.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else {
        const prev = sorted[i - 1];
        const cpx = (prev.x + p.x) / 2 + noise(p.x, p.y, t) * 8;
        const cpy = (prev.y + p.y) / 2 + noise(p.y, p.x, t) * 8;
        ctx.quadraticCurveTo(cpx, cpy, p.x, p.y);
      }
    });
    ctx.closePath();
    ctx.stroke();

    // Inner caustic patterns
    ctx.globalAlpha = 0.04 * alpha;
    ctx.fillStyle = `rgba(103,232,249, 0.3)`;
    for (let i = 0; i < 5; i++) {
      const cx2 = cx + noise(i * 7, t, 0) * 30;
      const cy2 = cy + noise(t, i * 5, 0) * 25;
      const r = 10 + noise(i, t * 0.7, 0) * 15;
      ctx.beginPath();
      ctx.ellipse(cx2, cy2, r, r * 0.7, noise(t, i, 0), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  /* ===== MAIN ANIMATION LOOP ===== */

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!startRef.current) startRef.current = timestamp;
    const t = (timestamp - startRef.current) / 1000;

    const w = wRef.current;
    const h = hRef.current;
    const cx = w / 2;
    const cy = h / 2;

    // === END CHECK ===
    if (t >= T.END) {
      ctx.clearRect(0, 0, w, h);
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete?.();
      }
      return;
    }

    // === GLOBAL FADE ===
    let globalFade = 1;
    if (t >= T.FADE) {
      globalFade = Math.max(0, 1 - (t - T.FADE) / (T.END - T.FADE));
    }

    // === Screen shake ===
    if (t >= T.IMPACT && t < T.IMPACT + 0.8) {
      const shakePower = Math.max(0, 1 - (t - T.IMPACT) / 0.8) * 8;
      shakeRef.current = {
        x: (Math.random() - 0.5) * shakePower,
        y: (Math.random() - 0.5) * shakePower,
      };
    } else {
      shakeRef.current = { x: 0, y: 0 };
    }

    // === CLEAR with trail effect ===
    ctx.save();
    ctx.translate(shakeRef.current.x, shakeRef.current.y);

    // Motion blur: semi-transparent clear
    const clearAlpha = t >= T.STREAM ? 0.12 : 0.2;
    ctx.fillStyle = `rgba(8, 7, 13, ${clearAlpha})`;
    ctx.fillRect(-20, -20, w + 40, h + 40);

    ctx.save();
    ctx.globalAlpha = globalFade;

    const particles = particlesRef.current;

    // =============================================
    //   PHASE 0: ORB FORMATION (0 - 2.5s)
    // =============================================
    if (t < T.BEAM_START) {
      const p0 = Math.min(t / T.BEAM_START, 1);

      // Spawn orb particles
      const orbCount = particles.filter(p => p.type === 'orb').length;
      if (orbCount < 120 && t < 2) {
        for (let i = 0; i < 3; i++) {
          particles.push(makeOrbParticle(cx, cy));
        }
      }

      // Spawn ambient dust
      if (particles.filter(p => p.type === 'dust').length < 40) {
        particles.push(makeDust(w, h));
      }

      // Animate orb particles
      particles.forEach(p => {
        if (p.type === 'orb') {
          p.angle += p.angularSpeed * 0.015;
          const breathe = 1 + Math.sin(t * 1.5) * 0.08;
          const wobble = noise(p.angle * 3, t, p.orbitOffset) * 12;
          p.x = cx + Math.cos(p.angle) * (p.orbitRadius * breathe + wobble);
          p.y = cy + Math.sin(p.angle) * (p.orbitRadius * 0.65 * breathe + wobble * 0.7);
          p.opacity = Math.min(0.7, p0 * 0.8 * (0.5 + Math.sin(t * 3 + p.orbitOffset) * 0.5));
        }
      });

      // Core glow (purple, breathing)
      const breathe = 0.8 + Math.sin(t * 1.5) * 0.2;
      drawGlow(ctx, cx, cy, 100 * p0 * breathe, '139,92,246', 0.12 * p0);
      drawGlow(ctx, cx, cy, 50 * p0 * breathe, '103,232,249', 0.06 * p0);
      drawGlow(ctx, cx, cy, 25 * p0, '255,255,255', 0.03 * p0);

      // Membrane
      const orbParticles = particles.filter(p => p.type === 'orb');
      drawOrbMembrane(ctx, orbParticles, cx, cy, t, p0);
    }

    // =============================================
    //   PHASE 1: BEAM DESCENT (2.5s - 4.5s)
    // =============================================
    if (t >= T.BEAM_START && t < T.IMPACT) {
      const bp = (t - T.BEAM_START) / (T.IMPACT - T.BEAM_START);

      // Beam descends from top to center
      const beamEndY = bp * cy;
      drawBeam(ctx, cx, 0, beamEndY, bp, t);

      // Dust lights up near beam
      particles.forEach(p => {
        if (p.type === 'dust') {
          const dx = Math.abs(p.x - cx);
          const dy = p.y - beamEndY;
          if (dx < 100 && dy > -50 && dy < 100) {
            p.opacity = Math.min(0.5, p.opacity + 0.02);
            p.color = pickColor(C.gold);
          }
        }
      });

      // Orb reacts - vibration increases
      particles.forEach(p => {
        if (p.type === 'orb') {
          p.angle += p.angularSpeed * 0.015;
          const agitation = 1 + bp * 2;
          const wobble = noise(p.angle * 3, t, p.orbitOffset) * 12 * agitation;
          const breathe = 1 + Math.sin(t * (2 + bp * 4)) * 0.08 * agitation;
          p.x = cx + Math.cos(p.angle) * (p.orbitRadius * breathe + wobble);
          p.y = cy + Math.sin(p.angle) * (p.orbitRadius * 0.65 * breathe + wobble * 0.7);

          // Color shift as beam approaches
          if (bp > 0.6 && Math.random() > 0.97) {
            p.color = pickColor([...C.orange, ...C.gold]);
          }

          // Pull towards center
          if (bp > 0.7) {
            const pull = (bp - 0.7) * 0.3;
            p.orbitRadius *= (1 - pull * 0.01);
          }

          p.opacity = 0.4 + Math.sin(t * 5 + p.orbitOffset) * 0.3 * bp;
        }
      });

      // Core glow intensifies
      const intensity = 0.12 + bp * 0.2;
      drawGlow(ctx, cx, cy, 100 + bp * 30, '139,92,246', intensity);
      drawGlow(ctx, cx, cy, 50 + bp * 20, '249,115,22', intensity * 0.5 * bp);

      // Spawn beam sparks
      if (Math.random() > 0.5) {
        const sparkY = Math.random() * beamEndY;
        const spark: Particle = {
          x: cx + (Math.random() - 0.5) * 8,
          y: sparkY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 1,
          radius: 0.5 + Math.random() * 1.5,
          opacity: 0.8,
          color: pickColor(C.white),
          life: 0, maxLife: 15 + Math.random() * 15,
          type: 'debris',
          angle: 0, angularSpeed: 0, orbitRadius: 0, orbitOffset: 0,
          trail: [], trailMax: 5, streamIndex: 0, phase: 0,
        };
        particles.push(spark);
      }
    }

    // =============================================
    //   PHASE 2: IMPACT (4.5s - 6.5s)
    // =============================================
    if (t >= T.IMPACT && t < T.STREAM) {
      const ip = (t - T.IMPACT) / (T.STREAM - T.IMPACT);

      // White flash
      if (ip < 0.1) {
        const flashP = 1 - ip / 0.1;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * flashP * flashP})`;
        ctx.fillRect(0, 0, w, h);
      }

      // Secondary warm flash
      if (ip > 0.02 && ip < 0.2) {
        const warmP = ip < 0.08 ? (ip - 0.02) / 0.06 : 1 - (ip - 0.08) / 0.12;
        drawGlow(ctx, cx, cy, 200, '249,115,22', 0.3 * Math.max(0, warmP));
      }

      // Spawn shockwave rings
      if (ip < 0.05) {
        particles.push(makeRing(cx, cy, 0));
        particles.push(makeRing(cx, cy, 0.15));
        particles.push(makeRing(cx, cy, 0.35));
      }

      // Spawn debris
      if (ip < 0.1) {
        for (let i = 0; i < 12; i++) {
          particles.push(makeDebris(cx, cy));
        }
        // Energy tendrils
        for (let i = 0; i < 4; i++) {
          particles.push(makeTendril(cx, cy));
        }
      }

      // Transform orb particles → fly out then get pulled up
      particles.forEach(p => {
        if (p.type === 'orb') {
          if (ip < 0.15) {
            // Explode outward
            const dx = p.x - cx;
            const dy = p.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 12 * (0.15 - ip) / 0.15;
            p.vx = (dx / dist) * force;
            p.vy = (dy / dist) * force;
          } else {
            // Pull upward + back to center
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.vx += (cx - p.x) * 0.008;
            p.vy -= 0.3 + ip * 0.5;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.opacity *= 0.99;

          // Color shift
          if (Math.random() > 0.9) {
            p.color = pickColor([...C.orange, ...C.gold, ...C.white]);
          }
        }
      });

      // Residual beam pillar (fading)
      if (ip < 0.5) {
        const residual = 1 - ip * 2;
        const g = ctx.createLinearGradient(cx, 0, cx, cy);
        g.addColorStop(0, `rgba(249,115,22, ${0.02 * residual})`);
        g.addColorStop(1, `rgba(255,255,255, ${0.05 * residual})`);
        ctx.fillStyle = g;
        ctx.fillRect(cx - 5, 0, 10, cy);
      }

      // Central glow morphing
      drawGlow(ctx, cx, cy, 80 - ip * 30, '249,115,22', 0.15 * (1 - ip));
    }

    // =============================================
    //   PHASE 3: UPWARD STREAM (6.5s - 11s)
    // =============================================
    if (t >= T.STREAM && t < T.FADE) {
      const sp = (t - T.STREAM) / (T.FADE - T.STREAM);
      const intensity = Math.min(sp * 3, 1); // ramp up fast

      // Kill remaining orb particles
      particles.forEach(p => {
        if (p.type === 'orb') {
          p.vy -= 0.2;
          p.x += p.vx;
          p.y += p.vy;
          p.opacity *= 0.96;
        }
      });

      // Spawn stream particles (3 intertwining helixes)
      const spawnRate = Math.floor(3 + intensity * 6);
      for (let i = 0; i < spawnRate; i++) {
        const streamIdx = i % 3;
        particles.push(makeStreamParticle(cx, cy, streamIdx));
      }

      // Central light column (aurora-like)
      const colWidth = 60 + intensity * 40 + Math.sin(t * 1.5) * 15;

      // Multiple overlapping gradient layers for volumetric look
      for (let layer = 0; layer < 3; layer++) {
        const layerWidth = colWidth * (1 + layer * 0.6);
        const layerAlpha = (0.06 - layer * 0.015) * intensity;
        const waveOffset = Math.sin(t * 2 + layer * 0.8) * 10;

        const colG = ctx.createLinearGradient(cx, cy + 20, cx, -20);
        colG.addColorStop(0, `rgba(139,92,246, ${layerAlpha})`);
        colG.addColorStop(0.3, `rgba(249,115,22, ${layerAlpha * 0.8})`);
        colG.addColorStop(0.6, `rgba(253,224,71, ${layerAlpha * 0.5})`);
        colG.addColorStop(1, `rgba(255,255,255, 0)`);
        ctx.fillStyle = colG;
        ctx.fillRect(cx - layerWidth / 2 + waveOffset, -20, layerWidth, cy + 40);
      }

      // Base glow (source of stream)
      drawGlow(ctx, cx, cy, 90 * intensity, '139,92,246', 0.2 * intensity);
      drawGlow(ctx, cx, cy, 50 * intensity, '249,115,22', 0.12 * intensity);
      drawGlow(ctx, cx, cy, 25 * intensity, '255,255,255', 0.06 * intensity);

      // Pulsing energy rings moving upward
      for (let i = 0; i < 3; i++) {
        const ringT = (t * 0.8 + i * 1.2) % 3;
        const ringY = cy - ringT * cy * 0.35;
        const ringR = 20 + ringT * 15;
        const ringA = Math.max(0, 0.15 * (1 - ringT / 3)) * intensity;

        ctx.beginPath();
        ctx.ellipse(cx, ringY, ringR, ringR * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167,139,250, ${ringA})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Spawn occasional bright sparks along stream
      if (Math.random() > 0.6) {
        const sparkY = cy - Math.random() * cy * 0.8;
        const spark: Particle = {
          x: cx + (Math.random() - 0.5) * colWidth * 0.5,
          y: sparkY,
          vx: (Math.random() - 0.5) * 2,
          vy: -(1 + Math.random() * 2),
          radius: 0.5 + Math.random() * 1.5,
          opacity: 0.9,
          color: pickColor(C.white),
          life: 0, maxLife: 25,
          type: 'debris',
          angle: 0, angularSpeed: 0, orbitRadius: 0, orbitOffset: 0,
          trail: [], trailMax: 6, streamIndex: 0, phase: 0,
        };
        particles.push(spark);
      }
    }

    // =============================================
    //   PHASE 4: FADE TO STARS (11s - 13.5s)
    // =============================================
    if (t >= T.FADE) {
      // No new particles — just let existing die and fade

      // Dim central glow
      const fadeP = (t - T.FADE) / (T.END - T.FADE);
      const remain = Math.max(0, 1 - fadeP);
      drawGlow(ctx, cx, cy, 60 * remain, '139,92,246', 0.06 * remain);

      // Convert some stream particles to "stars" (slow down, twinkle)
      particles.forEach(p => {
        if (p.type === 'stream' && Math.random() > 0.98 && p.life > 20) {
          p.type = 'star';
          p.vx *= 0.1;
          p.vy *= 0.1;
          p.maxLife = p.life + 60 + Math.random() * 40;
        }
      });
    }

    // =============================================
    //   RENDER ALL PARTICLES
    // =============================================
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;

      // === Update by type ===
      switch (p.type) {
        case 'dust': {
          p.x += p.vx + noise(p.x * 0.01, p.y * 0.01, t) * 0.3;
          p.y += p.vy + noise(p.y * 0.01, p.x * 0.01, t) * 0.3;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
          const lifeR = p.life / p.maxLife;
          p.opacity = p.opacity * (lifeR < 0.1 ? lifeR / 0.1 : lifeR > 0.8 ? (1 - lifeR) / 0.2 : 1);
          break;
        }
        case 'debris': {
          // Trail
          if (p.trailMax > 0) {
            p.trail.push({ x: p.x, y: p.y, opacity: p.opacity });
            if (p.trail.length > p.trailMax) p.trail.shift();
          }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.opacity = Math.max(0, 1 - p.life / p.maxLife);
          p.radius *= 0.995;
          break;
        }
        case 'tendril': {
          p.trail.push({ x: p.x, y: p.y, opacity: p.opacity });
          if (p.trail.length > p.trailMax) p.trail.shift();
          // Curve upward
          p.vy -= 0.15;
          p.vx *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
          p.opacity = Math.max(0, 1 - p.life / p.maxLife);
          break;
        }
        case 'ring': {
          if (p.life < 0) break; // delayed start
          const ringP = p.life / p.maxLife;
          p.radius = ringP * Math.min(w, h) * 0.4;
          p.opacity = 0.5 * (1 - ringP) * (1 - ringP);
          break;
        }
        case 'stream': {
          // Trail
          p.trail.push({ x: p.x, y: p.y, opacity: p.opacity });
          if (p.trail.length > p.trailMax) p.trail.shift();

          // Helix movement
          const helixPhase = t * 2 + p.streamIndex * (Math.PI * 2 / 3);
          const helixRadius = 15 + Math.sin(t * 0.5 + p.life * 0.05) * 10;
          const helixForce = Math.cos(helixPhase + p.life * 0.1) * 0.3;

          p.vx += helixForce + noise(p.x * 0.02, p.y * 0.02, t) * 0.15;
          p.vy *= 0.998;
          p.x += p.vx;
          p.y += p.vy;

          // Slight pull to center X
          p.vx += (cx - p.x) * 0.001;

          // Wave along X
          p.x += Math.sin(p.y * 0.02 + t * 2 + p.streamIndex * 2) * helixRadius * 0.02;

          // Life opacity curve: fade in → hold → fade out
          const lr = p.life / p.maxLife;
          if (lr < 0.08) p.opacity = lr / 0.08;
          else if (lr > 0.6) p.opacity = Math.max(0, (1 - lr) / 0.4);

          // Color shift based on height (purple at bottom, gold at top)
          if (p.y < cy * 0.5 && Math.random() > 0.95) {
            p.color = pickColor([...C.gold, ...C.white]);
          }

          p.radius *= 0.9985;
          break;
        }
        case 'star': {
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.x += p.vx;
          p.y += p.vy;
          // Twinkle
          const starLR = p.life / p.maxLife;
          p.opacity = 0.5 * (1 - starLR) * (0.5 + Math.sin(t * 8 + p.x) * 0.5);
          break;
        }
        case 'orb': {
          // Already updated in phase logic
          break;
        }
      }

      // === Dead particle check ===
      if (p.opacity <= 0.005 || p.life >= p.maxLife ||
        p.y < -100 || p.y > h + 100 || p.x < -100 || p.x > w + 100) {
        particles.splice(i, 1);
        continue;
      }

      // === DRAW ===
      const drawAlpha = p.opacity * globalFade;
      if (drawAlpha < 0.005) continue;

      ctx.save();
      ctx.globalAlpha = drawAlpha;

      // Draw trail
      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let ti = 1; ti < p.trail.length; ti++) {
          ctx.lineTo(p.trail[ti].x, p.trail[ti].y);
        }
        ctx.strokeStyle = `rgba(${p.color}, ${drawAlpha * 0.3})`;
        ctx.lineWidth = p.radius * 0.6;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Ring special render
      if (p.type === 'ring' && p.life >= 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${p.color}, ${drawAlpha})`;
        ctx.lineWidth = 2.5 * (1 - p.life / p.maxLife);
        ctx.stroke();

        // Inner subtle fill
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${drawAlpha * 0.03})`;
        ctx.fill();

        ctx.restore();
        continue;
      }

      // Outer glow
      const glowR = p.radius * (p.type === 'stream' ? 4 : 3);
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
      glow.addColorStop(0, `rgba(${p.color}, ${Math.min(0.4, drawAlpha * 0.6)})`);
      glow.addColorStop(0.4, `rgba(${p.color}, ${drawAlpha * 0.15})`);
      glow.addColorStop(1, `rgba(${p.color}, 0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(p.x - glowR, p.y - glowR, glowR * 2, glowR * 2);

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${Math.min(1, drawAlpha * 1.5)})`;
      ctx.fill();

      // White hot center for bright particles
      if (p.type === 'stream' || p.type === 'tendril' || p.type === 'star') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.3, p.radius * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255, ${drawAlpha * 0.6})`;
        ctx.fill();
      }

      ctx.restore();
    }

    // === PARTICLE CAP ===
    if (particles.length > 600) {
      // Remove oldest non-critical particles
      const excess = particles.length - 500;
      let removed = 0;
      for (let i = 0; i < particles.length && removed < excess; i++) {
        if (particles[i].type === 'dust' || particles[i].type === 'debris') {
          particles.splice(i, 1);
          removed++;
          i--;
        }
      }
    }

    ctx.restore(); // globalAlpha
    ctx.restore(); // shake translate

    animRef.current = requestAnimationFrame(animate);
  }, [makeOrbParticle, makeDust, makeDebris, makeStreamParticle, makeTendril, makeRing, onComplete]);

  /* ===== LIFECYCLE ===== */

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animRef.current);
      startRef.current = 0;
      particlesRef.current = [];
      doneRef.current = false;
      shakeRef.current = { x: 0, y: 0 };

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      wRef.current = vw;
      hRef.current = vh;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = vw + 'px';
      canvas.style.height = vh + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    startRef.current = 0;
    particlesRef.current = [];
    doneRef.current = false;
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [active, animate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    />
  );
}
