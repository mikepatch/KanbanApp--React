import React from 'react';

function Textarea({
    attributes: { className, id, name, placeholder, rows, value },
    errorStyles,
    onChange,
}) {
    return (
        <textarea
            style={errorStyles && errorStyles}
            className={`${className}`}
            id={id}
            name={name}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={onChange}
        />
    );
}

export default Textarea;
