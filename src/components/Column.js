import React from 'react';
import Task from './Task';
import { TasksContext } from '../context';

// eslint-disable-next-line react/prop-types
function Column({ data: { id, columnName, limit } }) {
    const { Consumer: TasksConsumer } = TasksContext;

    return (
        <TasksConsumer>
            {(tasks) => (
                <div className="flex flex-col items-center w-full rounded-md">
                    <h2 className="flex justify-between p-3 text-center w-full">
                        {columnName}
                        <small>
                            {tasks.filter((task) => id === task.idColumn).length} / {limit}
                        </small>
                    </h2>
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
    );
}

export default Column;
