import { createContext } from 'react';

const ColumnsContext = createContext(null);
const TasksContext = createContext(null);

ColumnsContext.displayName = 'ColumnsContext';
TasksContext.displayName = 'TasksContext';

export { ColumnsContext, TasksContext };
