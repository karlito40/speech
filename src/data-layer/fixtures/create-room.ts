import Firebase from "firebase/app";

// TODO: remove that file once everything is ok
export default async (db: Firebase.firestore.Firestore) => {
  const roomCollection = db.collection("rooms");
  const roomRef = roomCollection.doc('myTestId');
  const room = await roomRef.get()
  if (!room.exists) {
    roomRef.set({
      messages: [],
      userIds: [],
      createdAt: Firebase.firestore.FieldValue.serverTimestamp()
    })

    console.log('A fixture room (#myTestId) has been created. Remove that one once everything is ok');
  }
}