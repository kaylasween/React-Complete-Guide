import React, { useState } from 'react';

import './AddPerson.css';

const addPerson = (props) => {
    const [name, setName] = useState()
    const [age, setAge] = useState()

    function nameChange(event) {
        setName(event.target.value)
    }
    function ageChange(event) {
        setAge(event.target.value)
    }

    return (
        <div className="AddPerson">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={nameChange} value={name} />
            <label htmlFor="age">Age</label>
            <input type="number" id="age" onChange={ageChange} value={age} />
            <button onClick={() => props.personAdded(name, age)}>Add Person</button>
        </div>
    )
};

export default addPerson;