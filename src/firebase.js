// Archivo: frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tus credenciales reales de LabReservePOO
const firebaseConfig = {
    apiKey: "AIzaSyDwPfH4q1flqXfY7UisE7sMfTgL2Y21PyM",
    authDomain: "labreservepoo.firebaseapp.com",
    projectId: "labreservepoo",
    storageBucket: "labreservepoo.firebasestorage.app",
    messagingSenderId: "512402225038",
    appId: "1:512402225038:web:dffa491fed18caf11496df"
};

// Inicializamos los servicios
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);