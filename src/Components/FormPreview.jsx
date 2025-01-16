import React from "react";

const FormPreview = ({ formComponents }) => {
  return (
    <form className="flex flex-col gap-4">
      {formComponents.map((component) => {
        switch (component.type) {
          case "text":
            return (
              <input
                key={component.id}
                type="text"
                placeholder="Enter text"
                className="p-2 border border-gray-300 rounded-md"
              />
            );
          case "select":
            return (
              <select
                key={component.id}
                className="p-2 border border-gray-300 rounded-md"
              >
                {component.options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            );
          case "radio":
            return (
              <div key={component.id} className="flex gap-4">
                {component.options.map((option, index) => (
                  <label key={index}>
                    <input type="radio" name={component.id} value={option} />
                    {option}
                  </label>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </form>
  );
};

export default FormPreview;
