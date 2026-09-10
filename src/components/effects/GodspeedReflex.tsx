import React, { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, X, Share2, Check } from 'lucide-react';
import { sound } from '../../audio/SoundEngine';

interface GodspeedReflexProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GodspeedReflex: React.FC<GodspeedReflexProps> = ({ isOpen, onClose }) => {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'flash' | 'result' | 'early'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const startTime = useRef<number>(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  if (!isOpen) return null;

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);
    sound.setSection('ch07'); // Quiet tension

    const randomDelay = 1800 + Math.random() * 2500;
    timeoutId.current = setTimeout(() => {
      startTime.current = Date.now();
      setGameState('flash');
      sound.playSwordSlash('godspeed');
      sound.playThunderclap();
    }, randomDelay);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      setGameState('early');
      sound.playElectricHum(0.2);
    } else if (gameState === 'flash') {
      const elapsed = Date.now() - startTime.current;
      setReactionTime(elapsed);
      setGameState('result');
    }
  };

  const getRank = (ms: number) => {
    if (ms < 170) return { title: 'GODSPEED RANK', kanji: '神速', desc: 'Beyond human neurological limits. Upper Moon Slayer.', color: '#ffffff' };
    if (ms < 220) return { title: 'THUNDER HASHIRA', kanji: '雷柱', desc: 'Worthy of succeeding Master Jigoro Kuwajima.', color: '#fee135' };
    if (ms < 290) return { title: 'CORPS TSUGUKO', kanji: '継子', desc: 'Exceptional reflex. First Form perfected.', color: '#f59e0b' };
    return { title: 'PANICKED ZENITSU', kanji: '泣き虫', desc: '"I heard a noise! Let’s run away right now!"', color: '#ea580c' };
  };

  const handleShare = () => {
    if (!reactionTime) return;
    const rank = getRank(reactionTime);
    const text = `⚡ I reacted in ${reactionTime}ms on the Zenitsu Portfolio! Rank: ${rank.title} (${rank.kanji}). Can you beat Godspeed? https://zenitsu-kohl.vercel.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const rank = reactionTime ? getRank(reactionTime) : null;

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none transition-colors duration-75 cursor-pointer ${
        gameState === 'flash'
          ? 'bg-white'
          : gameState === 'waiting'
          ? 'bg-[#030305]'
          : 'bg-[#050507]/95 backdrop-blur-xl'
      }`}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 z-50 p-3 rounded-full border border-white/20 text-neutral-400 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* Screen 1: Idle instructions */}
      {gameState === 'idle' && (
        <div className="max-w-md mx-auto text-center px-6 space-y-6 animate-fade-in pointer-events-auto">
          <div className="w-16 h-16 rounded-full bg-[#fee135]/15 border border-[#fee135]/50 flex items-center justify-center text-[#fee135] mx-auto shadow-[0_0_30px_rgba(254,225,53,0.4)]">
            <Zap size={28} />
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#fee135] tracking-[0.3em] uppercase block mb-1">
              REACTION CHALLENGE
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
              GODSPEED REFLEX TEST
            </h2>
          </div>

          <p className="text-neutral-300 text-xs sm:text-sm font-sans font-light leading-relaxed">
            Thunder Breathing requires lightning-fast instinct. When the screen flashes white and thunder cracks, click or tap as quickly as humanly possible.
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              startTest();
            }}
            className="w-full py-4 rounded-full bg-[#fee135] text-[#050507] font-sans text-xs tracking-[0.3em] font-black uppercase hover:bg-white hover:shadow-[0_0_30px_#fee135] transition-all cursor-pointer"
          >
            START TEST
          </button>
        </div>
      )}

      {/* Screen 2: Waiting */}
      {gameState === 'waiting' && (
        <div className="text-center space-y-4 pointer-events-none animate-pulse">
          <span className="font-jp text-4xl text-[#fee135]/40 block">全集中</span>
          <p className="font-sans text-xs tracking-[0.4em] text-neutral-400 uppercase">
            CONCENTRATE... WAIT FOR THE FLASH...
          </p>
        </div>
      )}

      {/* Screen 3: Flash */}
      {gameState === 'flash' && (
        <div className="text-center pointer-events-none">
          <h1 className="font-cinzel text-6xl sm:text-8xl font-black text-[#050507] tracking-widest uppercase">
            STRIKE NOW!
          </h1>
        </div>
      )}

      {/* Screen 4: Clicked Too Early */}
      {gameState === 'early' && (
        <div className="max-w-md mx-auto text-center px-6 space-y-6 pointer-events-auto">
          <div className="text-[#ea580c] font-jp text-5xl">早すぎた！</div>
          <h3 className="font-cinzel text-2xl font-bold text-white uppercase">
            CLICKED TOO EARLY!
          </h3>
          <p className="text-neutral-400 text-xs font-sans tracking-wide">
            You struck before the lightning discharged. Focus your senses and wait for the true flash.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              startTest();
            }}
            className="px-8 py-3 rounded-full border border-[#fee135] bg-[#fee135]/15 text-[#fee135] text-xs font-sans tracking-widest uppercase font-bold hover:bg-[#fee135] hover:text-[#050507] transition-colors cursor-pointer"
          >
            TRY AGAIN
          </button>
        </div>
      )}

      {/* Screen 5: Result */}
      {gameState === 'result' && rank && reactionTime && (
        <div className="max-w-md mx-auto text-center px-6 space-y-6 animate-fade-in pointer-events-auto">
          <div className="text-6xl font-mono font-black text-white drop-shadow-[0_0_20px_#fee135]">
            {reactionTime} <span className="text-xl text-[#fee135]">MS</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0d12] border border-[#fee135]/40 shadow-[0_0_40px_rgba(254,225,53,0.2)]">
            <span className="font-jp text-2xl text-[#fee135] block mb-1">
              {rank.kanji}
            </span>
            <h3 className="font-cinzel text-xl font-bold uppercase text-white mb-2">
              {rank.title}
            </h3>
            <p className="text-neutral-300 text-xs font-sans italic">
              "{rank.desc}"
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="px-6 py-3 rounded-full bg-[#fee135] text-[#050507] text-xs font-sans tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>RETEST</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="px-6 py-3 rounded-full border border-white/20 text-white text-xs font-sans tracking-widest uppercase font-bold hover:border-[#fee135] hover:text-[#fee135] transition-colors flex items-center space-x-2 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
              <span>{copied ? 'COPIED!' : 'SHARE SCORE'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
