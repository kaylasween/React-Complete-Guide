import React, { useState } from 'react'
import './App.css'

import Person from './Person/Person'

const app = (props) => {
  // returns array with two elements and always exactly two elements.  
  // first element will always be our current state. and then the updated state.
  // the second element is always a function that lets us update that state.
  // function setPersonState doesn't merge state, it updates the state. Need to make sure you include all state data when using hooks.

  const [ personsState, setPersonsState ] = useState({
    //pass initial state
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ]
  })

  const [otherState, setOtherState ] = useState('some other value')

  console.log(personsState, otherState)

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: 'Maximilian', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }

  return (
    // lowercase elements reserved for JSX native elements.
    <div className="App">
      <h1>Hi, I'm a React App!</h1>
      <p>This is really working!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} /> 
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person>
      <Person name ={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div>
  )
  // return React.createElement('div, {className: 'App'}, React.createElement('h1', null, 'Hi, I'm a React App!'));
}

export default app


