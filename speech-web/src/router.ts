import { createRouter, createWebHistory } from 'vue-router'
import LandingView from './renderer/views/public/LandingView.vue'
import OfflineView from './renderer/views/public/OfflineView.vue'
import OnboardingView from './renderer/views/public/OnboardingView.vue'
import SignUpView from './renderer/views/public/SignUpView.vue'
import SignInView from './renderer/views/public/SignInView.vue'
import MainFrame from './renderer/views/private/MainFrame.vue'
import InboxView from './renderer/views/private/InboxView.vue'
import RoomView from './renderer/views/private/RoomView.vue'
import DiscoverView from './renderer/views/private/DiscoverView.vue'

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
      component: MainFrame,
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