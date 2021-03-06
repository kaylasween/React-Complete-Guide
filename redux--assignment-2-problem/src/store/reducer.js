const initialState = {
  persons: []
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name: action.name,
      age: action.age
    }

    return {
      ...state,
      persons: state.persons.concat(newPerson)
    }
  }
  if (action.type === 'DELETE') {
    return {
      ...state,
      persons: state.persons.filter(person => person.id !== action.id)
    }
  }
  return state
}

export default reducer