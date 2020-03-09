import React from 'react'
import styles from './PizzaImage.css'
import PizzaImage from '../../assets/pizza.jpg'

const pizzaImg = (props) => (
  <div className={styles.pizzaImage}>
    <img src={PizzaImage} className={styles.pizza} />
  </div>
)

export default pizzaImg