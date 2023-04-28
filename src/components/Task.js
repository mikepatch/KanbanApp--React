/* eslint-disable no-param-reassign */
import React from 'react';
import { MoveTasksContext } from '../context';

// eslint-disable-next-line react/prop-types
function Task({ data: { id, idColumn, name, user } }) {
    // const handleMoveTask = (e) => {
    //     console.log(e.target);

    //     console.log(idColumn);
    //     if (e.target.id === 'next') idColumn += 1;
    //     else idColumn -= 1;
    // };

    const { Consumer } = MoveTasksContext;
    const buttonStyle =
        'bg-blue-400 hover:bg-blue-500 px-2 rounded-full text-white ease-in-out duration-100';
    return (
        <Consumer>
            {(handleMoveTask) => (
                <li className="flex flex-col gap-2 bg-zinc-600 bg-opacity-70 p-4 rounded-md drop-shadow-sm">
                    <button
                        className="font-bold hover:text-purple-400 ease-in-out duration-100"
                        type="button"
                    >
                        <h3>{name}</h3>
                    </button>
                    <address>Added by {user}</address>
                    <div className="flex gap-2 justify-center">
                        {idColumn !== 1 ? (
                            <button
                                className={buttonStyle}
                                id="prev"
                                type="button"
                                onClick={(e) => handleMoveTask(e.currentTarget, { id, idColumn })}
                            >
                                Prev
                            </button>
                        ) : null}
                        <button
                            className="bg-purple-400 hover:bg-purple-500 px-2 rounded-full text-white ease-in-out duration-100"
                            id="next"
                            type="button"
                            onClick={(e) => handleMoveTask(e.currentTarget, { id, idColumn })}
                        >
                            Next
                        </button>
                    </div>
                </li>
            )}
        </Consumer>
    );
}

export default Task;
