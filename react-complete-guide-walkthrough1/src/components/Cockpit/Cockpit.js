import React, { useEffect } from 'react'
import styles from './Cockpit.module.css'

const cockpit = (props) => {
    //useState can be used instead of getDerivedState
    useEffect(() => {
        console.log('[Cockpit.js] useEffect')
        //http request...
        //componentDidMount and componentDidUpdate in one method
        setTimeout(() => {
            alert('something')
        }, 1000)
    }, []) //props.persons if we want to rerun it when persons changes

    const classes = []
    let btnClass = '';

    if(props.showPersons) {
        btnClass = styles.Red
    }

    if(props.persons.length <= 2) {
      classes.push(styles.red)
    }
    if(props.persons.length <= 1) {
      classes.push(styles.bold)
    }

    return (
        <div className={styles.Cockpit}>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is really working!</p>

            <button className={btnClass}
                onClick={props.clicked}
            >
                Toggle Persons
            </button>
        </div>
    )
}

export default cockpit