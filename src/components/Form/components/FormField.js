/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function FormField({
    options: { id, label, type, textarea, errorsMessages, rows, onChange, ...attributes },
}) {
    const styles = {
        errorInfo: 'text-red-500 font-bold animate-pulse',
        inputErrorStyles: errorsMessages && errorsMessages.length > 0 ? { borderColor: 'red' } : {},
    };
    
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id}>{label}</label>
            {textarea ? (
                <textarea
                    style={styles.inputErrorStyles}
                    id={id}
                    rows={rows}
                    {...attributes}
                    onChange={(e) => onChange(e.target)}
                />
            ) : (
                <input
                    style={styles.inputErrorStyles}
                    id={id}
                    type={type}
                    {...attributes}
                    onChange={(e) => onChange(e.target)}
                />
            )}
            {errorsMessages && errorsMessages.length !== 0 && (
                <small className={styles.errorInfo}>{errorsMessages}</small>
            )}
        </div>
    );
}

export default FormField;
