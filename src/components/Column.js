import React from 'react';
import Task from './Task';
import { ColumnsContext, TasksContext } from '../context';

function Column() {
    const { Consumer: ColumnsConsumer } = ColumnsContext;
    const { Consumer: TasksConsumer } = TasksContext;

    return (
        <ColumnsConsumer>
            {(columns) =>
                columns.map((column) => (
                    <div key={column.id}>
                        <h2>{column.name}</h2>
                        <TasksConsumer key={column.id}>
                            {(tasks) =>
                                tasks.map(
                                    (task) =>
                                        column.id === task.idColumn && (
                                            <Task
                                                key={task.id}
                                                data={task}
                                            />
                                        ),
                                )
                            }
                        </TasksConsumer>
                    </div>
                ))
            }
        </ColumnsConsumer>
    );
}

export default Column;
