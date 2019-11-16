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
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(control => {
      return <BuildControl 
                    key={control.label} 
                    label={control.label} 
                    added={() => props.ingredientAdded(control.type)} 
                    removed={() => props.ingredientRemoved(control.type)} 
                    disabled={props.disabled[control.type]} />
    })}
    <button className={styles.orderBtn} 
            disabled={!props.purchaseable}>
              Order Now!
    </button>
  </div>
)

export default buildControls