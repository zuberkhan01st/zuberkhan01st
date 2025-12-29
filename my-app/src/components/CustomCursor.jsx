'use client'
import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  
  useEffect(() => {
    // Ensure default cursor is always shown (custom cursor disabled)
    if (typeof window !== 'undefined') {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      document.body.classList.remove('custom-cursor-active');
      
      // Remove any inline cursor styles that might be set
      document.documentElement.style.removeProperty('cursor');
      document.body.style.removeProperty('cursor');
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        document.documentElement.style.cursor = '';
        document.body.style.cursor = '';
        document.documentElement.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');
        document.body.classList.remove('custom-cursor-active');
      }
    };
  }, []);
  
  useEffect(() => {
    if (isMobile || typeof window === 'undefined') return;
    
    let animationFrameId;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    
    // Initialize position
    setPosition({ x: targetX, y: targetY });
    
    // Show cursor immediately
    if (cursorRef.current) {
      cursorRef.current.style.opacity = '1';
      cursorRef.current.style.display = 'block';
      cursorRef.current.style.visibility = 'visible';
    }
    if (followerRef.current) {
      followerRef.current.style.opacity = '1';
      followerRef.current.style.display = 'block';
      followerRef.current.style.visibility = 'visible';
    }
    
    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      // Smooth interpolation for cursor
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      
      // Double-check refs exist before accessing style
      const cursor = cursorRef.current;
      const follower = followerRef.current;
      
      if (cursor && cursor.style) {
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
        cursor.style.opacity = '1';
        cursor.style.display = 'block';
        cursor.style.visibility = 'visible';
      }
      
      // Faster interpolation for follower
      if (follower && follower.style) {
        const followerX = currentX + (targetX - currentX) * 0.3;
        const followerY = currentY + (targetY - currentY) * 0.3;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        follower.style.opacity = '1';
        follower.style.display = 'block';
        follower.style.visibility = 'visible';
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation after a small delay to ensure refs are attached
    const startAnimation = () => {
      if (cursorRef.current && followerRef.current) {
        // Set initial positions and make visible
        if (cursorRef.current) {
          cursorRef.current.style.left = `${currentX}px`;
          cursorRef.current.style.top = `${currentY}px`;
          cursorRef.current.style.opacity = '1';
          cursorRef.current.style.display = 'block';
          cursorRef.current.style.visibility = 'visible';
        }
        if (followerRef.current) {
          followerRef.current.style.left = `${currentX}px`;
          followerRef.current.style.top = `${currentY}px`;
          followerRef.current.style.opacity = '1';
          followerRef.current.style.display = 'block';
          followerRef.current.style.visibility = 'visible';
        }
        animate();
      } else {
        // Retry if refs aren't ready yet
        setTimeout(startAnimation, 10);
      }
    };
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(startAnimation, 50);
    });
    
    const handleHover = (e) => {
      const target = e.target;
      // Check if element or any parent is interactive
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'text';
      setIsHovering(isInteractive);
    };

    // Add listeners to both window and document to catch all events
    const handleMouseMoveWindow = (e) => handleMouseMove(e);
    const handleMouseMoveDoc = (e) => handleMouseMove(e);
    const handleHoverWindow = (e) => handleHover(e);
    const handleHoverDoc = (e) => handleHover(e);
    
    window.addEventListener('mousemove', handleMouseMoveWindow, { passive: true });
    document.addEventListener('mousemove', handleMouseMoveDoc, { passive: true });
    document.body.addEventListener('mousemove', handleMouseMoveDoc, { passive: true });
    window.addEventListener('mouseover', handleHoverWindow, { passive: true });
    document.addEventListener('mouseover', handleHoverDoc, { passive: true });
    document.body.addEventListener('mouseover', handleHoverDoc, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWindow);
      document.removeEventListener('mousemove', handleMouseMoveDoc);
      document.body.removeEventListener('mousemove', handleMouseMoveDoc);
      window.removeEventListener('mouseover', handleHoverWindow);
      document.removeEventListener('mouseover', handleHoverDoc);
      document.body.removeEventListener('mouseover', handleHoverDoc);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring - Bright white/cyan for visibility */}
      <div
        ref={followerRef}
        className="pointer-events-none"
        style={{
          width: '48px',
          height: '48px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.15s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out, opacity 0.3s ease-out',
          border: '2px solid',
          borderColor: isHovering ? 'rgba(147, 197, 253, 1)' : 'rgba(191, 219, 254, 0.9)',
          borderRadius: '50%',
          boxShadow: isHovering 
            ? '0 0 25px rgba(147, 197, 253, 0.8), 0 0 50px rgba(147, 197, 253, 0.5)'
            : '0 0 15px rgba(191, 219, 254, 0.6)',
          zIndex: 2147483647,
          pointerEvents: 'none',
          opacity: 1, // Always visible on desktop
          visibility: 'visible',
        }}
      />
      {/* Inner dot - Bright cyan/white */}
      <div 
        ref={cursorRef}
        className="pointer-events-none"
        style={{
          width: '12px',
          height: '12px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          borderRadius: '50%',
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
          transition: 'transform 0.1s ease-out, background-color 0.2s ease-out, box-shadow 0.2s ease-out, opacity 0.3s ease-out',
          backgroundColor: isHovering ? '#93c5fd' : '#bfdbfe',
          boxShadow: isHovering 
            ? '0 0 20px rgba(147, 197, 253, 1), 0 0 40px rgba(147, 197, 253, 0.6)'
            : '0 0 12px rgba(191, 219, 254, 0.9)',
          zIndex: 2147483647,
          pointerEvents: 'none',
          opacity: 1, // Always visible on desktop
          visibility: 'visible',
        }}
      />
      {/* Glow effect - Bright */}
      <div
        className="pointer-events-none"
        style={{
          width: '80px',
          height: '80px',
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(147, 197, 253, ${isHovering ? 0.2 : 0.1}) 0%, transparent 70%)`,
          transition: 'opacity 0.2s ease-out',
          zIndex: 999998, // Just below cursor
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
