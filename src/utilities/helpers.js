export const getInitialState = (storageSource, initialSource) => {
    const storedData = storageSource || initialSource;

    return storedData;
};

// Managing columns & tasks
export const getArrayWithNewData = (array, newData) => [...array, newData];

export const getArrayWithoutSpecifiedItem = (array, idToRemove) =>
    array.filter((item) => item.id !== idToRemove);

export const getNewStateItems = (stateItems, [idToUpdate, propertiesToChange]) =>
    stateItems.map((item) => (item.id === idToUpdate ? { ...item, ...propertiesToChange } : item));

export const changeState = (setState, items) => setState(() => items);

// Moving tasks
const findTargetColumn = (columns, newIdColumn) =>
    columns.find((column) => column.id === newIdColumn);

export const getTasksCountInColumn = (tasks, columnId) =>
    tasks.filter((task) => task.idColumn === columnId).length;

export const isColumnFull = ({ columns, tasks }, columnId) => {
    const targetColumn = findTargetColumn(columns, columnId);
    const tasksInTargetColumn = getTasksCountInColumn(tasks, columnId);

    if (tasksInTargetColumn < targetColumn.limit) {
        return false;
    }

    return true;
};

export const findCurrentColumnIndex = (columns, idColumn) =>
    columns.findIndex((column) => column.id === idColumn);

export const findPrevColumnId = (columns, idColumn) => {
    const currentColumnIndex = findCurrentColumnIndex(columns, idColumn);
    const prevColumn = columns[currentColumnIndex - 1];

    return prevColumn && prevColumn.id;
};

export const findNextColumnId = (columns, idColumn) => {
    const currentColumnIndex = findCurrentColumnIndex(columns, idColumn);
    const nextColumn = columns[currentColumnIndex + 1];

    return nextColumn && nextColumn.id;
};

// Modal
export const filterKeyEscape = (handler) => (e) => e.keyCode === 27 && handler(e);

export const filterAsideElement = (handler) => (e) => e.target.tagName === 'ASIDE' && handler(e);

export const accessibleOnClick = (handler) => ({
    role: 'dialog',
    'aria-modal': true,
    onKeyDown: filterKeyEscape(handler),
    onClick: filterAsideElement(handler),
});
