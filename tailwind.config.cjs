module.exports = {
    content: ['./src/**/*.{js,jsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                primary: '#1B73E8',
            },
            keyframes: {
                slideL: {
                    '0%': { transform: 'translateX(-300%)' },
                    '40%': { transform: 'translateX(0)' },
                    '70%': { transform: 'translateX(-5%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideSmL: {
                    from: { transform: 'translateX(-2%)' },
                    to: { transform: 'translateX(0)' },
                },
            },
            animation: {
                'slide-from-l': 'slideL .5s linear',
                'slide-from-l-sm': 'slideSmL .3s linear',
            },
        },
    },
    plugins: [],
};
