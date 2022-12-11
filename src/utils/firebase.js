import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBTSxBTwKdgavZvmWNP3jodkyHiJXkknCM",
  authDomain: "frontend-90ac4.firebaseapp.com",
  projectId: "frontend-90ac4",
  storageBucket: "frontend-90ac4.appspot.com",
  messagingSenderId: "558249081074",
  appId: "1:558249081074:web:bb4c62639be98bb46f786b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
