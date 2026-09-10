import React, { useState } from 'react';
import thunderclapImg from '../../assets/zenitsu/techniques/thunderclap.jpg';
import sixfoldImg from '../../assets/zenitsu/techniques/sixfold.jpg';
import eightfoldImg from '../../assets/zenitsu/techniques/eightfold.jpg';
import godspeedImg from '../../assets/zenitsu/techniques/godspeed.jpg';
import { AnimeImage } from '../common/AnimeImage';
import type { TechniqueType } from '../effects/SlashOverlay';
import { Play, Zap, Gauge, Flame, Wind } from 'lucide-react';

interface TechniqueData {
  id: TechniqueType;
  formNumber: string;
  name: string;
  japanese: string;
  image: string;
  description: string;
  statLabel: string;
  statValue: string;
  statSub: string;
  icon: React.ReactNode;
}

const techniquesList: TechniqueData[] = [
  {
    id: 'thunderclap',
    formNumber: 'FIRST FORM',
    name: 'THUNDERCLAP & FLASH',
    japanese: '壱ノ型 霹靂一閃',
    image: thunderclapImg,
    description:
      'The foundational core of Thunder Breathing. Zenitsu dashes forward at supersonic velocity and decapitates his opponent in the blink of an eye before they can even perceive the draw of his blade.',
    statLabel: 'ACCELERATION',
    statValue: 'MACH 2.4',
    statSub: 'Single strike instantaneous velocity',
    icon: <Zap size={16} className="text-[#fee135]" />,
  },
  {
    id: 'sixfold',
    formNumber: 'FIRST FORM MODIFICATION',
    name: 'SIXFOLD (ROKUREN)',
    japanese: '霹靂一閃 六連',
    image: sixfoldImg,
    description:
      'An extension developed through desperate necessity. Zenitsu chains six consecutive Thunderclap & Flash strikes in an erratic zigzag trajectory, creating six echoing sonic booms that disorient and dismantle multiple foes.',
    statLabel: 'TRAJECTORY',
    statValue: '6 REBOUNDS',
    statSub: 'Multi-angle consecutive strikes',
    icon: <Wind size={16} className="text-[#fee135]" />,
  },
  {
    id: 'eightfold',
    formNumber: 'ADVANCED FORM',
    name: 'EIGHTFOLD (HACHIREN)',
    japanese: '霹靂一閃 八連',
    image: eightfoldImg,
    description:
      'Pushing the boundary of his physical limits, Zenitsu executes eight lightning strikes in rapid succession. The sheer electric discharge sets the surrounding atmosphere ablaze with blinding arcs.',
    statLabel: 'STRIKE DENSITY',
    statValue: '8 CONCURRENT',
    statSub: 'Dense omnidirectional assault',
    icon: <Flame size={16} className="text-[#fee135]" />,
  },
  {
    id: 'godspeed',
    formNumber: 'ULTIMATE TRANSMISSION',
    name: 'GODSPEED (SHINSOKU)',
    japanese: '霹靂一閃 神速',
    image: godspeedImg,
    description:
      'The supreme pinnacle of Thunder Breathing. An overwhelming burst of speed that shatters the user’s leg bones. Zenitsu warps through space faster than demonic visual cognition, cutting down Upper Rank demons in dead silence.',
    statLabel: 'MAX VELOCITY',
    statValue: 'MACH 5+',
    statSub: 'Trans-dimensional lightning dash (Limit: 2x)',
    icon: <Gauge size={16} className="text-[#fee135]" />,
  },
  {
    id: 'flaming_god',
    formNumber: 'SEVENTH FORM (ORIGINAL)',
    name: 'FLAMING THUNDER GOD',
    japanese: '漆ノ型 火雷神',
    image: godspeedImg,
    description:
      'A personal creation conceived entirely by Zenitsu Agatsuma to stand as an equal to Kaigaku. A strike of incandescent gold and flame taking the shape of a celestial thunder dragon, moving at speeds that tear the surrounding air into incandescent plasma.',
    statLabel: 'ORIGIN',
    statValue: 'DIVINE DRAGON',
    statSub: 'Zenitsu\'s self-created supreme 7th form',
    icon: <Flame size={16} className="text-[#ea580c]" />,
  },
];

