import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  results: []
}

const deleteResult = (state, action) => {
  const newArray = state.results.filter((element) => element.id !== action.resultId)
  return updateObject(state, { results: newArray })
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.STORE_RESULT) {
    return updateObject(state, {
      results: state.results.concat({ value: action.result, id: new Date() }) //don't use push() to avoid mutating the original array
    })
  }
  if (action.type === actionTypes.DELETE_RESULT) {
    // const id = 2
    // const newArray = [...state.results]
    // newArray.splice(id, 1)

    return deleteResult(state, action)
  }
  return state
}

export default reducer