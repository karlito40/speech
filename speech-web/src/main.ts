import startDataLayer from './data-layer/main'
import startRendererLayer from './renderer-layer/main'

startRendererLayer({
  dataLayer: startDataLayer()
})
