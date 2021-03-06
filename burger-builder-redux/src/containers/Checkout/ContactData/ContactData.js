import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-orders'

import styles from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { checkValidity, updateObject } from '../../../shared/utility'

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    formValid: false
  }

  orderHandler = event => {
    event.preventDefault()

    const formData = {}

    for (let formElId in this.state.orderForm) {
      formData[formElId] = this.state.orderForm[formElId].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token)
  }

  inputChangedHandler = (event, inputId) => {

    const updatedFormElement = updateObject(this.state.orderForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
      touched: true
    })

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputId]: updatedFormElement
    })

    let formValid = true
    for (let inputId in updatedOrderForm) {
      formValid = updatedOrderForm[inputId].valid && formValid
    }

    this.setState({ orderForm: updatedOrderForm, formValid: formValid })
  }

  render() {
    const formElements = []
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    return (
      <div className={styles.contactData}>
        <h2>Enter your contact data</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
            <form onSubmit={this.orderHandler}>
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
                  changed={(event) => this.inputChangedHandler(event, formEl.id)} />
              ))}

              <Button buttonType="cta" clicked={this.orderHandler} disabled={!this.state.formValid}>
                ORDER
              </Button>
            </form>
          )}
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
