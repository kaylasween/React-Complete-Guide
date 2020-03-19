import React, { useReducer, useState, useEffect, useCallback } from 'react'

import ErrorModal from '../UI/ErrorModal'
import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ingredient => ingredient.id !== action.id)
    default:
      throw new Error('needs to set, add, or delete')
  }
}

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, [])

  // const [ingredients, setIngredients] = useState([]) //replacing with useReducer
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  // useEffect runs after and for every render cycle
  // empty array of external dependencies as second argument causes useEffect to act like componentDidMount()
  // otherwise, when something is in the array that changes, it reruns.

  const filteredIngredientsHandler = useCallback((filteredIngs) => {
    // setIngredients(filteredIngs)
    dispatch({ type: 'SET', ingredients: filteredIngs })
  }, [])

  const addIngredientHandler = (ingredient) => {
    setLoading(true)
    fetch('https://react-hooks-58945.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setLoading(false)
      return response.json()
    }).then(responseData => {
      // setIngredients(prevIngs => [...prevIngs, { id: responseData.name, ...ingredient }])
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    })
  }

  const removeIngredientHandler = (ingredientId) => {
    setLoading(true)
    console.log(ingredientId)
    fetch(`https://react-hooks-58945.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setLoading(false)
      // setIngredients(prevIngs => prevIngs.filter(item => ingredientId !== item.id))
      dispatch({ type: 'DELETE', id: ingredientId })
    }).catch(error => {
      setError("Something went wrong! " + error.message)
      setLoading(false)
    })
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={(ingredientId) => removeIngredientHandler(ingredientId)} />
      </section>
    </div>
  )
}

export default Ingredients
