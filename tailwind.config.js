/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif'],
    },
    extend: {
      colors: {
        'main-bg': '#EFF5FF',
        'primary-color': '#483EFF',
        'sky-blue': '#BEE2FD',
        'light-blue': '#ABBCFF',
        'denim': '#022959',
        'light-denim': '#164A8A',
        'gray': '#9699AA',
        'very-light-gray': '#F8F9FF',
        'purple': '#483EFF',
        'light-purple': '#928CFF',
        'border-color': '#D6D9E6',
        'red-errors': '#EE374A',
      },
      backgroundImage: {
        'sidebar-desktop': 'url(/images/bg-sidebar-desktop.svg)',
        'sidebar-mobile': 'url(/images/bg-sidebar-mobile.svg)'
      }
    },
  },
  plugins: [],
}

