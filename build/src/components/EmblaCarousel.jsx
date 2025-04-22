import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "image";

const DraggableSlide = ({ slide, index, onDragStart }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { slide, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`embla__slide flex justify-center cursor-grab ${isDragging ? "opacity-50" : ""}`}
      onPointerDown={onDragStart}
    >
      <img src={slide} alt="slide" className="w-24 h-24 object-cover rounded-lg" />
    </div>
  );
};

const EmblaCarousel = ({ slides, onItemDrag }) => {
  const [emblaRef, embla] = useEmblaCarousel(
    { draggable: true, loop: true, dragFree: true },
    [Autoplay({ delay: 3000 })]
  );

  const handlePointerDownCapture = useCallback(() => {
    if (embla) embla.destroy();
  }, [embla]);

  const handlePointerUp = useCallback(() => {
    if (embla) embla.reInit();
  }, [embla]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center gap-6">
        <div className="embla w-3/4 relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex gap-4">
              {slides.map((slide, index) => (
                <DraggableSlide key={index} slide={slide} index={index} onDragStart={handlePointerDownCapture} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default EmblaCarousel;
