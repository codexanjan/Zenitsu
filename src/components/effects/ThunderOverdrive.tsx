import React, { useEffect, useRef } from 'react';
import { Zap, Flame } from 'lucide-react';

interface ThunderOverdriveProps {
  active: boolean;
  onTriggerBolt: () => void;
}

export const ThunderOverdrive: React.FC<ThunderOverdriveProps> = ({ active, onTriggerBolt }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

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

    let animId: number;

    const drawBorderArcs = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw electrified borders
      ctx.save();
      ctx.strokeStyle = '#fee135';
      ctx.shadowColor = '#fee135';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;

      const segments = 16;
      // Top border
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let i = 1; i <= segments; i++) {
        const x = (width / segments) * i;
        const y = Math.random() * 8;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Bottom border
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let i = 1; i <= segments; i++) {
        const x = (width / segments) * i;
        const y = height - Math.random() * 8;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Left border
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let i = 1; i <= segments; i++) {
        const x = Math.random() * 8;
        const y = (height / segments) * i;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Right border
      ctx.beginPath();
      ctx.moveTo(width, 0);
      for (let i = 1; i <= segments; i++) {
        const x = width - Math.random() * 8;
        const y = (height / segments) * i;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Occasional random electric arcs near corners
      if (Math.random() > 0.6) {
        const corner = Math.floor(Math.random() * 4);
        let cx = 0, cy = 0;
        if (corner === 1) cx = width;
        if (corner === 2) { cx = width; cy = height; }
        if (corner === 3) cy = height;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        for (let j = 0; j < 4; j++) {
          const rx = cx + (corner % 2 === 0 ? 1 : -1) * (15 + Math.random() * 40);
          const ry = cy + (corner < 2 ? 1 : -1) * (15 + Math.random() * 40);
          ctx.lineTo(rx, ry);
        }
        ctx.stroke();
      }

      ctx.restore();

      animId = requestAnimationFrame(drawBorderArcs);
    };

    drawBorderArcs();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* Perimeter Electric Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40 w-full h-full"
      />

      {/* Floating Thunder Overdrive HUD */}
      <div className="fixed top-20 right-6 z-40 hidden sm:flex items-center space-x-4 bg-[#0c0d12]/90 backdrop-blur-xl border border-[#fee135]/50 px-4 py-2.5 rounded-2xl shadow-[0_0_30px_rgba(254,225,53,0.35)] animate-fade-in">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#fee135]/15 border border-[#fee135]/40 flex items-center justify-center text-[#fee135]">
            <Zap size={16} className="fill-current animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest text-[#fee135] font-bold">
              <span>OVERDRIVE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            </div>
            <span className="font-mono text-xs font-black text-white">
              9,999,999 V
            </span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-white/10" />

        {/* Audio Reactive Bars */}
        <div className="flex items-end space-x-1 h-5">
          <span className="w-1 bg-[#fee135] rounded-full h-3 animate-pulse" />
          <span className="w-1 bg-[#fee135] rounded-full h-5 animate-bounce" />
          <span className="w-1 bg-[#fee135] rounded-full h-2 animate-pulse" />
          <span className="w-1 bg-[#fee135] rounded-full h-4 animate-bounce" />
        </div>

        {/* Instant Manual Strike Button */}
        <button
          onClick={onTriggerBolt}
          title="Discharge Lightning Bolt"
          className="px-3 py-1 rounded-full bg-[#fee135] text-[#050507] text-[10px] font-sans tracking-wider font-black hover:bg-white hover:shadow-[0_0_15px_#fee135] transition-all cursor-pointer flex items-center space-x-1"
        >
          <Flame size={12} className="fill-current" />
          <span>STRIKE</span>
        </button>
      </div>
    </>
  );
};
