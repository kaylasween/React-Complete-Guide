import * as actionType from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}


const INGREDIENT_PRICES = {
  veg: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const reducer = (state = initialState, action) => {
  if (action.type === actionType.ADD_INGREDIENT) {
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 })
    return updateObject(state, {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    })
  }

  if (action.type === actionType.REMOVE_INGREDIENT) {
    //can also break it up over more lines.
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
  }

  if (action.type === actionType.SET_INGREDIENTS) {
    return updateObject(state, {
      ingredients: {
        veg: action.ingredients.veg,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
      },
      totalPrice: initialState.totalPrice,
      error: false
    })
  }

  if (action.type === actionType.FETCH_INGREDIENTS_FAILED) {
    return updateObject(state, { error: true })
  }

  return state
}

export default reducer