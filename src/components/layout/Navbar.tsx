import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Zap, Menu, X, ShieldAlert } from 'lucide-react';
import { sound } from '../../audio/SoundEngine';

interface NavbarProps {
  thunderMode: boolean;
  onToggleThunder: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  thunderMode,
  onToggleThunder,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sound.getIsMuted());
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active link detection
      const sections = ['home', 'about', 'story', 'techniques', 'lore', 'gallery', 'finale'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            sound.setSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const unmuted = sound.toggleMute();
    setIsMuted(!unmuted);
  };

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'STORY', href: '#story', id: 'story' },
    { name: 'TECHNIQUES', href: '#techniques', id: 'techniques' },
    { name: 'LORE', href: '#lore', id: 'lore' },
    { name: 'GALLERY', href: '#gallery', id: 'gallery' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050507]/80 backdrop-blur-md border-b border-[#fee135]/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a
          href="#home"
          className="group flex items-center space-x-3 text-white transition-opacity hover:opacity-90"
        >
          <div className="w-9 h-9 rounded-md bg-[#12131a] border border-[#fee135]/30 flex items-center justify-center text-[#fee135] font-jp font-bold text-base shadow-[0_0_15px_rgba(254,225,53,0.15)] group-hover:border-[#fee135] group-hover:shadow-[0_0_20px_rgba(254,225,53,0.4)] transition-all duration-300">
            雷
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-xs font-bold tracking-[0.25em] text-white/95">
              ZENITSU
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#fee135] font-sans">
              AGATSUMA
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative font-sans text-xs tracking-[0.2em] font-medium transition-colors duration-300 py-1 ${
                  isActive ? 'text-[#fee135]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#fee135] shadow-[0_0_8px_#fee135]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Sound & Thunder Mode */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Reduced motion toggle */}
          <button
            onClick={onToggleReducedMotion}
            aria-label={reducedMotion ? 'Enable standard animations' : 'Reduce motion and flashing'}
            title={reducedMotion ? 'Reduced Motion: ON' : 'Reduce Motion: OFF'}
            className={`p-2 rounded-full border transition-all duration-300 ${
              reducedMotion
                ? 'border-neutral-500 bg-neutral-800 text-neutral-300'
                : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
            }`}
          >
            <ShieldAlert size={15} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Sound: OFF (Click to unmute)' : 'Sound: ON'}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-sans tracking-widest transition-all duration-300 ${
              !isMuted
                ? 'border-[#fee135]/50 bg-[#fee135]/10 text-[#fee135] shadow-[0_0_15px_rgba(254,225,53,0.3)]'
                : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
            }`}
          >
            {!isMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{!isMuted ? 'AUDIO' : 'MUTED'}</span>
          </button>

          {/* Thunder Mode Toggle */}
          <button
            onClick={onToggleThunder}
            aria-label={thunderMode ? 'Disable Thunder Mode' : 'Enable Thunder Mode'}
            title={thunderMode ? 'Thunder Mode Active' : 'Activate Thunder Mode'}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-sans tracking-widest transition-all duration-300 ${
              thunderMode
                ? 'border-[#fee135] bg-[#fee135] text-[#050507] font-bold shadow-[0_0_20px_rgba(254,225,53,0.6)] animate-pulse'
                : 'border-[#fee135]/20 text-[#fee135]/80 hover:text-[#fee135] hover:border-[#fee135]/50'
            }`}
          >
            <Zap size={14} className={thunderMode ? 'fill-[#050507]' : ''} />
            <span>THUNDER</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={handleSoundToggle}
            aria-label="Toggle audio"
            className="p-2 text-[#fee135] rounded-full border border-white/10"
          >
            {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-white/90 hover:text-white"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050507]/95 backdrop-blur-2xl border-b border-[#fee135]/20 px-6 py-8 flex flex-col space-y-6">
          <nav className="flex flex-col space-y-5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-cinzel text-lg tracking-[0.2em] transition-colors ${
                  activeSection === link.id ? 'text-[#fee135]' : 'text-neutral-300'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onToggleThunder();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#fee135] bg-[#fee135]/10 text-[#fee135] text-xs font-sans tracking-widest"
            >
              <Zap size={14} />
              <span>{thunderMode ? 'THUNDER: ON' : 'THUNDER MODE'}</span>
            </button>
            <button
              onClick={onToggleReducedMotion}
              className="p-2 text-neutral-400 border border-white/10 rounded-full"
            >
              <ShieldAlert size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
