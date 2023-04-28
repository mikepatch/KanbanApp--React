import React from 'react';
import { createRoot } from 'react-dom/client';
import KanbanApp from './KanbanApp';

import './index.css';

const root = createRoot(document.querySelector('#root'));
root.render(<KanbanApp />);
