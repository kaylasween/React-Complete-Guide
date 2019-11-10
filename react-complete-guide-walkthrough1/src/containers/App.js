import React, { Component } from 'react'
import styles from './App.module.css'

import AuthContext from '../context/auth-context'
import Aux from '../hoc/Aux'
import Cockpit from '../components/Cockpit/Cockpit'
import PersonList from '../components/PersonList/PersonList'
import withClass from '../hoc/withClass'
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary'


// stateful, smart, container components. only few of these. clearer where changes should happen.

class App extends Component {

  constructor(props){
    super(props)
    //this.state can be initialized in here too.
    console.log('[App.js] inside constructor')
  }

  state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Manu', age: 29 },
      { id: 3, name: 'Stephanie', age: 26 }
    ],
    someOtherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0, 
    authenticated: false
  }

  static getDerivedStateFromProps(props,state){
    console.log('[App.js] get derived state. ', props)
    return state
  }

  //deprecated and will be removed at some point
  // componentWillMount() {
  //   console.log('[App.js] component will mount...')
  // }

  componentDidMount() {
    console.log('[App.js] component did mount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] should component update')
    return true
  }

  //like fetching new data from server
  componentDidUpdate() {
    console.log('[App.js] component did update')
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

    this.setState((prevState, props) => {
      return { 
        persons: persons,
        changeCounter: this.state.changeCounter //setState this way when you depend on the old state
      }
    })
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

  loginHandler= () => {
    this.setState({ authenticated: true })
  }

  render() {
    console.log('[App.js] render')
    let persons = null

    if (this.state.showPersons) {
      persons = (
        <PersonList 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated} />
      )
    }
    return (
      // lowercase elements reserved for JSX native elements.
        <Aux>
          <button onClick={() => {this.setState({ showCockpit: false })}}>Remove Cockpit</button>
          <AuthContext.Provider 
              value={{ 
                authenticated: this.state.authenticated, 
                login: this.loginHandler 
              }}>
            { this.state.showCockpit ? <Cockpit 
                title={this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}  /> : null }
            {persons}
          </AuthContext.Provider>
        </Aux>
    )
    // return React.createElement('div, {className: 'App'}, React.createElement('h1', null, 'Hi, I'm a React App!'));
  }
}

export default withClass(App, styles.App)
