import React, { useState, useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

import axios from '../../axios-orders'



const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false)

  const dispatch = useDispatch()
  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients
  })
  const price = useSelector(state => {
    return state.burgerBuilder.totalPrice
  })
  const error = useSelector(state => {
    return state.burgerBuilder.error
  })
  const isAuthenticated = useSelector(state => {
    return state.authToken !== null
  })

  const onIngredientAdded = (ingredient) => dispatch(actions.addIngredient(ingredient))
  const onIngredientRemoved = (ingredient) => dispatch(actions.removeIngredient(ingredient))
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [])
  const onInitPurchase = () => dispatch(actions.purchaseInit())
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = () => {
    const sum = Object.keys(ings)
      .map(ingredientKey => {
        return ings[ingredientKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push('/checkout')
  }

  const disabledInfo = {
    ...ings
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  let orderSummary = null

  let burger = error ? (
    <p>Ingredients can't be loaded!</p>
  ) : (
      <Spinner />
    )
  if (ings) {
    burger = (
      <>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchaseable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </>
    )
    orderSummary = (
      <OrderSummary
        purchaseCancel={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        ingredients={ings}
        price={price}
      />
    )
  }

  return (
    <>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </>
  )
}

export default withErrorHandler(burgerBuilder, axios)
