import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useCallback } from "react";

const ItemType = "FOOD_ITEM";

function DraggableFoodItem({ item, index, moveItem }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index; // Update index to prevent continuous swaps
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-2 border rounded-md shadow-md bg-white flex items-center cursor-move transition-transform ${
        isDragging ? "opacity-50 scale-105" : ""
      }`}
    >
      <img src={item.src} alt={item.name} className="w-16 h-16 rounded-md mr-4" />
      <span className="text-lg font-bold">{index + 1}</span>
    </div>
  );
}

export default function RankableFoodList({ rankedFoods, setRankedFoods, setCarouselImages }) {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => {
      if (!rankedFoods.some((food) => food.id === draggedItem.id)) {
        setRankedFoods((prev) => [...prev, draggedItem]);
        setCarouselImages((prev) => prev.filter((img) => img.id !== draggedItem.id));
      }
    },
  });

  const moveItem = useCallback(
    (fromIndex, toIndex) => {
      setRankedFoods((prev) => {
        const updatedList = [...prev];
        const [movedItem] = updatedList.splice(fromIndex, 1);
        updatedList.splice(toIndex, 0, movedItem);
        return updatedList;
      });
    },
    [setRankedFoods]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={drop} className="max-w-lg mx-auto flex flex-col gap-3 border-dashed border-2 p-4">
        {rankedFoods.map((image, index) => (
          <DraggableFoodItem key={image.id} item={image} index={index} moveItem={moveItem} />
        ))}
      </div>
    </DndProvider>
  );
}
