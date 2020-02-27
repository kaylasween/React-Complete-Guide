import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './containers/Auth/Auth'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Layout from './containers/Layout/Layout'
import Logout from './containers/Auth/Logout/Logout'
import Orders from './containers/Orders/Orders'
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <BrowserRouter>
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
