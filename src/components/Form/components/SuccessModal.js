import React from 'react';

function SuccessModal({ styles, onClick }) {
    return (
        <aside className={styles}>
            <h3>Thank you for your message.</h3>
            <p>We will do our best to answer you as soon as possible.</p>
            <button
                type="button"
                onClick={onClick}
            >
                Close
            </button>
        </aside>
    );
}

export default SuccessModal;
