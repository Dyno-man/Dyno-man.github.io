'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ProfileCarouselProps {
  images: string[];
}

export default function ProfileCarousel({ images }: ProfileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (images.length <= 1 || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [images.length, isPaused]);

  // Reset timer when manually navigating
  const handleManualNavigation = (newIndex: number) => {
    setCurrentIndex(newIndex);
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Restart interval after a brief delay
    if (images.length > 1 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-full max-w-md mx-auto mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-dark-surface border border-dark-border">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Profile picture ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => {
                const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
                handleManualNavigation(newIndex);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-dark-bg/80 backdrop-blur-sm border border-dark-border rounded-full p-2 text-dark-text-muted hover:text-accent-blue hover:border-accent-blue transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
                handleManualNavigation(newIndex);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-dark-bg/80 backdrop-blur-sm border border-dark-border rounded-full p-2 text-dark-text-muted hover:text-accent-blue hover:border-accent-blue transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNavigation(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-accent-blue w-6'
                    : 'bg-dark-text-muted/50 hover:bg-dark-text-muted'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

