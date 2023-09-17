import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Hover = ({ markerinfo, setActiveMarker }) => {
  const datetime = {
    seconds: markerinfo.datetime.seconds,
    nanoseconds: markerinfo.datetime.nanoseconds,
  };

  const pfps = ["https://i.kym-cdn.com/photos/images/newsfeed/002/652/460/d70.jpg",
    "https://pbs.twimg.com/media/FJAm5eCXIAkUDHn?format=png&name=small",
    "https://pbs.twimg.com/media/F5xQ2USWwAAkK0a?format=png&name=small",
    "https://pbs.twimg.com/media/F5FawLjXsAA7RSU?format=jpg&name=900x900",
    "https://pbs.twimg.com/media/F47gB3rWoAAB7id?format=jpg&name=small",
    "https://pbs.twimg.com/media/F4y1NTSXIAgBT77?format=png&name=small"]

  // Convert to milliseconds by multiplying seconds by 1000 and adding nanoseconds divided by 1,000,000
  const timestampInMillis = datetime.seconds * 1000 + datetime.nanoseconds / 1000000;

  // Create a Date object
  const date = new Date(timestampInMillis);

  // Format the date and time as a string
  const formattedDateTime = date.toLocaleString();

  return <div className="h-2/5 w-full bg-white absolute bottom-0 rounded-t-3xl p-5 flex flex-col min-h-[200px] overflow-hidden z-50">
    <div className="grid grid-cols-5 gap-4t">
    <img
      alt=""
      className="h-14 w-14 md:h-20 md:w-20 rounded-full"
      src={pfps[Math.floor(Math.random() * 6)]}
    ></img>
    <div className="col-span-4">
    <p className="text-sm font-medium">{markerinfo.display_name}</p>
    <p className="text-sm font-normal italic">@{markerinfo.username}</p>
    </div>
    </div>
    
    <img src={markerinfo.image_url} className="w-full h-24 sm:h-36 object-cover mt-2" alt="" />
    <p className="text-sm mt-2">{markerinfo.content}</p>
    <p className="text-gray-400">{formattedDateTime}</p>
  </div>;
};

export default Hover;
