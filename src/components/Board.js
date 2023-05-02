import React, { useContext } from 'react';

import List from './List';
import Column from './Column';

import { ColumnsContext } from '../utilities/context';

function Board() {
    const { columns } = useContext(ColumnsContext);

    const columnsItems = columns.map((column) => (
        <Column
            key={column.id}
            data={column}
        />
    ));

    const styles = {
        board: 'md:flex justify-center gap-4 px-6 mx-auto mt-6',
    };

    return <List className={styles.board}>{columnsItems}</List>;
}

export default Board;
