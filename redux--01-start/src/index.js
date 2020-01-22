import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import counterReducer from './store/reducers/counter'
import resultReducer from './store/reducers/result'
import registerServiceWorker from './registerServiceWorker'

const rootReducer = combineReducers({
  counter: counterReducer,
  results: resultReducer
})

const logger = (store) => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching ' + action)
      const result = next(action)
      console.log('[Middleware] next state ' + store.getState())
      return result
    }
  }
}

const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
