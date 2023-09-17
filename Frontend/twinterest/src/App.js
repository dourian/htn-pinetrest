import { useState } from "react";
import TrailMap from "./Map";
import { AiOutlineClose } from "react-icons/ai";
// import handleUpload from '../Backend/firebaseConnector.js';
function App() {
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [caption, setCaption] = useState("");
  const [displayform, setDisplayForm] = useState(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

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
    fetch("http://localhost:8000/upload", requestOptions1)
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
        return fetch("http://localhost:8000/post", requestOptions);
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

  return (
    <div className="App">
      <TrailMap
        currentLat={currentLat}
        currentLng={currentLng}
        setCurrentLat={setCurrentLat}
        setCurrentLng={setCurrentLng}
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
      />

      {!displayform && (
        <div>
          <button
            onClick={() => {
              setDisplayForm(true);
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
        <div className="h-1/2 w-full bg-white bottom-0 absolute rounded-t-xl">
          <div className="w-full">
            <AiOutlineClose
              onClick={() => setDisplayForm(false)}
              className="h-5 w-5 m-5"
            >
              x
            </AiOutlineClose>
          </div>
          <div className="flex flex-row">
            <img
              alt=""
              className="ml-5 h-20 w-20 rounded-full"
              src="https://i.kym-cdn.com/photos/images/newsfeed/002/652/460/d70.jpg"
            ></img>
            <div className="ml-5 h-20 w-32 bg-red-50">
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
              className="h-16 w-32 rounded-full bg-black mr-5 text-white"
              onClick={() => {
                submitPost();
              }}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Start"}
            </button>
          </div>
          <div
            className="flex-row h-2/5 bg-gray-200 m-5 rounded-lg"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input type="file" onChange={handleChange} accept="image/*" />
          </div>
          <input
            className="h-16 ml-5 mr-5 p-5 left-0 right-0 bg-gray-200 rounded-lg"
            onChange={(e) => setCaption(e.target.value)}
            placeholder="enter a message..."
          ></input>
        </div>
      )}
    </div>
  );
}

export default App;
