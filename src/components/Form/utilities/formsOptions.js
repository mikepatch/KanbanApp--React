/* eslint-disable quotes */
const styles = {
    textInputStyles:
        'border border-secondary p-2 rounded-md text-white bg-transparent focus-visible:outline-primary focus-visible:outline focus-visible:outline-2',
    colorInputStyles: 'bg-transparent',
};

const {textInputStyles, colorInputStyles } =
    styles;
    
const formsOptions = {
    addTaskForm: {
        title: 'Add new task',
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
                className: textInputStyles,
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
                className: textInputStyles,
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
                className: textInputStyles,
            },
        ],
    },
    addColumnForm: {
        title: 'Add new column',
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
                className: textInputStyles,
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
                className: textInputStyles,
            },
            {
                label: 'Add column color',
                name: 'columnColor',
                id: 'columnColor',
                type: 'color',
                required: false,
                pattern: '',
                errorMessage: '',
                className: colorInputStyles,
                value: '#00ff00',
            },
        ],
    },
};

export default formsOptions;
