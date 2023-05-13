import React from 'react';

import Input from './Input';
import Textarea from './Textarea';

import styles from './FormField.styles';

function FormField({
    options: {
        label,
        className,
        id,
        name,
        placeholder,
        type,
        textarea,
        rows,
        value,
        onChange,
        errorMessages,
    },
}) {
    const errorInputStyles =
        errorMessages && errorMessages.length > 0 ? { borderColor: 'red' } : {};
    const attributes = {
        className,
        id,
        name,
        placeholder,
        type,
        value,
    };

    const getTextArea = () => (
        <Textarea
            attributes={attributes}
            errorStyles={errorInputStyles}
            rows={rows}
            onChange={(e) => onChange(e.target)}
        />
    );

    const getInput = () => (
        <Input
            attributes={attributes}
            errorStyles={errorInputStyles}
            onChange={(e) => onChange(e.target)}
        />
    );

    const renderInputs = () => (textarea ? getTextArea() : getInput());

    return (
        <div className={styles.root}>
            <label htmlFor={id}>{label}</label>
            {renderInputs()}
            {errorMessages && errorMessages.length !== 0 && (
                <small className={styles.errorInfo}>{errorMessages}</small>
            )}
        </div>
    );
}

export default FormField;
