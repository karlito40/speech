import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/renderer/views/LandingView.vue'
import OfflineView from '@/renderer/views/OfflineView.vue'
import OnboardingView from '@/renderer/views/OnboardingView.vue'
import SignView from '@/renderer/views/SignView.vue'

const history = createWebHistory();

export const router = createRouter({
  history,
  strict: true,
  routes: [
    { path: '/', component: LandingView },
    { path: '/onboard', component: OnboardingView },
    { path: '/offline', component: OfflineView },
    { path: '/sign', component: SignView },
  ]
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine && to.path !== '/offline') {
    next({ path: '/offline' })
  } else {
    next()
  }
})