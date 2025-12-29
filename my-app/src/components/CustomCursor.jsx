'use client'
import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        document.documentElement.style.cursor = 'auto';
      } else {
        document.documentElement.style.cursor = 'none';
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) return;
    
    let animationFrameId;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    
    // Initialize position
    setPosition({ x: targetX, y: targetY });
    
    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      // Smooth interpolation for cursor
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentX}px`;
        cursorRef.current.style.top = `${currentY}px`;
      }
      
      // Faster interpolation for follower
      if (followerRef.current) {
        const followerX = currentX + (targetX - currentX) * 0.3;
        const followerY = currentY + (targetY - currentY) * 0.3;
        followerRef.current.style.left = `${followerX}px`;
        followerRef.current.style.top = `${followerY}px`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleHover = (e) => {
      const target = e.target;
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           target.closest('button') ||
                           target.closest('a') ||
                           target.style.cursor === 'pointer';
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring - Bright white/cyan for visibility */}
      <div
        ref={followerRef}
        className="fixed border-2 rounded-full pointer-events-none"
        style={{
          width: '48px',
          height: '48px',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.15s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out',
          borderColor: isHovering ? 'rgba(147, 197, 253, 1)' : 'rgba(191, 219, 254, 0.9)',
          boxShadow: isHovering 
            ? '0 0 25px rgba(147, 197, 253, 0.8), 0 0 50px rgba(147, 197, 253, 0.5)'
            : '0 0 15px rgba(191, 219, 254, 0.6)',
          zIndex: 99999,
        }}
      />
      {/* Inner dot - Bright cyan/white */}
      <div 
        ref={cursorRef}
        className="fixed rounded-full pointer-events-none"
        style={{
          width: '12px',
          height: '12px',
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
          transition: 'transform 0.1s ease-out, background-color 0.2s ease-out, box-shadow 0.2s ease-out',
          backgroundColor: isHovering ? '#93c5fd' : '#bfdbfe',
          boxShadow: isHovering 
            ? '0 0 20px rgba(147, 197, 253, 1), 0 0 40px rgba(147, 197, 253, 0.6)'
            : '0 0 12px rgba(191, 219, 254, 0.9)',
          zIndex: 99999,
        }}
      />
      {/* Glow effect - Bright */}
      <div
        className="fixed rounded-full pointer-events-none"
        style={{
          width: '80px',
          height: '80px',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(147, 197, 253, ${isHovering ? 0.2 : 0.1}) 0%, transparent 70%)`,
          transition: 'opacity 0.2s ease-out',
          zIndex: 99998,
        }}
      />
    </>
  );
}
