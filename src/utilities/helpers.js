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
export const filterKeyEscape = (handler) => (e) => e.keyCode === 27 && handler(e);

export const filterAsideElement = (handler) => (e) => e.target.tagName === 'ASIDE' && handler(e);

export const accessibleOnClick = (handler) => ({
    role: 'button',
    tabIndex: 0,
    onKeyDown: filterKeyEscape(handler),
    onClick: filterAsideElement(handler),
});
