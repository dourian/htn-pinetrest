import { useState } from "react";
import Hover from "./Hover";
import TrailMap from "./Map";
// import handleUpload from '../Backend/firebaseConnector.js';
function App() {
  const [file, setFile] = useState("");

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
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <TrailMap />
      <Hover />
      <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button>
    </div>
  );
}

export default App;
