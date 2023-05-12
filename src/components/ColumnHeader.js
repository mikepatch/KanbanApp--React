import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import ColorLabel from './ColorLabel';
import Button from './Button';
import ColumnCounter from './ColumnCounter';

import { ColumnsContext } from '../utilities/context';
import buttonsOptions from '../utilities/buttonsOptions';
import styles from './ColumnHeader.styles';

function ColumnHeader({ data: { tasks, id, columnColor, columnName, limit } }) {
    const { removeColumn } = useContext(ColumnsContext);
    const { removeColumnButton } = buttonsOptions;

    return (
        <header className={styles.root}>
            <ColorLabel data={{ id, columnColor }} />
            <h2 className={styles.h2}>{columnName}</h2>
            <Button
                options={removeColumnButton}
                onClick={() => removeColumn(id)}
            >
                <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
            </Button>
            <ColumnCounter data={{ tasks, id, limit }} />
        </header>
    );
}

export default ColumnHeader;
