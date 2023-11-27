// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e4757.firebaseapp.com",
  projectId: "mern-estate-e4757",
  storageBucket: "mern-estate-e4757.appspot.com",
  messagingSenderId: "605591227769",
  appId: "1:605591227769:web:1e9c5fcbe002b01f82f3a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);