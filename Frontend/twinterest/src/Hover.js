import React from "react";

const Hover = ({ markerinfo }) => {
  const datetime = {
    seconds: markerinfo.datetime.seconds,
    nanoseconds: markerinfo.datetime.nanoseconds
  };
  
  // Convert to milliseconds by multiplying seconds by 1000 and adding nanoseconds divided by 1,000,000
  const timestampInMillis = datetime.seconds * 1000 + datetime.nanoseconds / 1000000;
  
  // Create a Date object
  const date = new Date(timestampInMillis);
  
  // Format the date and time as a string
  const formattedDateTime = date.toLocaleString();

  return <div className="h-1/4 w-full bg-white absolute bottom-0 rounded-t-3xl p-5 flex flex-col min-h-[200px] overflow-hidden">
    <p className="text-sm font-medium">{markerinfo.display_name}</p>
    <p className="text-sm font-normal italic">@{markerinfo.username}</p>
    <img src={markerinfo.image_url} className="w-full h-24 object-cover mt-2" alt=""/>
    <p className="text-sm mt-2">{markerinfo.content}</p>
    <p className="text-gray-400">{formattedDateTime}</p>
  </div>;
};

export default Hover;
