import { createRouter, createWebHistory } from 'vue-router'
import ViewLanding from './contexts/ctx.landing/ViewLanding.vue'
import ViewOffline from './contexts/ViewOffline.vue'
import ViewOnboarding from './contexts/ctx.landing/ViewOnboarding.vue'
import ViewSignUp from './contexts/ctx.auth/ViewSignUp.vue'
import ViewSignIn from './contexts/ctx.auth/ViewSignIn.vue'
import ViewTopNav from './contexts/ViewTopNav.vue'
import InboxView from './contexts/ctx.inbox/VieWInbox.vue'
import ViewChatRoom from './contexts/ctx.game/ViewChatRoom.vue'
import ViewDiscoverProfile from './contexts/ctx.game/ViewDiscoverProfile.vue'
import ViewAuthCallback from './contexts/ctx.auth/ViewAuthCallback.vue'

const history = createWebHistory();

export const router = createRouter({
  history,
  strict: true,
  routes: [
    { path: '/', component: ViewLanding },
    { path: '/offline', component: ViewOffline },
    { path: '/onboarding', name: 'onboarding', component: ViewOnboarding },
    { path: '/signup', name: 'signup', component: ViewSignUp },
    { path: '/signin', name: 'signin', component: ViewSignIn },
    // __reserved firebase auth routes__
    {
      path: '/__/auth/action',
      component: ViewAuthCallback
    },
    // __protected routes__
    {
      // todo: test if the user is connected before enter 
      path: '/s',
      component: ViewTopNav,
      children: [
        { path: 'discover', name: 'discover', component: ViewDiscoverProfile },
        { path: 'inbox', name: 'inbox', component: InboxView },
        { path: 'room/:roomId', name: 'room', component: ViewChatRoom, props: true }
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