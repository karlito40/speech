import { computed, reactive, ref, toRef, toRefs } from "vue";
import { AuthService, AuthServiceGetters, AuthServiceState } from "../shared/DataLayer";
import { InternalLayerDeps } from "./__types";

export default ({ firebase }: InternalLayerDeps): AuthService => {
  const state = reactive<AuthServiceState>({
    // TODO: Archi | Remove from auth. They are not the same and create a users collection
    me: undefined
  })

  const getters: AuthServiceGetters = {
    isAuthenticated: computed(() => Boolean(state.me))
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
      if (state.me === undefined) {
        state.me = null
        firebase.auth().onAuthStateChanged((user) => {
          state.me = user
          loading.value = false
        })
      }

      return { 
        me: toRef(state, 'me'), 
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