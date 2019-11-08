import React, { Component } from 'react'
import styles from './App.module.css'

import Cockpit from '../components/Cockpit/Cockpit'
import PersonList from '../components/PersonList/PersonList'
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary'


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

    if (this.state.showPersons) {
      persons = (
        <PersonList 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
      )

      
    }
    return (
      // lowercase elements reserved for JSX native elements.
        <div className={styles.App}>
          <Cockpit 
              showPersons={this.state.showPersons}
              persons={this.state.persons}
              clicked={this.togglePersonsHandler} />
          {persons}
        </div>
    )
    // return React.createElement('div, {className: 'App'}, React.createElement('h1', null, 'Hi, I'm a React App!'));
  }
}

export default App
