<template>
  <div class="AuthActionView">
    <p>{{ state.message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataLayer } from '../../app.hooks'

export default defineComponent({
  setup () {
    const auth = useDataLayer('auth')
    const router = useRouter()
    const route = useRoute()

    const actionHandlers = {
      verifyEmail () {
        const timeout = ref(null)
        const result = reactive({
          state: 'verifying',
          message: 'Processing...'
        });

        const onVerifiedEmail = () => {
          result.state = 'verified'
          result.message = 'Email verifié !'
          timeout.value = setTimeout(() =>  {
            router.push({ name: 'inbox' })
          }, 1000)
        }

        const onError = (e) => {
          result.state = 'error'
          result.message = `
            Une erreur s'est produite lors de la verification de ton email.
            (reason: ${e.message} [${e.code}])
          `
        }

        onUnmounted(() => clearTimeout(timeout.value))
      
        auth.verifyEmail(route.query.oobCode)
            .then(onVerifiedEmail)
            .catch(onError)

        return result;
      }
    }

    const state = actionHandlers?.[route.query.mode]?.() || {
      state: 'unknown',
      message: 'This action does not exists'
    }

    return { state }
  }
})
</script>