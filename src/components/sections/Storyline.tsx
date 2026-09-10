import React, { useState, useEffect, useRef } from 'react';
import ch01Img from '../../assets/zenitsu/story/ch01_fear.jpg';
import ch02Img from '../../assets/zenitsu/story/ch02_training.jpg';
import ch03Img from '../../assets/zenitsu/story/ch03_thunder.jpg';
import ch04Img from '../../assets/zenitsu/story/ch04_friendship.jpg';
import ch05Img from '../../assets/zenitsu/story/ch05_growth.jpg';
import ch06Img from '../../assets/zenitsu/story/ch06_awakening.jpg';
import ch07Img from '../../assets/zenitsu/story/ch07_godspeed.jpg';
import ch08Img from '../../assets/zenitsu/story/ch08_courage.jpg';
import { AnimeImage } from '../common/AnimeImage';
import { sound } from '../../audio/SoundEngine';
import { Zap } from 'lucide-react';

interface StoryChapter {
  id: string;
  number: string;
  title: string;
  kanji: string;
  theme: string;
  image: string;
  paragraphs: string[];
  quote?: string;
  moodClasses: string;
  glowColor: string;
}

const chapters: StoryChapter[] = [
  {
    id: 'ch01',
    number: '01',
    title: 'FEAR',
    kanji: '恐怖',
    theme: 'THE VULNERABILITY OF DOUBT',
    image: ch01Img,
    paragraphs: [
      'He never wanted to hold a sword. Surrounded by prodigies and monsters, Zenitsu cried, ran, and begged for an ordinary life. His terror was not cowardice—it was raw, unvarnished human vulnerability.',
      'Yet beneath the trembling knees and tears lay a subconscious reservoir of superhuman awareness. His hyper-acute ears heard the faint rhythms of terror in himself and in others, waiting for the spark that would awaken his hidden potential.',
    ],
    moodClasses: 'grayscale-[40%] contrast-95',
    glowColor: 'rgba(254, 225, 53, 0.1)',
  },
  {
    id: 'ch02',
    number: '02',
    title: 'TRAINING',
    kanji: '修練',
    theme: 'THE MENTORSHIP OF JIGORO KUWAJIMA',
    image: ch02Img,
    paragraphs: [
      'High in the misty peach orchards of Mount Hanatate, former Thunder Hashira Jigoro Kuwajima saw past Zenitsu’s hysterics. Even when Zenitsu climbed into trees to escape, his master pulled him back with stern, relentless love.',
      'Zenitsu could never master the six forms of Thunder Breathing. But Jigoro gave him the philosophy that would define his life: Hone the single strike you know until it transforms into divine iron.',
    ],
    quote: '"Cry if you must, run away if you want to. Just never give up."',
    moodClasses: 'sepia-[15%] contrast-105',
    glowColor: 'rgba(245, 158, 11, 0.2)',
  },
  {
    id: 'ch03',
    number: '03',
    title: 'THUNDER BREATHING',
    kanji: '雷の呼吸',
    theme: 'LIGHTNING MECHANICS & DIVINE SPEED',
    image: ch03Img,
    paragraphs: [
      'Thunder Breathing is not merely speed; it is explosive acceleration. By drawing oxygen deep into the bloodstream and contracting every tendon in the legs, the practitioner replicates the atmospheric discharge of a thunderbolt.',
      'The blade unhitches from its scabbard with a sound like ripping silk. In less than a tenth of a second, the distance closes, the strike falls, and only the shockwave remains.',
    ],
    moodClasses: 'brightness-110 saturate-125',
    glowColor: 'rgba(254, 225, 53, 0.4)',
  },
  {
    id: 'ch04',
    number: '04',
    title: 'FRIENDSHIP',
    kanji: '絆',
    theme: 'TANJIRO, INOSUKE, & LOYALTY',
    image: ch04Img,
    paragraphs: [
      'For the first time in his isolated life, Zenitsu found brothers. He recognized Tanjiro’s pure, gentle heartbeat and knew with his extraordinary hearing that whatever was inside Tanjiro’s wooden box was something precious.',
      'Even when Inosuke brutally beat him to destroy the box, Zenitsu sheltered it with his broken body. He chose suffering over breaking Tanjiro’s trust. A coward does not take blows for a friend.',
    ],
    quote: '"Tanjiro told me this is more important than his own life. So I will protect it."',
    moodClasses: 'saturate-110 sepia-[10%]',
    glowColor: 'rgba(245, 158, 11, 0.3)',
  },
  {
    id: 'ch05',
    number: '05',
    title: 'GROWTH',
    kanji: '成長',
    theme: 'THE DAWNING RESOLUTION',
    image: ch05Img,
    paragraphs: [
      'Courage is not the absence of fear, but the discovery that something else matters more. Across endless nights of blood and sorrow, Zenitsu stopped yearning for someone to save him.',
      'He acknowledged his fragility and stood on his own feet. When the demons came, his hand gripped his scabbard not with frantic terror, but with a settled, quiet determination to shield the innocent.',
    ],
    moodClasses: 'brightness-105 saturate-115',
    glowColor: 'rgba(254, 225, 53, 0.25)',
  },
  {
    id: 'ch06',
    number: '06',
    title: 'AWAKENING',
    kanji: '覚醒',
    theme: 'UNCONSCIOUS BATTLE INSTINCT',
    image: ch06Img,
    paragraphs: [
      'When terror crosses the threshold of human endurance, Zenitsu’s conscious mind collapses into a profound trance. In that stillness, the noisy chatter of self-doubt vanishes completely.',
      'His spine straightens. His breathing settles into an unyielding rhythm. The sleeping swordsman becomes pure instinct, his Nichirin blade drawing with inhuman precision and devastating power.',
    ],
    moodClasses: 'contrast-125 saturate-130',
    glowColor: 'rgba(254, 225, 53, 0.45)',
  },
  {
    id: 'ch07',
    number: '07',
    title: 'GODSPEED',
    kanji: '神速',
    theme: 'TRANSCENDING HUMAN VELOCITY',
    image: ch07Img,
    paragraphs: [
      'The zenith of Thunderclap and Flash: Godspeed (Shinsoku). A forbidden technique that strains every muscle fiber, tendon, and bone in his legs, usable only twice before his limbs shatter.',
      'Time dilates to a standstill. Rain drops hang suspended in mid-air. Zenitsu disappears from visual reality—a golden streak ripping across the dimension, striking before the sound of thunder can even register.',
    ],
    quote: '"Thunderclap and Flash: Godspeed. It will only take one moment."',
    moodClasses: 'contrast-130 saturate-140 brightness-115',
    glowColor: 'rgba(255, 255, 255, 0.5)',
  },
  {
    id: 'ch08',
    number: '08',
    title: 'COURAGE',
    kanji: '勇気',
    theme: 'MOVING FORWARD THROUGH THE STORM',
    image: ch08Img,
    paragraphs: [
      'The storm fades. The thunder recedes into the quiet morning sky. Zenitsu stands in the sunlight, bruised and bleeding, but unbroken.',
      'He remains the boy who weeps at pain, yet he is the swordsman who charged headfirst into hell for the people he loved.',
    ],
    quote: 'COURAGE DOES NOT MEAN HAVING NO FEAR. IT MEANS MOVING FORWARD DESPITE IT.',
    moodClasses: 'brightness-105 saturate-110',
    glowColor: 'rgba(245, 158, 11, 0.3)',
  },
];

