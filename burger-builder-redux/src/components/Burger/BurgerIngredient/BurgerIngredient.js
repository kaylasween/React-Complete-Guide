import React from 'react'
import PropTypes from 'prop-types'

import styles from './BurgerIngredient.module.css'

const burgerIngredient = (props) => {
  let ingredient = null

  switch (props.type) {
    case ('bottom-bun'): 
      ingredient = <div className={styles.bottomBun}></div>
      break
    case('top-bun'): 
      ingredient = (
        <div className={styles.topBun}>
          <div className={styles.seeds1}></div>
          <div className={styles.seeds2}></div>
        </div>
      )
      break
    case('meat'):
      ingredient = <div className={styles.meat}></div>
      break
    case('cheese'):
      ingredient = <div className={styles.cheese}></div>
      break
    case('veg'):
      ingredient = <div className={styles.veg}></div>
      break
    case('bacon'):
      ingredient = <div className={styles.bacon}></div>
      break
    default:
      ingredient = null
  }
  return ingredient
}

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default burgerIngredient