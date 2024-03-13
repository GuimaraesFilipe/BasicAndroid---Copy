// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import Config from "react-native-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: "little-lemon-app-76832.firebaseapp.com",
  databaseURL:"//little-lemon-app-76832-default-rtdb.firebaseio.com/",
  projectId: "little-lemon-app-76832",
  storageBucket: "little-lemon-app-76832.appspot.com",
  messagingSenderId: "732344765833",
  appId: "1:732344765833:web:5b4bd02b137f5b057de558",
  measurementId: "G-QFJZ97XSB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage (app);

export default app;
