/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function Textarea({ options: { style, id, rows, ...attributes }, onChange }) {
    return (
        <textarea
            style={style && style}
            id={id}
            {...attributes}
            onChange={onChange}
        />
    );
}

export default Textarea;
