import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default function main (firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string)) {
  /* (async () => {
    console.log('testing firebase init...')
    const firebase = Firebase.init()
    const db = firebase.firestore()
    try {
      const docRef = await db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
      })

      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", error);
    }
  })() */

  const firebase = Firebase.initializeApp(firebaseConfig)
  firebase.auth().onAuthStateChanged((user) => {
    const isAuthenticated = Boolean(user)
    if (isAuthenticated) {
      console.log('user logged')
    } else {
      console.log('user logout')
    }
  })

  return firebase
}
