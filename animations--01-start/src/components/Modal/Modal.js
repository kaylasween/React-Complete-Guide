import React from 'react';

import './Modal.css';

const modal = (props) => {
    const styles = [
        'Modal',
        props.show === 'entering'
            ? 'modalOpen'
            : props.show === 'exiting' ? 'modalClosed' : null
    ]
    return (
        <div className={styles.join(' ')}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
    )
};

export default modal;