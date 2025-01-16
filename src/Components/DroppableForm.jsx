import React from "react";

const DroppableForm = ({ formComponents, renderForm }) => {
  return (
    <div>
      {renderForm(formComponents)}
    </div>
  );
};

export default DroppableForm;
