import React, { useContext } from 'react';

import ColumnHeader from './ColumnHeader';
import List from './List';
import Task from './Task';

import { TasksContext } from '../utilities/context';

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

    const styles = {
        column: 'flex flex-col mx-auto md:mx-0 max-w-md w-full',
        list: 'flex flex-col gap-4 py-4 w-full',
    };

    return (
        <li className={styles.column}>
            <ColumnHeader data={{ tasks, id, ...properties }} />
            <List className={styles.list}>{tasksList}</List>
        </li>
    );
}

export default Column;
