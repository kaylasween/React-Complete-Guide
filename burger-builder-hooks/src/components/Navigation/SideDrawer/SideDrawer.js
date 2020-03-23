import React from 'react'

import styles from './SideDrawer.module.css'

import Backdrop from '../../UI/Backdrop/Backdrop'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (props) => {
  let styleClasses = [styles.sideDrawer, styles.close]
  if (props.open) {
    styleClasses = [styles.sideDrawer, styles.open]
  }
  return (
    <>
      <Backdrop clicked={props.close} show={props.open} />
      <div className={styleClasses.join(' ')}>
        <Logo height="10vh" />
        <nav style={{ marginTop: '1rem' }} onClick={props.close} >
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </>
  )
}

export default sideDrawer