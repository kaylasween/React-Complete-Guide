import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  return (
    <div className={styles.burger}>
      <BurgerIngredient type="top-bun" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bottom-bun" />
    </div>
  )
}

export default burger