import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-orders'

import styles from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { checkValidity, updateObject } from '../../../shared/utility'

const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      label: 'Name',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    address: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      label: 'Street Address',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zip: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      label: 'Postal Code',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      label: 'Country',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email'
      },
      value: '',
      label: 'Email Address',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: ['fastest', 'cheapest']
      },
      value: 'fastest',
      validation: {},
      valid: true,
      label: 'Delivery Method'
    },
  })

  const [formValid, setFormValid] = useState(false)


  const orderHandler = (event) => {
    event.preventDefault()

    const formData = {}

    for (let formElId in orderForm) {
      formData[formElId] = orderForm[formElId].value
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    }

    props.onOrderBurger(order, props.token)
  }

  const inputChangedHandler = (event, inputId) => {

    const updatedFormElement = updateObject(orderForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputId].validation),
      touched: true
    })

    const updatedOrderForm = updateObject(orderForm, {
      [inputId]: updatedFormElement
    })

    let formIsValid = true
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid
    }

    setOrderForm(updatedOrderForm)
    setFormValid(formIsValid)
  }

  const formElements = []
  for (let key in orderForm) {
    formElements.push({
      id: key,
      config: orderForm[key]
    })
  }

  return (
    <div className={styles.contactData}>
      <h2>Enter your contact data</h2>
      {props.loading ? (
        <Spinner />
      ) : (
          <form onSubmit={orderHandler}>
            {formElements.map(formEl => (
              <Input
                key={formEl.id}
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                id={formEl.id}
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
                value={formEl.config.value}
                label={formEl.config.label}
                changed={(event) => inputChangedHandler(event, formEl.id)} />
            ))}

            <Button buttonType="cta" clicked={orderHandler} disabled={!formValid}>
              ORDER
              </Button>
          </form>
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios))
