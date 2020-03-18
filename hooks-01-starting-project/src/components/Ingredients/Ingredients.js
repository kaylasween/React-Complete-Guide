import React, { useState, useEffect, useCallback } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([])

  // runs after and for every render cycle
  useEffect(() => {
    fetch('https://react-hooks-58945.firebaseio.com/ingredients.json')
      .then(response => {
        return response.json()
      }).then(responseData => {
        const loadedIngredients = []
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }
        setIngredients(loadedIngredients)
      })
  }, []) // empty array of external dependencies as second argument causes it to act like componentDidMount()
  // otherwise, when something is in the array that changes, it reruns.

  const filteredIngredientsHandler = useCallback((filteredIngs) => {
    setIngredients(filteredIngs)
  }, [])

  const addIngredientHandler = (ingredient) => {
    fetch('https://react-hooks-58945.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setIngredients(prevIngs => [...prevIngs, { id: responseData.name, ...ingredient }])
    })
  }

  const removeIngredientHandler = (ingredientId) => {
    console.log(ingredientId)
    setIngredients(prevIngs => prevIngs.filter(item => ingredientId !== item.id))
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={(ingredientId) => removeIngredientHandler(ingredientId)} />
      </section>
    </div>
  )
}

export default Ingredients
