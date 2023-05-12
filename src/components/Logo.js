import React from 'react';

import styles from './Logo.styles';

function Logo() {
    return (
        <figure className={styles.root}>
            <h1 className={styles.seoTitle}>Kanban</h1>
            <strong className={styles.logoStart}>kan</strong>
            <strong className={styles.logoEnd}>ban</strong>
        </figure>
    );
}

export default Logo;
