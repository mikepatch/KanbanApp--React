import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import { ColumnsContext, TasksContext } from './context';

function KanbanApp() {
    const [columns, setColumns] = useState([
        { id: 1, name: 'TO-DO', limit: 4 },
        { id: 2, name: 'In-progress', limit: 3 },
    ]);
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Task1', idColumn: 1, user: 'John' },
        { id: 2, name: 'Task2', idColumn: 1, user: 'John' },
    ]);

    useEffect(() => {
        setColumns([...columns, { id: 3, name: 'Done', limit: 2 }]);
        setTasks([...tasks, { id: 3, name: 'Task3', idColumn: 1, user: 'Janice' }]);
    }, []);

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;

    return (
        <ColumnsProvider value={columns}>
            <TasksProvider value={tasks}>
                <Board />
            </TasksProvider>
        </ColumnsProvider>
    );
}

export default KanbanApp;
