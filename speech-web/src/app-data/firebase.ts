import firebase from "firebase/app";
import "firebase/firestore";

export function init (firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string)) {  
  return firebase.initializeApp(firebaseConfig)
}
