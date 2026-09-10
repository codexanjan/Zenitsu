import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Storyline } from './components/sections/Storyline';
import { Techniques } from './components/sections/Techniques';
import { Lore } from './components/sections/Lore';
import { Gallery } from './components/sections/Gallery';
import { Finale } from './components/sections/Finale';
import { Footer } from './components/layout/Footer';
import { GlobalCanvas } from './components/effects/GlobalCanvas';
import { SlashOverlay } from './components/effects/SlashOverlay';
import type { TechniqueType } from './components/effects/SlashOverlay';
import { CustomCursor } from './components/effects/CustomCursor';
import { ThunderOverdrive } from './components/effects/ThunderOverdrive';
import { IaidoSlash } from './components/effects/IaidoSlash';
import { GodspeedReflex } from './components/effects/GodspeedReflex';
import { sound } from './audio/SoundEngine';

export function App() {
  const [thunderMode, setThunderMode] = useState<boolean>(false);
  const [thunderTrigger, setThunderTrigger] = useState<number>(0);
  const [activeTechnique, setActiveTechnique] = useState<TechniqueType | null>(null);
  const [isReflexOpen, setIsReflexOpen] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Listen to system reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const triggerThunderBurst = () => {
    setThunderTrigger((prev) => prev + 1);
    sound.playThunderclap();
    sound.playElectricHum(0.8);

    if (!reducedMotion) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleToggleThunder = () => {
    triggerThunderBurst();

    setThunderMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('thunder-mode-active');
      } else {
        document.body.classList.remove('thunder-mode-active');
      }
      return next;
    });
  };

  const handleToggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const handleActivateTechnique = (tech: TechniqueType) => {
    if (activeTechnique) return;
    setActiveTechnique(tech);
  };

  const handleTechniqueComplete = () => {
    setActiveTechnique(null);
  };

  return (
    <div
      className={`relative min-h-screen bg-[#050507] text-[#e2e8f0] overflow-x-hidden selection:bg-[#fee135] selection:text-[#050507] ${
        isShaking ? 'animate-thunder-shake' : ''
      }`}
    >
      {/* Desktop Custom Electric Cursor */}
      <CustomCursor thunderMode={thunderMode} />

      {/* Atmospheric Canvas Layer: Procedural Branching Lightning, Rain & Embers */}
      <GlobalCanvas
        thunderMode={thunderMode}
        reducedMotion={reducedMotion}
        thunderTrigger={thunderTrigger}
      />

      {/* Electrified Viewport Border Arcs & Cyberpunk HUD when Thunder Mode Active */}
      <ThunderOverdrive
        active={thunderMode}
        onTriggerBolt={triggerThunderBurst}
      />

      {/* Interactive Iaido Drag-to-Slash Blade Mechanic */}
      <IaidoSlash />

      {/* Interactive Godspeed Reaction Speed Test Modal */}
      <GodspeedReflex
        isOpen={isReflexOpen}
        onClose={() => setIsReflexOpen(false)}
      />

      {/* Interactive Technique Fullscreen Sword Slash & Lightning Choreography */}
      <SlashOverlay
        activeTechnique={activeTechnique}
        onComplete={handleTechniqueComplete}
        reducedMotion={reducedMotion}
      />

      {/* Navigation Header */}
      <Navbar
        thunderMode={thunderMode}
        onToggleThunder={handleToggleThunder}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10 w-full">
        {/* 1. Hero Section */}
        <Hero
          thunderMode={thunderMode}
          onToggleThunder={handleToggleThunder}
          onOpenReflexTest={() => setIsReflexOpen(true)}
          reducedMotion={reducedMotion}
        />

        {/* 2. Editorial About Profile */}
        <About />

        {/* 3. 8-Chapter Animated Storyline */}
        <Storyline />

        {/* 4. Cinematic Techniques (Including 7th Form: Flaming Thunder God) */}
        <Techniques
          onActivateTechnique={handleActivateTechnique}
          isTechniqueActive={activeTechnique !== null}
        />

        {/* 5. Lore of Lightning (Superhuman Hearing, Nichirin Katana, Chuntaro) */}
        <Lore />

        {/* 6. Visual Archive Gallery (Uniform 1:1 Square Grid) */}
        <Gallery />

        {/* 7. Finale Climax & Video Cutscene */}
        <Finale
          onTriggerClimax={handleActivateTechnique}
          reducedMotion={reducedMotion}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
