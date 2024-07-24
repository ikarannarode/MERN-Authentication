// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABYiILpKamjK8RFyKoj54wNeWjxcinWNs",
    authDomain: "mern-auth-478b7.firebaseapp.com",
    projectId: "mern-auth-478b7",
    storageBucket: "mern-auth-478b7.appspot.com",
    messagingSenderId: "166923670200",
    appId: "1:166923670200:web:6d8a16bbfaa9ba757a5a4d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);