import React, { useState, useMemo, useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableComponent from "./Components/DraggableComponent";
import JSONSchemaDisplay from "./Components/JSONSchemaDisplay";

const App = () => {
  const [formComponents, setFormComponents] = useState([]);

  // Component Palette with predefined components
  const componentPalette = useMemo(
    () => [
      { id: "text-input", label: "Text Input", type: "text" },
      { id: "select-dropdown", label: "Select Dropdown", type: "select", options: ["Option 1", "Option 2"] },
      { id: "radio-buttons", label: "Radio Buttons", type: "radio", options: ["Yes", "No"] },
    ],
    []
  );

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;

      // Check if the destination exists
      if (!destination) return;

      // Handle dragging from the palette to the form builder
      if (source.droppableId === "palette" && destination.droppableId === "form-builder") {
        const draggedComponent = componentPalette[source.index];
        setFormComponents((prev) => [
          ...prev,
          { ...draggedComponent, id: `${draggedComponent.id}-${Date.now()}` },
        ]);
      }
    },
    [componentPalette]
  );

  const generateJSONSchema = useCallback(() => {
    return formComponents.map((component) => ({
      id: component.id,
      type: component.type,
      ...(component.options ? { options: component.options } : {}),
    }));
  }, [formComponents]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Interactive Drag-and-Drop Form Builder</h1>
        <div className="flex gap-8 w-full max-w-4xl">
          {/* Component Palette */}
          <Droppable droppableId="palette" isDropDisabled={true}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 bg-white p-4 border border-gray-300 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-bold mb-4">Component Palette</h2>
                {componentPalette.map((component, index) => (
                  <DraggableComponent
                    key={component.id}
                    id={component.id}
                    label={component.label}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Form Builder */}
          <Droppable droppableId="form-builder">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-2/3 bg-white p-4 border border-gray-300 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-bold mb-4">Form Builder</h2>
                {formComponents.map((component, index) => (
                  <div
                    key={component.id}
                    className="p-2 bg-gray-100 border border-gray-400 rounded-md mb-2"
                  >
                    {component.label}
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* JSON Schema Display */}
        <JSONSchemaDisplay jsonSchema={generateJSONSchema()} />
      </div>
    </DragDropContext>
  );
};

export default App;
