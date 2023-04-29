const buttonStyles =
    'bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-full text-white ease-in-out duration-100';
const removeButtonStyles =
    'absolute top-0 -right-5 hover:scale-125 text-sm text-red-500 cursor-pointer font-bold linear duration-100';
// const className = 'hover:scale'
const buttonsOptions = {
    addTaskButton: { className: buttonStyles, type: 'button', text: 'Add task' },
    addColumnButton: { className: buttonStyles, type: 'button', text: 'Add column' },
    modalCloseButton: { className: buttonStyles, type: 'button', text: 'Close' },
    removeButton: { className: removeButtonStyles, type: 'button', text: 'x' },
};

export default buttonsOptions;
