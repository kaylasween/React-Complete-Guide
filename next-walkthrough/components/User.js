import React from 'react'

const user = (props) => (
  <div>
    <h1>{props.name}</h1>
    <p>Age: {props.age}</p>
    <style jsx>{`
      div {
        border: 1px solid #ccc;
        padding: 1rem;
      }
    `}</style>
  </div>
)

export default user