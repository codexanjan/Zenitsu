import React, { useState } from 'react';
import { sound } from '../../audio/SoundEngine';
import { Volume2, Sparkles, Feather, Disc } from 'lucide-react';

interface HearingFrequency {
  id: string;
  name: string;
  kanji: string;
  desc: string;
  waveform: number[];
}

const hearingFrequencies: HearingFrequency[] = [
  {
    id: 'emotion',
    name: 'EMOTIONAL RESONANCE',
    kanji: '感情の響き',
    desc: 'Zenitsu perceives the exact timbre of fear, grief, malice, and love in people. He knew instantly that Tanjiro was pure of heart because his inner sound was gentle like crying rain.',
    waveform: [20, 45, 80, 60, 95, 40, 70, 85, 30, 60, 90, 50],
  },
  {
    id: 'demon',
    name: 'DEMONIC DISSONANCE',
    kanji: '鬼の不協和音',
    desc: 'Demons emit an unnatural, jarring sound that vibrates through their mutated flesh and blood art. Zenitsu detects their approach miles away, even underground.',
    waveform: [90, 20, 100, 30, 85, 15, 95, 25, 100, 40, 80, 10],
  },
  {
    id: 'heartbeat',
    name: 'HEARTBEAT TRUTH',
    kanji: '鼓動の真実',
    desc: 'No mortal can lie to Zenitsu. An accelerating pulse, subtle vocal tremor, or tense breath reveals betrayal before words are finished.',
    waveform: [10, 15, 95, 35, 10, 15, 90, 40, 10, 15, 100, 30],
  },
  {
    id: 'trance',
    name: 'UNCONSCIOUS STILLNESS',
    kanji: '無我の静寂',
    desc: 'When Zenitsu falls asleep, the loud mental panic ceases. In this void of total silence, sensory perception sharpens to divine clarity.',
    waveform: [30, 32, 35, 34, 33, 35, 36, 34, 33, 35, 34, 33],
  },
];

