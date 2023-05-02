import React, { useContext, useState } from 'react';

import { ColumnsContext } from '../utilities/context';

function ColorLabel({ data: { id, columnColor } }) {
    const styles = {
        rootElement:
            'relative self-center hover:scale-110 mr-2 inline-block w-4 h-4 rounded-full transition-all outline outline-2',
        input: 'absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer',
    };
    const { updateColumn } = useContext(ColumnsContext);
    const [color, setColor] = useState(columnColor);


    return (
        <div
            className={styles.rootElement}
            style={{ backgroundColor: `${columnColor}` }}
        >
            <input
                className={styles.input}
                type="color"
                onChange={(e) => setColor(e.target.value)}
                onBlur={() =>
                    updateColumn(id, {
                        columnColor: color,
                    })
                }
            />
        </div>
    );
}

export default ColorLabel;
