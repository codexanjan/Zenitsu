import React, { useState } from 'react';

interface AnimeImageProps {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  aspectRatio?: '16/9' | '9/16' | '2/3' | '3/4' | '4/5' | '1/1' | 'auto';
  fit?: 'cover' | 'contain';
  objectPosition?: string;
  glow?: boolean;
  parallax?: boolean;
  className?: string;
  priority?: boolean;
}

export const AnimeImage: React.FC<AnimeImageProps> = ({
  desktopSrc,
  mobileSrc,
  alt,
  aspectRatio = '16/9',
  fit = 'cover',
  objectPosition = 'center',
  glow = false,
  parallax = false,
  className = '',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Aspect ratio class map
  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '9/16': 'aspect-[9/16]',
    '2/3': 'aspect-[2/3]',
    '3/4': 'aspect-[3/4]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    'auto': '',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${
        glow ? 'shadow-[0_0_35px_rgba(254,225,53,0.25)] ring-1 ring-[#fee135]/20' : ''
      } ${className}`}
    >
      {/* Subtle blur placeholder background while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#12131a] animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#fee135]/40 border-t-[#fee135] animate-spin" />
        </div>
      )}

      {/* Fallback pattern if image load fails */}
      {hasError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0d12] via-[#141620] to-[#050507] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#fee135]/10 border border-[#fee135]/30 flex items-center justify-center mb-3">
            <span className="text-[#fee135] font-jp text-lg font-bold">雷</span>
          </div>
          <span className="text-white/80 font-cinzel text-sm">{alt}</span>
        </div>
      ) : (
        <picture className="w-full h-full block">
          {mobileSrc && <source media="(max-width: 768px)" srcSet={mobileSrc} />}
          <img
            src={desktopSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full transition-all duration-700 ${
              fit === 'cover' ? 'object-cover' : 'object-contain'
            } ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${
              parallax ? 'transform hover:scale-105' : ''
            }`}
            style={{ objectPosition }}
          />
        </picture>
      )}

      {/* Subtle edge vignette for cinematic depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050507]/60 via-transparent to-transparent opacity-60" />
    </div>
  );
};
