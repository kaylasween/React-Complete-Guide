import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Person.module.css'

import Aux from '../../../hoc/Aux'
import withClass from '../../../hoc/withClass'

// stateless/presentational/dumb component. have more of these than stateful components. 

class Person extends Component {
    // const rnd = Math.random()
    // if (rnd > 0.7) {
    //     throw new Error('Something went wrong')
    // }
    render() {
        console.log('[Person.js] rendering...')
        return (
            // <div className={styles.Person}>
            //<React.Fragment>
            <> 
                {/* can pass method as props */}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </> 
            //</React.Fragment>
            // </div>
        )
    }
    
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, styles.Person)