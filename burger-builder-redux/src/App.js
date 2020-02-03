import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Auth from './containers/Auth/Auth'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Layout from './containers/Layout/Layout'
import Orders from './containers/Orders/Orders'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
