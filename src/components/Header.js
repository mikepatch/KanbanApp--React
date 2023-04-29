import React from 'react';

import Button from './Button';

import buttonsOptions from '../utilities/buttonsOptions';

function Header({ showAddTaskForm, showAddColumnForm }) {
    return (
        <header className="sticky z-50 top-0 items-center flex justify-between px-4 py-4 md:px-8 bg-zinc-600 drop-shadow-md">
            <h1>kanban</h1>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Button
                            options={buttonsOptions.addTaskButton}
                            onClick={showAddTaskForm}
                        />
                    </li>
                    <li>
                        <Button
                            options={buttonsOptions.addColumnButton}
                            onClick={showAddColumnForm}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
