/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function Input({ options: { style, id, type, ...attributes }, onChange }) {
    return (
        <input
            style={style && style}
            id={id}
            type={type}
            {...attributes}
            onChange={onChange}
        />
    );
}

export default Input;
