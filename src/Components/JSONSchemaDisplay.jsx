import React from "react";

const JSONSchemaDisplay = ({ jsonSchema }) => {
  return (
    <div className="mt-6 w-full max-w-4xl bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Generated JSON Schema</h2>
      <pre className="bg-gray-200 p-4 rounded-md">
        {JSON.stringify(jsonSchema, null, 2)}
      </pre>
    </div>
  );
};

export default JSONSchemaDisplay;
