import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyD6eUut5So39GOYSsh2EsF_O4N3xYjoLik",
  authDomain: "ecommer-dcb3d.firebaseapp.com",
  databaseURL: "https://ecommer-dcb3d-default-rtdb.firebaseio.com",
  projectId: "ecommer-dcb3d",
  storageBucket: "ecommer-dcb3d.appspot.com",
  messagingSenderId: "309986122616",
  appId: "1:309986122616:web:7128aeb2a2cbd68cf9c68d",
  measurementId: "G-0G2W3QHYWQ"
});

const storage = getStorage(app);
export default storage;
