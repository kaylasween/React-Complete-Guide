import React from 'react'
import styles from './Toolbar.module.css'

import Logo from '../../Logo/Logo'
import MenuToggle from '../../Navigation/SideDrawer/MenuToggle/MenuToggle'
import NavigationItems from '../NavigationItems/NavigationItems'
import SideDrawer from '../SideDrawer/SideDrawer'

const toolbar = (props) => (
  <header className={styles.toolbar}>
    <MenuToggle toggle={props.toggleSideDrawer} />
    <SideDrawer />
    <Logo height="80%" />
    <nav className={styles.desktop}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
)

export default toolbar