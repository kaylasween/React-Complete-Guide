import React, { Component } from 'react'

import PizzaImg from '../components/PizzaImage/PizzaImage'

class Pizza extends Component {
  render() {
    return (
      <>
        <h1>The Pizza</h1>
        <PizzaImg />
      </>
    )
  }
}

export default Pizza