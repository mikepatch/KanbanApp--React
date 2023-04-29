/* eslint-disable react/prop-types */
import React, { useReducer, useState } from 'react';
import FormField from './components/FormField';
import SuccessModal from './components/SuccessModal';
import FormValidator from '../../utilities/FormValidator';
import {
    areFormErrorsEmpty,
    clearInputs,
    getFormData,
    getInitialInputs,
} from './utilities/helpers';
import { accessibleOnClick } from '../../utilities/helpers';

const formValidator = new FormValidator();
// eslint-disable-next-line no-unused-vars
function Form({
    options: { formModalStyles, formElementStyles, formButtonStyles, title, fields },
    closeForm,
    onSubmit,
}) {
    const initialInputs = getInitialInputs(fields);
    const [formErrors, setFormErrors] = useState({});
    const [modal, setModal] = useState(false);

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

    const formFields = fields.map(({ id, name, ...settings }) => {
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
                <div>
                    <input
                        className={formButtonStyles}
                        type="submit"
                        value="save"
                    />
                </div>
            </form>
            {modal && (
                <SuccessModal
                    onClick={() => setModal(false)}
                    text={inputValues.fullName}
                />
            )}
        </aside>
    );
}

export default Form;
