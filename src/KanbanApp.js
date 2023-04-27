import React, { useState } from 'react';
import Board from './components/Board';
import { ColumnsContext, TasksContext } from './context';
import useStorage from './hooks';

function KanbanApp() {
    const initialData = {
        columns: [
            { id: 1, name: 'TO-DO', limit: 4 },
            { id: 2, name: 'In-progress', limit: 3 },
            { id: 3, name: 'Done', limit: 2 },
        ],
        tasks: [
            { id: 1, name: 'Task1', idColumn: 1, user: 'John' },
            { id: 2, name: 'Task2', idColumn: 2, user: 'John' },
            { id: 3, name: 'Task3', idColumn: 3, user: 'Janice' },
        ],
    };
    // eslint-disable-next-line no-unused-vars
    const [columns, setColumns] = useState(initialData.columns);
    // eslint-disable-next-line no-unused-vars
    const [tasks, setTasks] = useState(initialData.tasks);

    const [getStoredColumns, setStoredColumns] = useStorage('columns', columns);
    const [getStoredTasks, setStoredTasks] = useStorage('tasks', tasks);

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;

    return (
        <ColumnsProvider
            value={getStoredColumns}
            stateMethod={setStoredColumns}
        >
            <TasksProvider
                value={getStoredTasks}
                stateMethod={setStoredTasks}
            >
                <Board />
            </TasksProvider>
        </ColumnsProvider>
    );
}

export default KanbanApp;
