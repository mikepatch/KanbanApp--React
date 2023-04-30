import React, { useReducer, useState } from 'react';
import FocusTrap from 'focus-trap-react';

import FormField from './components/FormField';
import Button from '../Button';

import {
    areFormErrorsEmpty,
    clearInputs,
    getFormData,
    getInitialInputs,
} from './utilities/helpers';
import FormValidator from './utilities/FormValidator';
import { accessibleOnClick } from '../../utilities/helpers';

function Form({
    options: { formModalStyles, formElementStyles, formButtonStyles, title, fields },
    closeForm,
    onSubmit,
}) {
    const formValidator = new FormValidator();
    const initialInputs = getInitialInputs(fields);
    const [formErrors, setFormErrors] = useState({});

    const changeHandler = (inputValues, { name, value }) => {
        setFormErrors({ ...formErrors, [name]: null });
        return { ...inputValues, [name]: value };
    };

    const [inputValues, dispatchInputValues] = useReducer(changeHandler, initialInputs);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const errors = formValidator.validate(form, fields);

        if (areFormErrorsEmpty(errors)) {
            onSubmit(getFormData(fields, inputValues));
            clearInputs(fields, dispatchInputValues);
            closeForm();
        } else {
            setFormErrors(errors);
        }
    };

    const formFields = fields.map(({ id, name, errorMessage, ...settings }) => {
        const options = {
            id,
            name,
            ...settings,
            errorsMessages: formErrors[name] && formErrors[name] !== 0 && formErrors[name],
            value: inputValues[name],
            onChange: dispatchInputValues,
        };
        return (
            <FormField
                key={id}
                options={options}
            />
        );
    });

    return (
        <FocusTrap>
            <aside
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...accessibleOnClick(closeForm)}
                className={formModalStyles}
            >
                <form
                    noValidate
                    className={formElementStyles}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <h2>{title}</h2>
                    {formFields}
                    <Button options={{ type: 'submit', className: formButtonStyles }}>Save</Button>
                </form>
            </aside>
        </FocusTrap>
    );
}

export default Form;
