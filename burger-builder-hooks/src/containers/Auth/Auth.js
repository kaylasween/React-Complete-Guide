import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { checkValidity, updateObject } from '../../shared/utility'

import styles from './Auth.module.css'

const auth = (props) => {
  const [controls, setControls] = useState({
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
  })
  const [isSignUp, setIsSignUp] = useState(true)

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath()
    }
  }, [])

  const inputChangedHandler = (event, controlName) => {
    const updatedAuthForm = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      })
    })

    setControls(updatedAuthForm)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onAuth(controls.email.value, controls.password.value, isSignUp)
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)
  }

  const formElements = []
  for (let key in controls) {
    formElements.push({
      id: key,
      config: controls[key]
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
      changed={(event) => inputChangedHandler(event, formElement.id)} />
  ))

  return (
    <div className={styles.auth}>
      {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
      {props.error ? (<div style={{ border: '1px solid darkred', background: 'salmon', padding: '10px' }}>{props.error.message}</div>) : null}
      <form onSubmit={submitHandler}>
        <h2>Sign in/Sign up</h2>
        {props.loading ? <Spinner /> : form}
        <Button buttonType="cta">Submit</Button>
      </form>
      {/* Temporary button to switch between sign up and sign in */}
      <Button buttonType="cancel" clicked={switchAuthModeHandler}>Switch to Sign {isSignUp ? 'in' : 'up'}</Button>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth)