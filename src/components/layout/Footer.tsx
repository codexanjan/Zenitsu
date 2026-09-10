import React from 'react';
import { ArrowUp, Volume2, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../audio/SoundEngine';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#fee135]/15 bg-[#050507] pt-16 pb-12 overflow-hidden z-20">
      {/* Background ambient gold gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#fee135]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Logo & Kanji */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-[#fee135] font-jp font-bold text-2xl tracking-widest">
                我妻 善逸
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fee135]/60" />
              <span className="text-white/60 font-sans text-xs tracking-[0.25em] uppercase">
                Thunder Breathing
              </span>
            </div>
            <h2 className="font-cinzel text-xl font-bold tracking-widest text-white">
              ZENITSU AGATSUMA
            </h2>
            <p className="text-xs text-neutral-400 mt-1 font-sans">
              Unofficial Fan Experience • Cinematic Anime Portfolio
            </p>
          </div>

          {/* Center Creator Credit: BUILT WITH ❤️ BY ANJAN SHETTY */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-[#fee135]/10 via-[#0c0d12] to-[#050507] border border-[#fee135]/30 shadow-[0_0_35px_rgba(254,225,53,0.15)] text-center space-y-3 relative group">
            {/* Ambient glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-[#fee135]/5 blur-xl group-hover:bg-[#fee135]/15 transition-all duration-500 pointer-events-none" />
            
            <div className="relative flex items-center space-x-2 text-sm sm:text-base font-cinzel font-bold tracking-[0.2em] text-white">
              <span>BUILT WITH</span>
              <Heart size={16} className="text-red-500 fill-red-500 animate-pulse inline-block" />
              <span>BY</span>
              <a
                href="https://github.com/codexanjan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fee135] hover:text-[#fff385] drop-shadow-[0_0_12px_rgba(254,225,53,0.6)] underline decoration-[#fee135]/40 underline-offset-4 transition-colors"
              >
                ANJAN SHETTY
              </a>
            </div>

            <a
              href="https://github.com/codexanjan/Zenitsu"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center space-x-3 px-5 py-2.5 rounded-full bg-[#050507] border border-[#fee135]/40 text-xs sm:text-sm font-mono tracking-wider text-neutral-200 hover:text-white hover:border-[#fee135] hover:shadow-[0_0_25px_rgba(254,225,53,0.4)] hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-4 h-4 fill-current text-[#fee135]"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="font-semibold text-[#fee135]">codexanjan/Zenitsu</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#fee135]/20 text-[#fee135] font-bold tracking-widest border border-[#fee135]/30">
                ★ GITHUB
              </span>
            </a>
          </div>

          {/* Quick controls */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => sound.toggleMute()}
              className="flex items-center space-x-2 text-xs font-sans tracking-widest text-neutral-400 hover:text-[#fee135] transition-colors cursor-pointer"
            >
              <Volume2 size={15} />
              <span>SOUND CONTROLS</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-xs font-sans tracking-widest text-neutral-400 hover:text-[#fee135] transition-colors group cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={15} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-sans gap-4 text-center sm:text-left">
          <p className="max-w-2xl leading-relaxed">
            Crafted by{' '}
            <a
              href="https://github.com/codexanjan/Zenitsu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fee135] hover:underline font-medium"
            >
              Anjan Shetty
            </a>
            . This is an unofficial fan-made project created for artistic appreciation.
            <span className="block text-neutral-400 mt-0.5">
              Demon Slayer: Kimetsu no Yaiba and its characters belong to Koyoharu Gotouge / SHUEISHA / Aniplex / ufotable.
            </span>
          </p>
          <div className="flex items-center space-x-2 text-[#fee135]/70 shrink-0">
            <Sparkles size={13} />
            <span className="tracking-wider">FORGED WITH LIGHTNING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
