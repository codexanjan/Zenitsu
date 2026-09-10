import React, { useEffect, useRef } from 'react';

interface GlobalCanvasProps {
  thunderMode: boolean;
  reducedMotion?: boolean;
  thunderTrigger?: number;
}

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  layer: number;
}

interface Ember {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxLife: number;
  life: number;
}

interface LightningBranch {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  thickness: number;
}

export const GlobalCanvas: React.FC<GlobalCanvasProps> = ({ thunderMode, reducedMotion = false, thunderTrigger = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const triggerRef = useRef(thunderTrigger);

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

    // Initialize Rain drops
    const dropCount = thunderMode ? 140 : 80;
    const drops: Drop[] = [];
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 12 + Math.random() * 18,
        speed: 8 + Math.random() * 12,
        opacity: 0.15 + Math.random() * 0.35,
        layer: Math.random() > 0.6 ? 2 : 1,
      });
    }

    // Initialize Embers (floating golden sparks)
    const emberCount = thunderMode ? 45 : 20;
    const embers: Ember[] = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -0.3 - Math.random() * 0.8,
        opacity: Math.random() * 0.8,
        maxLife: 80 + Math.random() * 120,
        life: Math.random() * 100,
      });
    }

    // Lightning State
    let lightningBranches: LightningBranch[] = [];
    let flashAlpha = 0;
    let nextLightningTime = Date.now() + 4000 + Math.random() * 6000;

    const generateLightning = (startX: number, startY: number, length: number, angle: number, depth: number) => {
      if (depth > 5) return;
      const endX = startX + Math.sin(angle) * length + (Math.random() - 0.5) * 25;
      const endY = startY + Math.cos(angle) * length + (Math.random() - 0.5) * 15;

      lightningBranches.push({
        startX,
        startY,
        endX,
        endY,
        thickness: Math.max(1, 4 - depth * 0.7),
      });

      if (Math.random() > 0.4 && depth < 4) {
        // Child branch
        generateLightning(endX, endY, length * 0.65, angle + (Math.random() - 0.5) * 0.9, depth + 1);
      }
      generateLightning(endX, endY, length * 0.8, angle + (Math.random() - 0.5) * 0.4, depth + 1);
    };

    const triggerLightning = (isSuper: boolean = false) => {
      if (reducedMotion) return;
      lightningBranches = [];
      const boltCount = isSuper ? 4 : 1;
      for (let i = 0; i < boltCount; i++) {
        const startX = width * 0.1 + Math.random() * width * 0.8;
        generateLightning(startX, 0, height * (0.12 + Math.random() * 0.05), (Math.random() - 0.5) * 0.3, 0);
      }
      flashAlpha = isSuper ? 0.95 : (thunderMode ? 0.4 : 0.25);
      nextLightningTime = Date.now() + (thunderMode ? 3500 + Math.random() * 4000 : 7000 + Math.random() * 9000);
    };

    if (thunderTrigger > 0 && thunderTrigger !== triggerRef.current) {
      triggerRef.current = thunderTrigger;
      triggerLightning(true);
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Distant lightning flash check
      const now = Date.now();
      if (now > nextLightningTime) {
        triggerLightning();
      }

      // 1. Draw lightning flash overlay
      if (flashAlpha > 0.005) {
        ctx.fillStyle = `rgba(254, 225, 53, ${flashAlpha * 0.15})`;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.1})`;
        ctx.fillRect(0, 0, width, height);
        flashAlpha *= 0.88;
      }

      // 2. Draw Lightning Branches
      if (lightningBranches.length > 0 && flashAlpha > 0.05) {
        ctx.save();
        // Golden glow
        ctx.strokeStyle = '#fee135';
        ctx.shadowColor = '#fee135';
        ctx.shadowBlur = thunderMode ? 25 : 15;
        ctx.lineCap = 'round';

        for (const b of lightningBranches) {
          ctx.lineWidth = b.thickness + 2;
          ctx.beginPath();
          ctx.moveTo(b.startX, b.startY);
          ctx.lineTo(b.endX, b.endY);
          ctx.stroke();
        }

        // White hot core
        ctx.strokeStyle = '#ffffff';
        ctx.shadowBlur = 4;
        for (const b of lightningBranches) {
          ctx.lineWidth = Math.max(1, b.thickness * 0.6);
          ctx.beginPath();
          ctx.moveTo(b.startX, b.startY);
          ctx.lineTo(b.endX, b.endY);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Render Rain
      if (!reducedMotion) {
        ctx.save();
        ctx.lineWidth = 1.2;
        const rainMultiplier = flashAlpha > 0.05 ? 1.8 : 1.0;

        for (const drop of drops) {
          ctx.strokeStyle = `rgba(200, 220, 245, ${drop.opacity * rainMultiplier})`;
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 1, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed * (thunderMode ? 1.25 : 1);
          drop.x -= 0.5;

          if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
          }
        }
        ctx.restore();
      }

      // 4. Render Floating Embers
      if (!reducedMotion) {
        ctx.save();
        for (const ember of embers) {
          ember.life += 1;
          if (ember.life >= ember.maxLife) {
            ember.life = 0;
            ember.x = Math.random() * width;
            ember.y = height + 10;
          }

          const currentAlpha = Math.sin((ember.life / ember.maxLife) * Math.PI) * ember.opacity;
          ctx.fillStyle = `rgba(254, 225, 53, ${currentAlpha})`;
          ctx.shadowColor = '#fee135';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
          ctx.fill();

          ember.x += ember.speedX;
          ember.y += ember.speedY;
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [thunderMode, reducedMotion, thunderTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
