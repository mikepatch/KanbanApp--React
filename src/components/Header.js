import React from 'react';

import Button from './Button';
import Logo from './Logo';
import List from './List';

import buttonsOptions from '../utilities/buttonsOptions';
import styles from './Header.styles';

function Header({ showAddTaskForm, showAddColumnForm }) {
    const { addTaskButton, addColumnButton } = buttonsOptions;

    addTaskButton.onClick = showAddTaskForm;
    addColumnButton.onClick = showAddColumnForm;

    const navButtons = [addTaskButton, addColumnButton];
    const navItems = navButtons.map(({ id, text, onClick, ...attributes }) => (
        <li key={id}>
            <Button
                options={{ ...attributes }}
                onClick={onClick}
            >
                {text}
            </Button>
        </li>
    ));

    return (
        <header className={styles.root}>
            <Logo />
            <nav>
                <List className={styles.list}>{navItems}</List>
            </nav>
        </header>
    );
}

export default Header;
