import React from 'react'
import styles from './Input.module.css'

const input = props => {
  let inputElement = null
  const inputStyles = [styles.inputElement]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={inputStyles.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value} />
      break
    case ('textarea'):
      inputElement = <textarea className={inputStyles.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value} />
      break
    case ('select'):
      inputElement = (
        <select className={inputStyles.join(' ')} onChange={props.changed} value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )
      break
    default:
      inputElement = <input className={inputStyles.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value} />
  }

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {props.invalid && props.touched && props.shouldValidate && props.id !== 'zip' ?
        <p style={{ color: 'red' }}>{props.label} is a required field!</p> : null}
      {props.invalid && props.touched && props.shouldValidate && props.id === 'zip' ?
        <p style={{ color: 'red' }}>{props.label} should be 5 digits in length!</p> : null}
    </div>
  )
}

export default input