import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvq6K7FOBBasDS0neVNKwlYNeMyDQYHhc",
  authDomain: "skillxchange-daba9.firebaseapp.com",
  projectId: "skillxchange-daba9",
  storageBucket: "skillxchange-daba9.firebasestorage.app",
  messagingSenderId: "642773604381",
  appId: "1:642773604381:web:dab99c15d5d7ce65ef0ef4",
  measurementId: "G-CXBN1M20CD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);