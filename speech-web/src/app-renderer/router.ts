import { createRouter, createWebHistory } from 'vue-router'
import LandingView from './scenes/public/LandingView.vue'
import OfflineView from './scenes/public/OfflineView.vue'
import OnboardingView from './scenes/public/OnboardingView.vue'
import SignUpView from './scenes/public/SignUpView.vue'
import SignInView from './scenes/public/SignInView.vue'
import NavView from './scenes/protected/NavView.vue'
import InboxView from './scenes/protected/Inbox/InboxView.vue'
import RoomView from './scenes/protected/RoomView.vue'
import DiscoverView from './scenes/protected/DiscoverView.vue'
import AuthActionView from './scenes/callbacks/AuthActionView.vue'

const history = createWebHistory();

export const router = createRouter({
  history,
  strict: true,
  routes: [
    { path: '/', component: LandingView },
    { path: '/offline', component: OfflineView },
    { path: '/onboarding', name: 'onboarding', component: OnboardingView },
    { path: '/signup', name: 'signup', component: SignUpView },
    { path: '/signin', name: 'signin', component: SignInView },
    // __reserved firebase auth routes__
    {
      path: '/__/auth/action',
      component: AuthActionView
    },
    // __protected routes__
    {
      // todo: test if the user is connected before enter 
      path: '/s',
      component: NavView,
      children: [
        { path: 'discover', name: 'discover', component: DiscoverView },
        { path: 'inbox', name: 'inbox', component: InboxView },
        { path: 'room/:roomId', name: 'room', component: RoomView, props: true }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine && to.path !== '/offline') {
    next({ path: '/offline' })
  } else {
    next()
  }
})