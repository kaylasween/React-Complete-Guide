import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import styles from './Auth.module.css'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email'
        },
        value: '',
        label: 'Email',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password'
        },
        value: '',
        label: 'Password',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    }
  }

  checkValidatity(value, rules) {
    let valid = true

    //could also add a check for true instead of adding empty validation to delivery methods

    if (rules.required) {
      valid = value.trim() !== '' && valid
    }
    if (rules.minLength) {
      valid = value.length >= rules.minLength && valid
    }
    if (rules.maxLength) {
      valid = value.length <= rules.maxLength && valid
    }
    return valid
  }

  inputChangedHandler = (event, controlName) => {
    const updatedAuthForm = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidatity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({ controls: updatedAuthForm })
  }

  render() {
    const formElements = []
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElements.map(formElement => (
      <Input key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        id={formElement.id}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        value={formElement.config.value}
        label={formElement.config.label}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ))
    return (
      <form className={styles.auth}>
        <h2>Sign in/Sign up</h2>
        {form}
        <Button buttonType="cta">Submit</Button>
      </form>
    )
  }
}

export default Auth