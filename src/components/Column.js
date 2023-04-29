import React from 'react';
import Task from './Task';
import { RemoveColumnContext, TasksContext } from '../context';

// eslint-disable-next-line react/prop-types
function Column({ data: { id, columnColor, columnName, limit } }) {
    const { Consumer: TasksConsumer } = TasksContext;
    const { Consumer: RemoveColumnConsumer } = RemoveColumnContext;

    return (
        <RemoveColumnConsumer>
            {(handleRemoveColumn) => (
                <TasksConsumer>
                    {(tasks) => (
                        <div className="flex flex-col max-w-md items-center w-full rounded-md">
                            <header className="flex justify-between p-3 text-center w-full">
                                <h2 className="relative">
                                    {' '}
                                    <div
                                        className="mr-2 inline-block w-4 h-4 self-center rounded-full"
                                        style={{ backgroundColor: `${columnColor}` }}
                                    />
                                    {columnName}
                                    <button
                                        className="absolute top-0 -right-5 text-sm text-red-500 cursor-pointer"
                                        type="button"
                                        onClick={() => handleRemoveColumn(id)}
                                    >
                                        x
                                    </button>
                                </h2>
                                <small>
                                    {tasks.filter((task) => id === task.idColumn).length} / {limit}
                                </small>
                            </header>
                            <ul className="flex flex-col gap-4 py-4 w-full">
                                {tasks.map(
                                    (task) =>
                                        id === task.idColumn && (
                                            <Task
                                                key={task.id}
                                                data={task}
                                            />
                                        ),
                                )}
                            </ul>
                        </div>
                    )}
                </TasksConsumer>
            )}
        </RemoveColumnConsumer>
    );
}

export default Column;
