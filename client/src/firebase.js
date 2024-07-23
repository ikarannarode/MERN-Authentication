// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-authentication-ebc38.firebaseapp.com",
    projectId: "mern-authentication-ebc38",
    storageBucket: "mern-authentication-ebc38.appspot.com",
    messagingSenderId: "443869509481",
    appId: "1:443869509481:web:00fc4e58a0fd7f197faff8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);