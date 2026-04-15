/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmic: '#0A0A0F',
        lunar: '#1A1A22',
        mist: '#2A2A33',
        'violet-astral': '#1C1333',
        'rose-cosmique': '#2A0F1F',
        'jaune-solaire': '#2A240A',
        'vert-orbitale': '#0F241C',
        'text-secondary': '#A6B0C3',
      },
    },
  },
  plugins: [],
};
