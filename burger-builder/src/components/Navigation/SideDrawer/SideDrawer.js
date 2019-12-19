import React from 'react'

import styles from './SideDrawer.module.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (props) => {
  return (
    <div className={styles.sideDrawer}>
      <Logo height="10vh" />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  )
}

export default sideDrawer