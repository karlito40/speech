import { Observable } from "rxjs";
import { AuthService, InternalLayerDeps } from "./types";

export default ({ firebase }: InternalLayerDeps): AuthService => {
  return {
    authenticate () {
      return new Observable((subscriber) => {
        console.log('authenticate...')
        firebase.auth().onAuthStateChanged((user) => {
          console.log('onAuthStateChanged !')
          subscriber.next(user)
        })
      })
    },

    async signUp ({ email, password }: { email: string, password: string }) {
      const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (credential.user && !credential.user.emailVerified) {
        console.log('[email verification] sending...')
        credential.user.sendEmailVerification().then(() => {
          console.log('[email verification] sent !')
        })
      }
    
      return credential;
    },

    verifyEmail (actionCode: string) {
      return firebase.auth().applyActionCode(actionCode);
    }
  }
}