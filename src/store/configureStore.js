import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from 'reducers/root'

const logger = createLogger({ collapsed: true })
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore)

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index')

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}