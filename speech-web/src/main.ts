// la logique voudrez que toute cette logique soit placée dans renderer/
// mais je reflechis encore à des trucs. 
import './renderer/assets/styles/theme.css'
import { createApp } from 'vue'
import { VuelidatePlugin } from '@vuelidate/core'
// import { gsap, TextPlugin } from 'gsap/all'
import { router } from './router'
import App from './renderer/App.vue'
import * as globalComponents from './renderer/global-registry'

// gsap.registerPlugin(TextPlugin/* SplitText */)

const app = createApp(App)

app
  .use(router)
  .use(VuelidatePlugin)

for (const [tag, component] of Object.entries(globalComponents)) {
  app.component(tag, component);
}

app.mount('#app')

