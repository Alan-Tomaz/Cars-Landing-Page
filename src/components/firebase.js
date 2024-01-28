import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAJ6icNaDCEs7D0qX0FLfLzx_OqhzdxJp8",
    authDomain: "nightdrive.firebaseapp.com",
    projectId: "nightdrive",
    storageBucket: "nightdrive.appspot.com",
    messagingSenderId: "398248738183",
    appId: "1:398248738183:web:72e99c3e251e5297daa722"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };