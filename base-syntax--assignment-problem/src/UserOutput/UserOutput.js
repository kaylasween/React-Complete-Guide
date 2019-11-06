import React from 'react'

const userOutput = (props) => {
    const styles = {
        backgroundColor: '#07dafa',
        border: '1px solid #333',
        padding: '1rem',
        margin: '0.5rem',
        textAlign: 'center'
    }
    return (
        <p style={styles}>{props.userName}</p>
    )
}

export default userOutput