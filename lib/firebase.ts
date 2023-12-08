import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH9930W3uLGRf-oRbj7764qgBhFTvgSQc",
  authDomain: "chatty-2-2af1d.firebaseapp.com",
  projectId: "chatty-2-2af1d",
  storageBucket: "chatty-2-2af1d.appspot.com",
  messagingSenderId: "42162585123",
  appId: "1:42162585123:web:ce36da9107cae9ec51fb96",
  measurementId: "G-W6C76734EL",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
