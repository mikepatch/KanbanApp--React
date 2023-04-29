import React from 'react';

import Button from './Button';

import buttonsOptions from '../utilities/buttonsOptions';
import { accessibleOnClick } from '../utilities/helpers';

function Modal({ title, text, closeModal }) {
    return (
        <aside
            {...accessibleOnClick(closeModal)}
            className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-50"
        >
            <section className="flex flex-col gap-6 py-8 px-10 bg-zinc-600 drop-shadow-sm rounded-md w-11/12 max-w-md animate-slide-from-l">
                <h2>{title}</h2>
                {text && text}
                <Button
                    options={buttonsOptions.modalCloseButton}
                    onClick={closeModal}
                />
            </section>
        </aside>
    );
}

export default Modal;
