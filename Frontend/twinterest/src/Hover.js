import React from "react";

const Hover = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-1/6 w-5/6...">
      <div className="grid grid-cols-7 gap-7">
        <div>
          <div className="absolute left-0 top-0 h-1/100 w-1/100 ...">
          <img
          src="https://via.placeholder.com/50"
          alt="Sample Image"
          />
          </div>
        </div>
        

        <div className="col-span-6">
          <div class="grid grid-rows-2 grid-flow-col gap-4">
          <p>Smiggrep</p>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default Hover;
