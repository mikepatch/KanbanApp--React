export const getInitialInputs = (fields) => {
    let initialInputs = {};
    // eslint-disable-next-line no-return-assign
    fields.forEach(({ name }) => (initialInputs = { ...initialInputs, [name]: '' }));

    return initialInputs;
};

export const areFormErrorsEmpty = (errors) =>
    Object.values(errors).every((error) => error.length === 0);

export const clearInputs = (fields, dispatchInputValues) => {
    fields.forEach(({ name }) => dispatchInputValues({ name, value: '' }));
};

export const getFormData = (fields, inputValues) => {
    const formData = {};

    fields.forEach(({ name: fieldName }) => {
        formData[fieldName] = inputValues[fieldName];
    });

    return formData;
};