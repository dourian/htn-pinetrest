import express from "express";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import bodyParser from "body-parser";
import { initializeApp } from "firebase/app";
import multer from "multer";
import { doc, setDoc } from "firebase/firestore";
import cors from "cors";
import * as dotenv from "dotenv";
import { firebaseConfig } from "./firebaseConnector.js";

dotenv.config();
const app = express();
app.use(cors());
const jsonParser = bodyParser.json();

const app1 = initializeApp(firebaseConfig);

const db = getFirestore(app1);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app1);

const upload = multer({ storage: multer.memoryStorage() });

// default
app.get("/", (req, res) => {
  res.send("smiggrep");
});

app.post(
  "/test",
  bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
  (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  }
);

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

app.post("/post", jsonParser, async (req, res) => {
  await setDoc(doc(db, "posts", djb2Hash(req.body.image_url).toString()), {
    content: req.body.content,
    display_name: req.body.display_name,
    image_url: req.body.image_url,
    username: req.body.username,
    datetime: {
      seconds: req.body.datetime.seconds,
      nanoseconds: req.body.datetime.nanoseconds,
    },
    location: {
      latitude: req.body.location.latitude,
      longitude: req.body.location.longitude,
    },
  });

  res.end();
});

app.get("/getPoints", jsonParser, async (req, res) => {
  //displayname, username, image url, description, datetime, location
  try {
    const posts = collection(db, "posts");
    const postSnapshot = await getDocs(posts);
    const postList = postSnapshot.docs.map((doc) => doc.data());

    res.send(postList);
    res.end();
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

// generate prompts
app.post("/upload", upload.single("filename"), async (req, res) => {
  try {
    console.log(req.file);
    const dateTime = giveCurrentDateTime();
    //${req.file.originalname + "       " + dateTime}
    const storageRef = ref(
      storage,
      `/${req.file.originalname + "       " + dateTime}`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("File successfully uploaded.");
    return res.send({
      message: "file uploaded to firebase storage",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL,
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

function djb2Hash(inputString) {
  let hash = 5381; // Initial hash value
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    hash = (hash * 33) ^ char; // Bitwise XOR and multiplication
  }
  return hash >>> 0; // Ensure the hash is a positive integer
}
