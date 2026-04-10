import React, { useState, useEffect, useRef } from "react";
import Slide, { SlideData } from "./Slide";

interface SlideshowProps {
  slides: SlideData[];
  autoplayInterval?: number; // ms between slides, defaults to 5000
}

const Slideshow: React.FC<SlideshowProps> = ({ slides, autoplayInterval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start/restart autoplay whenever activeIndex or isAutoplay changes
  useEffect(() => {
    if (!isAutoplay) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, activeIndex, slides.length, autoplayInterval]);

  // Clicking a dot pauses autoplay and jumps to that slide
  function goTo(index: number): void {
    setActiveIndex(index);
    setIsAutoplay(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#080c08]">
      {/* Render all slides stacked; only the active one is visible */}
      {slides.map((slide, i) => (
        <Slide key={i} {...slide} isActive={i === activeIndex} />
      ))}

      {/* Dot navigation — only shown when there's more than one slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2.5 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-2 border-0 cursor-pointer transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? 24 : 8,
                borderRadius: i === activeIndex ? 4 : "50%",
                background:
                  i === activeIndex ? "#e1d5b1" : "rgba(255,255,255,0.3)",
                boxShadow:
                  i === activeIndex ? "0 0 12px #6db87a88" : "none",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Slideshow;