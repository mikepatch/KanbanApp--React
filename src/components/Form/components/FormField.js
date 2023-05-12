/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Input from './Input';
import Textarea from './Textarea';

import styles from './FormField.styles';

function FormField({
    options: { id, label, type, textarea, errorMessages, rows, onChange, ...attributes },
}) {
    const errorInputStyles =
        errorMessages && errorMessages.length > 0 ? { borderColor: 'red' } : {};

    return (
        <div className={styles.root}>
            <label htmlFor={id}>{label}</label>
            {textarea ? (
                <Textarea
                    options={{ style: errorInputStyles, id, rows, ...attributes }}
                    onChange={(e) => onChange(e.target)}
                />
            ) : (
                <Input
                    options={{ style: errorInputStyles, id, type, ...attributes }}
                    onChange={(e) => onChange(e.target)}
                />
            )}
            {errorMessages && errorMessages.length !== 0 && (
                <small className={styles.errorInfo}>{errorMessages}</small>
            )}
        </div>
    );
}

export default FormField;
