<template>
  <div v-if="state.matches('authenticate_datasource.observe.loading')">
    hey j'etudie tes droits (loading anim)...
  </div>
  <router-view v-else />
</template>

<script lang="ts">
import { useMachine } from '@xstate/vue'
import { computed, defineComponent, inject, provide, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLogicLayer } from '../hooks'

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { Authentication } = useLogicLayer()
    const { state } = useMachine(Authentication, { devTools: true })
    // todo: type machine
    provide('me', computed(() => (state.value.context as any).me))

    watchEffect(() => {
      if (
        route.meta.autoRedirectAccess === 'goto_inbox_if_authenticated' 
        && state.value.matches('identity.authenticated')
      ) {
        router.replace({ name: 'inbox' })
      } else if (
        route.meta.autoRedirectAccess === 'goto_signin_if_not_authenticated' 
        && state.value.matches('identity.unauthenticated')
      ) {
        console.log('goto signin')
        router.replace({ name: 'signin' })
      }
    })
    
    return { state }
  }
})
</script>