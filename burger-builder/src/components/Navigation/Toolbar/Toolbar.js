import React from 'react'
import styles from './Toolbar.module.css'

import Logo from '../../Logo/Logo'
import MenuToggle from '../../Navigation/SideDrawer/MenuToggle/MenuToggle'
import NavigationItems from '../NavigationItems/NavigationItems'
import SideDrawer from '../SideDrawer/SideDrawer'

const toolbar = (props) => (
  <header className={styles.toolbar}>
    <MenuToggle open={props.openSideDrawer} />
    <SideDrawer />
    <Logo height="80%" />
    <nav className={styles.desktop}>
      <NavigationItems />
    </nav>
  </header>
)

export default toolbar