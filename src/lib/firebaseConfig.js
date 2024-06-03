import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "music-is-life-dolphin.firebaseapp.com",
  projectId: "music-is-life-dolphin",
  storageBucket: "music-is-life-dolphin.appspot.com",
  messagingSenderId: "1029126740258",
  appId: "1:1029126740258:web:40ca547d8e377ca6d06d7b",
});

const storage = getStorage(app);
export default storage;
