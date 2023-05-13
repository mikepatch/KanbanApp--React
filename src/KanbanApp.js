import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Header from './components/Header';
import Board from './components/Board';
import Form from './components/Form/Form';
import Modal from './components/Modal';

import useStorage from './utilities/hooks';
import { ColumnsContext, TasksContext } from './utilities/context';
import {
    changeState,
    getArrayWithNewData,
    getArrayWithoutSpecifiedItem,
    getInitialState,
    getNewStateItems,
    isColumnFull,
} from './utilities/helpers';
import initialData from './utilities/initialData';
import formsOptions from './components/Form/utilities/formsOptions';
import styles from './KanbanApp.styles';

function KanbanApp() {
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
        const [firstColumn] = columns;

        if (!isColumnFull({ columns, tasks }, firstColumn.id)) {
            changeState(
                setTasks,
                getArrayWithNewData(tasks, {
                    id: uuid(),
                    idColumn: firstColumn.id,
                    ...data,
                }),
            );
        } else {
            changeState(setLimitAlertOpen, true);
        }
    };

    const handleAddColumn = (data) => {
        changeState(setColumns, getArrayWithNewData(columns, { id: uuid(), ...data }));
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

    const closeForm = () => {
        changeState(setTaskFormOpen, false);
        changeState(setColumnFormOpen, false);
    };
    
    const renderForm = () => {
        if (isTaskFormOpen) {
            return (
                <Form
                    options={formsOptions.addTaskForm}
                    closeForm={closeForm}
                    onSubmit={handleAddTask}
                />
            );
        }
        if (isColumnFormOpen) {
            return (
                <Form
                    options={formsOptions.addColumnForm}
                    closeForm={closeForm}
                    onSubmit={handleAddColumn}
                />
            );
        }

        return null;
    };

    const renderLimitAlertModal = () => {
        if (isLimitAlertOpen) {
            return (
                <Modal
                    data={{
                        title: 'Column is full!',
                        text: 'You have reached the maximum number of tasks.',
                    }}
                    closeModal={() => setLimitAlertOpen(false)}
                />
            );
        }

        return null;
    };

    const columnsOptions = useMemo(() => ({
        columns,
        removeColumn: handleRemoveColumn,
        updateColumn: handleUpdateColumn,
    }));
    const tasksOptions = useMemo(() => ({
        showAlert: setLimitAlertOpen,
        tasks,
        updateTask: handleUpdateTask,
        removeTask: handleRemoveTask,
    }));

    return (
        <ColumnsContext.Provider value={columnsOptions}>
            <TasksContext.Provider value={tasksOptions}>
                <div className={styles.root}>
                    <Header
                        showAddTaskForm={() => setTaskFormOpen(true)}
                        showAddColumnForm={() => setColumnFormOpen(true)}
                    />
                    <main>
                        <Board />
                    </main>
                </div>
                {renderForm()}
                {renderLimitAlertModal()}
            </TasksContext.Provider>
        </ColumnsContext.Provider>
    );
}

export default KanbanApp;
