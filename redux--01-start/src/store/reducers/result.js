import * as actionTypes from '../actions/actions'

const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.STORE_RESULT) {
    return {
      ...state,
      results: state.results.concat({ value: action.result, id: new Date() }) //don't use push() to avoid mutating the original array
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