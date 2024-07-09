import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPdqRf4HNOdMD86CXmbtpv2PhNQU6a7_U",
  authDomain: "workout-planner-abbc8.firebaseapp.com",
  projectId: "workout-planner-abbc8",
  storageBucket: "workout-planner-abbc8.appspot.com",
  messagingSenderId: "779499273660",
  appId: "1:779499273660:web:8ff435e898a5f47535bfb9",
  measurementId: "G-73L86KJG6R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
