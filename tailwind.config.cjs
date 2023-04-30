module.exports = {
    content: ['./src/**/*.{js,jsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                primary: '#A855F7',
                'primary-dark': '#9333EA',
                secondary: '#71717A',
                'secondary-dark': '#52525B',
                'main-bg': '#3F3F46',
                'main-bg-dark': '#18181B',
                'primary-font': '#F5F5F5',
                alert: '#EF4444',
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
