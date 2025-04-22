import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Assuming you have more categories, this can be dynamically updated.
const images = {
  drinks: ["/images/drink1.jpg", "/images/drink2.jpg", "/images/drink3.jpg"],
  bread: ["/images/bread1.jpg", "/images/bread2.jpg", "/images/bread3.jpg"],
  salad: ["/images/salad1.jpg", "/images/salad2.jpg", "/images/salad3.jpg"],
};

const Carousel = ({ category }) => {
  const handleDragStart = (e, img) => {
    e.dataTransfer.setData("text/plain", img);
  };

  // Fallback category if the category does not exist in the images object
  const selectedImages = images[category] || images.drinks; // Default to 'drinks' category if undefined

  return (
    <Swiper spaceBetween={30} slidesPerView={1} loop autoplay={{ delay: 3000 }}>
      {selectedImages.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`${category} image ${index + 1}`} // Adding more descriptive alt text
            className="w-full rounded-lg shadow-lg"
            draggable
            onDragStart={(e) => handleDragStart(e, img)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

