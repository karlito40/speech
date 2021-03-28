import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import AuthService from "./auth-service";
import RoomService from "./room-service";
import { DataLayer, InternalLayerDeps } from "./types";
import InboxService from "./inbox-service";
import createFixtureRoom from "./fixtures/create-room";

export default function startLayer (firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string)): DataLayer {
  const firebase = Firebase.initializeApp(firebaseConfig)
  const internalDeps: InternalLayerDeps = {
    firebase,
    db: firebase.firestore()
  }

  // TODO: remove that one
  createFixtureRoom(internalDeps.db)

  return {
    Auth: AuthService(internalDeps),
    Room: RoomService(internalDeps),
    Inbox: InboxService(internalDeps)
  }
}
