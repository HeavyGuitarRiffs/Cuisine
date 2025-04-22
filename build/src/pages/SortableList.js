import { Droppable } from "react-beautiful-dnd";
import SortableItem from "./SortableItem";

const SortableList = ({ rankings }) => {
  return (
    <Droppable droppableId="rankingSlots" direction="horizontal">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex space-x-4 mb-8 p-6 bg-white shadow-xl rounded-lg min-h-[140px]"
        >
          {rankings.map((item, index) => (
            <SortableItem key={index} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default SortableList;
