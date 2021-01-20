import { createRouter, createWebHistory } from 'vue-router'
import LandingView from './renderer/views/LandingView.vue'
import OfflineView from './renderer/views/OfflineView.vue'
import OnboardingView from './renderer/views/OnboardingView.vue'
import SignUpView from './renderer/views/SignUpView.vue'
import SignInView from './renderer/views/SignInView.vue'

const history = createWebHistory();

export const router = createRouter({
  history,
  strict: true,
  routes: [
    { path: '/', component: LandingView },
    { path: '/onboarding', component: OnboardingView },
    { path: '/offline', component: OfflineView },
    { path: '/signup', component: SignUpView },
    { path: '/signin', component: SignInView },
  ]
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine && to.path !== '/offline') {
    next({ path: '/offline' })
  } else {
    next()
  }
})