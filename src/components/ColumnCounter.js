import React from 'react';

import { getTasksCountInColumn } from '../utilities/helpers';
import styles from './ColumnCounter.styles';

function ColumnCounter({ data: { tasks, id, limit } }) {
    return (
        <small className={styles.root}>
            {getTasksCountInColumn(tasks, id)} / {limit}
        </small>
    );
}

export default ColumnCounter;
