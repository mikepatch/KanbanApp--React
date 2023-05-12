import React from 'react';
import FocusTrap from 'focus-trap-react';

import Button from './Button';

import buttonsOptions from '../utilities/buttonsOptions';
import { accessibleOnClick } from '../utilities/helpers';
import styles from './Modal.styles';

function Modal({ data: { title, text }, closeModal }) {

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
