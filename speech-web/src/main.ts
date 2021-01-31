import startDataLayer from './app-data/main'
import startRendererLayer from './app-renderer/main'

startRendererLayer({
  dataLayer: startDataLayer()
})
