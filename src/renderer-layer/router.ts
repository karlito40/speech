import { createRouter, createWebHistory } from 'vue-router'
import Landing from './pages/Landing.vue'
import Offline from './pages/Offline.vue'
import Onboarding from './pages/Onboarding.vue'
import SignUp from './pages/SignUp.vue'
import SignIn from './pages/SignIn.vue'
import RestrictedRoot from './pages/restricted/__Root__.vue'
import Inbox from './pages/restricted/Inbox.vue'
import Room from './pages/restricted/Room.vue'
import Discover from './pages/restricted/Discover.vue'
import ViewAutoRedirectAccess from './contexts/ViewAutoRedirectAccess.vue' // TODO: remove
import FirebaseActionCallback from './pages/callbacks/FirebaseActionCallback.vue'

declare module 'vue-router' {
  interface RouteMeta {
    autoRedirectAccess?: 'goto_signin_if_not_authenticated' | 'goto_inbox_if_authenticated'
  }
}

const history = createWebHistory()

const restrictedRoutes = {
  path: '/s',
  component: RestrictedRoot,
  meta: { autoRedirectAccess: 'goto_signin_if_not_authenticated' },
  children: [
    { path: 'discover', name: 'discover', component: Discover },
    { path: 'inbox', name: 'inbox', component: Inbox },
    { path: 'room/:roomId', name: 'room', component: Room, props: true }
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
        { path: '', name: 'landing', component: Landing },    
        { path: 'onboarding', name: 'onboarding', component: Onboarding },
        { path: 'signup', name: 'signup', component: SignUp },
        { path: 'signin', name: 'signin', component: SignIn },
        restrictedRoutes
      ]
    },
    // __reserved firebase auth routes__
    {
      path: '/__/auth/action',
      component: FirebaseActionCallback
    },
    { path: '/offline', component: Offline }
  ]
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine && to.path !== '/offline') {
    next({ path: '/offline' })
  } else {
    next()
  }
})