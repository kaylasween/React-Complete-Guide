import React from 'react'

import styles from './MenuToggle.module.css'

const menuToggle = (props) => (
  <div className={styles.drawerToggle} onClick={props.toggle}>
    <span className="visually-hidden">Open Menu</span>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default menuToggle