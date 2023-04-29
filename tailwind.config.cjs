module.exports = {
    content: ['./src/**/*.{js,jsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                primary: '#1B73E8',
            },
            keyframes: {
                slideB: {
                    from: { transform: 'translateY(-100%)' },
                    to: { transform: 'translateY(0)' },
                },
            },
            animation: {
                'slide-from-t': 'slideB .3s ease-in-out',
            },
        },
    },
    plugins: [],
};
