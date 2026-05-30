import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUf6_BiSeLHTKa60qgHzL7ZRriClkoASo",
  authDomain: "stanmaxlab.firebaseapp.com",
  projectId: "stanmaxlab",
  storageBucket: "stanmaxlab.firebasestorage.app",
  messagingSenderId: "29719983697",
  appId: "1:29719983697:web:799e2b6f3ba9c0998e2a70",
  measurementId: "G-8GVK3S59VH"
};

// Reuse the existing Firebase app during client-side hot reloads.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
