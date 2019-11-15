import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  veg: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      veg: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const count = this.state.ingredients[type] + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = count
    
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type] 

    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients })
  }

  removeIngredientHandler = (type) => {
    const count = this.state.ingredients[type] - 1
    if(!this.state.ingredients[type]){
      return
    }
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = count
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice} />
      </>
    )
  }
}

export default BurgerBuilder