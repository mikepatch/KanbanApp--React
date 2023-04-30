/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Input from './Input';
import Textarea from './Textarea';

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
                <Textarea
                    options={{ style: styles.inputErrorStyles, id, rows, ...attributes }}
                    onChange={(e) => onChange(e.target)}
                />
            ) : (
                <Input
                    options={{ style: styles.inputErrorStyles, id, type, ...attributes }}
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
