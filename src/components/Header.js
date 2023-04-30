import React from 'react';

import Button from './Button';
import Logo from './Logo';
import List from './List';

import buttonsOptions from '../utilities/buttonsOptions';

function Header({ showAddTaskForm, showAddColumnForm }) {
    const styles = {
        headerRoot:
            'sticky z-40 top-0 items-center flex justify-between px-4 py-6 md:px-8 bg-secondary-dark drop-shadow-md',
        navList: 'flex gap-4',
    };
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
        <header className={styles.headerRoot}>
            <Logo />
            <nav>
                <List className={styles.navList}>{navItems}</List>
            </nav>
        </header>
    );
}

export default Header;
