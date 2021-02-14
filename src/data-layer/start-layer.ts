import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import AuthService from "./auth";
import RoomService from "./room";
import { DataLayer } from "../shared/DataLayer";
import { InternalLayerDeps } from "./__types";

export default function (firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string)): DataLayer {
  const firebase = Firebase.initializeApp(firebaseConfig)
  const internalDeps: InternalLayerDeps = {
    firebase,
    db: firebase.firestore()
  } 

  return {
    auth: AuthService(internalDeps),
    room: RoomService(internalDeps)
  } as DataLayer
}
