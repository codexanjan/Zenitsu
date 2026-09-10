import React, { useState } from 'react';
import finaleZenitsuImg from '../../assets/zenitsu/finale/finale_zenitsu.jpg';
import { sound } from '../../audio/SoundEngine';
import type { TechniqueType } from '../effects/SlashOverlay';
import { RotateCcw, Zap } from 'lucide-react';
import { ClimaxVideo } from './ClimaxVideo';

interface FinaleProps {
  onTriggerClimax: (tech: TechniqueType) => void;
  reducedMotion?: boolean;
}

export const Finale: React.FC<FinaleProps> = ({ onTriggerClimax }) => {
  const [stage, setStage] = useState<'idle' | 'breathing' | 'first_form' | 'thunderclap' | 'climax_done'>('idle');

  const startClimaxSequence = () => {
    sound.setSection('ch07'); // Quiet ambience & heartbeat
    setStage('breathing');

    setTimeout(() => {
      sound.playElectricHum(0.4);
      setStage('first_form');
    }, 1400);

    setTimeout(() => {
      setStage('thunderclap');
    }, 2800);

    setTimeout(() => {
      onTriggerClimax('finale');
      setTimeout(() => {
        setStage('climax_done');
      }, 1600);
    }, 4200);
  };

  const handleReplay = () => {
    setStage('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="finale"
      className="relative min-h-screen w-full flex items-center justify-center bg-[#050507] text-white overflow-hidden z-20 py-24"
    >
      {/* Dark Silhouette Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={finaleZenitsuImg}
          alt="Zenitsu silhouette before final strike"
          className="w-full h-full object-cover object-center filter brightness-40 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-[#050507]" />
      </div>

      {/* Atmospheric Fog/Darkness Overlay */}
      <div className="absolute inset-0 bg-[#050507]/50 backdrop-blur-[2px] z-10" />

      {/* Finale Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {stage === 'idle' && (
          <div className="flex flex-col items-center space-y-10 w-full animate-fade-in">
            <div className="flex items-center space-x-3 text-xs font-sans tracking-[0.4em] text-[#fee135] uppercase">
              <span className="w-8 h-[1px] bg-[#fee135]" />
              <span>THE CLIMAX OF THUNDER</span>
              <span className="w-8 h-[1px] bg-[#fee135]" />
            </div>

            <div>
              <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white max-w-2xl leading-none">
                DRAW THE <span className="text-[#fee135]">BLADE</span>
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase max-w-md mx-auto mt-3">
                Watch the cinematic climax cutscene or unleash the First Form directly.
              </p>
            </div>

            {/* Video Cutscene Component */}
            <div className="w-full my-4">
              <ClimaxVideo />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={startClimaxSequence}
                className="px-10 py-5 rounded-full bg-[#fee135] text-[#050507] font-sans text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(254,225,53,0.8)] hover:scale-105 active:scale-95 flex items-center space-x-3 cursor-pointer"
              >
                <Zap size={16} className="fill-[#050507]" />
                <span>UNLEASH FIRST FORM</span>
              </button>
            </div>
          </div>
        )}

        {/* Staggered Cinematic Text Invocations */}
        {stage === 'breathing' && (
          <div className="flex flex-col items-center space-y-4 animate-fade-in">
            <span className="text-xs font-jp tracking-[0.4em] text-[#fee135]">雷の呼吸</span>
            <h3 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_20px_rgba(254,225,53,0.6)]">
              THUNDER BREATHING
            </h3>
          </div>
        )}

        {stage === 'first_form' && (
          <div className="flex flex-col items-center space-y-4 animate-fade-in">
            <span className="text-xs font-jp tracking-[0.4em] text-[#fee135]">壱ノ型</span>
            <h3 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-[#fee135] uppercase drop-shadow-[0_0_30px_rgba(254,225,53,0.9)]">
              FIRST FORM
            </h3>
          </div>
        )}

        {stage === 'thunderclap' && (
          <div className="flex flex-col items-center space-y-4 animate-fade-in">
            <span className="text-xs font-jp tracking-[0.4em] text-white">霹靂一閃</span>
            <h3 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.9)]">
              THUNDERCLAP & FLASH
            </h3>
          </div>
        )}

        {/* Final Screen: Sound of Thunder */}
        {stage === 'climax_done' && (
          <div className="flex flex-col items-center space-y-8 animate-fade-in">
            <div className="w-12 h-12 rounded-full border border-[#fee135]/40 flex items-center justify-center text-[#fee135] font-jp text-lg font-bold shadow-[0_0_20px_rgba(254,225,53,0.4)]">
              雷
            </div>

            <div className="space-y-3">
              <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-white leading-none">
                ZENITSU <span className="text-[#fee135]">AGATSUMA</span>
              </h1>
              <h2 className="font-cinzel text-lg sm:text-2xl font-bold tracking-[0.35em] text-neutral-300 uppercase">
                THE SOUND OF THUNDER
              </h2>
            </div>

            <p className="font-sans text-xs sm:text-sm tracking-[0.3em] text-[#fee135]/80 uppercase max-w-lg italic">
              "Master one thing. Hone it to the utmost limit."
            </p>

            <button
              onClick={handleReplay}
              className="px-8 py-4 rounded-full border border-[#fee135] bg-[#fee135]/10 text-[#fee135] font-sans text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 hover:bg-[#fee135] hover:text-[#050507] hover:shadow-[0_0_30px_rgba(254,225,53,0.6)] flex items-center space-x-2 cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>REPLAY STORY</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
