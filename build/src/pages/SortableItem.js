import { Draggable } from "react-beautiful-dnd";

const SortableItem = ({ item, index }) => {
  if (!item) return null;

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-3 cursor-pointer"
        >
          <img src={item.src} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
          <p className="mt-2 text-sm font-medium">{item.name}</p>
        </div>
      )}
    </Draggable>
  );
};

export default SortableItem;
