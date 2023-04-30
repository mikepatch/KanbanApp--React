module.exports = {
    content: ['./src/**/*.{js,jsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                primary: '#1B73E8',
            },
            keyframes: {
                slideB: {
                    '0%': { transform: 'translateY(300%)' },
                    '40%': { transform: 'translateY(0)' },
                    '70%': { transform: 'translateY(5%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                slideSmL: {
                    from: { transform: 'translateX(-2%)' },
                    to: { transform: 'translateX(0)' },
                },
            },
            animation: {
                'slide-from-b': 'slideB .5s linear',
                'slide-from-l-sm': 'slideSmL .3s linear',
            },
        },
    },
    plugins: [],
};
