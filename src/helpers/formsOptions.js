/* eslint-disable quotes */

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
                errorMessage: 'Name is invalid.',
                rows: 5,
                textarea: true,
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
            },
        ],
    },
};

export default formsOptions;
