import React from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  let ingredientSummary = Object.keys(props.ingredients).map(ingredientKey => {
    return (
        <li key={ingredientKey}>
          <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
        </li>
      )
  })
  return (
    <>
      <h2>Your Order</h2>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCancel} buttonType="cancel">CANCEL</Button>
      <Button clicked={props.purchaseContinue} buttonType="cta">CONTINUE</Button>
    </>
  )
}

export default orderSummary