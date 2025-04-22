import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Initial Food List
const initialFoods = [
  { id: "1", name: "Pizza", image: "/pizza.jpg", origin: "Italy", description: "A popular Italian dish with cheese and toppings." },
  { id: "2", name: "Sushi", image: "/sushi.jpg", origin: "Japan", description: "Rice with seafood, vegetables, and sometimes tropical fruits." },
  { id: "3", name: "Burger", image: "/burger.jpg", origin: "USA", description: "A sandwich with a beef patty and other toppings." },
  { id: "4", name: "Pasta", image: "/pasta.jpg", origin: "Italy", description: "An Italian dish made from wheat and water, typically served with sauce." },
  { id: "5", name: "Ice Cream", image: "/icecream.jpg", origin: "Worldwide", description: "A sweet frozen dessert made from milk, cream, and sugar." },
];

// Sortable Item Component
function SortableItem({ food, index }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: food.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="w-full bg-white rounded-lg shadow-md p-3 flex items-center cursor-grab active:cursor-grabbing"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-lg font-bold text-gray-700 w-8">{index + 1}.</span>
      <img src={food.image} alt={food.name} className="w-12 h-12 rounded-full mr-3" />
      <span className="text-lg font-medium">{food.name}</span>
    </motion.div>
  );
}

// Food Table Component
function FoodTable({ foods }) {
  return (
    <table className="table-auto border-collapse border border-gray-300 w-full mt-6">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Image</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Origin</th>
          <th className="border border-gray-300 px-4 py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {foods.map((food, index) => (
          <tr key={food.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2 text-center">
              <img src={food.image} alt={food.name} className="w-12 h-12 rounded-full" />
            </td>
            <td className="border border-gray-300 px-4 py-2">{food.name}</td>
            <td className="border border-gray-300 px-4 py-2">{food.origin}</td>
            <td className="border border-gray-300 px-4 py-2">{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Main Ranking Component
export default function FoodRanking() {
  const [foods, setFoods] = useState(initialFoods);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = foods.findIndex((food) => food.id === active.id);
    const newIndex = foods.findIndex((food) => food.id === over.id);

    setFoods((prevFoods) => arrayMove(prevFoods, oldIndex, newIndex));
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-96 text-center shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold">Rank Your Favorite Foods</h2>
          <p className="text-gray-600 text-sm mb-4">Drag foods into your preferred ranking order!</p>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={foods.map((food) => food.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {foods.map((food, index) => (
                  <SortableItem key={food.id} food={food} index={index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          
          <FoodTable foods={foods} />
        </CardContent>
      </Card>
    </div>
  );
}
