import React from 'react';
import { ColumnsContext, MoveTasksContext, RemoveTaskContext } from '../context';

// eslint-disable-next-line react/prop-types
function Task({ data: { id, idColumn, taskName, userName } }) {
    const { Consumer: MoveTasksConsumer } = MoveTasksContext;
    const { Consumer: ColumnsConsumer } = ColumnsContext;
    const { Consumer: RemoveTaskConsumer } = RemoveTaskContext;
    const buttonStyle =
        'bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-full text-white ease-in-out duration-100';

    return (
        <MoveTasksConsumer>
            {(handleMoveTask) => (
                <RemoveTaskConsumer>
                    {(handleRemoveTask) => (
                        <li className="flex flex-col gap-2 bg-zinc-600 p-4 rounded-md drop-shadow-sm relative">
                            <button
                                className="font-bold text-left hover:text-purple-500 ease-in-out duration-100"
                                type="button"
                            >
                                <h3 className=" text-xl">{taskName}</h3>
                            </button>
                            <address className="text-right">Added by {userName}</address>
                            <button
                                className="absolute top-1 right-5 text-red-500 text-md cursor-pointer font-bold"
                                type="button"
                                onClick={() => handleRemoveTask(id)}
                            >
                                x
                            </button>
                            <ColumnsConsumer>
                                {(columns) => (
                                    <div className="flex gap-2 justify-center mt-2">
                                        {idColumn !== 1 ? (
                                            <button
                                                className={buttonStyle}
                                                id="prev"
                                                type="button"
                                                onClick={(e) =>
                                                    handleMoveTask(e.currentTarget, {
                                                        id,
                                                        idColumn,
                                                    })
                                                }
                                            >
                                                Prev
                                            </button>
                                        ) : null}
                                        {idColumn !== columns.length ? (
                                            <button
                                                className="bg-purple-500 hover:bg-purple-600 py-1 px-4 rounded-full text-white ease-in-out duration-100"
                                                id="next"
                                                type="button"
                                                onClick={(e) =>
                                                    handleMoveTask(e.currentTarget, {
                                                        id,
                                                        idColumn,
                                                    })
                                                }
                                            >
                                                Next
                                            </button>
                                        ) : null}
                                    </div>
                                )}
                            </ColumnsConsumer>
                        </li>
                    )}
                </RemoveTaskConsumer>
            )}
        </MoveTasksConsumer>
    );
}

export default Task;
