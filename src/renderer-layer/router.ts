import { createRouter, createWebHistory } from 'vue-router'
import Landing from './pages/Landing.vue'
import Offline from './pages/Offline.vue'
import Onboarding from './pages/Onboarding.vue'
import SignUp from './pages/sign/SignUp.vue'
import SignIn from './pages/sign/SignIn.vue'
import RestrictedRoot from './pages/restricted/__Root__.vue'
import Inbox from './pages/restricted/inbox/Inbox.vue'
import Room from './pages/restricted/Room.vue'
import Discover from './pages/restricted/Discover.vue'
import AccessController from './pages/AccessController.vue' // TODO: remove
import FirebaseActionCallback from './pages/FirebaseActionCallback.vue'
import TestController from '../logic-layer/test-controller'

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
      component: AccessController,
      name: 'AccessController',
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
      name: 'firebaseActionCallback',
      component: FirebaseActionCallback
    },
    { 
      path: '/offline',
      name: 'offline',
      component: Offline 
    },
    { 
      ...TestController.route,
      props: true,
      component: async () => {
        const controller = new TestController()
        return controller.action(router.currentRoute.value.params)
      },
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