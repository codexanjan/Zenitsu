import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import finaleZenitsuImg from '../../assets/zenitsu/finale/finale_zenitsu.jpg';
import thunderImg from '../../assets/zenitsu/story/ch03_thunder.jpg';
import awakeningImg from '../../assets/zenitsu/story/ch06_awakening.jpg';
import godspeedImg from '../../assets/zenitsu/story/ch07_godspeed.jpg';
import courageImg from '../../assets/zenitsu/story/ch08_courage.jpg';
import { sound } from '../../audio/SoundEngine';

interface ClimaxVideoProps {
  onVideoEnd?: () => void;
}

const VIDEO_SCENES = [
  {
    img: finaleZenitsuImg,
    subtitle: 'The dark storm gathers. Silence descends upon the mountain.',
    duration: 3,
    effect: 'mist',
  },
  {
    img: thunderImg,
    subtitle: 'Breath draws deep into the lungs. Muscles tense like bowstrings.',
    duration: 3,
    effect: 'electricity',
  },
  {
    img: awakeningImg,
    subtitle: 'Consciousness slips into void. The slumbering god of lightning awakes.',
    duration: 3,
    effect: 'flash',
  },
  {
    img: godspeedImg,
    subtitle: '雷の呼吸 • 壱ノ型 霹靂一閃 神速！ THUNDERCLAP AND FLASH: GODSPEED!',
    duration: 3,
    effect: 'slash',
  },
  {
    img: courageImg,
    subtitle: 'Silence returns. The blade locks into its scabbard with the sound of thunder.',
    duration: 3,
    effect: 'dawn',
  },
];

const TOTAL_DURATION = VIDEO_SCENES.reduce((acc, s) => acc + s.duration, 0);

export const ClimaxVideo: React.FC<ClimaxVideoProps> = ({ onVideoEnd }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const videoScenes = VIDEO_SCENES;
  const totalDuration = TOTAL_DURATION;

  // Playback loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.1;
          if (next >= totalDuration) {
            setIsPlaying(false);
            if (onVideoEnd) onVideoEnd();
            return totalDuration;
          }

          // Calculate current frame index
          let accumulated = 0;
          for (let i = 0; i < videoScenes.length; i++) {
            accumulated += videoScenes[i].duration;
            if (next < accumulated) {
              if (currentFrame !== i) {
                setCurrentFrame(i);
                // Trigger sound effect for each scene transition
                if (i === 1) sound.playElectricHum(0.6);
                if (i === 2) sound.playHeartbeat();
                if (i === 3) {
                  sound.playSwordSlash('godspeed');
                  sound.playThunderclap();
                }
              }
              break;
            }
          }
          return next;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentFrame, totalDuration, onVideoEnd, videoScenes]);

  const togglePlay = () => {
    if (progress >= totalDuration) {
      setProgress(0);
      setCurrentFrame(0);
    }
    const next = !isPlaying;
    setIsPlaying(next);
    if (next) {
      sound.playElectricHum(0.3);
    }
  };

  const handleRestart = () => {
    setProgress(0);
    setCurrentFrame(0);
    setIsPlaying(true);
    sound.playElectricHum(0.3);
  };

  const toggleMute = () => {
    const unmuted = sound.toggleMute();
    setIsMuted(!unmuted);
  };

  const currentScene = videoScenes[currentFrame];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#fee135]/30 bg-[#0c0d12] shadow-[0_20px_80px_rgba(0,0,0,0.9)] relative group">
      {/* Video Viewport (16:9) */}
      <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Active Scene Anime Frame with dynamic cinematic zoom */}
        <img
          src={currentScene.img}
          alt="Zenitsu Climax Animation Frame"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isPlaying ? 'scale-110 contrast-125' : 'scale-100'
          }`}
        />

        {/* Dynamic Electric & Speed Lines Overlay during Action Frame */}
        {currentFrame === 3 && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(254,225,53,0.35)_0%,_transparent_70%)] animate-pulse" />
        )}

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/40 pointer-events-none" />

        {/* Top Video Status Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-[#050507]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#fee135]/30 text-[10px] font-mono tracking-widest text-[#fee135]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>CINEMATIC CLIMAX CUTSCENE</span>
        </div>

        {/* Overlay Play Button when Paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Play Zenitsu Climax Video"
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity hover:bg-black/20 group-hover:opacity-100 cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full bg-[#fee135] text-[#050507] flex items-center justify-center shadow-[0_0_40px_rgba(254,225,53,0.8)] hover:scale-110 transition-transform">
              <Play size={28} className="fill-current ml-1" />
            </div>
          </button>
        )}

        {/* Subtitles */}
        <div className="absolute bottom-14 left-6 right-6 z-20 text-center pointer-events-none">
          <p className="inline-block px-4 py-1.5 rounded-lg bg-[#050507]/90 border border-[#fee135]/30 text-xs sm:text-sm font-sans tracking-widest text-[#fee135] uppercase font-semibold drop-shadow-md">
            {currentScene.subtitle}
          </p>
        </div>

        {/* Custom Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-[#050507] to-transparent p-4 flex flex-col space-y-2">
          {/* Progress Timeline */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = clickX / rect.width;
              setProgress(ratio * totalDuration);
            }}
            className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden cursor-pointer relative"
          >
            <div
              className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fee135] rounded-full shadow-[0_0_10px_#fee135] transition-all duration-100"
              style={{ width: `${(progress / totalDuration) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-sans text-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-[#fee135] hover:text-white transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={handleRestart}
                title="Restart"
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
              </button>

              <span className="font-mono text-[11px] text-neutral-400">
                0:{Math.floor(progress).toString().padStart(2, '0')} / 0:{totalDuration}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleMute}
                className="text-neutral-400 hover:text-[#fee135] transition-colors cursor-pointer"
              >
                {!isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
