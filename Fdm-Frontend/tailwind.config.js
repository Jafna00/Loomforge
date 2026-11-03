/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Inter', 'sans-serif'],
        'display': ['"Anton"', 'sans-serif'],   // used by font-display (uppercase headlines)
        // font-serif and font-mono already exist in Tailwind by default,
        // so you don't need to add them unless you want specific font names
      },
      colors: {
        ink: '#1a1a1a',
        paper: '#f7f4ee',
        oxblood: '#7c2d2d',
        ochre: '#c98a3f',
        stone: '#8a8378',
        stone2: '#5c564c',
      },
      letterSpacing: {
        tightest: '-0.05em',   // used by tracking-tightest
        widest2: '0.25em',     // used by tracking-widest2
      },
    },
  },
  plugins: [],
}