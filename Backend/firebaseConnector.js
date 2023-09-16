import { initializeApp } from 'firebase/app';
import { getStorage, ref,  getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgx2IEOegL2ILr6cdBzeymb3-6GChTTIc",
    authDomain: "impactful-ring-399204.firebaseapp.com",
    projectId: "impactful-ring-399204",
    storageBucket: "impactful-ring-399204.appspot.com",
    messagingSenderId: "45769175073",
    appId: "1:45769175073:web:e510fab6359339fb63f360",
    storageBucket: "gs://impactful-ring-399204.appspot.com",
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Create a storage reference from our storage service
const storageRef = ref(storage);
const shinjiRef = ref(storage, 'shinguh.png');
getCities(db);

// Get the download URL
getDownloadURL(shinjiRef)
  .then((url) => {
    console.log(url);
    // Or inserted into an <img> element
    //const img = document.getElementById('myimg');
    //img.setAttribute('src', url);
    
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });

  // Get a list of cities from your database
async function getCities(db) {
  const posts = collection(db, 'posts');
  const citySnapshot = await getDocs(posts);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  console.log(cityList);
  console.log(getDownloadURL);
}
