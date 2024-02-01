import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

// Create a reference with an initial file path and name
const storage = getStorage();

export { db, storage };