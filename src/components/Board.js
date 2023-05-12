import React, { useContext } from 'react';

import List from './List';
import Column from './Column';

import { ColumnsContext } from '../utilities/context';
import styles from './Board.styles';

function Board() {
    const { columns } = useContext(ColumnsContext);

    const columnsItems = columns.map((column) => (
        <Column
            key={column.id}
            data={column}
        />
    ));

    return <List className={styles.list}>{columnsItems}</List>;
}

export default Board;
