import React, { useReducer, useEffect, useCallback, useMemo } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search'
import useFetch from '../../hooks/fetch'

// may be better to use a reducer in instances where you rely on previous state to set the new state.
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not get there!')
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    requestIdentifier,
    clear
  } = useFetch()


  // useEffect runs after and for every render cycle
  // empty array of external dependencies as second argument causes useEffect to act like componentDidMount()
  // otherwise, when something is in the array that changes, it reruns.

  useEffect(() => {
    if (!isLoading && !error && requestIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra })
    } else if (!isLoading && !error && requestIdentifier === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra }
      })
    }
  }, [data, reqExtra, requestIdentifier, isLoading, error])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-58945.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    )
  }, [sendRequest])

  const removeIngredientHandler = useCallback(
    ingredientId => {
      sendRequest(
        `https://react-hooks-58945.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_INGREDIENT'
      )
    },
    [sendRequest]
  )

  /* use useMemo when something is getting rerendered that doesn't need to be, especially if that function is 
      doing something a bit more computationally intensive. If it's a trivial component, it may be worth it to not 
      use it */
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    )
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  )
}

export default Ingredients
