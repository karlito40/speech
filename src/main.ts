import startDataLayer from './data-layer/start-layer'
import startRendererLayer from './renderer-layer/start-layer'

startRendererLayer({
  dataLayer: startDataLayer()
})
