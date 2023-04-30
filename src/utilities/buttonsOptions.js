const buttonStyles =
    'text-xs md:text-base bg-primary hover:bg-primary-dark py-1 px-4 rounded-full text-white ease-in-out duration-100';
const removeColumnButtonStyles =
    'self-start hover:scale-125 text-sm text-alert cursor-pointer font-bold linear duration-100';
const moveTaskButtonStyles =
    'bg-purple-500 hover:bg-purple-600 py-1 px-4 rounded-full text-white ease-in-out duration-100';
const removeTaskButtonStyles =
    'absolute top-1 right-5 hover:scale-125 text-red-500 text-md cursor-pointer font-bold linear duration-100';

const buttonsOptions = {
    addTaskButton: { id: 'addTask', className: buttonStyles, text: 'Add task' },
    addColumnButton: { id: 'addColumn', className: buttonStyles, text: 'Add column' },
    modalCloseButton: { className: buttonStyles, text: 'Close' },
    removeColumn: { className: removeColumnButtonStyles },
    moveTaskButton: { className: moveTaskButtonStyles },
    removeTaskButton: { className: removeTaskButtonStyles },
};

export default buttonsOptions;
