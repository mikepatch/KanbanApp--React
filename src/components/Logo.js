import React from 'react';

function Logo() {
    const styles = {
        logoRoot: 'text-3xl tracking-tight select-none',
        seoTitle: 'hidden',
        logoStart: 'bg-primary rounded-l-xl rounded-r-sm pl-2 bg-opacity-70 text-main-font pr-0.5',
        logoEnd: 'text-primary',
    };

    return (
        <figure className={styles.logoRoot}>
            <h1 className={styles.seoTitle}>Kanban</h1>
            <strong className={styles.logoStart}>kan</strong>
            <strong className={styles.logoEnd}>ban</strong>
        </figure>
    );
}

export default Logo;
