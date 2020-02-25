import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Layout.module.css'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerToggleHandler = () => {
    this.setState((previousState) => {
      return { showSideDrawer: !previousState.showSideDrawer }
    })
  }

  render() {
    return (
      <>
        <Toolbar isAuth={this.props.isAuthenticated} toggleSideDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer isAuth={this.props.isAuthenticated} close={this.sideDrawerToggleHandler} open={this.state.showSideDrawer} />
        <main className={styles.content}>
          {this.props.children}
        </main>
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)