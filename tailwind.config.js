/** @type {import('tailwindcss').Config} */
// Config de Tailwind para el build local (antes se cargaba por CDN).
// Los colores apuntan a las variables CSS de index.css, por eso el tema
// claro/oscuro sigue funcionando igual.
module.exports = {
    content: ['./index.html', './js/**/*.js'],
    theme: {
        extend: {
            colors: {
                // Tokens mapeados a variables CSS → cambio de tema automático
                navy: {
                    950: 'rgb(var(--c-navy-950) / <alpha-value>)',
                    900: 'rgb(var(--c-navy-900) / <alpha-value>)',
                    800: 'rgb(var(--c-navy-800) / <alpha-value>)',
                    700: 'rgb(var(--c-navy-700) / <alpha-value>)',
                    600: 'rgb(var(--c-navy-600) / <alpha-value>)',
                },
                slate: {
                    900: 'rgb(var(--c-slate-900) / <alpha-value>)',
                    800: 'rgb(var(--c-slate-800) / <alpha-value>)',
                    700: 'rgb(var(--c-slate-700) / <alpha-value>)',
                    600: 'rgb(var(--c-slate-600) / <alpha-value>)',
                    500: 'rgb(var(--c-slate-500) / <alpha-value>)',
                    400: 'rgb(var(--c-slate-400) / <alpha-value>)',
                    300: 'rgb(var(--c-slate-300) / <alpha-value>)',
                    200: 'rgb(var(--c-slate-200) / <alpha-value>)',
                },
                blue: {
                    700: 'rgb(var(--c-blue-700) / <alpha-value>)',
                    600: 'rgb(var(--c-blue-600) / <alpha-value>)',
                    500: 'rgb(var(--c-blue-500) / <alpha-value>)',
                    400: 'rgb(var(--c-blue-400) / <alpha-value>)',
                    300: 'rgb(var(--c-blue-300) / <alpha-value>)',
                },
                sky: {
                    300: 'rgb(var(--c-sky-300) / <alpha-value>)',
                },
                cyan: {
                    400: 'rgb(var(--c-cyan-400) / <alpha-value>)',
                    500: 'rgb(var(--c-cyan-500) / <alpha-value>)',
                },
                red: {
                    400: 'rgb(var(--c-red-400) / <alpha-value>)',
                },
                emerald: {
                    400: 'rgb(var(--c-emerald-400) / <alpha-value>)',
                },
                // Alias para compatibilidad
                primario: 'rgb(var(--c-navy-900) / <alpha-value>)',
                segundario: 'rgb(var(--c-navy-800) / <alpha-value>)',
                oscuro: 'rgb(var(--c-navy-950) / <alpha-value>)',
                resaltar: 'rgb(var(--c-blue-600) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'slide-in': 'slideIn 0.5s ease-out forwards',
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.4s ease-out forwards',
            },
            keyframes: {
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
