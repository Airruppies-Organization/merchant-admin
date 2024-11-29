import React from "react";

const ModalInput = ({ label, type, func, value }) => {
  return (
    <div className="mb-3">
      <p>{label}:</p>
      <input
        onChange={func}
        type={type}
        value={value}
        className="focus:border-2 bg-neutral-100 rounded-lg h-12 focus:border-[#61088E] flex w-full focus:outline-none px-2"
      />
    </div>
  );
};

export default ModalInput;
