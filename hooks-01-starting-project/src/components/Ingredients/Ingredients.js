import React, { useReducer, useCallback } from 'react'

import ErrorModal from '../UI/ErrorModal'
import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'

// may be better to use a reducer in instances where you rely on previous state to set the new state.
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

// may also make sense when you multiple connected states.
const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPOND':
      return { ...httpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...httpState, error: null }
    default:
      throw new Error('Should be send, respond, or error')
  }
}

const Ingredients = () => {
  const [ingredients, dispatchIngs] = useReducer(ingredientReducer, [])
  const [httpState, httpDispatch] = useReducer(httpReducer, { loading: false, error: null })

  // const [ingredients, setIngredients] = useState([]) //replacing with useReducer
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState()

  // useEffect runs after and for every render cycle
  // empty array of external dependencies as second argument causes useEffect to act like componentDidMount()
  // otherwise, when something is in the array that changes, it reruns.

  const filteredIngredientsHandler = useCallback((filteredIngs) => {
    // setIngredients(filteredIngs)
    dispatchIngs({ type: 'SET', ingredients: filteredIngs })
  }, [])

  const addIngredientHandler = (ingredient) => {
    httpDispatch({ type: 'SEND' })
    // setLoading(true)
    fetch('https://react-hooks-58945.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // setLoading(false)
      httpDispatch({ type: 'RESPOND' })
      return response.json()
    }).then(responseData => {
      // setIngredients(prevIngs => [...prevIngs, { id: responseData.name, ...ingredient }])
      dispatchIngs({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    })
  }

  const removeIngredientHandler = (ingredientId) => {
    // setLoading(true)
    httpDispatch({ type: 'SEND' })
    console.log(ingredientId)
    fetch(`https://react-hooks-58945.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      // setLoading(false)
      httpDispatch({ type: 'RESPOND' })
      // setIngredients(prevIngs => prevIngs.filter(item => ingredientId !== item.id))
      dispatchIngs({ type: 'DELETE', id: ingredientId })
    }).catch(error => {
      // setError("Something went wrong! " + error.message)
      // setLoading(false)
      httpDispatch({ type: 'ERROR', errorMessage: error.message })
    })
  }

  const clearError = () => {
    // setError(null)
    httpDispatch({ type: 'CLEAR' })
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={(ingredientId) => removeIngredientHandler(ingredientId)} />
      </section>
    </div>
  )
}

export default Ingredients
