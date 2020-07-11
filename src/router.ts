import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import OfflineView from '@/views/OfflineView.vue'
import SignView from '@/views/SignView.vue'

const history = createWebHistory();

export const router = createRouter({
  history,
  strict: true,
  routes: [
    { path: '/', component: LandingView },
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