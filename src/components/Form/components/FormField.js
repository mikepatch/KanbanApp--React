import React from 'react';

function FormField({
    options: {
        id,
        label,
        name,
        type,
        placeholder,
        textarea,
        errorsMessages,
        value,
        onChange,
        rows,
        styles,
    },
}) {
    const errorStyles = errorsMessages && errorsMessages.length > 0 ? { borderColor: 'red' } : {};

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id}>{label}</label>
            {textarea ? (
                <textarea
                    className={styles}
                    style={errorStyles}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target)}
                />
            ) : (
                <input
                    className={styles}
                    style={errorStyles}
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target)}
                />
            )}
            {errorsMessages && errorsMessages.length !== 0 && (
                <small className="text-red-500 font-bold">{errorsMessages}</small>
            )}
        </div>
    );
}

export default FormField;
