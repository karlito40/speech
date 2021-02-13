import Firebase from "firebase/app";
import { computed, ref } from "vue";
import { AuthService } from "../shared/DataLayer";

export default (firebase: Firebase.app.App): AuthService => {
  const user = ref<Firebase.User | null | undefined>(undefined)
  const isAuthenticated = computed(() => Boolean(user.value))

  return {
    user,
    isAuthenticated,

    authenticate () {
      const loading = ref(true)
      
      // To prevent duplicate call.
      // Future authenticate call will rely on the first one as the data
      // are reactive
      // But anyway we should not call this method more than once (but well we all make mistake)
      if (user.value === undefined) {
        user.value = null
        firebase.auth().onAuthStateChanged((firebaseUser) => {
          user.value = firebaseUser
          loading.value = false
        })
      }

      return { user, loading, isAuthenticated }
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
  }
}