import React from 'react';
import FocusTrap from 'focus-trap-react';

import Button from './Button';

import buttonsOptions from '../utilities/buttonsOptions';
import { accessibleOnClick } from '../utilities/helpers';

function Modal({ data: { title, text }, closeModal }) {
    const styles = {
        modalRoot:
            'flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-50',
        wrapper:
            'flex flex-col gap-6 py-8 px-10 bg-secondary-dark drop-shadow-sm rounded-md w-11/12 max-w-md animate-slide-from-b',
    };
    const { modalCloseButton } = buttonsOptions;

    return (
        <FocusTrap>
            <aside
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...accessibleOnClick(closeModal)}
                className={styles.modalRoot}
            >
                <section className={styles.wrapper}>
                    <h2>{title}</h2>
                    {text && text}
                    <Button
                        options={modalCloseButton}
                        onClick={closeModal}
                    >
                        {modalCloseButton.text}
                    </Button>
                </section>
            </aside>
        </FocusTrap>
    );
}

export default Modal;
