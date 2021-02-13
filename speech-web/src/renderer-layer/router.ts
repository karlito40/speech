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
import ViewFirebaseAuthCallback from './contexts/ctx.auth/ViewFirebaseAuthCallback.vue'
import ViewAutoRedirectAccess from './contexts/ViewAutoRedirectAccess.vue'

const history = createWebHistory()

const restrictedRoutes = {
  // todo: test if the user is connected before enter 
  path: '/s',
  component: ViewTopNav,
  meta: { autoRedirectAccess: 'goto_signin_if_not_authenticated' },
  children: [
    { path: 'discover', name: 'discover', component: ViewDiscoverProfile },
    { path: 'inbox', name: 'inbox', component: InboxView },
    { path: 'room/:roomId', name: 'room', component: ViewChatRoom, props: true }
  ]
}

export const router = createRouter({
  history,
  strict: true,
  routes: [
    { 
      path: '/', 
      // just because i don't like the vue-router hooks options 
      // (no flexibility: cannot be anim, nightmare to maintain, etc..)
      component: ViewAutoRedirectAccess,
      meta: { autoRedirectAccess: 'goto_inbox_if_authenticated' },
      children: [
        { path: '', name:'landing', component: ViewLanding },    
        { path: 'onboarding', name: 'onboarding', component: ViewOnboarding },
        { path: 'signup', name: 'signup', component: ViewSignUp },
        { path: 'signin', name: 'signin', component: ViewSignIn },
        restrictedRoutes
      ]
    },
    // __reserved firebase auth routes__
    {
      path: '/__/auth/action',
      component: ViewFirebaseAuthCallback
    },
    { path: '/offline', component: ViewOffline }
  ]
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine && to.path !== '/offline') {
    next({ path: '/offline' })
  } else {
    next()
  }
})