import React from 'react'

import styles from './Layout.module.css'

import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) => {
  return (
    <>
      <Toolbar />
      <SideDrawer />
      <main className={styles.content}>
        {props.children}
      </main>
    </>
  )
}

export default layout