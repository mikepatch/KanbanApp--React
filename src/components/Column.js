import React, { useContext } from 'react';

import ColumnHeader from './ColumnHeader';
import List from './List';
import Task from './Task';

import { TasksContext } from '../utilities/context';
import styles from './Column.styles';

function Column({ data: { id, ...properties } }) {
    const { tasks } = useContext(TasksContext);

    const tasksList = tasks.map(
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

    return (
        <li className={styles.root}>
            <ColumnHeader data={{ tasks, id, ...properties }} />
            <List className={styles.list}>{tasksList}</List>
        </li>
    );
}

export default Column;
