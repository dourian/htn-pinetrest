import { useEffect, useState } from "react";
import TrailMap from "./Map";
import { AiOutlineClose } from "react-icons/ai";
// import handleUpload from '../Backend/firebaseConnector.js';
function App() {
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [caption, setCaption] = useState("");
  const [displayform, setDisplayForm] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [profile, setProfile] = useState("");

  const pfps = [
    "https://i.kym-cdn.com/photos/images/newsfeed/002/652/460/d70.jpg",
    "https://pbs.twimg.com/media/FJAm5eCXIAkUDHn?format=png&name=small",
    "https://pbs.twimg.com/media/F5xQ2USWwAAkK0a?format=png&name=small",
    "https://pbs.twimg.com/media/F5FawLjXsAA7RSU?format=jpg&name=900x900",
    "https://pbs.twimg.com/media/F47gB3rWoAAB7id?format=jpg&name=small",
    "https://pbs.twimg.com/media/F4y1NTSXIAgBT77?format=png&name=small",
  ];

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    if (displayform) {
      setActiveMarker(null);
    }
  }, [displayform]);

  const submitPost = () => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("filename", file, "piatrret.png");

    const requestOptions1 = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    let localUrl; // Declare url locally

    // First fetch request to upload the file
    fetch(
      "https://pientrest-15ef1ac3bb8f.herokuapp.com/upload",
      requestOptions1
    )
      .then((response) => response.json())
      .then((data) => {
        localUrl = data.downloadURL; // Assign the value to the local variable

        // Get the current date and time
        const currentDate = new Date();

        // Format the current date and time
        const formattedDateTime = formatDateTime(currentDate);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          username: username,
          location: {
            latitude: currentLat,
            longitude: currentLng,
          },
          display_name: displayName,
          image_url: localUrl, // Use the local variable
          datetime: {
            seconds: formattedDateTime.seconds,
            nanoseconds: formattedDateTime.nanoseconds,
          },
          content: caption,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        // Second fetch request to post the data
        return fetch(
          "https://pientrest-15ef1ac3bb8f.herokuapp.com/post",
          requestOptions
        );
      })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        // Place your setState calls here
        setIsLoading(false);
        setDisplayForm(false);
        setDisplayName(null);
        setCaption(null);
        setUsername(null);
        setFile("");
        setNeedRefresh(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false); // Make sure to set isLoading to false in case of an error.
      });
  };

  const formatDateTime = (date) => {
    const seconds = Math.floor(date.getTime() / 1000);
    const nanoseconds = date.getMilliseconds() * 1000000;
    return { seconds, nanoseconds };
  };

  const formDisplayer = () => {
    const index = Math.floor(Math.random() * 6);
    setProfile(pfps[index]);
    setDisplayForm(true);
  };

  return (
    <div className="App overf">
      <TrailMap
        currentLat={currentLat}
        currentLng={currentLng}
        setCurrentLat={setCurrentLat}
        setCurrentLng={setCurrentLng}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
        displayform={displayform}
        setDisplayForm={setDisplayForm}
      />

      {!displayform && (
        <div>
          <button
            onClick={() => {
              formDisplayer();
            }}
            className={`absolute bottom-2 right-2 rounded-full bg-white h-16 w-16 ${
              displayform && "opacity-0"
            }`}
          >
            <h1 className="text-5xl mx-auto my-auto">+</h1>
          </button>
        </div>
      )}

      {displayform && (
        <div className="h-4/9 sm:h-2/5 w-full bg-white bottom-0 absolute rounded-t-xl p-5">
          <AiOutlineClose
            onClick={() => setDisplayForm(false)}
            className="h-5 w-5 absolute right-5"
          />
          <p className="w-full text-center text-slate-500"> 
            {currentLat.toFixed(4)}, {currentLng.toFixed(4)}
          </p>
          <div className="flex flex-row mt-6">
            <img
              alt=""
              className="ml-5 h-14 w-14 md:h-20 md:w-20 rounded-full"
              src={profile}
            ></img>
            <div className="ml-5 h-20 w-32">
              <input
                className="text-sm font-medium"
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="display name"
              ></input>
              <input
                className="text-sm font-normal italic"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              ></input>
            </div>
            <div className="flex-grow" />
            <button
              className="h-10 md:h-16 w-24 md:w-32 rounded-full bg-black mr-5 text-white"
              onClick={() => {
                submitPost();
              }}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "POST!"}
            </button>
          </div>
          <div
            className="flex-row h-1/5 md:h-2/5 bg-gray-200 m-5 rounded-lg"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input type="file" onChange={handleChange} accept="image/*" />
          </div>
          <input
            className="h-10 md:h-16 ml-5 mr-5 p-5 left-0 right-0 bg-gray-200 rounded-lg"
            onChange={(e) => setCaption(e.target.value)}
            placeholder="enter a message..."
          ></input>
        </div>
      )}
    </div>
  );
}

export default App;
