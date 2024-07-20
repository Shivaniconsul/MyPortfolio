// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWBP88u_s5zS527Z-7CxGCwd4DPLLihRU",
  authDomain: "shivaniportfolio-16aaa.firebaseapp.com",
  projectId: "shivaniportfolio-16aaa",
  storageBucket: "shivaniportfolio-16aaa.appspot.com",
  messagingSenderId: "796589629428",
  appId: "1:796589629428:web:95bf67d68bc88d8119e3a1",
  measurementId: "G-EMWX747ZCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Utility function to get download URL from Firebase Storage
export const getImageUrl = async (path) => {
  try {
    const imageRef = ref(storage, path);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (err) {
    console.error("Error fetching image URL:", err);
    return '';
  }
};
