import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function FoodItem({ food, index }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: food.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex flex-col items-center p-2 border rounded-lg shadow-md bg-white cursor-grab active:cursor-grabbing"
    >
      <img
        src={food.image}
        alt={food.name}
        className="w-24 h-24 object-cover rounded-full"
      />
      <p className="mt-2 font-semibold">{food.name}</p>
    </div>
  );
}

