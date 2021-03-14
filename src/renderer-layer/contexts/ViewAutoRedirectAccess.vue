<template>
  <div v-if="loading">
    hey j'etudies où je vais t'envoyer (loading anim)
    <pre>loading:{{loading}}</pre>
  </div>
  <router-view v-else />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataLayer } from '../hooks'

export default defineComponent({
  setup () {
    const auth = useDataLayer('auth')
    const router = useRouter()
    const route = useRoute()

    const { isAuthenticated, loading } = auth.authenticate()

    if (!route.meta.autoRedirectAccess) {
      console.warn(`There is no need for you to use ViewAutoRedirectAcces for that route:`, route.fullPath)
    }

    watch(isAuthenticated, () => {
      if (loading.value) return;

      if (route.meta.autoRedirectAccess === 'goto_inbox_if_authenticated' && isAuthenticated.value) {
        router.replace({ name: 'inbox' })
      } else if (route.meta.autoRedirectAccess === 'goto_signin_if_not_authenticated' && !isAuthenticated.value) {
        router.replace({ name: 'signin' })
      }
    }, { immediate: true })
    
    return {
      isAuthenticated,
      loading
    }
  }
})
</script>