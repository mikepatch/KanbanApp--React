import React, { useState } from 'react';

import { ChangeColumnColorContext } from '../utilities/context';

function ColorLabel({ data: { id, columnColor } }) {
    const styles = {
        rootElement:
            'relative self-center hover:scale-110 mr-2 inline-block w-4 h-4 rounded-full transition-all outline outline-2',
        input: 'absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer',
    };
    const [color, setColor] = useState(columnColor);
    const { Consumer: ChangeColumnColorConsumer } = ChangeColumnColorContext;

    return (
        <ChangeColumnColorConsumer>
            {(handleChangeColumnColor) => (
                <div
                    className={styles.rootElement}
                    style={{ backgroundColor: `${columnColor}` }}
                >
                    <input
                        className={styles.input}
                        type="color"
                        onChange={(e) => setColor(e.target.value)}
                        onBlur={() =>
                            handleChangeColumnColor(id, {
                                columnColor: color,
                            })
                        }
                    />
                </div>
            )}
        </ChangeColumnColorConsumer>
    );
}

export default ColorLabel;
