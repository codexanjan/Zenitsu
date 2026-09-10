import React, { useState, useEffect } from 'react';
import gallery01 from '../../assets/zenitsu/gallery/gallery_01_strike.jpg';
import gallery02 from '../../assets/zenitsu/gallery/gallery_02_portrait.jpg';
import gallery03 from '../../assets/zenitsu/gallery/gallery_03_godspeed.jpg';
import gallery04 from '../../assets/zenitsu/gallery/gallery_04_bonds.jpg';
import gallery05 from '../../assets/zenitsu/gallery/gallery_05_sleep.jpg';
import gallery06 from '../../assets/zenitsu/gallery/gallery_06_vertical.jpg';
import storyTraining from '../../assets/zenitsu/story/ch02_training.jpg';
import storyGrowth from '../../assets/zenitsu/story/ch05_growth.jpg';
import storyThunder from '../../assets/zenitsu/story/ch03_thunder.jpg';
import { AnimeImage } from '../common/AnimeImage';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { sound } from '../../audio/SoundEngine';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
}

// All items have identical width & length (1:1 square) for perfect symmetry
const galleryItems: GalleryItem[] = [
  {
    id: 'g01',
    src: gallery01,
    title: 'THE FLASH OF GODS',
    subtitle: 'Mount Hanatate Strike Stance',
    tag: 'FIRST FORM',
  },
  {
    id: 'g02',
    src: gallery02,
    title: 'SERENITY IN SOLITUDE',
    subtitle: 'Editorial Character Profile',
    tag: 'EDITORIAL',
  },
  {
    id: 'g03',
    src: gallery03,
    title: 'GODSPEED IMPACT',
    subtitle: 'Upper Rank Demon Confrontation',
    tag: 'GODSPEED',
  },
  {
    id: 'g04',
    src: gallery04,
    title: 'THE SACRED BOX',
    subtitle: 'Wisteria Estate Twilight Rest',
    tag: 'BROTHERHOOD',
  },
  {
    id: 'g05',
    src: gallery05,
    title: 'THE SLEEPING SLAYER',
    subtitle: 'Unconscious Trance Induction',
    tag: 'AWAKENING',
  },
  {
    id: 'g06',
    src: gallery06,
    title: 'DIVINE VOLTAGE',
    subtitle: 'Vertical Lightning Stance',
    tag: 'THUNDER STYLE',
  },
  {
    id: 'g07',
    src: storyThunder,
    title: 'FLAMING THUNDER GOD',
    subtitle: 'Incandescent Dragon Strike',
    tag: 'SEVENTH FORM',
  },
  {
    id: 'g08',
    src: storyTraining,
    title: 'PEACH BLOSSOM PATH',
    subtitle: 'Gramps Kuwajima Mentorship',
    tag: 'TRAINING',
  },
  {
    id: 'g09',
    src: storyGrowth,
    title: 'DAWN OF COURAGE',
    subtitle: 'Moving Forward Beyond Fear',
    tag: 'RESOLUTION',
  },
];

export const Gallery: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  const openLightbox = (idx: number) => {
    sound.playElectricHum(0.2);
    setSelectedIdx(idx);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextImage = () => {
    sound.playElectricHum(0.15);
    setSelectedIdx((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    sound.playElectricHum(0.15);
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-[#050507] text-white z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-[#fee135]" />
              <span className="text-[#fee135] font-sans text-xs tracking-[0.35em] font-semibold uppercase">
                03 • ARCHIVE
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
              VISUAL <span className="text-[#fee135]">GALLERY</span>
            </h2>
          </div>

          <p className="text-xs font-sans tracking-[0.25em] text-neutral-400 uppercase max-w-sm">
            Curated cinematic exhibition with uniform 1:1 isometric composition.
          </p>
        </div>

        {/* Uniform Grid: Every card has identical Width & Height (1:1 Square) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0c0d12] cursor-pointer transition-all duration-500 hover:border-[#fee135]/60 hover:shadow-[0_10px_35px_rgba(254,225,53,0.25)]"
            >
              <AnimeImage
                desktopSrc={item.src}
                alt={item.title}
                aspectRatio="1/1"
                className="w-full h-full transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover overlay with minimal details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/95 via-[#050507]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <span className="text-[10px] font-mono text-[#fee135] tracking-widest uppercase mb-1">
                  {item.tag}
                </span>
                <h4 className="font-cinzel text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-300 font-sans mt-0.5">
                  {item.subtitle}
                </p>
                <div className="mt-3 flex items-center space-x-1.5 text-[11px] text-[#fee135] font-sans tracking-widest uppercase">
                  <Maximize2 size={12} />
                  <span>VIEW FULLSCREEN</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-50 bg-[#050507]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 animate-fade-in">
          {/* Top Bar: Title & Close */}
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-xs font-mono text-[#fee135] tracking-widest uppercase block">
                {galleryItems[selectedIdx].tag}
              </span>
              <h3 className="font-cinzel text-lg sm:text-2xl font-bold uppercase text-white">
                {galleryItems[selectedIdx].title}
              </h3>
            </div>

            <button
              onClick={closeLightbox}
              className="p-3 rounded-full border border-white/20 text-white hover:text-[#fee135] hover:border-[#fee135] transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Central Image Viewport */}
          <div className="relative flex-1 flex items-center justify-center my-6 overflow-hidden">
            <img
              src={galleryItems[selectedIdx].src}
              alt={galleryItems[selectedIdx].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-[#fee135]/30 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Bottom Bar: Prev / Next Controls & Subtitle */}
          <div className="flex items-center justify-between z-10 pt-4 border-t border-white/10">
            <span className="text-xs text-neutral-400 font-sans tracking-widest hidden sm:block">
              {galleryItems[selectedIdx].subtitle}
            </span>

            <div className="flex items-center space-x-4 mx-auto sm:mx-0">
              <button
                onClick={prevImage}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 text-xs font-sans tracking-widest text-white hover:border-[#fee135] hover:text-[#fee135] transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>PREV</span>
              </button>

              <span className="text-xs font-mono text-neutral-400">
                {selectedIdx + 1} / {galleryItems.length}
              </span>

              <button
                onClick={nextImage}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 text-xs font-sans tracking-widest text-white hover:border-[#fee135] hover:text-[#fee135] transition-colors cursor-pointer"
              >
                <span>NEXT</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
