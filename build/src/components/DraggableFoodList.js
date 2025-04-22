import React from "react";
import { useDrag } from "react-dnd";

const DraggableFoodItem = ({ food, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FOOD_ITEM",
    item: { id: food.id, name: food.name, image: food.image, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <tr
      ref={drag}
      className={`cursor-grab active:cursor-grabbing transition ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <td className="px-4 py-2">
        <img src={food.image} alt={food.name} className="w-10 h-10 rounded-md" />
      </td>
      <td className="px-4 py-2 font-semibold">{food.name}</td>
    </tr>
  );
};

const DraggableFoodList = ({ foods }) => {
  return (
    <table className="table-auto w-full bg-gray-100 rounded-lg">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left">Image</th>
          <th className="px-4 py-2 text-left">Food Name</th>
        </tr>
      </thead>
      <tbody>
        {foods.map((food, index) => (
          <DraggableFoodItem key={food.id} food={food} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default DraggableFoodList;
