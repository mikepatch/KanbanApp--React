import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import Button from './Button';

import { ColumnsContext, TasksContext } from '../utilities/context';
import buttonsOptions from '../utilities/buttonsOptions';
import { findNextColumnId, findPrevColumnId, isColumnFull } from '../utilities/helpers';
import styles from './Task.styles';

function Task({ data: { id, idColumn, taskName, userName } }) {
    const { moveTaskButton, removeTaskButton } = buttonsOptions;

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

    const renderRemoveButton = (callback) => (
        <Button
            options={{ className: removeTaskButton.className }}
            onClick={() => callback(id)}
        >
            <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
        </Button>
    );

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

    const renderButtonGroup = () => (
        <>
            {getPrevButton()}
            {getNextButton()}
        </>
    );

    return (
        <article className={styles.componentRoot}>
            <div className={styles.taskBody}>
                <h3 className={styles.taskTitle}>{taskName}</h3>
                <address className={styles.address}>Added by {userName}</address>
            </div>
            {renderRemoveButton(removeTask)}
            <div className={styles.navButtons}>{renderButtonGroup()}</div>
        </article>
    );
}

export default Task;
