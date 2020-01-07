import React, { Component } from 'react'
import axios from '../../../axios-orders'

import styles from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: '',
        label: 'Name'
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: '',
        label: 'Street Address'
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: '',
        label: 'Postal Code'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: '',
        label: 'Country'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email'
        },
        value: '',
        label: 'Email Address'
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: ['fastest', 'cheapest']
        },
        value: '',
        label: 'Delivery Method'
      },
    },
    loading: false
  }

  orderHandler = event => {
    event.preventDefault()
    this.setState({ loading: true })

    const formData = {}

    for (let formElId in this.state.orderForm) {
      formData[formElId] = this.state.orderForm[formElId].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }

    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loading: false })
      })
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    }
    updatedFormElement.value = event.target.value
    updatedOrderForm[inputId] = updatedFormElement
    this.setState({ orderForm: updatedOrderForm })
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
        {this.state.loading ? (
          <Spinner />
        ) : (
            <form onSubmit={this.orderHandler}>
              {formElements.map(formEl => (
                <Input
                  key={formEl.id}
                  elementType={formEl.config.elementType}
                  elementConfig={formEl.config.elementConfig}
                  id={formEl.id}
                  value={formEl.config.value}
                  label={formEl.config.label}
                  changed={(event) => this.inputChangedHandler(event, formEl.id)} />
              ))}

              <Button buttonType="cta" clicked={this.orderHandler}>
                ORDER
            </Button>
            </form>
          )}
      </div>
    )
  }
}

export default ContactData
