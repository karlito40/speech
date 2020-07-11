import '@/assets/styles/theme.css'

import { createApp } from 'vue'
// import { gsap, TextPlugin } from 'gsap/all'
import { router } from './router'
import App from './App.vue'

// gsap.registerPlugin(TextPlugin/* SplitText */)

const app = createApp(App)

app
  .use(router)
  .mount('#app')