"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import Button from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel = React.forwardRef(({ className, children, interval = 3000, ...props }, ref) => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const items = React.Children.toArray(children);
  
  useEffect(() => {
    const autoplay = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(autoplay);
  }, [items.length, interval]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <div
        ref={containerRef}
        className="flex transition-transform"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {children}
      </div>
    </div>
  );
});

Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
));

CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef(({ className, children, ...props }, ref) => {
  const handleDragStart = (e) => {
    if (e.target.tagName === "IMG") {
      e.dataTransfer.setData("text/plain", e.target.src);
    }
  };

  return (
    <div ref={ref} className={cn("flex-shrink-0", className)} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          draggable: true,
          onDragStart: handleDragStart,
          onDragEnd: () => setIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children)),
        })
      )}
    </div>
  );
});

CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn("absolute left-0 top-1/2 -translate-y-1/2 z-10", className)}
    {...props}
  >
    <ChevronLeft />
  </Button>
));

CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn("absolute right-0 top-1/2 -translate-y-1/2 z-10", className)}
    {...props}
  >
    <ChevronRight />
  </Button>
));

CarouselNext.displayName = "CarouselNext";

export const FoodCarousel = () => {
  return <div>Food Carousel Component</div>;
};

export default FoodCarousel;
