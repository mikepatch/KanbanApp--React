export const getInitialInputs = (fields) => {
    let initialInputs = {};
    
    fields.forEach(({ name, type, value }) => {
        if (type !== 'color') {
            initialInputs = { ...initialInputs, [name]: '' };
        } else {
            initialInputs = { ...initialInputs, [name]: value };
        }
    });

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