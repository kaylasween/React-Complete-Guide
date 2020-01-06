import React, { Component } from 'react'
import axios from '../../../axios-orders'

import styles from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = event => {
    event.preventDefault()
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Kayla',
        address: '123 Test Street',
        zip: '12345',
        country: 'USA'
      },
      email: 'test@test.com',
      deliveryMethod: 'fastest'
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

  render() {
    return (
      <div className={styles.contactData}>
        <h2>Enter your contact data</h2>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" />
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
            <label htmlFor="address">Street Address</label>
            <input id="address" type="text" />
            <label htmlFor="zip">Postal Code</label>
            <input id="zip" type="text" />
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
