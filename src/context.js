import React from 'react';

const ColumnsContext = React.createContext();
const TasksContext = React.createContext();
const MoveTasksContext = React.createContext();
const RemoveColumnContext = React.createContext();
const RemoveTaskContext = React.createContext();
const ChangeColumnColorContext = React.createContext();

ColumnsContext.displayName = 'ColumnsContext';
TasksContext.displayName = 'TasksContext';
MoveTasksContext.displayName = 'MoveTasksContext';
RemoveColumnContext.displayName = 'RemoveColumnContext';
RemoveTaskContext.displayName = 'RemoveTaskContext';
ChangeColumnColorContext.displayName = 'ChangeColumnColorContext';

export {
    TasksContext,
    ColumnsContext,
    MoveTasksContext,
    RemoveColumnContext,
    RemoveTaskContext,
    ChangeColumnColorContext,
};
