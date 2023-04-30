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
    changeState,
    getArrayWithNewData,
    getArrayWithoutSpecifiedItem,
    getInitialState,
    getNewIdColumn,
    getNewStateItems,
    isColumnFull,
} from './utilities/helpers';
import initialData from './utilities/initialData';
import formsOptions from './components/Form/utilities/formsOptions';

function KanbanApp() {
    const styles = { componentRoot: 'bg-gradient-to-b from-main-bg to-main-bg-dark min-h-screen' };
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
        changeState(setColumnsStorage, columns);
    }, [columns]);

    useEffect(() => {
        changeState(setTasksStorage, tasks);
    }, [tasks]);

    const handleAddTask = (data) => {
        const firstColumnId = 1;

        if (!isColumnFull({ columns, tasks }, firstColumnId)) {
            changeState(
                setTasks,
                getArrayWithNewData(tasks, { id: uuid(), idColumn: firstColumnId, ...data }),
            );
        } else {
            changeState(setLimitAlertOpen, true);
        }
    };

    const handleAddColumn = (data) => {
        changeState(setColumns, getArrayWithNewData(columns, { id: columns.length + 1, ...data }));
    };

    const handleRemoveColumn = (idToRemove) => {
        changeState(setColumns, getArrayWithoutSpecifiedItem(columns, idToRemove));
    };

    const handleRemoveTask = (idToRemove) => {
        changeState(setTasks, getArrayWithoutSpecifiedItem(tasks, idToRemove));
    };

    const handleUpdateColumn = (idColumn, propertiesToChange) => {
        changeState(setColumns, getNewStateItems(columns, [idColumn, propertiesToChange]));
    };

    const handleUpdateTask = (idTask, propertiesToChange) => {
        changeState(setTasks, getNewStateItems(tasks, [idTask, propertiesToChange]));
    };

    const handleMoveTask = (currentTarget, { id: idTask, idColumn }) => {
        const newIdColumn = getNewIdColumn(currentTarget, idColumn, columns);

        if (!isColumnFull({ columns, tasks }, newIdColumn)) {
            handleUpdateTask(idTask, { idColumn: newIdColumn });
            changeState(setLimitAlertOpen, false);
        } else {
            changeState(setLimitAlertOpen, true);
        }
    };

    const closeForm = () => {
        changeState(setTaskFormOpen, false);
        changeState(setColumnFormOpen, false);
    };

    const { Provider: ColumnsProvider } = ColumnsContext;
    const { Provider: TasksProvider } = TasksContext;
    const { Provider: MoveTasksProvider } = MoveTasksContext;
    const { Provider: RemoveColumnProvider } = RemoveColumnContext;
    const { Provider: RemoveTaskProvider } = RemoveTaskContext;
    const { Provider: ChangeColumnColorProvider } = ChangeColumnColorContext;

    return (
        <ColumnsProvider value={columns}>
            <RemoveColumnProvider value={handleRemoveColumn}>
                <TasksProvider value={tasks}>
                    <MoveTasksProvider value={handleMoveTask}>
                        <RemoveTaskProvider value={handleRemoveTask}>
                            <ChangeColumnColorProvider value={handleUpdateColumn}>
                                <div className={styles.componentRoot}>
                                    <Header
                                        showAddTaskForm={() => setTaskFormOpen(true)}
                                        showAddColumnForm={() => setColumnFormOpen(true)}
                                    />
                                    <main>
                                        <Board />
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
                                        data={{
                                            title: 'Column is full!',
                                            text: 'You have reached the maximum number of tasks.',
                                        }}
                                        closeModal={() => setLimitAlertOpen(false)}
                                    />
                                )}
                            </ChangeColumnColorProvider>
                        </RemoveTaskProvider>
                    </MoveTasksProvider>
                </TasksProvider>
            </RemoveColumnProvider>
        </ColumnsProvider>
    );
}

export default KanbanApp;
