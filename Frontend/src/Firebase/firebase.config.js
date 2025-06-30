// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC57idmpjKF5-9cXYVXa1pKESj1B2xqNUI",
  authDomain: "eventhub-127f9.firebaseapp.com",
  projectId: "eventhub-127f9",
  storageBucket: "eventhub-127f9.firebasestorage.app",
  messagingSenderId: "457842728751",
  appId: "1:457842728751:web:7dd9cd9438d0dc15cecbda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth