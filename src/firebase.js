// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDPqbXIfzomQMXgcYpDJPFXOFUxpkhVunw",
  authDomain: "log-in-doc-web.firebaseapp.com",
  projectId: "log-in-doc-web",
  storageBucket: "log-in-doc-web.appspot.com",
  messagingSenderId: "744676699095",
  appId: "1:744676699095:web:c48a50f80afae0d722b992",
  measurementId: "G-MBDH4D2W4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database= getAuth(app);
