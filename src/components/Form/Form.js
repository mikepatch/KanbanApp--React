/* eslint-disable react/prop-types */
import React, { useReducer, useState } from 'react';
import FormField from './components/FormField';
import SuccessModal from './components/SuccessModal';
import FormValidator from '../../utilities/FormValidator';
import { accessibleOnClick } from '../../utilities/helpers';

const formValidator = new FormValidator();
// eslint-disable-next-line no-unused-vars
function Form({ options: { className, title, fields }, closeForm, onSubmit }) {
    let initialInputs = {};
    // eslint-disable-next-line no-return-assign
    fields.forEach(({ name }) => (initialInputs = { ...initialInputs, [name]: '' }));
    const [formErrors, setFormErrors] = useState({});
    const [modal, setModal] = useState(false);

    const changeHandler = (inputValues, { name, value }) => {
        setFormErrors({ ...formErrors, [name]: null });
        return { ...inputValues, [name]: value };
    };

    const [inputValues, dispatchInputValues] = useReducer(changeHandler, initialInputs);
    console.log(inputValues);
    const areFormErrorsEmpty = (errors) =>
        Object.values(errors).every((error) => error.length === 0);

    const clearInputs = () => {
        fields.forEach(({ name }) => dispatchInputValues({ name, value: '' }));
    };

    const getFormData = () => {
        const formData = {};

        fields.forEach(({ name: fieldName }) => {
            formData[fieldName] = inputValues[fieldName];
        });

        return formData;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const errors = formValidator.validate(form, fields);

        if (areFormErrorsEmpty(errors)) {
            onSubmit(getFormData());
            clearInputs();
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
            className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50"
        >
            <form
                noValidate
                className="flex flex-col gap-6 py-10 px-10 bg-zinc-600 drop-shadow-sm rounded-md w-11/12 max-w-md"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h2>{title}</h2>
                {formFields}
                <div>
                    <input
                        className="bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-full ease-in-out duration-100 cursor-pointer w-full"
                        type="submit"
                        value="Save"
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
