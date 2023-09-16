import express from "express";
import cors from "cors";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import bodyParser from "body-parser";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConnector.js'

const app = express();
const jsonParser = bodyParser.json();

const app1 = initializeApp(firebaseConfig);
const db = getFirestore(app1);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app1);

// default
app.get("/", (req, res) => {
  res.send("smiggrep");
});

app.post("/test",
  bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
  (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
 });

app.get("/getImageURL", jsonParser, async (req, res) => {
  const imageRef = ref(storage, req);

  try {
    getDownloadURL(imageRef).then((url) => {
      res.send(url);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/getImageList", jsonParser, async (req, res) => {
  //...
});

app.get("/getPoints", jsonParser, async (req, res) => {
  //displayname, username, image url, description, datetime, location
  try {
    const posts = collection(db, 'posts');
    const postSnapshot = await getDocs(posts);
    const postList = postSnapshot.docs.map(doc => doc.data());

    res.send(postList);
    res.end();
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

// generate prompts
app.post("/upload", jsonParser, async (req, res) => {
  const storageRef = ref(storage, `${req.name}`);

  try {
    uploadBytes(storageRef, req).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(snapshot.ref).then((url) => {
        res.send(url);
      });
    });
    res.send("Uploaded a blob or file!");
  } catch (error) {
    console.error("Error:", error);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
