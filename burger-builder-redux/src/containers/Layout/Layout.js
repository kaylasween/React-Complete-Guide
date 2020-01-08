import React, { Component } from 'react'

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

  render(){
    return (
      <>
        <Toolbar toggleSideDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer close={this.sideDrawerToggleHandler} open={this.state.showSideDrawer} />
        <main className={styles.content}>
          {this.props.children}
        </main>
      </>
    )
  }
  
}

export default Layout