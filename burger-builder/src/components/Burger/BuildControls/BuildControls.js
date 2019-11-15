import React from 'react'

import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Veg', type: 'veg' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
  <div className={styles.buildControls}>
    {controls.map(control => {
      return <BuildControl 
                    key={control.label} 
                    label={control.label} 
                    added={() => props.ingredientAdded(control.type)} 
                    removed={() => props.ingredientRemoved(control.type)} 
                    disabled={props.disabled[control.type]} />
    })}
  </div>
)

export default buildControls