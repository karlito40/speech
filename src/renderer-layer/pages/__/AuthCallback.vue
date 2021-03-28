<template>
  <div class="AuthActionView">
    <p>{{ state.context.message }}</p>
  </div>
</template>

<script lang="ts">
import { useMachine } from '@xstate/vue'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { snakeCase } from 'lodash-es'
import { useLogicLayer } from '../../hooks'

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { AuthCallbackPage } = useLogicLayer()
    const { state, send } = useMachine(AuthCallbackPage, { 
      devTools: true,
      context: {
        query: route.query
      },
      actions: {
        redirectToInbox: () => router.push({ name: 'inbox' })
      }
    })

    send(snakeCase(route.query.mode as string).toUpperCase())

    return { state }
  }
})
</script>