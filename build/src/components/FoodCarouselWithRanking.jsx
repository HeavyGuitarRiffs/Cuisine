import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./emblaStyles.css";

const images = {
  drinks: [
    { id: "1", name: "Coffee", src: "/images/coffee.jpg", inventor: "Unknown" },
    { id: "2", name: "Milkshake", src: "/images/milkshake.jpg", inventor: "USA" },
    { id: "3", name: "Tea", src: "/images/tea.jpg", inventor: "China" },
    { id: "4", name: "Soda", src: "/images/soda.jpg", inventor: "USA" },
    { id: "5", name: "Juice", src: "/images/juice.jpg", inventor: "Various" },
    { id: "6", name: "Water", src: "/images/water.jpg", inventor: "Natural" },
    { id: "7", name: "Lemonade", src: "/images/lemonade.jpg", inventor: "USA" },
    { id: "8", name: "Iced Tea", src: "/images/icedtea.jpg", inventor: "USA" },
    { id: "9", name: "Smoothie", src: "/images/smoothie.jpg", inventor: "Various" },
  ],
  // Other categories can go here...
};

export default function FoodTableWithRanking({ category }) {
  const [foodItems, setFoodItems] = useState(images[category] || []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Rank the Foods</h2>
      <Droppable droppableId="carousel" direction="vertical">
        {(provided) => (
          <div
            className="overflow-hidden w-full max-w-4xl mx-auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Food Name</th>
                  <th className="px-4 py-2">Inventor</th>
                  <th className="px-4 py-2">Rank</th>
                </tr>
              </thead>
              <tbody>
                {foodItems.map((food, index) => (
                  <Draggable key={food.id} draggableId={food.id} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border-t-2 border-b-2 border-gray-300"
                      >
                        <td className="px-4 py-2">
                          <img
                            src={food.src}
                            alt={food.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-4 py-2">{food.name}</td>
                        <td className="px-4 py-2">{food.inventor}</td>
                        <td className="px-4 py-2">Rank {index + 1}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
              </tbody>
            </table>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
