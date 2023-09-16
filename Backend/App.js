import express from "express";
import cors from "cors";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const app = express();



const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
