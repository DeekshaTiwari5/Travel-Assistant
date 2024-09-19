// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPaUp65p_Abpl_kSEGQUI-WSrZpKxm9RE",
  authDomain: "travel-ai-35d57.firebaseapp.com",
  projectId: "travel-ai-35d57",
  storageBucket: "travel-ai-35d57.appspot.com",
  messagingSenderId: "43615536702",
  appId: "1:43615536702:web:f061f29a8da4288ed5336f",
  measurementId: "G-RF8SJ9L6H4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

