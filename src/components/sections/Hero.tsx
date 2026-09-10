import React, { useState, useRef } from 'react';
import { Zap, ChevronDown, Award, Moon, AlertCircle } from 'lucide-react';
import heroDesktop from '../../assets/zenitsu/hero/desktop.jpg';
import heroMobile from '../../assets/zenitsu/hero/mobile.jpg';
import ch01Fear from '../../assets/zenitsu/story/ch01_fear.jpg';
import { sound } from '../../audio/SoundEngine';

interface HeroProps {
  thunderMode: boolean;
  onToggleThunder: () => void;
  onOpenReflexTest?: () => void;
  reducedMotion?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  thunderMode,
  onToggleThunder,
  onOpenReflexTest,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mentalState, setMentalState] = useState<'asleep' | 'awake'>('asleep');

  const handleExploreClick = () => {
    sound.playSwordSlash('standard');
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleThunderClick = () => {
    // Add screen shake to container
    if (containerRef.current) {
      containerRef.current.classList.add('animate-thunder-shake');
      setTimeout(() => {
        containerRef.current?.classList.remove('animate-thunder-shake');
      }, 500);
    }
    onToggleThunder();
  };

  const toggleMentalState = () => {
    const next = mentalState === 'asleep' ? 'awake' : 'asleep';
    setMentalState(next);
    if (next === 'asleep') {
      sound.playHeartbeat();
      sound.playElectricHum(0.5);
    } else {
      sound.playElectricHum(0.2);
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen min-h-[720px] flex items-center justify-center overflow-hidden bg-[#050507]"
    >
      {/* Background Image Layer with state switching (Asleep God vs Fearful Boy) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source media="(max-width: 768px)" srcSet={mentalState === 'asleep' ? heroMobile : ch01Fear} />
          <img
            src={mentalState === 'asleep' ? heroDesktop : ch01Fear}
            alt="Zenitsu Agatsuma in Thunder Breathing stance"
            className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
              mentalState === 'asleep'
                ? 'scale-100 filter brightness-100'
                : 'scale-105 filter grayscale-[50%] contrast-90'
            } ${reducedMotion ? '' : 'hover:scale-105'}`}
          />
        </picture>

        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/80 via-transparent to-[#050507]/80" />
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            thunderMode
              ? 'bg-[#fee135]/15 mix-blend-color-dodge opacity-70'
              : 'opacity-0'
          }`}
        />
      </div>

      {/* Atmospheric Fog Layer */}
      <div className="absolute inset-0 pointer-events-none z-1 bg-gradient-to-b from-transparent via-[#0c0d12]/20 to-[#050507]" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Interactive Mental State Switcher Pill */}
        <div className="mb-4">
          <button
            onClick={toggleMentalState}
            className="flex items-center space-x-2 bg-[#0c0d12]/90 backdrop-blur-md border border-[#fee135]/30 hover:border-[#fee135] px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-widest text-neutral-300 transition-all cursor-pointer shadow-lg"
          >
            {mentalState === 'asleep' ? (
              <>
                <Moon size={13} className="text-[#fee135]" />
                <span className="text-[#fee135] font-semibold">STATE: ASLEEP (THUNDER GOD)</span>
                <span className="text-[10px] text-neutral-500 font-mono">CLICK TO SWITCH</span>
              </>
            ) : (
              <>
                <AlertCircle size={13} className="text-amber-400" />
                <span className="text-amber-400 font-semibold">STATE: CONSCIOUS (FEARFUL BOY)</span>
                <span className="text-[10px] text-neutral-500 font-mono">CLICK TO SLEEP</span>
              </>
            )}
          </button>
        </div>

        {/* 1. Japanese Accent Text */}
        <div className="mb-2 flex items-center space-x-3 opacity-90 animate-fade-in">
          <span className="h-[1px] w-8 bg-[#fee135]/60" />
          <span className="font-jp text-sm sm:text-base tracking-[0.4em] text-[#fee135] font-bold drop-shadow-[0_0_10px_rgba(254,225,53,0.5)]">
            我妻 善逸 • 雷の呼吸
          </span>
          <span className="h-[1px] w-8 bg-[#fee135]/60" />
        </div>

        {/* Small Corps badge */}
        <div className="text-[10px] sm:text-xs font-sans tracking-[0.35em] text-neutral-400 uppercase mb-3">
          DEMON SLAYER CORPS
        </div>

        {/* 2. Large Oversized Title */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] mb-3 leading-none">
          ZENITSU <span className="text-[#fee135] drop-shadow-[0_0_30px_rgba(254,225,53,0.5)]">AGATSUMA</span>
        </h1>

        {/* 3. Subtitle */}
        <h2 className="font-cinzel text-sm sm:text-lg md:text-xl font-semibold tracking-[0.3em] text-neutral-200 uppercase mb-4">
          THUNDER BREATHING SWORDSMAN
        </h2>

        {/* 4. Tagline */}
        <p className="font-sans text-xs sm:text-sm tracking-[0.4em] text-[#fee135]/90 font-medium uppercase mb-8 max-w-lg">
          SPEED. INSTINCT. LIGHTNING.
        </p>

        {/* 5. Action Buttons (Explore, Thunder Mode, Reflex Challenge) */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleExploreClick}
            className="px-7 py-3.5 rounded-full bg-[#fee135] text-[#050507] font-sans text-xs tracking-[0.25em] font-bold uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(254,225,53,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            EXPLORE STORY
          </button>

          <button
            onClick={handleThunderClick}
            className={`px-7 py-3.5 rounded-full border text-xs font-sans tracking-[0.25em] font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
              thunderMode
                ? 'border-[#fee135] bg-[#fee135] text-[#050507] shadow-[0_0_25px_rgba(254,225,53,0.6)] font-black animate-pulse'
                : 'border-white/20 text-white hover:border-[#fee135] hover:text-[#fee135] hover:bg-[#fee135]/10'
            }`}
          >
            <Zap size={15} className={thunderMode ? 'fill-[#050507]' : ''} />
            <span>THUNDER MODE</span>
          </button>

          {onOpenReflexTest && (
            <button
              onClick={onOpenReflexTest}
              className="px-6 py-3.5 rounded-full border border-[#fee135]/40 bg-[#fee135]/10 text-[#fee135] font-sans text-xs tracking-[0.25em] font-bold uppercase transition-all duration-300 hover:bg-[#fee135] hover:text-[#050507] hover:shadow-[0_0_20px_rgba(254,225,53,0.4)] flex items-center space-x-2 cursor-pointer"
            >
              <Award size={15} />
              <span>TEST REFLEXES</span>
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none opacity-60 animate-bounce">
        <span className="text-[9px] font-sans tracking-[0.3em] text-neutral-400 mb-1 uppercase">SCROLL</span>
        <ChevronDown size={16} className="text-[#fee135]" />
      </div>
    </section>
  );
};
