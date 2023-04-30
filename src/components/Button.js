/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function Button({ options: { type = 'button', ...attributes }, onClick, children }) {
    return (
        <button
            type={type}
            {...attributes}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
