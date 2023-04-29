/* eslint-disable quotes */
const textInputStyles =
    'border border-zinc-500 p-2 rounded-md text-white bg-transparent focus-visible:outline-blue-500 focus-visible:outline focus-visible:outline-2';
const colorInputStyles = 'bg-transparent';

const formsOptions = {
    addTaskForm: {
        title: 'Add task',

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
        title: 'Add column',
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
                placeholder: '',
                required: false,
                pattern: false,
                errorMessage: false,
                styles: colorInputStyles,
            },
        ],
    },
};

export default formsOptions;
