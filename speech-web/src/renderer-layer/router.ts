import { createRouter, createWebHistory } from 'vue-router'
import ViewLanding from './context/ctx.landing/ViewLanding.vue'
import ViewOffline from './context/ViewOffline.vue'
import ViewOnboarding from './context/ctx.landing/ViewOnboarding.vue'
import ViewSignUp from './context/ctx.auth/ViewSignUp.vue'
import ViewSignIn from './context/ctx.auth/ViewSignIn.vue'
import ViewTopNav from './context/ViewTopNav.vue'
import InboxView from './context/ctx.inbox/VieWInbox.vue'
import ViewChatRoom from './context/ctx.game/ViewChatRoom.vue'
import ViewDiscoverProfile from './context/ctx.game/ViewDiscoverProfile.vue'
import ViewAuthCallback from './context/ctx.auth/ViewAuthCallback.vue'

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