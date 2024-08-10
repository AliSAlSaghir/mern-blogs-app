// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-1de39.firebaseapp.com",
  projectId: "mern-blog-1de39",
  storageBucket: "mern-blog-1de39.appspot.com",
  messagingSenderId: "265605446333",
  appId: "1:265605446333:web:4b95ff05b3adae743895d4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
