import React from "react";

const Input = ({ label, type }) => {
  return (
    <div className="mb-6">
      <p>{label}</p>
      <input
        type={type}
        className="w-full border border-black h-12 rounded-md p-4"
      />
    </div>
  );
};

export default Input;
