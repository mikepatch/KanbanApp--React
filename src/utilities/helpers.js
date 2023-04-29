// MOVING TASKS
export const getNewIdColumn = (currentTarget, currentIdColumn, columns) => {
    let newIdColumn = currentIdColumn;

    if (currentTarget.id === 'next' && currentIdColumn !== columns.length) {
        newIdColumn = currentIdColumn + 1;
    } else if (currentTarget.id === 'prev' && currentIdColumn !== 1) {
        newIdColumn = currentIdColumn - 1;
    }

    return newIdColumn;
};

export const findTargetColumn = (columns, newIdColumn) =>
    columns.find((column) => column.id === newIdColumn);

export const getTasksCountInColumn = (tasks, columnId) =>
    tasks.filter((task) => task.idColumn === columnId).length;

// FORMS
export const getInitialInputs = (fields) => {
    let initialInputs = {};
    // eslint-disable-next-line no-return-assign
    fields.forEach(({ name }) => (initialInputs = { ...initialInputs, [name]: '' }));

    return initialInputs;
};

export const filterKeyEscape = (handler) => (e) => e.keyCode === 27 && handler(e);

export const filterAsideElement = (handler) => (e) => e.target.tagName === 'ASIDE' && handler(e);

export const accessibleOnClick = (handler) => ({
    role: 'dialog',
    'aria-modal': true,
    tabIndex: 0,
    onKeyDown: filterKeyEscape(handler),
    onClick: filterAsideElement(handler),
});

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