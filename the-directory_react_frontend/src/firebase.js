import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzw67k0ctE0FfREG2MPEd77GfI7XIudLQ",
  authDomain: "capstoneimages-d2664.firebaseapp.com",
  projectId: "capstoneimages-d2664",
  storageBucket: "capstoneimages-d2664.appspot.com",
  messagingSenderId: "663138213835",
  appId: "1:663138213835:web:7f75ee37c81677ba82204e",
  measurementId: "G-TW3DDD6GY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
