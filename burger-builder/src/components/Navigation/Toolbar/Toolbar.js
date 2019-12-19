import React from 'react'
import styles from './Toolbar.module.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import SideDrawer from '../SideDrawer/SideDrawer'

const toolbar = (props) => (
  <header className={styles.toolbar}>
    <SideDrawer />
    <Logo height="80%" />
    <nav>
      <NavigationItems />
    </nav>
  </header>
)

export default toolbar