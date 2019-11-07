import React from 'react'
import Radium from 'radium'
import './Person.css'

// stateless/presentational/dumb component. have more of these than stateful components. 

const person = (props) => {
    const style = {
        '@media (min-width: 500px)': {
            width: '100vw'
        }
    }

    return (
        <div className="Person" style={style}>
            {/* can pass method as props */}
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}

export default Radium(person)