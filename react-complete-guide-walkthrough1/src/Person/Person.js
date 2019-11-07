import React from 'react'
import styles from './Person.module.css'

// stateless/presentational/dumb component. have more of these than stateful components. 

const person = (props) => {
    const rnd = Math.random()
    if (rnd > 0.7) {
        throw new Error('Something went wrong')
    }
    return (
        <div className={styles.Person}>
            {/* can pass method as props */}
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}

export default person