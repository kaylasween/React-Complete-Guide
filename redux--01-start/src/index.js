import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
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

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
