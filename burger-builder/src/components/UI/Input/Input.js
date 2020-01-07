import React from 'react'
import styles from './Input.module.css'

const input = props => {
  let inputElement = null

  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={styles.inputElement} onChange={props.changed} {...props.elementConfig} value={props.value} />
      break
    case ('textarea'):
      inputElement = <textarea className={styles.inputElement} onChange={props.changed} {...props.elementConfig} value={props.value} />
      break
    case ('select'):
      inputElement = (
        <select className={styles.inputElement} onChange={props.changed} value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )
      break
    default:
      inputElement = <input className={styles.inputElement} onChange={props.changed} {...props.elementConfig} value={props.value} />
  }

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input