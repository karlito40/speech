import Firebase from "firebase/app";
import { Observable } from "rxjs";
import rand from "../shared/rand";
import { InternalLayerDeps, Room, RoomService } from "./types"

export default ({ db }: InternalLayerDeps): RoomService => {
  const roomCollection = db.collection("rooms");

  return {
    getRoom ({ roomId }: { roomId: string; }) {
      return new Observable((subscriber) => {
        roomCollection.doc('myTestId').get().then((doc) => {
          if (doc.exists) {
            subscriber.next(doc.data() as Room)
            roomCollection.doc('myTestId').onSnapshot((doc) => {
              console.log('room changed', doc.data())
              subscriber.next(doc.data() as Room)
            })
          } else {
            subscriber.next(null)
          };
        })
      })
    },

    addMessage ({ roomId, content, authorId }: { roomId: string; content: string, authorId: string }) {
      if (roomId !== 'myTestId') {
        throw new Error('eh dumb ass, can you please dev the fucking room ?')
      }

      return roomCollection.doc(roomId).update({
        messages: Firebase.firestore.FieldValue.arrayUnion({
          // TODO: Form | Sanitize content in the addMessage
          content,
          authorId,
          duplicataCounterFuck: `${Date.now()}.${rand(0, 10000)}`
        })
      })
    }
  }
}