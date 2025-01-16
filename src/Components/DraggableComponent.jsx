import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableComponent = ({ id, label, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-2 bg-gray-200 border border-gray-400 rounded-md mb-2 cursor-move"
        >
          {label}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableComponent;
