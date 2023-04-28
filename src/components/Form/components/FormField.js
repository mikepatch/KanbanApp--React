/* eslint-disable react/prop-types */
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
    },
}) {
    const className =
        'border border-zinc-500 p-2 rounded-md text-white bg-transparent focus-visible:outline-blue-500 focus-visible:outline focus-visible:outline-2';

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id}>{label}</label>
            {textarea ? (
                <textarea
                    className={className}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target)}
                />
            ) : (
                <input
                    className={className}
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target)}
                />
            )}
            {errorsMessages && errorsMessages.length !== 0 && <small>{errorsMessages}</small>}
        </div>
    );
}

// FormField.propTypes = {
//     options: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         label: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         type: PropTypes.string,
//         placeholder: PropTypes.string.isRequired,
//         tagName: PropTypes.string,
//         rows: PropTypes.number,
//         errorsMessages: PropTypes.arrayOf(PropTypes.string),
//         styles: PropTypes.objectOf(PropTypes.object),
//         value: PropTypes.string,
//         onChange: PropTypes.func.isRequired,
//     }).isRequired,
// };

export default FormField;
