/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Board from './components/Board';
import { ColumnsContext, MoveTasksContext, TasksContext } from './context';
import useStorage from './hooks';
import { findTargetColumn, getNewIdColumn, getTasksCountInColumn } from './helpers/movingTask';

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
            { id: 4, name: 'Task4', idColumn: 1, user: 'Janice' },
        ],
    };

    const [columns, setColumns] = useStorage('columns', initialData.columns);
    const [tasks, setTasks] = useStorage('tasks', initialData.tasks);
    const [limitAlert, setLimitAlert] = useState(false);

    const handleMoveTask = (currentTarget, { id: idTask, idColumn }) => {
        const newIdColumn = getNewIdColumn(currentTarget, idColumn, columns);
        const targetColumn = findTargetColumn(columns, newIdColumn);
        const tasksInTargetColumn = getTasksCountInColumn(tasks, newIdColumn);

        if (tasksInTargetColumn < targetColumn.limit) {
            setTasks((tasks) => {
                const newTasks = tasks.map((task) => {
                    if (task.id === idTask) {
                        return { ...task, idColumn: newIdColumn };
                    }

                    return task;
                });

                return newTasks;
            });
            setLimitAlert(false);
        } else {
            setLimitAlert(true);
        }
    };

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;
    const { Provider: MoveTasksProvider } = MoveTasksContext;

    return (
        <div className="bg-gradient-to-b from-zinc-700 to-zinc-900 min-h-screen text-white">
            <header className="sticky top-0 flex justify-between p-4 bg-zinc-600 drop-shadow-md">
                <h1>Kanban</h1>
                <nav>test</nav>
            </header>

            <main>
                <ColumnsProvider value={columns}>
                    <TasksProvider value={tasks}>
                        <MoveTasksProvider value={handleMoveTask}>
                            <Board />
                            {limitAlert && <h1>Osiągnięto limit!!</h1>}
                        </MoveTasksProvider>
                    </TasksProvider>
                </ColumnsProvider>
            </main>
        </div>
    );
}

export default KanbanApp;
