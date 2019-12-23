import React, { Component } from 'react'

import styles from './Layout.module.css'

import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Toolbar from '../Navigation/Toolbar/Toolbar'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true })
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  render(){
    return (
      <>
        <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
        <SideDrawer close={this.sideDrawerCloseHandler} open={this.state.showSideDrawer} />
        <main className={styles.content}>
          {this.props.children}
        </main>
      </>
    )
  }
  
}

export default Layout