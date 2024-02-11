import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAJ6icNaDCEs7D0qX0FLfLzx_OqhzdxJp8",
    authDomain: "nightdrive.firebaseapp.com",
    projectId: "nightdrive",
    storageBucket: "nightdrive.appspot.com",
    messagingSenderId: "398248738183",
    appId: "1:398248738183:web:72e99c3e251e5297daa722"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Create a reference with an initial file path and name
const storage = getStorage();

export { db, storage };