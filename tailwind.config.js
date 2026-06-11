/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#4F46E5',
        secondary: '#7C3AED',
        success:   '#10B981',
        danger:    '#EF4444',
        warning:   '#F59E0B',
        background:'#F9FAFB',
      }
    }
  },
  plugins: []
}