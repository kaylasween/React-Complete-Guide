import React from 'react'

import styles from './Layout.module.css'

import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) => {
  return (
    <>
      <Toolbar />
      <div>Toolbar, Sidebar, Backdrop</div>
      <main className={styles.content}>
        {props.children}
      </main>
    </>
  )
}

export default layout