import React, { Component } from 'react'
import Person from './Person/Person'

class PersonList extends Component {
    // static getDerivedStateFromProps(props, state){
    //     console.log('[PersonList.js] get derived state from props')
    //     return state
    // }

    //also deprecated
    // componentWillReceiveProps(props) {
    //     console.log('[PersonList.js] person will receive props', props)
    // }
    
    shouldComponentUpdate(nextProps, nextState){
        console.log('[PersonList.js] should component update?')
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[PersonList.js] get snapshot before update')
        return {message: 'Snapshot!'}
    }

    //component will update also deprecated because you never really needed it
    // componentWillUpdate() {

    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[PersonList.js] component did update')
        console.log(snapshot)
    }

    render() {
        console.log('[PersonList.js] rendering...')
        return (this.props.persons.map((person, index) => { 
            return (
                // <ErrorBoundary key={person.id}>
                <Person 
                        key={person.id} 
                        name={person.name} 
                        age={person.age} 
                        click={() => this.props.clicked(index)}
                        changed={(event) => this.props.changed(event, person.id)} />
                //</ErrorBoundary>
            )
      }))
    }
    
}


export default PersonList