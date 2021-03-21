import Firebase from "firebase/app";
import { reactive, ref, toRefs } from "vue";
import { Room, RoomService } from "../shared/DataLayer"
import rand from "../shared/rand";
import { InternalLayerDeps } from "./__types"

export default ({ db }: InternalLayerDeps): RoomService => {
  const roomCollection = db.collection("rooms");


  // TODO: Remove | We create a room for testing purpose (remove that code)
  (async () => {
    const testRef = roomCollection.doc('myTestId');
    const testingRoom = await testRef.get()
    if (!testingRoom.exists) {
      testRef.set({
        messages: [],
        userIds: [],
        createdAt: Firebase.firestore.FieldValue.serverTimestamp()
      })

      console.log('testing room has been created');
    }
  })()

  return {
    watchRoom ({ roomId }: { roomId: string; }) {
      // todo: initialize data with cache (keep messages subscriptions) 
      const query = reactive<{
        loading: boolean;
        error: Error | null;
        result: Room | null;
      }>({
        loading: true,
        error: null,
        result: null
      })
      roomCollection.doc('myTestId').get().then((doc) => {
        if (doc.exists) {
          query.result = doc.data() as Room;
          roomCollection.doc('myTestId').onSnapshot((doc) => {
            console.log('room changed', doc.data())
            query.result = doc.data() as Room;
          })
        } else {
          // TODO: improve stuff...
          query.error = new Error('doc not found')
        }
      });

      return toRefs(query)
    },

    addMessage ({ roomId, content, authorId }: { roomId: string; content: string, authorId: string }) {
      if (roomId !== 'myTestId') {
        throw new Error('eh dumb ass, can you please dev the fucking room ?')
      }

      roomCollection.doc(roomId).update({
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