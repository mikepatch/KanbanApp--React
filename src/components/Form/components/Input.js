import React from 'react';

function Input({
    attributes: { className, id, name, placeholder, type, value },
    errorStyles,
    onChange,
}) {
    return (
        <input
            style={errorStyles && errorStyles}
            className={`${className}`}
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
}

export default Input;
