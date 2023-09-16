import { initializeApp } from 'firebase/app';
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
    appId: "1:45769175073:web:e510fab6359339fb63f360"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

getCities(db);


// Get a list of cities from your database
async function getCities(db) {
  const posts = collection(db, 'posts');
  const citySnapshot = await getDocs(posts);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  console.log(cityList);
}