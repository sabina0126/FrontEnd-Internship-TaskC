import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import App from "./App";

// Mock DragDropContext and its children to simulate drag-and-drop behavior
jest.mock("react-beautiful-dnd", () => {
  const actual = jest.requireActual("react-beautiful-dnd");
  return {
    ...actual,
    DragDropContext: ({ children }) => <div>{children}</div>,
    Droppable: ({ children }) => <div>{children({ innerRef: jest.fn() })}</div>,
    Draggable: ({ children }) => <div>{children({ draggableProps: {}, dragHandleProps: {}, innerRef: jest.fn() })}</div>,
  };
});

test("should render component palette and form builder", () => {
  const { getByText } = render(<App />);
  expect(getByText("Component Palette")).toBeInTheDocument();
  expect(getByText("Form Builder")).toBeInTheDocument();
});

test("should add a component to the form builder on drop", () => {
  const { getByText } = render(<App />);

  // Simulate dropping a "Text Input" component into the form builder
  fireEvent.click(getByText("Text Input"));

  expect(getByText("Enter text")).toBeInTheDocument(); // Verify that the form builder contains the new component
});
