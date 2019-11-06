import React, { Component } from 'react'
import './App.css'

import Person from './Person/Person'


// stateful, smart, container components. only few of these. clearer where changes should happen.

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    someOtherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '0.5rem'
    }

    return (
      // lowercase elements reserved for JSX native elements.
      <div className="App">
        <h1>Hi, I'm a React App!</h1>
        <p>This is really working!</p>
        {/* two ways to call switchNameHandler here */}
        <button 
          onClick={() => this.switchNameHandler('Maximilian')}
          style={style}
        >
          Switch Name
        </button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} /> 
          {/* and here */}
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangedHandler}
        >
            My Hobbies: Racing
          </Person>
        <Person 
          name ={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    )
    // return React.createElement('div, {className: 'App'}, React.createElement('h1', null, 'Hi, I'm a React App!'));
  }
}

export default App
