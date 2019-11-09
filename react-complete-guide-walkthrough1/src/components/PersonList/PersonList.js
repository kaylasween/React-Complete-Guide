import React from 'react'
import Person from './Person/Person'

const personList = (props) => {
    console.log('[PersonList.js] rendering...')
    return (props.persons.map((person, index) => { 
        return (
            // <ErrorBoundary key={person.id}>
            <Person 
                    key={person.id} 
                    name={person.name} 
                    age={person.age} 
                    click={() => props.clicked(index)}
                    changed={(event) => props.changed(event, person.id)} />
            //</ErrorBoundary>
        )
  }))
}


export default personList