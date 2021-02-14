import Firebase from "firebase/app";

export type InternalLayerDeps = {
  firebase: Firebase.app.App;
  db: Firebase.firestore.Firestore;
}