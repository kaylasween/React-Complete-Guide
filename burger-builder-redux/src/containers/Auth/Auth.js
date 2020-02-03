import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

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
        elementType={formEl.config.elementType}
        elementConfig={formEl.config.elementConfig}
        id={formEl.id}
        invalid={!formEl.config.valid}
        shouldValidate={formEl.config.validation}
        touched={formEl.config.touched}
        value={formEl.config.value}
        label={formEl.config.label}
        changed={(event) => this.inputChangedHandler(event, formEl.id)} />
    ))
    return (
      <form>
        {form}
        <Button buttonType="cta">Submit</Button>
      </form>
    )
  }
}

export default Auth