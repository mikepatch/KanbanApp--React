import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid';

import Board from './components/Board';
import Form from './components/Form/Form';
import Modal from './components/Modal';

import {
    ColumnsContext,
    MoveTasksContext,
    RemoveColumnContext,
    RemoveTaskContext,
    TasksContext,
} from './context';
import {
    getArrayWithNewData,
    getArrayWithoutSpecifiedItem,
    getNewIdColumn,
    isColumnFull,
} from './utilities/helpers';
import useStorage from './hooks';

import formsOptions from './components/Form/utilities/formsOptions';
import Header from './components/Header';

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
    const [isTaskLimitReached, setTaskLimitReached] = useState(false);
    const [isTaskForm, setTaskForm] = useState(false);
    const [isColumnForm, setColumnForm] = useState(false);

    useEffect(() => {
        setColumnsStorage(columns);
    }, [columns]);

    useEffect(() => {
        setTasksStorage(tasks);
    }, [tasks]);

    useEffect(() => {
        if (isTaskForm) {
            setColumnForm(false);
        }
    }, [isTaskForm]);

    useEffect(() => {
        if (isColumnForm) {
            setTaskForm(false);
        }
    }, [isColumnForm]);

    const handleAddTask = (data) => {
        const idColumn = 1;

        if (!isColumnFull({ columns, tasks }, idColumn)) {
            setTasks((tasks) => getArrayWithNewData(tasks, { id: uuid(), idColumn, ...data }));
        } else {
            setTaskLimitReached(true);
        }
    };

    const handleAddColumn = (data) => {
        setColumns((columns) => getArrayWithNewData(columns, { id: columns.length + 1, ...data }));
    };

    const handleRemoveColumn = (idToRemove) => {
        setColumns(getArrayWithoutSpecifiedItem(columns, idToRemove));
    };

    const handleRemoveTask = (idToRemove) => {
        setTasks(getArrayWithoutSpecifiedItem(tasks, idToRemove));
    };

    const handleMoveTask = (currentTarget, { id: idTask, idColumn }) => {
        const newIdColumn = getNewIdColumn(currentTarget, idColumn, columns);

        if (!isColumnFull({ columns, tasks }, newIdColumn)) {
            setTasks((tasks) => {
                const newTasks = tasks.map((task) => {
                    if (task.id === idTask) {
                        return { ...task, idColumn: newIdColumn };
                    }

                    return task;
                });

                return newTasks;
            });
            setTaskLimitReached(false);
        } else {
            setTaskLimitReached(true);
        }
    };

    const closeForm = () => {
        setTaskForm(false);
        setColumnForm(false);
    };

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;
    const { Provider: MoveTasksProvider } = MoveTasksContext;
    const { Provider: RemoveColumnProvider } = RemoveColumnContext;
    const { Provider: RemoveTaskProvider } = RemoveTaskContext;

    return (
        <>
            <div className="bg-gradient-to-b from-zinc-700 to-zinc-900 min-h-screen">
                <Header
                    showAddTaskForm={() => setTaskForm(true)}
                    showAddColumnForm={() => setColumnForm(true)}
                />
                <main>
                    <ColumnsProvider value={columns}>
                        <RemoveColumnProvider value={handleRemoveColumn}>
                            <TasksProvider value={tasks}>
                                <MoveTasksProvider value={handleMoveTask}>
                                    <RemoveTaskProvider value={handleRemoveTask}>
                                        <Board />
                                    </RemoveTaskProvider>
                                </MoveTasksProvider>
                            </TasksProvider>
                        </RemoveColumnProvider>
                    </ColumnsProvider>
                </main>
            </div>
            {isTaskForm && (
                <Form
                    options={formsOptions.addTaskForm}
                    closeForm={closeForm}
                    onSubmit={handleAddTask}
                />
            )}
            {isColumnForm && (
                <Form
                    options={formsOptions.addColumnForm}
                    closeForm={closeForm}
                    onSubmit={handleAddColumn}
                />
            )}
            {isTaskLimitReached && (
                <Modal
                    title="Column is full!"
                    text="You have reached the maximum number of tasks."
                    closeModal={() => setTaskLimitReached(false)}
                />
            )}
        </>
    );
}

export default KanbanApp;
