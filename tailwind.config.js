/**@type {import ('tailwindcss').config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
        extend: {
        colors: {
            'primary': '#1E40AF',
            'secondary': '#FBBF24',
            'accent': '#F472B6',
            'background': '#0F172A',
            'text': '#F8FAFC',
            success: '#10B981',
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        backgroundSize: {
            '100-100': '100% 100%',
        },
    },
    },
    plugins: [],
}