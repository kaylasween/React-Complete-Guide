import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Blog from './containers/Blog/Blog'

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        {/* basename="/" is the default, and doesn't need to be set, but would need to be set if 
        serving app from sub directory (basename="my-app") */}
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