interface TechniquesProps {
  onActivateTechnique: (tech: TechniqueType) => void;
  isTechniqueActive: boolean;
}

export const Techniques: React.FC<TechniquesProps> = ({
  onActivateTechnique,
  isTechniqueActive,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentTech = techniquesList[activeTab];

  return (
    <section id="techniques" className="relative py-28 md:py-36 bg-[#050507] text-white z-20 overflow-hidden">
      {/* Ambient background lightning glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#fee135]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-[#fee135]" />
              <span className="text-[#fee135] font-sans text-xs tracking-[0.35em] font-semibold uppercase">
                02 • FORMS OF LIGHTNING
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
              THUNDER <span className="text-[#fee135]">TECHNIQUES</span>
            </h2>
          </div>

          <div className="text-right">
            <span className="font-jp text-lg sm:text-xl text-[#fee135]/80 font-bold block">
              雷の呼吸 • 漆ノ型 火雷神
            </span>
            <span className="text-xs font-sans tracking-[0.25em] text-neutral-400 uppercase">
              Iaido Quick-Draw & Divine Creation
            </span>
          </div>
        </div>

        {/* Tab Navigation for the 5 Techniques */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {techniquesList.map((t, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#fee135] bg-[#0c0d12] shadow-[0_0_25px_rgba(254,225,53,0.25)]'
                    : 'border-white/10 bg-[#08090d]/60 hover:border-white/30 text-neutral-400'
                }`}
              >
                <div className="text-[10px] font-mono tracking-widest text-[#fee135] uppercase mb-1">
                  {t.formNumber}
                </div>
                <div className="font-cinzel text-sm sm:text-base font-bold text-white uppercase tracking-wider truncate">
                  {t.name}
                </div>
                <div className="font-jp text-xs text-neutral-500 mt-1">
                  {t.japanese}
                </div>
              </button>
            );
          })}
        </div>

        {/* Large Cinematic Technique Panel */}
        <div className="relative rounded-2xl overflow-hidden border border-[#fee135]/25 bg-[#0c0d12] shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            {/* Cinematic Visual (7 cols) */}
            <div className="lg:col-span-7 relative overflow-hidden group">
              <AnimeImage
                desktopSrc={currentTech.image}
                alt={currentTech.name}
                aspectRatio="16/9"
                glow
                className="w-full h-full min-h-[340px] md:min-h-[480px]"
              />

              {/* Japanese Watermark */}
              <div className="absolute top-6 left-6 font-jp text-4xl sm:text-6xl font-black text-white/10 pointer-events-none">
                {currentTech.japanese}
              </div>

              {/* Gold border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fee135] to-transparent opacity-70" />
            </div>

            {/* Technique Details & Trigger Button (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#fee135] tracking-widest uppercase mb-2">
                  <span>{currentTech.formNumber}</span>
                  <span>•</span>
                  <span className="font-jp">{currentTech.japanese}</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-4xl font-black uppercase text-white tracking-wide mb-4 leading-tight">
                  {currentTech.name}
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed font-sans mb-8">
                  {currentTech.description}
                </p>

                {/* Minimal Stat Line */}
                <div className="p-4 rounded-xl bg-[#141620] border border-white/10 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#fee135]/10 border border-[#fee135]/30 flex items-center justify-center shrink-0">
                    {currentTech.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-sans tracking-[0.2em] text-neutral-400 uppercase">
                        {currentTech.statLabel}:
                      </span>
                      <span className="font-mono text-sm font-bold text-[#fee135]">
                        {currentTech.statValue}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 font-sans block mt-0.5">
                      {currentTech.statSub}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTIVATE Button */}
              <button
                disabled={isTechniqueActive}
                onClick={() => onActivateTechnique(currentTech.id)}
                className={`w-full py-4 px-6 rounded-full font-sans text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer ${
                  isTechniqueActive
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-[#fee135] text-[#050507] hover:bg-white hover:shadow-[0_0_35px_rgba(254,225,53,0.7)] hover:scale-[1.02] active:scale-95'
                }`}
              >
                <Play size={14} className="fill-current" />
                <span>{isTechniqueActive ? 'EXECUTING STRIKE...' : 'ACTIVATE TECHNIQUE'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
