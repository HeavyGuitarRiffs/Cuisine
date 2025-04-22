import React from "react";

export default function FoodItem({ id, name, image }) {
  const handleDragStart = (e) => {
    const dragData = JSON.stringify({ id, name, image });
    e.dataTransfer.setData("application/json", dragData);

    // Optional: Set a custom drag image
    const img = new Image();
    img.src = image;
    img.width = 50; // Adjust the size as needed
    img.height = 50;
    e.dataTransfer.setDragImage(img, 25, 25);
  };

  return (
    <tr
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab active:cursor-grabbing transition"
    >
      <td className="px-4 py-2">
        <img src={image} alt={name} className="w-10 h-10 rounded-md" />
      </td>
      <td className="px-4 py-2 font-semibold">{name}</td>
    </tr>
  );
}
