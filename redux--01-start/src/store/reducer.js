import * as actionTypes from './actions'

const initialState = {
  counter: 0,
  results: []
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.INCREMENT) {
    // const newState = Object.assign({}, state)
    return {
      ...state,
      counter: state.counter + 1
    }
  }
  if (action.type === actionTypes.DECREMENT) {
    return {
      ...state,
      counter: state.counter - 1
    }
  }
  if (action.type === actionTypes.ADD) {
    return {
      ...state,
      counter: state.counter + action.value
    }
  }
  if (action.type === actionTypes.SUBTRACT) {
    return {
      ...state,
      counter: state.counter - action.value
    }
  }
  if (action.type === actionTypes.STORE_RESULT) {
    return {
      ...state,
      results: state.results.concat({ value: state.counter, id: new Date() }) //don't use push() to avoid mutating the original array
    }
  }
  if (action.type === actionTypes.DELETE_RESULT) {
    // const id = 2
    // const newArray = [...state.results]
    // newArray.splice(id, 1)

    const newArray = state.results.filter((element) => element.id !== action.resultId)
    return {
      ...state,
      results: newArray
    }
  }
  return state
}

export default reducer