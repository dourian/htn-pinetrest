import React from "react";

const Hover = () => {
  return (
    <div className="absolute inset-x-3 bottom-0 w-fit rounded-t-lg ...">
        <div className="grid grid-cols-7 gap-7" >
          <div>
            <div className="absolute left-0 top-0 ...">
              <div>
                <img
                  className="object-cover p-1 h-1/2 w-1/2 ..."
                  src="https://via.placeholder.com/100"
                  alt="Sample Image"
                />
              </div>
            </div>
          </div>


          <div className="col-span-6">
            <div className="grid grid-rows-2 gap-1">
              <p>Smiggrep</p>
              <p>@Smiggrep</p>
            </div>

          </div>
        </div>


        <img
            className="object-cover p-3 h-48 w-96 ..."
            src="https://via.placeholder.com/1000" />


        <div>
          <div className="grid grid-rows-2 gap-1">
            <p>Smiggrep</p>
            <p>@Smiggrep</p>
          </div>
        </div>

    </div>
  );
};

export default Hover;
