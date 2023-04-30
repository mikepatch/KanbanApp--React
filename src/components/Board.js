import React from 'react';

import List from './List';
import Column from './Column';

import { ColumnsContext } from '../utilities/context';

function Board() {
    const styles = {
        board: 'md:flex justify-center gap-4 px-6 mx-auto mt-6',
    };
    const { Consumer: ColumnsConsumer } = ColumnsContext;
    const getColumnsItems = (columns) =>
        columns.map((column) => (
            <Column
                key={column.id}
                data={column}
            />
        ));

    return (
        <ColumnsConsumer>
            {(columns) => <List className={styles.board}>{getColumnsItems(columns)}</List>}
        </ColumnsConsumer>
    );
}

export default Board;
