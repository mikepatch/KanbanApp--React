const getNewIdColumn = (currentTarget, currentIdColumn, columns) => {
    let newIdColumn = currentIdColumn;

    if (currentTarget.id === 'next' && currentIdColumn !== columns.length) {
        newIdColumn = currentIdColumn + 1;
    } else if (currentTarget.id === 'prev' && currentIdColumn !== 1) {
        newIdColumn = currentIdColumn - 1;
    }

    return newIdColumn;
};

const findTargetColumn = (columns, newIdColumn) =>
    columns.find((column) => column.id === newIdColumn);

const getTasksCountInColumn = (tasks, columnId) =>
    tasks.filter((task) => task.idColumn === columnId).length;

export { getNewIdColumn, findTargetColumn, getTasksCountInColumn };
