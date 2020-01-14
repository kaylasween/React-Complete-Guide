const initialState = {
  counter: 0,
  results: []
}

const reducer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    // const newState = Object.assign({}, state)
    return {
      ...state,
      counter: state.counter + 1
    }
  }
  if (action.type === 'DECREMENT') {
    return {
      ...state,
      counter: state.counter - 1
    }
  }
  if (action.type === 'ADD') {
    return {
      ...state,
      counter: state.counter + action.value
    }
  }
  if (action.type === 'SUBTRACT') {
    return {
      ...state,
      counter: state.counter - action.value
    }
  }
  if (action.type === 'STORE_RESULT') {
    return {
      ...state,
      results: state.results.concat({ value: state.counter, id: new Date() }) //don't use push() to avoid mutating the original array
    }
  }
  if (action.type === 'DELETE_RESULT') {
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