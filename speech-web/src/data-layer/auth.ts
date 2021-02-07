import Firebase from "firebase/app";
import { ref } from "vue";

export default (firebase: Firebase.app.App) => ({
  isAuthenticated: ref(false),

  authenticate () {
    firebase.auth().onAuthStateChanged((user) => {
      this.isAuthenticated.value = Boolean(user)
      if (this.isAuthenticated.value) {
        console.log('user logged')
      } else {
        console.log('user logout')
      }
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
    firebase.auth().applyActionCode(actionCode);
  }
})