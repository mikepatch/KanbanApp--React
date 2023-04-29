/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid';

import Board from './components/Board';
import {
    ColumnsContext,
    MoveTasksContext,
    RemoveColumnContext,
    RemoveTaskContext,
    TasksContext,
} from './context';
import useStorage from './hooks';
import { findTargetColumn, getNewIdColumn, getTasksCountInColumn } from './utilities/helpers';
import Button from './components/Button';
import Form from './components/Form/Form';
import formsOptions from './utilities/formsOptions';
import buttonsOptions from './utilities/buttonsOptions';

function KanbanApp() {
    const initialData = {
        columns: [
            { id: 1, columnColor: '#ddd', columnName: 'TO-DO', limit: 4 },
            { id: 2, columnColor: '#00f', columnName: 'In-progress', limit: 3 },
            { id: 3, columnColor: '#f00', columnName: 'Done', limit: 2 },
        ],
        tasks: [
            { id: 1, taskName: 'Task1', idColumn: 1, userName: 'John' },
            { id: 2, taskName: 'Task2', idColumn: 2, userName: 'John' },
            { id: 3, taskName: 'Task3', idColumn: 3, userName: 'Janice' },
            { id: 4, taskName: 'Task4', idColumn: 1, userName: 'Janice' },
        ],
    };

    const [columnsStorage, setColumnsStorage] = useStorage('columns');
    const [tasksStorage, setTasksStorage] = useStorage('tasks');
    const [columns, setColumns] = useState(() => {
        const storedData = columnsStorage || initialData.columns;
        return storedData;
    });
    const [tasks, setTasks] = useState(() => {
        const storedData = tasksStorage || initialData.tasks;
        return storedData;
    });
    const [isLimitAlert, setLimitAlert] = useState(false);
    const [isTaskForm, setTaskForm] = useState(false);
    const [isColumnForm, setColumnForm] = useState(false);

    useEffect(() => {
        setColumnsStorage(columns);
    }, [columns, setColumnsStorage]);

    useEffect(() => {
        setTasksStorage(tasks);
    }, [tasks, setTasksStorage]);

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

    const showTaskForm = () => {
        setColumnForm(false);
        setTaskForm(true);
    };

    const showColumnForm = () => {
        setTaskForm(false);
        setColumnForm(true);
    };

    const handleHideForm = () => {
        setTaskForm(false);
        setColumnForm(false);
    };

    const handleAddTask = (data) => {
        const newTask = { id: uuid(), idColumn: 1, ...data };

        setTasks((tasks) => [...tasks, newTask]);
    };

    const handleAddColumn = (data) => {
        const newColumn = { id: columns.length + 1, ...data };

        setColumns((columns) => [...columns, newColumn]);
    };

    const handleRemoveColumn = (idToRemove) => {
        console.log('remove', idToRemove);
        const newColumns = columns.filter((column) => column.id !== idToRemove);

        setColumns(newColumns);
    };

    const handleRemoveTask = (idToRemove) => {
        console.log('remove', idToRemove);
        const newTasks = tasks.filter((task) => task.id !== idToRemove);

        setTasks(newTasks);
    };

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;
    const { Provider: MoveTasksProvider } = MoveTasksContext;
    const { Provider: RemoveColumnProvider } = RemoveColumnContext;
    const { Provider: RemoveTaskProvider } = RemoveTaskContext;

    return (
        <div className="bg-gradient-to-b from-zinc-700 to-zinc-900 min-h-screen text-white">
            <header className="sticky z-50 top-0 items-center flex justify-between py-4 px-8 bg-zinc-600 drop-shadow-md">
                <h1>Kanban</h1>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Button
                                options={buttonsOptions.addTaskButton}
                                onClick={showTaskForm}
                            />
                        </li>
                        <li>
                            <Button
                                options={buttonsOptions.addColumnButton}
                                onClick={showColumnForm}
                            />
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <ColumnsProvider value={columns}>
                    <RemoveColumnProvider value={handleRemoveColumn}>
                        <TasksProvider value={tasks}>
                            <MoveTasksProvider value={handleMoveTask}>
                                <RemoveTaskProvider value={handleRemoveTask}>
                                    <Board />
                                    {isLimitAlert && <h1>Osiągnięto limit!!</h1>}
                                </RemoveTaskProvider>
                            </MoveTasksProvider>
                        </TasksProvider>
                    </RemoveColumnProvider>
                </ColumnsProvider>
            </main>
            {isTaskForm && (
                <Form
                    options={formsOptions.addTaskForm}
                    closeForm={handleHideForm}
                    onSubmit={handleAddTask}
                />
            )}
            {isColumnForm && (
                <Form
                    options={formsOptions.addColumnForm}
                    closeForm={handleHideForm}
                    onSubmit={handleAddColumn}
                />
            )}
        </div>
    );
}

export default KanbanApp;
