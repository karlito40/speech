import { createRouter, createWebHistory } from 'vue-router'
import Landing from './pages/Landing.vue'
import Offline from './pages/__/Offline.vue'
import Onboarding from './pages/Onboarding.vue'
import SignUp from './pages/SignUp.vue'
import SignIn from './pages/SignIn.vue'
import __RestrictedRoot from './pages/s/__Index.vue'
import Inbox from './pages/s/Inbox/Inbox.vue'
import Room from './pages/s/Room.vue'
import Discover from './pages/s/Discover.vue'
import __Authentication__ from './pages/__Authentication__.vue' // TODO: remove
import AuthCallback from './pages/__/AuthCallback.vue'

declare module 'vue-router' {
  interface RouteMeta {
    autoRedirectAccess?: 'goto_signin_if_not_authenticated' | 'goto_inbox_if_authenticated'
  }
}

const history = createWebHistory()

const restrictedRoutes = {
  path: '/s',
  name: 'restricted',
  component: __RestrictedRoot,
  meta: { autoRedirectAccess: 'goto_signin_if_not_authenticated' },
  children: [
    { path: 'discover', name: 'discover', component: Discover },
    { path: 'inbox', name: 'inbox', component: Inbox },
    { path: 'rooms/:roomId', name: 'room', component: Room, props: true }
  ]
}

export const router = createRouter({
  history,
  strict: true,
  routes: [
    {
      path: '/', 
      component: __Authentication__,
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
      name: 'authCallback',
      component: AuthCallback
    },
    { 
      path: '/__/offline',
      name: 'offline',
      component: Offline 
    },
    /*
    { 
      ...TestController.route,
      props: true,
      component: async () => {
        const controller = new TestController()
        return controller.action(router.currentRoute.value.params)
      },
    }*/
  ]
})

router.beforeEach((to, from, next) => {
  if (!navigator.onLine && to.path !== '/offline') {
    next({ path: '/offline' })
  } else {
    next()
  }
})