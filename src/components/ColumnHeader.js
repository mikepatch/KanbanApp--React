import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import ColorLabel from './ColorLabel';
import Button from './Button';
import ColumnCounter from './ColumnCounter';

import { RemoveColumnContext } from '../utilities/context';
import buttonsOptions from '../utilities/buttonsOptions';

function ColumnHeader({ data: { tasks, id, columnColor, columnName, limit } }) {
    const styles = {
        headerRoot: 'relative gap-2 flex justify-start p-3 text-center w-full',
        title: 'text-2xl lg:text-3xl',
    };
    const { removeColumn } = buttonsOptions;
    const { Consumer: RemoveColumnConsumer } = RemoveColumnContext;

    return (
        <RemoveColumnConsumer>
            {(handleRemoveColumn) => (
                <header className={styles.headerRoot}>
                    <ColorLabel data={{ id, columnColor }} />
                    <h2 className={styles.title}>{columnName}</h2>
                    <Button
                        options={removeColumn}
                        onClick={() => handleRemoveColumn(id)}
                    >
                        <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
                    </Button>
                    <ColumnCounter data={{ tasks, id, limit }} />
                </header>
            )}
        </RemoveColumnConsumer>
    );
}

export default ColumnHeader;
