import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import axios from 'axios'

axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com'
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/json' //default

axios.interceptors.request.use(
  requestConfig => {
    console.log(requestConfig)
    //you can edit requestConfig
    return requestConfig
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    console.log(response)
    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
