"use client";

import React, { useState } from "react";

const CustomToggle = ({ initialState = true, onToggle }) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onToggle && onToggle(!isToggled);
  };

  return (
    <div
      className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
        isToggled ? "bg-green-500" : "bg-gray-300"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
          isToggled ? "translate-x-6" : "translate-x-0"
        } transition-transform`}
      ></div>
    </div>
  );
};

export default CustomToggle;
