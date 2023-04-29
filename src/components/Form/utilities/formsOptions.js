/* eslint-disable quotes */
const formModalStyles =
    'flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60';
const formElementStyles =
    'flex flex-col gap-6 py-8 px-10 bg-zinc-600 drop-shadow-sm rounded-md w-11/12 max-w-md animate-slide-from-l';
const textInputStyles =
    'border border-zinc-500 p-2 rounded-md text-white bg-transparent focus-visible:outline-blue-500 focus-visible:outline focus-visible:outline-2';
const colorInputStyles = 'bg-transparent';
const formButtonStyles =
    'bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-full ease-in-out duration-100 cursor-pointer w-full';

const formsOptions = {
    addTaskForm: {
        title: 'Add new task',
        formModalStyles,
        formElementStyles,
        formButtonStyles,
        fields: [
            {
                label: 'Task name',
                name: 'taskName',
                id: 'taskName',
                type: 'text',
                placeholder: 'e.g Order pizza',
                required: true,
                pattern: "\\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*)+",
                errorMessage: 'Name is invalid.',
                styles: textInputStyles,
            },
            {
                label: 'Your name',
                name: 'userName',
                id: 'userName',
                type: 'text',
                placeholder: 'Enter Your Name',
                required: true,
                pattern: "\\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*)+",
                errorMessage: 'Name is invalid.',
                styles: textInputStyles,
            },
            {
                label: 'Description',
                name: 'description',
                id: 'description',
                type: 'text',
                placeholder:
                    'e.g We are hungry. We need to think about the best way to order a delicious pizza.',
                required: true,
                pattern: '',
                errorMessage: 'Description is invalid.',
                rows: 5,
                textarea: true,
                styles: textInputStyles,
            },
        ],
    },
    addColumnForm: {
        title: 'Add new column',
        formModalStyles,
        formElementStyles,
        formButtonStyles,
        fields: [
            {
                label: 'Column Name',
                name: 'columnName',
                id: 'columnName',
                type: 'text',
                placeholder: 'e.g TO-DO',
                required: true,
                pattern: "\\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*)+",
                errorMessage: 'Name is invalid.',
                styles: textInputStyles,
            },
            {
                label: 'Tasks limit',
                name: 'limit',
                id: 'limit',
                type: 'number',
                placeholder: 'Set maximum tasks number (e.g 4)',
                required: true,
                pattern: '^[1-9][0-9]*$',
                errorMessage: 'Maximum tasks number is invalid',
                styles: textInputStyles,
            },
            {
                label: 'Add column color',
                name: 'columnColor',
                id: 'columnColor',
                type: 'color',
                required: false,
                pattern: false,
                errorMessage: false,
                styles: colorInputStyles,
                value: '#00ff00',
            },
        ],
    },
};

export default formsOptions;
