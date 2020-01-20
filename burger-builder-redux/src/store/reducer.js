import * as actionType from './actions'

const initialState = {
  ingredients: {
    veg: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
}

const reducer = (state = initialState, action) => {
  if (action.type === actionType.ADD_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      }
    }
  }
  if (action.type === actionType.REMOVE_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      }
    }
  }
  return state
}

export default reducer