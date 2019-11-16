import React from 'react'

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
    </>
  )
}

export default orderSummary