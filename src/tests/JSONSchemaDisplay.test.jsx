import React from "react";
import { render } from "@testing-library/react";
import JSONSchemaDisplay from "./Components/JSONSchemaDisplay";

test("renders JSON schema correctly", () => {
  const mockSchema = [
    { id: "text-1", type: "text" },
    { id: "select-1", type: "select", options: ["Option 1", "Option 2"] },
  ];

  const { getByText } = render(<JSONSchemaDisplay jsonSchema={mockSchema} />);

  expect(getByText(/"id": "text-1"/)).toBeInTheDocument();
  expect(getByText(/"type": "text"/)).toBeInTheDocument();
  expect(getByText(/"id": "select-1"/)).toBeInTheDocument();
  expect(getByText(/"options": \["Option 1", "Option 2"\]/)).toBeInTheDocument();
});
