'use client'
import { useState, useEffect } from 'react';

export default function CustomCursor() {
  // Define all state variables together at the top
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [hideCustomCursor, setHideCustomCursor] = useState(false); // New state to hide custom cursor on links
  
  // First useEffect for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Show default cursor on mobile devices
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
  
  // Second useEffect for mouse movement and hover effects
  useEffect(() => {
    // Skip effect if on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleLinkEnter = () => {
      // Hide custom cursor and show default browser cursor on links
      setHideCustomCursor(true);
    };
    
    const handleButtonEnter = () => {
      setIsHovering(true);
      setHideCustomCursor(false);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHideCustomCursor(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    // Set up links for default browser cursor
    const links = document.querySelectorAll('a, [href], .redirect, .link');
    links.forEach(element => {
      // Set explicit cursor style for links
      element.style.cursor = 'pointer';
      element.addEventListener('mouseenter', handleLinkEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Other interactive elements - use custom cursor
    const buttons = document.querySelectorAll('button:not([href]), input[type="button"], select, [role="button"]:not([href]), .card:not(a), .interactive:not(a), .project-card:not(a), [data-tooltip]:not(a), .project-item:not(a), .nav-item:not(a)');
    buttons.forEach(element => {
      element.style.cursor = 'none';
      element.addEventListener('mouseenter', handleButtonEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      links.forEach(element => {
        element.removeEventListener('mouseenter', handleLinkEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      buttons.forEach(element => {
        element.removeEventListener('mouseenter', handleButtonEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile, isVisible]);

  // Early return if on mobile, not visible, or hovering over a link
  if (isMobile || !isVisible || hideCustomCursor) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div 
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '15px',
          height: '15px',
          backgroundColor: 'var(--cursor-color, #8b5cf6)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: isHovering ? 'transform 0.2s ease' : 'transform 0.05s ease',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      
      {/* Cursor circle */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '32px',
          height: '32px',
          border: '2px solid var(--cursor-color, #8b5cf6)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: isHovering ? 'transform 0.2s ease' : 'transform 0.1s ease',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
    </>
  );
}
