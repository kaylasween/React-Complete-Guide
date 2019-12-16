import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  addIngredientHandler = (type) => {
    const count = this.state.ingredients[type] + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = count
    
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type] 

    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
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
    this.updatePurchaseState(updatedIngredients)
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(ingredientKey => {
      return ingredients[ingredientKey]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)
    this.setState({ purchaseable: sum > 0 })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('you continue!')
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
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler} />
      </>
    )
  }
}

export default BurgerBuilder