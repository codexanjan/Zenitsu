import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../audio/SoundEngine';
import { Zap } from 'lucide-react';

interface Point {
  x: number;
  y: number;
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

interface FadingSlash {
  points: Point[];
  opacity: number;
}

export const IaidoSlash: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSlashedOnce, setHasSlashedOnce] = useState(false);
  const currentPoints = useRef<Point[]>([]);
  const fadingSlashes = useRef<FadingSlash[]>([]);
  const sparks = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const spawnSparks = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 8;
        sparks.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 20 + Math.random() * 20,
          color: Math.random() > 0.3 ? '#fee135' : '#ffffff',
        });
      }
    };

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw currently active drag line
      if (currentPoints.current.length > 1) {
        ctx.save();
        ctx.strokeStyle = '#fee135';
        ctx.shadowColor = '#fee135';
        ctx.shadowBlur = 20;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(currentPoints.current[0].x, currentPoints.current[0].y);
        for (let i = 1; i < currentPoints.current.length; i++) {
          ctx.lineTo(currentPoints.current[i].x, currentPoints.current[i].y);
        }
        ctx.stroke();

        // White core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(currentPoints.current[0].x, currentPoints.current[0].y);
        for (let i = 1; i < currentPoints.current.length; i++) {
          ctx.lineTo(currentPoints.current[i].x, currentPoints.current[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw fading completed slashes
      for (let i = fadingSlashes.current.length - 1; i >= 0; i--) {
        const slash = fadingSlashes.current[i];
        slash.opacity -= 0.04;

        if (slash.opacity <= 0) {
          fadingSlashes.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(254, 225, 53, ${slash.opacity})`;
        ctx.shadowColor = '#fee135';
        ctx.shadowBlur = 30 * slash.opacity;
        ctx.lineWidth = 8 * slash.opacity;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(slash.points[0].x, slash.points[0].y);
        for (let j = 1; j < slash.points.length; j++) {
          ctx.lineTo(slash.points[j].x, slash.points[j].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render sparks
      for (let i = sparks.current.length - 1; i >= 0; i--) {
        const sp = sparks.current[i];
        sp.life += 1;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.92;
        sp.vy *= 0.92;

        if (sp.life >= sp.maxLife) {
          sparks.current.splice(i, 1);
          continue;
        }

        const alpha = 1 - sp.life / sp.maxLife;
        ctx.save();
        ctx.fillStyle = sp.color;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, Math.max(1, 2.5 * alpha), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse / Touch Event Listeners on window
    const handleStart = (clientX: number, clientY: number) => {
      setIsDrawing(true);
      currentPoints.current = [{ x: clientX, y: clientY }];
      spawnSparks(clientX, clientY, 6);
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDrawing) return;
      const last = currentPoints.current[currentPoints.current.length - 1];
      const dist = Math.hypot(clientX - last.x, clientY - last.y);
      if (dist > 8) {
        currentPoints.current.push({ x: clientX, y: clientY });
        if (Math.random() > 0.4) spawnSparks(clientX, clientY, 2);
      }
    };

    const handleEnd = () => {
      if (!isDrawing) return;
      setIsDrawing(false);

      if (currentPoints.current.length > 2) {
        // Unleash the Iaido Sword Slash!
        sound.playSwordSlash('standard');
        if (currentPoints.current.length > 6) {
          sound.playThunder(0.5);
        }

        fadingSlashes.current.push({
          points: [...currentPoints.current],
          opacity: 1.0,
        });

        const endP = currentPoints.current[currentPoints.current.length - 1];
        spawnSparks(endP.x, endP.y, 25);
        setHasSlashedOnce(true);
      }
      currentPoints.current = [];
    };

    const onMouseDown = (e: MouseEvent) => {
      // Ignore clicks on buttons, links, or controls
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.getAttribute('role') === 'button'
      ) return;
      handleStart(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const target = t.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) return;
        handleStart(t.clientX, t.clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => handleEnd();

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animId);
    };
  }, [isDrawing]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      />

      {/* Floating Instruction Pill (fades after first slash) */}
      {!hasSlashedOnce && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce">
          <div className="flex items-center space-x-2 bg-[#050507]/90 backdrop-blur-md border border-[#fee135]/40 px-4 py-2 rounded-full text-[11px] font-sans tracking-widest text-[#fee135] shadow-[0_0_20px_rgba(254,225,53,0.35)]">
            <Zap size={13} className="fill-current" />
            <span>DRAG / SWIPE ANYWHERE TO UNSHEATHE BLADE</span>
          </div>
        </div>
      )}
    </>
  );
};
