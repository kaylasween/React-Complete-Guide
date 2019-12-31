import React, { Component } from 'react'

class Course extends Component {
  render() {
    let course = null
    if (this.props.match.params.id) {
      course = (
        <div>
          <h1>{this.props.match.params.title}</h1>
          <p>You selected the Course with ID: {this.props.match.params.id}</p>
        </div>
      )
    }
    return course
  }
}

export default Course
