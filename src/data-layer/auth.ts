import Firebase from "firebase/app";
import { computed, reactive, ref, toRef, toRefs } from "vue";
import { AuthService, AuthServiceGetters, AuthServiceState } from "../shared/DataLayer";

interface State {
  user: Firebase.User | null | undefined;
}

export default (firebase: Firebase.app.App): AuthService => {
  const state = reactive<AuthServiceState>({
    user: undefined
  })

  const getters: AuthServiceGetters = {
    isAuthenticated: computed(() => Boolean(state.user))
  }
  
  return {
    ...toRefs(state),
    ...getters,

    authenticate () {
      const loading = ref(true)
      
      // To prevent duplicate call.
      // Future authenticate call will rely on the first one as the data
      // are reactive
      // But anyway we should not call this method more than once (but well we all make mistake)
      if (state.user === undefined) {
        state.user = null
        firebase.auth().onAuthStateChanged((firebaseUser) => {
          state.user = firebaseUser
          loading.value = false
        })
      }

      return { 
        user: toRef(state, 'user'), 
        isAuthenticated: getters.isAuthenticated, 
        loading
      }
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