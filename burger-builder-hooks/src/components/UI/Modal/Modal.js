import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Modal.module.css'

const modal = (props) => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      role="dialog"
      className={styles.modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </>
)

//React.memo, in this instance, replaces componentShouldUpdate
export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children)
