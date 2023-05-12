import React, { useContext, useState } from 'react';

import { ColumnsContext } from '../utilities/context';
import styles from './ColorLabel.styles';

function ColorLabel({ data: { id, columnColor } }) {
    const { updateColumn } = useContext(ColumnsContext);
    const [color, setColor] = useState(columnColor);

    return (
        <div
            className={styles.root}
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