export const Lore: React.FC = () => {
  const [activeFreq, setActiveFreq] = useState<HearingFrequency>(hearingFrequencies[0]);
  const [isPlayingFreq, setIsPlayingFreq] = useState(false);

  const handlePlayFrequency = (freq: HearingFrequency) => {
    setActiveFreq(freq);
    setIsPlayingFreq(true);
    sound.playElectricHum(0.4);
    if (freq.id === 'heartbeat') sound.playHeartbeat();
    else if (freq.id === 'demon') sound.playThunder(0.4);
    setTimeout(() => setIsPlayingFreq(false), 1200);
  };

  const handleChuntaroChirp = () => {
    sound.playSwordSlash('standard');
  };

  return (
    <section id="lore" className="relative py-28 md:py-36 bg-[#050507] text-white z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-[1px] bg-[#fee135]" />
            <span className="text-[#fee135] font-sans text-xs tracking-[0.35em] font-semibold uppercase">
              04 • ARCHIVES OF LIGHTNING
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
            THE ESSENCE OF <span className="text-[#fee135]">ZENITSU</span>
          </h2>
          <p className="text-xs font-sans tracking-[0.25em] text-neutral-400 uppercase mt-2">
            Superhuman Auditory Senses, The Nichirin Blade, and Ukogi the Sparrow
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 1: Superhuman Hearing Interactive Visualizer */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d12] p-8 flex flex-col justify-between hover:border-[#fee135]/40 transition-colors duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#fee135] tracking-widest uppercase">
                  DIVINE AUDITORY SENSE
                </span>
                <span className="font-jp text-xs text-neutral-400">超絶聴覚</span>
              </div>

              <h3 className="font-cinzel text-xl font-bold uppercase text-white mb-3">
                SUPERHUMAN HEARING
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm font-sans font-light leading-relaxed mb-6">
                Zenitsu’s hearing transcends ordinary human limitation. He does not simply hear sounds; he perceives the emotional frequency and physiological intent of all living beings.
              </p>

              {/* Waveform graphic */}
              <div className="p-4 rounded-xl bg-[#050507] border border-white/10 mb-6 flex items-end justify-between h-20 px-4">
                {activeFreq.waveform.map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-[#fee135] rounded-full transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      opacity: isPlayingFreq ? 1 : 0.65,
                      boxShadow: isPlayingFreq ? '0 0 8px #fee135' : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Frequency Selector Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {hearingFrequencies.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handlePlayFrequency(f)}
                    className={`p-2.5 rounded-lg border text-left text-[11px] font-sans tracking-wider transition-all duration-300 cursor-pointer ${
                      activeFreq.id === f.id
                        ? 'border-[#fee135] bg-[#fee135]/15 text-[#fee135] font-semibold'
                        : 'border-white/10 bg-[#141620]/50 text-neutral-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <div className="font-mono text-[9px] text-[#fee135]/80">{f.kanji}</div>
                    <div className="truncate">{f.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-neutral-300 font-sans italic">
              "{activeFreq.desc}"
            </div>
          </div>

          {/* Pillar 2: The Nichirin Katana Anatomy */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d12] p-8 flex flex-col justify-between hover:border-[#fee135]/40 transition-colors duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#fee135] tracking-widest uppercase">
                  FORGED FROM SCARLET ORE
                </span>
                <span className="font-jp text-xs text-neutral-400">日輪刀</span>
              </div>

              <h3 className="font-cinzel text-xl font-bold uppercase text-white mb-3">
                THE NICHIRIN KATANA
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm font-sans font-light leading-relaxed mb-6">
                Forged from Mount Yoko's Scarlet Crimson Iron Sand that absorbs solar rays. The steel absorbed Zenitsu's lightning affinity, turning a brilliant electric yellow with a distinct lightning-hamon along its edge.
              </p>

              {/* Anatomy specs */}
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-lg bg-[#050507] border border-white/10 flex items-center space-x-3">
                  <Disc size={15} className="text-[#fee135]" />
                  <div className="text-xs">
                    <span className="text-neutral-400 block text-[10px] uppercase">TSUBA (SWORD GUARD)</span>
                    <span className="font-medium text-white">Four-leaf clover brass with triangular indents</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#050507] border border-white/10 flex items-center space-x-3">
                  <Sparkles size={15} className="text-[#fee135]" />
                  <div className="text-xs">
                    <span className="text-neutral-400 block text-[10px] uppercase">BLADE HAMON</span>
                    <span className="font-medium text-white">Jagged lightning discharge pattern</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#050507] border border-white/10 flex items-center space-x-3">
                  <Volume2 size={15} className="text-[#fee135]" />
                  <div className="text-xs">
                    <span className="text-neutral-400 block text-[10px] uppercase">SHEATHING SOUND</span>
                    <span className="font-medium text-white">High-voltage sonic snap on scabbard lock</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-neutral-300 font-sans">
              Forged exclusively to withstand the extreme gravitational recoil of Thunderclap & Flash.
            </div>
          </div>

          {/* Pillar 3: Ukogi (Chuntaro) The Sparrow */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d12] p-8 flex flex-col justify-between hover:border-[#fee135]/40 transition-colors duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#fee135] tracking-widest uppercase">
                  FAITHFUL COMPANION
                </span>
                <span className="font-jp text-xs text-neutral-400">チュン太郎</span>
              </div>

              <h3 className="font-cinzel text-xl font-bold uppercase text-white mb-3">
                CHUNTARO (UKOGI)
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm font-sans font-light leading-relaxed mb-6">
                While every other Demon Slayer receives a raven, Zenitsu was assigned a tiny sparrow named Ukogi. Despite being unable to speak human words, Ukogi’s frantic chirps communicate deep affection, scolding Zenitsu whenever he cries and guiding him to his allies.
              </p>

              {/* Sparrow Badge */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#141620] to-[#050507] border border-[#fee135]/20 flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#fee135]/10 border border-[#fee135]/40 flex items-center justify-center text-[#fee135] mb-3 shadow-[0_0_15px_rgba(254,225,53,0.3)]">
                  <Feather size={24} />
                </div>
                <h4 className="font-cinzel text-base font-bold text-white uppercase">
                  UKOGI THE SPARROW
                </h4>
                <span className="text-[11px] font-jp text-[#fee135] mt-1">
                  小さな相棒 • チュンチュン
                </span>
              </div>
            </div>

            <button
              onClick={handleChuntaroChirp}
              className="w-full py-3 rounded-full border border-[#fee135]/40 bg-[#fee135]/10 text-[#fee135] text-xs font-sans tracking-widest uppercase font-semibold hover:bg-[#fee135] hover:text-[#050507] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Volume2 size={14} />
              <span>LISTEN TO CHUNTARO</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
