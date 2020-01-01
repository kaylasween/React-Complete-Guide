import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import styles from './CheckoutSummary.module.css'

const checkoutSummary = props => (
  <div className={styles.checkoutSummary}>
    <h1>We hope it tastes good!</h1>
    <div
      style={{
        width: '100%',
        margin: 'auto'
      }}
    >
      <Burger ingredients={props.ingredients} />
    </div>
    <Button buttonType="cancel" clicked={props.checkoutCancelled}>
      CANCEL
    </Button>
    <Button buttonType="cta" clicked={props.checkoutContinue}>
      CONTINUE
    </Button>
  </div>
)

export default checkoutSummary
