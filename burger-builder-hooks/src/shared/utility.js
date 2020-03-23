export const updateObject = (object, updatedProperties) => {
  return {
    ...object,
    ...updatedProperties
  }
}

export const checkValidity = (value, rules) => {
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