export const Storyline: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      chapterRefs.current.forEach((el, idx) => {
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (activeChapter !== idx) {
              setActiveChapter(idx);
              sound.setSection(chapters[idx].id);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeChapter]);

  const scrollToChapter = (idx: number) => {
    const el = chapterRefs.current[idx];
    if (el) {
      sound.playElectricHum(0.2);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="story" className="relative bg-[#050507] text-white z-20">
      {/* Sticky Chapter Side Indicator (Desktop) */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center space-y-4 pointer-events-auto">
        <span className="text-[10px] font-sans tracking-[0.3em] text-neutral-400 rotate-90 mb-4 origin-left">
          CHAPTERS
        </span>
        {chapters.map((ch, idx) => {
          const isActive = activeChapter === idx;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(idx)}
              aria-label={`Go to chapter ${ch.number}: ${ch.title}`}
              className="group relative flex items-center space-x-2 py-1 text-left cursor-pointer"
            >
              <span
                className={`font-mono text-xs tracking-widest transition-all duration-300 ${
                  isActive
                    ? 'text-[#fee135] font-bold scale-125 drop-shadow-[0_0_8px_#fee135]'
                    : 'text-neutral-400 group-hover:text-neutral-300'
                }`}
              >
                {ch.number}
              </span>
              <span
                className={`h-[1px] transition-all duration-300 ${
                  isActive
                    ? 'w-6 bg-[#fee135] shadow-[0_0_6px_#fee135]'
                    : 'w-2 bg-neutral-700 group-hover:w-4'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Main Story Flow */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#fee135]/30 bg-[#fee135]/5 mb-4">
            <Zap size={13} className="text-[#fee135]" />
            <span className="text-[11px] font-sans tracking-[0.3em] text-[#fee135] font-semibold uppercase">
              CINEMATIC STORYLINE
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black uppercase tracking-tight">
            THE CHRONICLES OF <span className="text-[#fee135]">THUNDER</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans tracking-widest mt-3 uppercase">
            8 Chapters of Fear, Brotherhood, and Divine Mastery
          </p>
        </div>

        {/* 8 Chapters */}
        <div className="space-y-36 sm:space-y-48">
          {chapters.map((ch, index) => (
            <div
              key={ch.id}
              ref={(el) => {
                chapterRefs.current[index] = el;
              }}
              className="relative min-h-[80vh] flex flex-col justify-center scroll-mt-24"
            >
              {/* Background Glow for Chapter */}
              <div
                className="absolute inset-0 rounded-2xl blur-[120px] pointer-events-none opacity-40 transition-colors duration-1000"
                style={{ background: ch.glowColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Chapter Visual Panel */}
                <div
                  className={`lg:col-span-7 relative group ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group-hover:border-[#fee135]/40 transition-all duration-700">
                    <AnimeImage
                      desktopSrc={ch.image}
                      alt={`Zenitsu Agatsuma Chapter ${ch.number} - ${ch.title}`}
                      aspectRatio="16/9"
                      glow={index === 2 || index === 6}
                      className={`w-full ${ch.moodClasses}`}
                    />

                    {/* Subtle Chapter Kanji Overlay */}
                    <div className="absolute top-4 right-5 text-4xl sm:text-5xl font-jp font-black text-white/15 pointer-events-none drop-shadow-md">
                      {ch.kanji}
                    </div>

                    {/* Corner energy accents */}
                    <div className="absolute bottom-3 left-4 flex items-center space-x-2 text-xs font-sans tracking-widest text-[#fee135]/90 bg-[#050507]/80 backdrop-blur-md px-3 py-1 rounded-md border border-[#fee135]/20">
                      <span className="font-mono font-bold">{ch.number}</span>
                      <span>•</span>
                      <span className="uppercase">{ch.title}</span>
                    </div>
                  </div>
                </div>

                {/* Chapter Narrative Text */}
                <div
                  className={`lg:col-span-5 flex flex-col space-y-6 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs text-[#fee135] tracking-widest font-bold">
                      SCENE {ch.number}
                    </span>
                    <span className="w-6 h-[1px] bg-[#fee135]/40" />
                    <span className="font-jp text-xs text-neutral-400 tracking-[0.2em]">
                      {ch.kanji}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">
                    {ch.title}
                  </h3>

                  <div className="text-[11px] font-sans tracking-[0.3em] text-[#fee135] uppercase font-semibold">
                    {ch.theme}
                  </div>

                  {/* Narrative Paragraphs */}
                  <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed font-sans">
                    {ch.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Highlight Quote if available */}
                  {ch.quote && (
                    <div className="pt-2">
                      <blockquote className="p-4 rounded-lg bg-[#0c0d12]/90 border-l-2 border-[#fee135] text-xs sm:text-sm font-sans tracking-wide text-[#fee135] italic">
                        {ch.quote}
                      </blockquote>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
