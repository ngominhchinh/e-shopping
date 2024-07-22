// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfdHYLyzmOoY2MSXZffr_Vd7dL3RWHOLk",
  authDomain: "e-shopping-4ef28.firebaseapp.com",
  databaseUrl: "gs://e-shopping-4ef28.appspot.com",
  projectId: "e-shopping-4ef28",
  storageBucket: "e-shopping-4ef28.appspot.com",
  messagingSenderId: "608498192893",
  appId: "1:608498192893:web:1fbb4e4d3b5f09fd65c994"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)