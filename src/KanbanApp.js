/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Board from './components/Board';
import { ColumnsContext, MoveTasksContext, TasksContext } from './context';
import useStorage from './hooks';
import { findTargetColumn, getNewIdColumn, getTasksCountInColumn } from './helpers/movingTask';
import Button from './components/Button';
import Form from './components/Form/Form';
import formsOptions from './helpers/formsOptions';
import buttonsOptions from './helpers/buttonsOptions';

function KanbanApp() {
    const initialData = {
        columns: [
            { id: 1, columnName: 'TO-DO', limit: 4 },
            { id: 2, columnName: 'In-progress', limit: 3 },
            { id: 3, columnName: 'Done', limit: 2 },
        ],
        tasks: [
            { id: 1, taskName: 'Task1', idColumn: 1, userName: 'John' },
            { id: 2, taskName: 'Task2', idColumn: 2, userName: 'John' },
            { id: 3, taskName: 'Task3', idColumn: 3, userName: 'Janice' },
            { id: 4, taskName: 'Task4', idColumn: 1, userName: 'Janice' },
        ],
    };

    const [columns, setColumns] = useStorage('columns', initialData.columns);
    const [tasks, setTasks] = useStorage('tasks', initialData.tasks);
    const [isLimitAlert, setLimitAlert] = useState(false);
    const [isTaskForm, setTaskForm] = useState(false);
    const [isColumnForm, setColumnForm] = useState(false);

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
        const newTask = { id: tasks.length + 1, idColumn: 1, ...data };

        setTasks((tasks) => [...tasks, newTask]);
    };

    const handleAddColumn = (data) => {
        const newColumn = { id: columns.length + 1, ...data };

        setColumns((columns) => [...columns, newColumn]);
    };

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;
    const { Provider: MoveTasksProvider } = MoveTasksContext;

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
                    <TasksProvider value={tasks}>
                        <MoveTasksProvider value={handleMoveTask}>
                            <Board />
                            {isLimitAlert && <h1>Osiągnięto limit!!</h1>}
                        </MoveTasksProvider>
                    </TasksProvider>
                </ColumnsProvider>
            </main>
            {isTaskForm && (
                <Form
                    options={formsOptions.addTaskForm}
                    onClick={handleHideForm}
                    onSubmit={handleAddTask}
                />
            )}
            {isColumnForm && (
                <Form
                    options={formsOptions.addColumnForm}
                    onClick={handleHideForm}
                    onSubmit={handleAddColumn}
                />
            )}
        </div>
    );
}

export default KanbanApp;
