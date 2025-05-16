// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2LHzxdUnXSxwfxwdkA7eh21erwkxXRpI",
    authDomain: "wedding-planner-v2-71989.firebaseapp.com",
    projectId: "wedding-planner-v2-71989",
    storageBucket: "wedding-planner-v2-71989.firebasestorage.app",
    messagingSenderId: "276056910597",
    appId: "1:276056910597:web:f411606c38dd6a10e6256c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);