/* eslint-disable react/prop-types */
import React from 'react';

function SuccessModal({ onClick }) {
    return (
        <aside>
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

// SuccessModal.propTypes = {
//     onClick: PropTypes.func.isRequired,
//     styles: PropTypes.shape({
//         aside: PropTypes.objectOf(PropTypes.string),
//         h1: PropTypes.objectOf(PropTypes.string),
//         p: PropTypes.objectOf(PropTypes.string),
//         button: PropTypes.objectOf(PropTypes.string),
//     }).isRequired,
// };

export default SuccessModal;
