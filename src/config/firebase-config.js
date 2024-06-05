import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDgH_hpnJSGA8dUeAylLGcRV1uOO6ooGjQ",
  authDomain: "bunker666-d230d.firebaseapp.com",
  projectId: "bunker666-d230d",
  storageBucket: "bunker666-d230d.appspot.com",
  messagingSenderId: "850450975746",
  appId: "1:850450975746:web:3f1d2aacf42a31df0deb1b",
  measurementId: "G-BZ4PKEFSVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)