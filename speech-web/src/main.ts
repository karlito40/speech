import startDataLayer from './layer.data/start-layer'
import startRendererLayer from './layer.renderer/start-layer'

startRendererLayer({
  dataLayer: startDataLayer()
})
