// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWXqJTm4rZ9fbAa7190k-hEsQ04AFORP4",
  authDomain: "lenskart-9518d.firebaseapp.com",
  projectId: "lenskart-9518d",
  storageBucket: "lenskart-9518d.firebasestorage.app",
  messagingSenderId: "581815733264",
  appId: "1:581815733264:web:748bea862605b3f2198e95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;