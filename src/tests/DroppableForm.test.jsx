import React from "react";
import { render } from "@testing-library/react";
import DroppableForm from "./Components/DroppableForm";

test("renders form components dynamically", () => {
  const mockComponents = [
    { id: "text-1", type: "text" },
    { id: "select-1", type: "select", options: ["Option 1", "Option 2"] },
  ];

  const { getByPlaceholderText, getByText } = render(
    <DroppableForm
      formComponents={mockComponents}
      renderForm={() => (
        <>
          <input type="text" placeholder="Enter text" />
          <select>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </>
      )}
    />
  );

  expect(getByPlaceholderText("Enter text")).toBeInTheDocument();
  expect(getByText("Option 1")).toBeInTheDocument();
  expect(getByText("Option 2")).toBeInTheDocument();
});
