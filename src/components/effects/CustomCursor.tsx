import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  thunderMode?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ thunderMode = false }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center glowing yellow dot */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full bg-[#fee135] transition-transform duration-75 ease-out ${
          thunderMode ? 'shadow-[0_0_20px_#ffffff,0_0_40px_#fee135]' : 'shadow-[0_0_12px_#fee135]'
        }`}
        style={{
          width: isHovered ? '10px' : thunderMode ? '8px' : '6px',
          height: isHovered ? '10px' : thunderMode ? '8px' : '6px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Trailing electric ring */}
      <div
        className={`fixed pointer-events-none z-[9998] rounded-full border transition-all duration-200 ease-out ${
          isClicked
            ? 'scale-150 border-white bg-[rgba(254,225,53,0.3)] shadow-[0_0_30px_#fee135]'
            : isHovered
            ? 'scale-125 border-[#fee135] shadow-[0_0_20px_rgba(254,225,53,0.7)]'
            : thunderMode
            ? 'border-[#fee135] shadow-[0_0_25px_rgba(254,225,53,0.5)] animate-spin'
            : 'border-[rgba(254,225,53,0.4)]'
        }`}
        style={{
          width: thunderMode ? '38px' : '32px',
          height: thunderMode ? '38px' : '32px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};
