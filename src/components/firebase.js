import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Create a reference with an initial file path and name
const storage = getStorage();

export { db, storage };