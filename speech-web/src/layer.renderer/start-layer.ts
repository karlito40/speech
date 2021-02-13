import './app.assets/styles/theme.css'
import { createApp, defineComponent, h, provide, watch } from 'vue'
// import { gsap, TextPlugin } from 'gsap/all'
import { router } from './router'
import App from './App.vue'
import * as globalComponents from './global-registry'
import { DataLayer } from '../shared/DataLayer.d'
import { DATA_LAYER } from './__di__'
// gsap.registerPlugin(TextPlugin/* SplitText */)

export default function (
  { dataLayer }: { dataLayer: DataLayer }
) {
  // todo: find a better way (rename, move it ?) 
  dataLayer.auth.authenticate()
 
  const app = createApp(App)
  app.provide(DATA_LAYER, dataLayer)
  app.use(router)

  for (const [tag, component] of Object.entries(globalComponents)) {
    app.component(tag, component);
  }

  app.mount('#app')
  
  return app
}

