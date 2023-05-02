import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import Button from './Button';

import { ColumnsContext, TasksContext } from '../utilities/context';
import buttonsOptions from '../utilities/buttonsOptions';
import { findCurrentColumnIndex, isColumnFull } from '../utilities/helpers';

function Task({ data: { id, idColumn, taskName, userName } }) {
    const { moveTaskButton, removeTaskButton } = buttonsOptions;
    const styles = {
        componentRoot:
            'flex flex-col gap-2 bg-zinc-600 p-4 px-6 rounded-md drop-shadow-sm relative animate-slide-from-l-sm',
        taskBody:
            'font-bold text-left cursor-pointer hover:text-purple-500 ease-in-out duration-100',
        taskTitle: 'text-xl',
        address: 'text-right text-neutral-400',
        navButtons: 'flex gap-2 justify-center mt-2',
    };

    const { columns } = useContext(ColumnsContext);
    const { showAlert, tasks, updateTask, removeTask } = useContext(TasksContext);
    const currentColumnIndex = findCurrentColumnIndex(columns, idColumn);

    const findPrevColumnId = () => {
        const prevColumn = columns[currentColumnIndex - 1];

        return prevColumn && prevColumn.id;
    };

    const findNextColumnId = () => {
        const nextColumn = columns[currentColumnIndex + 1];

        return nextColumn && nextColumn.id;
    };

    const moveTask = (newIdColumn) => {
        if (!isColumnFull({ columns, tasks }, newIdColumn)) {
            updateTask(id, { idColumn: newIdColumn });
            showAlert(false);
        } else {
            showAlert(true);
        }
    };

    const getPrevButton = () => (
        <Button
            options={{ className: moveTaskButton.className }}
            onClick={() => moveTask(findPrevColumnId(columns, idColumn))}
        >
            <FontAwesomeIcon icon={icon({ name: 'chevron-left' })} />
        </Button>
    );

    const getNextButton = () => (
        <Button
            options={{ className: moveTaskButton.className }}
            onClick={() => moveTask(findNextColumnId(columns, idColumn))}
        >
            <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} />
        </Button>
    );

    const getRemoveButton = (callback) => (
        <Button
            options={{ className: removeTaskButton.className }}
            onClick={() => callback(id)}
        >
            <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
        </Button>
    );

    return (
        <article className={styles.componentRoot}>
            <div className={styles.taskBody}>
                <h3 className={styles.taskTitle}>{taskName}</h3>
                <address className={styles.address}>Added by {userName}</address>
            </div>
            {getRemoveButton(removeTask)}
            <div className={styles.navButtons}>
                {findPrevColumnId() && getPrevButton()}
                {findNextColumnId() && getNextButton()}
            </div>
        </article>
    );
}

export default Task;
