import React from 'react';
import portraitImg from '../../assets/zenitsu/portrait/zenitsu_portrait.jpg';
import { AnimeImage } from '../common/AnimeImage';

export const About: React.FC = () => {
  const attributes = [
    { name: 'SPEED', value: 99, desc: 'Instantaneous supersonic acceleration' },
    { name: 'HEARING', value: 98, desc: 'Perceives muscle movements, heartbeats, and emotional tones' },
    { name: 'REFLEXES', value: 96, desc: 'Subconscious automated neurological reaction' },
    { name: 'THUNDER BREATHING', value: 100, desc: 'Mastered the foundational First Form to absolute perfection' },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#050507] z-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] bg-[#fee135]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-start">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-[1px] bg-[#fee135]" />
            <span className="text-[#fee135] font-sans text-xs tracking-[0.35em] font-semibold uppercase">
              01 • PROFILE
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            THE RELUCTANT <span className="text-[#fee135]">THUNDER</span>
          </h2>
        </div>

        {/* Editorial Layout: Portrait Left / Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column (Left, 5 cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-lg overflow-hidden border border-[#fee135]/25 shadow-[0_10px_40px_rgba(0,0,0,0.8)] group-hover:border-[#fee135]/60 transition-colors duration-500">
              <AnimeImage
                desktopSrc={portraitImg}
                alt="Zenitsu Agatsuma editorial portrait"
                aspectRatio="2/3"
                glow
                className="w-full"
              />
              {/* Gold corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#fee135]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#fee135]" />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-sans tracking-widest text-neutral-400">
              <span className="text-[#fee135] font-jp font-bold">我妻 善逸</span>
              <span>PORTRAIT • 800 × 1200</span>
            </div>
          </div>

          {/* Editorial Content (Right, 7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 rounded-lg bg-[#0c0d12]/80 border border-white/10 backdrop-blur-sm">
              <div>
                <span className="block text-[10px] font-sans tracking-[0.25em] text-neutral-400 uppercase">
                  NAME
                </span>
                <span className="font-cinzel text-sm sm:text-base font-bold text-white mt-1 block">
                  Zenitsu Agatsuma
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-sans tracking-[0.25em] text-neutral-400 uppercase">
                  KANJI
                </span>
                <span className="font-jp text-base sm:text-lg font-bold text-[#fee135] mt-0.5 block">
                  我妻 善逸
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-sans tracking-[0.25em] text-neutral-400 uppercase">
                  AFFILIATION
                </span>
                <span className="font-sans text-xs sm:text-sm text-neutral-200 mt-1 block font-medium">
                  Demon Slayer Corps
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-sans tracking-[0.25em] text-neutral-400 uppercase">
                  BREATHING STYLE
                </span>
                <span className="font-sans text-xs sm:text-sm text-[#fee135] mt-1 block font-semibold">
                  Thunder Breathing
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-sans tracking-[0.25em] text-neutral-400 uppercase">
                  WEAPON
                </span>
                <span className="font-sans text-xs sm:text-sm text-neutral-200 mt-1 block font-medium">
                  Nichirin Katana
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-sans tracking-[0.25em] text-neutral-400 uppercase">
                  PERSONALITY
                </span>
                <span className="font-sans text-xs sm:text-sm text-neutral-200 mt-1 block font-medium">
                  Fearful, Loyal, Resolute
                </span>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              <p>
                Beneath his loud protestations of cowardice lies a warrior forged by lightning and grief.
                Struck by a bolt of actual thunder while training on Mount Hanatate, his dark hair turned bright yellow—an omen of the catastrophic electrical power slumbering within his body.
              </p>
              <p>
                Unable to learn any of the other five traditional Thunder Breathing forms, Zenitsu was guided by his mentor Jigoro Kuwajima to hone a single strike until it reached divine execution:
                <em className="text-[#fee135] not-italic font-normal block my-2 pl-4 border-l-2 border-[#fee135]">
                  "If you can only do one thing, master it. Hone it to the utmost limit, and forge it into an invincible blade."
                </em>
                When fear overcomes his conscious mind and he slips into deep slumber, his supreme senses awake—striking demons with the unyielding speed of heaven’s lightning.
              </p>
            </div>

            {/* 4 Minimal Attribute Progress Bars */}
            <div className="pt-6 border-t border-white/10 space-y-5">
              <span className="text-[11px] font-sans tracking-[0.3em] text-[#fee135] font-bold uppercase block">
                COMBAT ATTRIBUTES
              </span>

              <div className="space-y-4">
                {attributes.map((attr) => (
                  <div key={attr.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="tracking-widest font-semibold text-white">
                        {attr.name}
                      </span>
                      <span className="text-[#fee135] font-mono font-bold">
                        {attr.value}%
                      </span>
                    </div>

                    {/* Progress line */}
                    <div className="w-full h-[3px] bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fee135] rounded-full shadow-[0_0_10px_#fee135]"
                        style={{ width: `${attr.value}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-neutral-400 font-sans block">
                      {attr.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
