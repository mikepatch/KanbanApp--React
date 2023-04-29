import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Header from './components/Header';
import Board from './components/Board';
import Form from './components/Form/Form';
import Modal from './components/Modal';

import useStorage from './hooks';
import {
    ChangeColumnColorContext,
    ColumnsContext,
    MoveTasksContext,
    RemoveColumnContext,
    RemoveTaskContext,
    TasksContext,
} from './context';
import {
    getArrayWithNewData,
    getArrayWithoutSpecifiedItem,
    getInitialState,
    getNewIdColumn,
    isColumnFull,
} from './utilities/helpers';
import formsOptions from './components/Form/utilities/formsOptions';

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

    const [columns, setColumns] = useState(() =>
        getInitialState(columnsStorage, initialData.columns),
    );
    const [tasks, setTasks] = useState(() => getInitialState(tasksStorage, initialData.tasks));
    const [isLimitAlertOpen, setLimitAlertOpen] = useState(false);
    const [isTaskFormOpen, setTaskFormOpen] = useState(false);
    const [isColumnFormOpen, setColumnFormOpen] = useState(false);

    useEffect(() => {
        setColumnsStorage(columns);
    }, [columns]);

    useEffect(() => {
        setTasksStorage(tasks);
    }, [tasks]);

    useEffect(() => {
        if (isTaskFormOpen) {
            setColumnFormOpen(false);
        }
    }, [isTaskFormOpen]);

    useEffect(() => {
        if (isColumnFormOpen) {
            setTaskFormOpen(false);
        }
    }, [isColumnFormOpen]);

    const handleAddTask = (data) => {
        const idColumn = 1;

        if (!isColumnFull({ columns, tasks }, idColumn)) {
            setTasks((tasks) => getArrayWithNewData(tasks, { id: uuid(), idColumn, ...data }));
        } else {
            setLimitAlertOpen(true);
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

    const handleChangeColumnColor = (idColumn, newColor) => {
        setColumns((columns) => {
            const newColumns = columns.map((column) => {
                if (column.id === idColumn) {
                    return { ...column, columnColor: newColor };
                }

                return column;
            });

            return newColumns;
        });
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
            setLimitAlertOpen(false);
        } else {
            setLimitAlertOpen(true);
        }
    };

    const closeForm = () => {
        setTaskFormOpen(false);
        setColumnFormOpen(false);
    };

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;
    const { Provider: MoveTasksProvider } = MoveTasksContext;
    const { Provider: RemoveColumnProvider } = RemoveColumnContext;
    const { Provider: RemoveTaskProvider } = RemoveTaskContext;
    const { Provider: ChangeColumnColorProvider } = ChangeColumnColorContext;

    return (
        <>
            <div className="bg-gradient-to-b from-zinc-700 to-zinc-900 min-h-screen">
                <Header
                    showAddTaskForm={() => setTaskFormOpen(true)}
                    showAddColumnForm={() => setColumnFormOpen(true)}
                />
                <main>
                    <ColumnsProvider value={columns}>
                        <RemoveColumnProvider value={handleRemoveColumn}>
                            <TasksProvider value={tasks}>
                                <MoveTasksProvider value={handleMoveTask}>
                                    <RemoveTaskProvider value={handleRemoveTask}>
                                        <ChangeColumnColorProvider value={handleChangeColumnColor}>
                                            <Board />
                                        </ChangeColumnColorProvider>
                                    </RemoveTaskProvider>
                                </MoveTasksProvider>
                            </TasksProvider>
                        </RemoveColumnProvider>
                    </ColumnsProvider>
                </main>
            </div>
            {isTaskFormOpen && (
                <Form
                    options={formsOptions.addTaskForm}
                    closeForm={closeForm}
                    onSubmit={handleAddTask}
                />
            )}
            {isColumnFormOpen && (
                <Form
                    options={formsOptions.addColumnForm}
                    closeForm={closeForm}
                    onSubmit={handleAddColumn}
                />
            )}
            {isLimitAlertOpen && (
                <Modal
                    title="Column is full!"
                    text="You have reached the maximum number of tasks."
                    closeModal={() => setLimitAlertOpen(false)}
                />
            )}
        </>
    );
}

export default KanbanApp;
