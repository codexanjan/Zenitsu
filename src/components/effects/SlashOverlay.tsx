import React, { useEffect, useRef } from 'react';
import { sound } from '../../audio/SoundEngine';

export type TechniqueType = 'thunderclap' | 'sixfold' | 'eightfold' | 'godspeed' | 'flaming_god' | 'finale';

interface SlashOverlayProps {
  activeTechnique: TechniqueType | null;
  onComplete: () => void;
  reducedMotion?: boolean;
}

interface SlashPoint {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  color: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export const SlashOverlay: React.FC<SlashOverlayProps> = ({
  activeTechnique,
  onComplete,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!activeTechnique) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    let slashes: SlashPoint[] = [];
    const sparks: Spark[] = [];
    let startTime = Date.now();
    let animId: number;
    let flashIntensity = 0;

    // Helper to spawn sparks along a line
    const spawnSparks = (x: number, y: number, count: number, color: string = '#fee135') => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 12;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 20 + Math.random() * 30,
          color,
        });
      }
    };

    // Configure choreography based on technique
    if (activeTechnique === 'thunderclap') {
      sound.playElectricHum(0.3);
      setTimeout(() => {
        sound.playSwordSlash('standard');
        sound.playThunderclap();
      }, 350);

      slashes = [
        {
          x1: width * 0.1,
          y1: height * 0.85,
          x2: width * 0.9,
          y2: height * 0.15,
          progress: 0,
          color: '#fee135',
        },
      ];
    } else if (activeTechnique === 'sixfold') {
      sound.playElectricHum(0.6);
      // Sequence of 6 rapid strikes
      slashes = [
        { x1: width * 0.15, y1: height * 0.7, x2: width * 0.85, y2: height * 0.65, progress: 0, color: '#fee135' },
        { x1: width * 0.85, y1: height * 0.65, x2: width * 0.25, y2: height * 0.35, progress: 0, color: '#f59e0b' },
        { x1: width * 0.25, y1: height * 0.35, x2: width * 0.75, y2: height * 0.25, progress: 0, color: '#fee135' },
        { x1: width * 0.75, y1: height * 0.25, x2: width * 0.3, y2: height * 0.8, progress: 0, color: '#f59e0b' },
        { x1: width * 0.3, y1: height * 0.8, x2: width * 0.8, y2: height * 0.5, progress: 0, color: '#fee135' },
        { x1: width * 0.1, y1: height * 0.2, x2: width * 0.9, y2: height * 0.85, progress: 0, color: '#ffffff' },
      ];

      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          sound.playSwordSlash('sixfold');
          if (i === 5) sound.playThunderclap();
        }, 150 + i * 160);
      }
    } else if (activeTechnique === 'eightfold') {
      sound.playElectricHum(0.8);
      slashes = [
        { x1: width * 0.2, y1: height * 0.8, x2: width * 0.8, y2: height * 0.2, progress: 0, color: '#fee135' },
        { x1: width * 0.8, y1: height * 0.3, x2: width * 0.2, y2: height * 0.7, progress: 0, color: '#f59e0b' },
        { x1: width * 0.15, y1: height * 0.5, x2: width * 0.85, y2: height * 0.45, progress: 0, color: '#fee135' },
        { x1: width * 0.5, y1: height * 0.1, x2: width * 0.5, y2: height * 0.9, progress: 0, color: '#ffffff' },
        { x1: width * 0.85, y1: height * 0.75, x2: width * 0.15, y2: height * 0.25, progress: 0, color: '#fee135' },
        { x1: width * 0.2, y1: height * 0.2, x2: width * 0.8, y2: height * 0.8, progress: 0, color: '#f59e0b' },
        { x1: width * 0.3, y1: height * 0.9, x2: width * 0.7, y2: height * 0.1, progress: 0, color: '#fee135' },
        { x1: width * 0.05, y1: height * 0.5, x2: width * 0.95, y2: height * 0.5, progress: 0, color: '#ffffff' },
      ];

      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          sound.playSwordSlash('eightfold');
          if (i === 7) sound.playThunderclap();
        }, 120 + i * 140);
      }
    } else if (activeTechnique === 'godspeed' || activeTechnique === 'finale') {
      // 1. Heartbeat tension
      sound.playHeartbeat();
      // 2. Dead silence moment followed by blinding warp strike
      setTimeout(() => {
        sound.playElectricHum(0.4);
      }, 500);
      setTimeout(() => {
        sound.playSwordSlash('godspeed');
        sound.playThunderclap();
      }, 850);

      slashes = [
        {
          x1: 0,
          y1: height * 0.55,
          x2: width,
          y2: height * 0.45,
          progress: 0,
          color: '#ffffff',
        },
        {
          x1: width * 0.1,
          y1: height * 0.2,
          x2: width * 0.9,
          y2: height * 0.8,
          progress: 0,
          color: '#fee135',
        },
      ];
    } else if (activeTechnique === 'flaming_god') {
      // Seventh Form: Flaming Thunder God - Golden Dragon Explosion
      sound.playElectricHum(0.9);
      setTimeout(() => {
        sound.playSwordSlash('godspeed');
        sound.playThunderclap();
      }, 400);
      setTimeout(() => {
        sound.playThunderclap();
      }, 800);

      slashes = [
        { x1: 0, y1: height * 0.8, x2: width * 0.4, y2: height * 0.2, progress: 0, color: '#ea580c' },
        { x1: width * 0.2, y1: height * 0.1, x2: width * 0.7, y2: height * 0.9, progress: 0, color: '#f59e0b' },
        { x1: width * 0.5, y1: height * 0.9, x2: width * 0.95, y2: height * 0.15, progress: 0, color: '#fee135' },
        { x1: 0, y1: height * 0.5, x2: width, y2: height * 0.5, progress: 0, color: '#ffffff' },
      ];
    }

    const duration = activeTechnique === 'godspeed' || activeTechnique === 'finale' || activeTechnique === 'flaming_god' ? 2600 : 1800;

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      // Darken backdrop during motion
      ctx.fillStyle = 'rgba(5, 5, 7, 0.7)';
      ctx.fillRect(0, 0, width, height);

      // Blinding white flash near impact
      const strikeTime = activeTechnique === 'godspeed' || activeTechnique === 'finale' ? 850 : 350;
      if (elapsed > strikeTime && elapsed < strikeTime + 280) {
        flashIntensity = 1 - (elapsed - strikeTime) / 280;
        ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity * 0.85})`;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw active slashes
      ctx.save();
      slashes.forEach((s, idx) => {
        const slashDelay = activeTechnique === 'godspeed' || activeTechnique === 'finale' ? 850 : idx * 120 + 200;
        if (elapsed > slashDelay) {
          const slashAge = elapsed - slashDelay;
          const slashProgress = Math.min(1, slashAge / 120);

          const curX = s.x1 + (s.x2 - s.x1) * slashProgress;
          const curY = s.y1 + (s.y2 - s.y1) * slashProgress;

          if (slashProgress < 1) {
            spawnSparks(curX, curY, 3, s.color);
          }

          // Outer yellow glow
          ctx.strokeStyle = s.color;
          ctx.shadowColor = '#fee135';
          ctx.shadowBlur = 30;
          ctx.lineWidth = 14;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.x1, s.y1);
          ctx.lineTo(curX, curY);
          ctx.stroke();

          // White blade core
          ctx.strokeStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(s.x1, s.y1);
          ctx.lineTo(curX, curY);
          ctx.stroke();
        }
      });
      ctx.restore();

      // Render sparks
      ctx.save();
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.life += 1;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.94;
        sp.vy *= 0.94;

        if (sp.life >= sp.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const alpha = 1 - sp.life / sp.maxLife;
        ctx.fillStyle = sp.color;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, Math.max(1, 3 * alpha), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (elapsed < duration) {
        animId = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeTechnique, onComplete, reducedMotion]);

  if (!activeTechnique) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Technique Title Flash */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none animate-pulse">
        <span className="text-[#fee135] text-sm tracking-[0.4em] font-sans font-bold uppercase mb-2 drop-shadow-[0_0_12px_rgba(254,225,53,0.8)]">
          雷の呼吸 • THUNDER BREATHING
        </span>
        <h2 className="text-4xl md:text-6xl font-cinzel font-black tracking-wider text-white drop-shadow-[0_0_25px_rgba(254,225,53,0.9)] uppercase">
          {activeTechnique === 'thunderclap' && 'Thunderclap & Flash'}
          {activeTechnique === 'sixfold' && 'Thunderclap: Sixfold'}
          {activeTechnique === 'eightfold' && 'Thunderclap: Eightfold'}
          {activeTechnique === 'godspeed' && 'Thunderclap: Godspeed'}
          {activeTechnique === 'flaming_god' && 'Seventh Form: Flaming Thunder God'}
          {activeTechnique === 'finale' && 'First Form: Thunderclap & Flash'}
        </h2>
      </div>
    </div>
  );
};
