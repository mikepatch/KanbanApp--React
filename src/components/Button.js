/* eslint-disable react/prop-types */
import React from 'react';

function Button({ options: { className, type, text }, onClick }) {

    return (
        <button
            className={className}
            // eslint-disable-next-line react/button-has-type
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
