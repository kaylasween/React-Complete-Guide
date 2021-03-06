import React, { PureComponent } from 'react'
import Person from './Person/Person'

class PersonList extends PureComponent {
    // static getDerivedStateFromProps(props, state){
    //     console.log('[PersonList.js] get derived state from props')
    //     return state
    // }

    //also deprecated
    // componentWillReceiveProps(props) {
    //     console.log('[PersonList.js] person will receive props', props)
    // }
    
    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[PersonList.js] should component update?')
    //     return nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked
    //     //reference types (arrays and objects) are stored in memory and we're looking at a pointer to that memory location
    //     //have to be careful about this in the case of shallow comparisons
    // }

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

    componentWillUnmount() {
        console.log('[PersonList.js] component will unmount')
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