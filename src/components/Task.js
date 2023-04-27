import React from 'react';
// import { TasksContext } from '../context';

// eslint-disable-next-line react/prop-types
function Task({data: {name, user}}) {
    // const { Consumer } = TasksContext;

    return <p>{name} {user}</p>
}

export default Task;
