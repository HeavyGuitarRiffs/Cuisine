import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function DroppableRanking({ id, onDrop, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    onActivate: (event) => {
      const draggedItem = event.active.data.current;
      if (draggedItem) {
        onDrop(draggedItem); // Handle the drop event
      }
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-24 flex items-center justify-center border-2 rounded-lg p-2 transition ${
        isOver ? "bg-blue-200" : "bg-gray-100"
      }`}
    >
      {children}
    </div>
  );
}
