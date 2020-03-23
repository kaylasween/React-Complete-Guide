import React, { } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const checkout = (props) => {

  checkoutCancelledHandler = () => {
    props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  return (
    <>
      {props.ings && props.purchased ? <Redirect to="/" /> : null}
      {props.ings ? (
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
      ) : <Redirect to="/" />}
      <Route
        path={props.match.path + '/contact-data'}
        component={ContactData}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout)
