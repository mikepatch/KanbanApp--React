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

export const isColumnFull = ({ columns, tasks }, columnId) => {
    const targetColumn = findTargetColumn(columns, columnId);
    const tasksInTargetColumn = getTasksCountInColumn(tasks, columnId);

    if (tasksInTargetColumn < targetColumn.limit) {
        return false;
    }

    return true;
}; 

