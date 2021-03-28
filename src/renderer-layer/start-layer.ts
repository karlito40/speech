import './assets/styles/theme.css'
import { createApp } from 'vue'
// import { gsap, TextPlugin } from 'gsap/all'
import { router } from './router'
import App from './App.vue'
import * as globalComponents from './global-registry'
import { LOGIC_LAYER } from './__di__'
import { LogicLayer } from '../logic-layer/types'
// gsap.registerPlugin(TextPlugin/* SplitText */)

export default function (
  { logicLayer }: { logicLayer: LogicLayer }
) {
  const app = createApp(App)
  app.provide(LOGIC_LAYER, logicLayer)
  app.use(router)

  for (const [tag, component] of Object.entries(globalComponents)) {
    app.component(tag, component);
  }

  app.mount('#app')
  
  return app
}

