import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplayProgress } from "./useAutoplayProgress"; // Import your hook

const EmblaCarousel = ({ slides }) => {
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }) // Ensure autoplay resets after interaction
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayRef.current
  ]);

  const progressRef = useRef(null);
  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressRef);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    const handleDragStart = () => autoplay.stop(); // 🔥 Stop autoplay on drag
    const handleDragEnd = () => autoplay.play(); // 🔥 Resume autoplay after dragging ends

    emblaApi.on("pointerDown", handleDragStart);
    emblaApi.on("pointerUp", handleDragEnd);
    emblaApi.on("pointerLeave", handleDragEnd); // Ensure autoplay resumes if the pointer leaves

    return () => {
      emblaApi.off("pointerDown", handleDragStart);
      emblaApi.off("pointerUp", handleDragEnd);
      emblaApi.off("pointerLeave", handleDragEnd);
    };
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((src, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Autoplay Progress Indicator */}
      {showAutoplayProgress && (
        <div ref={progressRef} className="autoplay-progress">
          {/* Add styles for visual feedback */}
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
