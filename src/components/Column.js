/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Task from './Task';
import { ChangeColumnColorContext, RemoveColumnContext, TasksContext } from '../context';
import Button from './Button';
import buttonsOptions from '../utilities/buttonsOptions';

function Column({ data: { id, columnColor, columnName, limit } }) {
    const [color, setColor] = useState(columnColor);

    const { Consumer: TasksConsumer } = TasksContext;
    const { Consumer: RemoveColumnConsumer } = RemoveColumnContext;
    const { Consumer: ChangeColumnColorConsumer } = ChangeColumnColorContext;

    return (
        <RemoveColumnConsumer>
            {(handleRemoveColumn) => (
                <ChangeColumnColorConsumer>
                    {(handleChangeColumnColor) => (
                        <TasksConsumer>
                            {(tasks) => (
                                <div className="flex flex-col mx-auto md:mx-0 max-w-md  w-full rounded-md">
                                    <header className="flex justify-between p-3 text-center w-full">
                                        <h2 className="relative text-2xl lg:text-3xl">
                                            <div
                                                className="relative hover:scale-110 mr-2 inline-block w-4 h-4 self-center rounded-full transition-all"
                                                style={{ backgroundColor: `${columnColor}` }}
                                            >
                                                <input
                                                    className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                                                    type="color"
                                                    onChange={(e) => setColor(e.target.value)}
                                                    onBlur={() =>
                                                        handleChangeColumnColor(id, color)
                                                    }
                                                />
                                            </div>
                                            {columnName}
                                            <Button
                                                options={buttonsOptions.removeButton}
                                                onClick={() => handleRemoveColumn(id)}
                                            />
                                        </h2>
                                        <small>
                                            {tasks.filter((task) => id === task.idColumn).length} /{' '}
                                            {limit}
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
                </ChangeColumnColorConsumer>
            )}
        </RemoveColumnConsumer>
    );
}

export default Column;
