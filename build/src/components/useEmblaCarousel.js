import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function useEmblaCarouselWithAutoplay(options = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayInstance = useRef();

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins()?.autoplay;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onDragStart = () => autoplay?.reset(); // Pause autoplay when dragging starts
    const onDragEnd = () => autoplay?.play(); // Resume autoplay after dragging ends

    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onDragStart);
    emblaApi.on("pointerUp", onDragEnd);
    emblaApi.on("pointerLeave", onDragEnd); // Ensures autoplay resumes if the pointer leaves

    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onDragStart);
      emblaApi.off("pointerUp", onDragEnd);
      emblaApi.off("pointerLeave", onDragEnd);
    };
  }, [emblaApi]);

  return { emblaRef, selectedIndex };
}
