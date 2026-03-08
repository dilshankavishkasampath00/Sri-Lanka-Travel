import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCUHMfTK_SHjyH6o89c7NYYzpH459YB2SQ",
    authDomain: "srilankatravel-app.firebaseapp.com",
    projectId: "srilankatravel-app",
    storageBucket: "srilankatravel-app.firebasestorage.app",
    messagingSenderId: "777362412649",
    appId: "1:777362412649:web:e7e871f9118607cec4fef8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
