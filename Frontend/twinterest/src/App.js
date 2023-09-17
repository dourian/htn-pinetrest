import { useState } from "react";
import TrailMap from "./Map";
// import handleUpload from '../Backend/firebaseConnector.js';
function App() {
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setURL] = useState("");
  const [displayform, setDisplayForm] = useState(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);

  function handleChange(event) {
    setFile(event.target.files[0]);
    console.log(file);
  }
  const handleUpload = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer ya29.a0AbVbY6NnGhnYvsv0rBvlndnF9tNcDgZG1nvoJYR4fRQfLADUWSFIAwByY6uQ-sRNrEyvWN_3oX0eBPJjvf7sNc72Kq8NcgQXHkvDOm-MIK8NOEZO-38eFxuKCADZ5T41e7yfeFU0EMDaV8N_B9WyNAV_HqWV8waCgYKAQ4SARMSFQFWKvPlQ3oJfJLXXdb0WuzCG6s-VQ0165"
    );

    const formdata = new FormData();
    formdata.append("filename", file, "piatrret.png");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:8000/upload", requestOptions)
      .then((response) => response.downloadURL)
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const submitPost = (e) => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": "zbrybro",
  "location": {
    "latitude": 50.472966,
    "longitude": -87.539806
  },
  "display_name": "bryant zheng",
  "image_url": "https://firebasestorage.googleapis.com/v0/b/impactful-ring-399204.appspot.com/o/piatrret.png%20%20%20%20%20%20%202023-9-16%2013%3A50%3A25?alt=media&token=a4e45556-2c04-47af-9952-c1fd8c54b2ce",
  "datetime": {
    "seconds": 1694875112,
    "nanoseconds": 602000000
  },
  "content": "bros"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/post", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  };

  return (
    <div className="App">
      <TrailMap
        currentLat={currentLat}
        currentLng={currentLng}
        setCurrentLat={setCurrentLat}
        setCurrentLng={setCurrentLng}
      />

      {!displayform && (
        <div>
          <button
            onClick={() => {
              setDisplayForm(true);
            }}
            className="absolute bottom-0 right-0 rounded-full  bg-sky-500/100 h-16 w-16 ..."
          >
            +
          </button>
        </div>
      )}

      {displayform && (
        <div className="z-50">
          <form onSubmit={submitPost}>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <input onChange={(e) => setUsername(e.target.value)}></input>
            <input onChange={(e) => setCaption(e.target.value)}></input>
            <button type="submit">Upload to Firebase</button>
          </form>
          <button
            onClick={() => {
              setDisplayForm(false);
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
