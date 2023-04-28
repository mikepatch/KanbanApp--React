import React from 'react';

import Column from './Column';
import { ColumnsContext } from '../context';

function Board() {
    const { Consumer: ColumnsConsumer } = ColumnsContext;

    return (
        <section className="md:flex justify-around gap-4 px-6">
            <ColumnsConsumer>
                {(columns) =>
                    columns.map((column) => (
                        <Column
                            key={column.id}
                            data={column}
                        />
                    ))
                }
            </ColumnsConsumer>
        </section>
    );
}

export default Board;
