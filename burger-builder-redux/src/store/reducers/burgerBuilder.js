import * as actionType from '../actions/actionTypes'

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
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
  }

  if (action.type === actionType.REMOVE_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
  }

  if (action.type === actionType.SET_INGREDIENTS) {
    return {
      ...state,
      ingredients: action.ingredients,
      error: false
    }
  }

  if (action.type === actionType.FETCH_INGREDIENTS_FAILED) {
    return {
      ...state,
      error: true
    }
  }

  return state
}

export default reducer