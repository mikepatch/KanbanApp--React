import React from 'react';
import { createRoot } from 'react-dom/client';
import KanbanApp from './KanbanApp';

const root = createRoot(document.querySelector('#root'));
root.render(<KanbanApp />);
