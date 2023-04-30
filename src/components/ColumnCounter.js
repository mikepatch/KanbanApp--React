import React from 'react';

import { getTasksCountInColumn } from '../utilities/helpers';

function ColumnCounter({ data: { tasks, id, limit } }) {
    const styles = 'absolute top-4 right-4';

    return (
        <small className={styles}>
            {getTasksCountInColumn(tasks, id)} / {limit}
        </small>
    );
}

export default ColumnCounter;
