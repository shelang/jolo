import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'

let enhancers

const composeEnhancers =
  process.env.NODE_ENN === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

enhancers = composeEnhancers(
    applyMiddleware(thunk)
)
const store = createStore(reducers, enhancers)

export default store;