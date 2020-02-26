import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

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
    },
    isSignUp: true
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

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
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
      <div className={styles.auth}>
        {this.props.isAuthenticated && <Redirect to="/" />}
        {this.props.error ? (<div style={{ border: '1px solid darkred', background: 'salmon', padding: '10px' }}>{this.props.error.message}</div>) : null}
        <form onSubmit={this.submitHandler}>
          <h2>Sign in/Sign up</h2>
          {this.props.loading ? <Spinner /> : form}
          <Button buttonType="cta">Submit</Button>
        </form>
        {/* Temporary button to switch between sign up and sign in */}
        <Button buttonType="cancel" clicked={this.switchAuthModeHandler}>Switch to Sign {this.state.isSignUp ? 'in' : 'up'}</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)