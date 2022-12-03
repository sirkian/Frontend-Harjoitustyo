import { initializeApp } from "firebase/app";
import "firebase/auth";
import firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTSxBTwKdgavZvmWNP3jodkyHiJXkknCM",
  authDomain: "frontend-90ac4.firebaseapp.com",
  projectId: "frontend-90ac4",
  storageBucket: "frontend-90ac4.appspot.com",
  messagingSenderId: "558249081074",
  appId: "1:558249081074:web:bb4c62639be98bb46f786b",
};

// export const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// export const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const logout = () => {
  signOut(auth);
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
