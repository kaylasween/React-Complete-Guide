import React, { useEffect } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Modal.module.css'

const modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   )
  // }

  useEffect(() => {

  }, [])

  return (
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
}

export default modal
