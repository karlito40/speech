import startDataLayer from './data-layer/start-layer'
import startLogicLayer from './logic-layer/start-layer'
import startRendererLayer from './renderer-layer/start-layer'
import startDevtoolLayer from './devtool-layer/start-layer'

const dataLayer = startDataLayer()
startDevtoolLayer()
const logicLayer = startLogicLayer({ dataLayer })

startRendererLayer({ logicLayer })
