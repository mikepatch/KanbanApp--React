import React from 'react';

import ColumnHeader from './ColumnHeader';
import List from './List';
import Task from './Task';

import { TasksContext } from '../utilities/context';

function Column({ data: { id, ...properties } }) {
    const getColumnTasks = (tasks) =>
        tasks.map(
            (task) =>
                id === task.idColumn && (
                    <li key={task.id}>
                        <Task
                            key={task.id}
                            data={task}
                        />
                    </li>
                ),
        );

    const { Consumer: TasksConsumer } = TasksContext;

    const styles = {
        column: 'flex flex-col mx-auto md:mx-0 max-w-md w-full',
        list: 'flex flex-col gap-4 py-4 w-full',
    };

    return (
        <TasksConsumer>
            {(tasks) => (
                <li className={styles.column}>
                    <ColumnHeader data={{ tasks, id, ...properties }} />
                    <List className={styles.list}>{getColumnTasks(tasks)}</List>
                </li>
            )}
        </TasksConsumer>
    );
}

export default Column;
