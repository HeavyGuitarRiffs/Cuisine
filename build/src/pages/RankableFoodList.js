import { Droppable, Draggable } from "react-beautiful-dnd";

const handleDragStart = (e, food) => {
  e.dataTransfer.setData("text/plain", JSON.stringify(food));
  e.dataTransfer.effectAllowed = "move";
};

export default function RankableFoodList({ rankedFoods, setRankedFoods }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const food = JSON.parse(e.dataTransfer.getData("text/plain"));
    
    // Ensure food is not already in the list
    setRankedFoods((prev) => {
      if (!prev.some((item) => item.id === food.id)) {
        return [...prev, food];
      }
      return prev;
    });
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <Droppable droppableId="rankingSlots">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          onDrop={handleDrop}
          onDragOver={allowDrop}
          className="max-w-lg mx-auto p-4 border-2 border-dashed border-blue-500 rounded-md bg-blue-100 min-h-[150px] flex flex-col gap-2"
        >
          {rankedFoods.length === 0 ? (
            <p className="text-center text-gray-500">Drag foods here to rank them! 🍽️</p>
          ) : (
            rankedFoods.map((food, index) => (
              <Draggable key={food.id} draggableId={food.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex items-center gap-4 p-2 bg-white rounded-md shadow-md cursor-grab transition-all duration-150 ${
                      snapshot.isDragging ? "opacity-70 scale-105 shadow-lg" : "hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={food.src}
                      alt={food.name}
                      className="w-16 h-16 rounded-md object-cover"
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, food)}
                    />
                    <p className="text-lg font-semibold">{food.name}</p>
                  </div>
                )}
              </Draggable>
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
