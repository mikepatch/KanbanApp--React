import React from 'react';

const ColumnsContext = React.createContext();
const TasksContext = React.createContext();
const MoveTasksContext = React.createContext();

ColumnsContext.displayName = 'ColumnsContext';
TasksContext.displayName = 'TasksContext';
MoveTasksContext.displayName = 'MoveTasksContext';

export { TasksContext, ColumnsContext, MoveTasksContext };
