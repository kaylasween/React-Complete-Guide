import React from 'react'
import styles from './Modal.module.css'

const modal = (props) => (
  <div role="dialog" className={styles.modal}>
    {props.children}
  </div>
)

export default modal