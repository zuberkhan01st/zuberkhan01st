'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function AnimatedCarousel({ images, autoplayInterval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);

  const imagesArray = images || [
    '/4.jpg',
    '/farmer.jpg',
    '/crude.png',
    '/Screenshot 2025-03-02 160238.png',
    '/Screenshot 2025-01-19 102508.png'
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === imagesArray.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? imagesArray.length - 1 : prevIndex - 1;
      }
    });
  }, [imagesArray.length]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      paginate(1);
    }, autoplayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplayInterval, paginate]);

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    intervalRef.current = setInterval(() => {
      paginate(1);
    }, autoplayInterval);
  }, [autoplayInterval, paginate]);

  const goToSlide = (index) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
    // Reset autoplay
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      paginate(1);
    }, autoplayInterval);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-3xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform' }}
        >
          <div className="relative w-full h-full">
            <Image
              src={imagesArray[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Professional */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator - Professional */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {imagesArray.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar - Subtle */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-white/20 z-20"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: autoplayInterval / 1000,
          ease: 'linear',
          repeat: Infinity,
        }}
        key={currentIndex}
      />
    </div>
  );
}

