import React from 'react';

import './Modal.css';

const modal = (props) => {
    const styles = ['Modal', props.show ? 'modalOpen' : 'modalClosed']
    return (
        <div className={styles.join(' ')}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
    )
};

export default modal;