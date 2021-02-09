import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import AuthService from "./auth";
import { DataLayer } from "../shared/DataLayer.d";

export default function (firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string)): DataLayer {
  const firebase = Firebase.initializeApp(firebaseConfig)

  return {
    auth: AuthService(firebase)
  } as DataLayer
}
