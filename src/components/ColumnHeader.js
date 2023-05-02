import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import ColorLabel from './ColorLabel';
import Button from './Button';
import ColumnCounter from './ColumnCounter';

import { ColumnsContext } from '../utilities/context';
import buttonsOptions from '../utilities/buttonsOptions';

function ColumnHeader({ data: { tasks, id, columnColor, columnName, limit } }) {
    const styles = {
        headerRoot: 'relative gap-2 flex justify-start p-3 text-center w-full',
        title: 'text-2xl lg:text-3xl',
    };

    const { removeColumn } = useContext(ColumnsContext);
    const { removeColumnButton } = buttonsOptions;

    return (
        <header className={styles.headerRoot}>
            <ColorLabel data={{ id, columnColor }} />
            <h2 className={styles.title}>{columnName}</h2>
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
