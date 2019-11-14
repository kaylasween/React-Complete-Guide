import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
    return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
      return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
    })
  })

  return (
    <div className={styles.burger}>
      <BurgerIngredient type="top-bun" />
      {transformedIngredients}
      <BurgerIngredient type="bottom-bun" />
    </div>
  )
}

export default burger