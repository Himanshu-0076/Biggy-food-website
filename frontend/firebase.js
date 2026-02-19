// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "biggy-8b58d.firebaseapp.com",
  projectId: "biggy-8b58d",
  storageBucket: "biggy-8b58d.firebasestorage.app",
  messagingSenderId: "99035596671",
  appId: "1:99035596671:web:460e1d3b87dda767ebbc4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
console.log("Google authentication")

export{app, auth}