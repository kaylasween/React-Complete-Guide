import React, { useEffect } from 'react'
import styles from './Cockpit.module.css'

const cockpit = (props) => {
    //useState can be used instead of getDerivedStateFromProps
    useEffect(() => {
        console.log('[Cockpit.js] useEffect')
        //http request...
        //componentDidMount and componentDidUpdate in one method
        const timer = setTimeout(() => {
            alert('something')
        }, 1000)
        return () => {
            //runs before main useEffect function runs, and after the first render cycle.
            console.log('[Cockpit.js] cleanup work in useEffect')
            clearTimeout(timer)
        }
    }, []) //props.persons if we want to rerun it when persons changes empty array means it only runs the first time
    //if you wanted component did mount you could just use useEffect with empty array as second argument.

    useEffect(() => {
        console.log('[Cockpit.js] second useEffect')
        return () => {
            //runs before main useEffect function runs, and after the first render cycle.
            console.log('[Cockpit.js] cleanup work in second useEffect')
        }
    })

    const classes = []
    let btnClass = '';

    if(props.showPersons) {
        btnClass = styles.Red
    }

    if(props.personsLength <= 2) {
      classes.push(styles.red)
    }
    if(props.personsLength <= 1) {
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

export default React.memo(cockpit) //wrap with React.memo() if this functional component may not need update with every render