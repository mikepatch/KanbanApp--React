const initialData = {
    columns: [
        { id: 1, columnColor: '#00f', columnName: 'TO-DO', limit: 4 },
        { id: 2, columnColor: '#f00', columnName: 'In-progress', limit: 3 },
        { id: 3, columnColor: '#0f0', columnName: 'Done', limit: 2 },
    ],
    tasks: [
        { id: 1, taskName: 'Task1', idColumn: 1, userName: 'John' },
        { id: 2, taskName: 'Task2', idColumn: 2, userName: 'John' },
        { id: 3, taskName: 'Task3', idColumn: 3, userName: 'Janice' },
        { id: 4, taskName: 'Task4', idColumn: 1, userName: 'Janice' },
    ],
};

export default initialData;
