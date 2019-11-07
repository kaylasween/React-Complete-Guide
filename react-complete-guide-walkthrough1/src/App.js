import React, { Component } from 'react'
import styles from './App.module.css'

import Person from './Person/Person'


// stateful, smart, container components. only few of these. clearer where changes should happen.

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Manu', age: 29 },
      { id: 3, name: 'Stephanie', age: 26 }
    ],
    someOtherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    //const person = Object.assign({}, this.state.persons[personIndex]) can also be done

    person.name = event.target.value

    const persons = [...this.state.persons]

    persons[personIndex] = person

    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({ showPersons: !doesShow })
  }

  deletePersonHandler = (personIndex) => {
    //so we can copy without issues and without changing the original object, we add slice. Always update state in an immutable fashion.
    // const persons = this.state.persons.slice()
    //also can use the spread operator
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({ persons: persons })
  }

  render() {
    let persons = null
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => { 
            return <Person 
                      key={person.id} 
                      name={person.name} 
                      age={person.age} 
                      click={() => this.deletePersonHandler(index)}
                      changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div> 
      )

      btnClass = styles.Red
    }

    const classes = []
    
    if(this.state.persons.length <= 2) {
      classes.push(styles.red)
    }
    if(this.state.persons.length <= 1) {
      classes.push(styles.bold)
    }
    

    return (
      // lowercase elements reserved for JSX native elements.
        <div className={styles.App}>
          <h1>Hi, I'm a React App!</h1>
          <p className={classes.join(' ')}>This is really working!</p>

          <button className={btnClass}
            onClick={() => this.togglePersonsHandler()}
          >
            Toggle Persons
          </button>
          {persons}
        </div>
    )
    // return React.createElement('div, {className: 'App'}, React.createElement('h1', null, 'Hi, I'm a React App!'));
  }
}

export default App
