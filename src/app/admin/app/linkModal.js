import React from "react";

const LinkModal = ({ link }) => {
  return (
    <div className="z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" bg-white rounded-lg p-5">
        <div className="w-full h-20 p-3 border border-neutral-300 rounded-xl mb-3 text-xs text-wrap">
          <p>{link}</p>
        </div>
        <div>Copy</div>
      </div>
    </div>
  );
};

export default LinkModal;