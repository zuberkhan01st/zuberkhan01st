'use client'
import { useState, useEffect } from 'react';

export default function CodeTypingEffect({ code, speed = 50 }) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(prev => prev + code[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, code, speed]);

  return (
    <div className="font-mono text-sm text-purple-400">
      <span>{displayedCode}</span>
      <span className="animate-pulse">|</span>
    </div>
  );
}

