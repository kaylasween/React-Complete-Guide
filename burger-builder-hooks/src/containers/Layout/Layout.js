import React, { useState } from 'react'
import { connect } from 'react-redux'

import styles from './Layout.module.css'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

const layout = (props) => {

  const [showSideDrawer, setShowSideDrawer] = useState(false)

  sideDrawerToggleHandler = () => {
    setShowSideDrawer((previousState) => {
      return { showSideDrawer: !previousState.showSideDrawer }
    })
  }

  return (
    <>
      <Toolbar isAuth={props.isAuthenticated} toggleSideDrawer={sideDrawerToggleHandler} />
      <SideDrawer isAuth={props.isAuthenticated} close={sideDrawerToggleHandler} open={showSideDrawer} />
      <main className={styles.content}>
        {props.children}
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)