import { useState } from "react";
import MapWrapper from "./Map";
import handleUpload from '../Backend/firebaseConnector.js';
function App() {

  const [file, setFile] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div className="App">
      <MapWrapper />
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload(file)}>Upload to Firebase</button>
    </div>
  );
}

export default App;
