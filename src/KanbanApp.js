import React from 'react';
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

    const [getColumns, setColumns] = useStorage('columns', initialData.columns);
    const [getTasks, setTasks] = useStorage('tasks', initialData.tasks);

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;

    return (
        <ColumnsProvider
            value={getColumns}
            stateMethod={setColumns}
        >
            <TasksProvider
                value={getTasks}
                stateMethod={setTasks}
            >
                <Board />
            </TasksProvider>
        </ColumnsProvider>
    );
}

export default KanbanApp;
