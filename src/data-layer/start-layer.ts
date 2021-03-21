import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import AuthService from "./auth-service";
import RoomService from "./room-service";
import { DataLayer } from "../shared/DataLayer";
import { InternalLayerDeps } from "./__types";

export default function startLayer (firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string)): DataLayer {
  const firebase = Firebase.initializeApp(firebaseConfig)
  const internalDeps: InternalLayerDeps = {
    firebase,
    db: firebase.firestore()
  } 

  return {
    Auth: AuthService(internalDeps),
    Room: RoomService(internalDeps)
  }
}
