import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import Button from './Button';

import { ColumnsContext, TasksContext } from '../utilities/context';
import buttonsOptions from '../utilities/buttonsOptions';
import { findNextColumnId, findPrevColumnId, isColumnFull } from '../utilities/helpers';

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

    const moveTask = (newIdColumn) => {
        if (!isColumnFull({ columns, tasks }, newIdColumn)) {
            updateTask(id, { idColumn: newIdColumn });
            showAlert(false);
        } else {
            showAlert(true);
        }
    };

    const getPrevButton = () => {
        const prevColumnId = findPrevColumnId(columns, idColumn);

        if (prevColumnId) {
            return (
                <Button
                    options={{ className: moveTaskButton.className }}
                    onClick={() => moveTask(prevColumnId)}
                >
                    <FontAwesomeIcon icon={icon({ name: 'chevron-left' })} />
                </Button>
            );
        }

        return null;
    };

    const getNextButton = () => {
        const nextColumnId = findNextColumnId(columns, idColumn);

        if (nextColumnId) {
            return (
                <Button
                    options={{ className: moveTaskButton.className }}
                    onClick={() => moveTask(nextColumnId)}
                >
                    <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} />
                </Button>
            );
        }

        return null;
    };

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
                {getPrevButton()}
                {getNextButton()}
            </div>
        </article>
    );
}

export default Task;
