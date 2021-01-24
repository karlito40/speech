import { createRouter, createWebHistory } from 'vue-router'
import LandingView from './renderer/scenes/public/LandingView.vue'
import OfflineView from './renderer/scenes/public/OfflineView.vue'
import OnboardingView from './renderer/scenes/public/OnboardingView.vue'
import SignUpView from './renderer/scenes/public/SignUpView.vue'
import SignInView from './renderer/scenes/public/SignInView.vue'
import NavView from './renderer/scenes/protected/NavView.vue'
import InboxView from './renderer/scenes/protected/Inbox/InboxView.vue'
import RoomView from './renderer/scenes/protected/RoomView.vue'
import DiscoverView from './renderer/scenes/protected/DiscoverView.vue'

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