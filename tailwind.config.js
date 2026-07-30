export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          50: '#eef4ff',
          100: '#dce8ff',
          500: '#3b5bdb',
          600: '#2f4ac0',
          700: '#243a96',
          900: '#152352',
        },
      },
      backgroundImage: {
        'campus-gradient': 'linear-gradient(135deg, #152352 0%, #243a96 45%, #3b5bdb 100%)',
        'page-gradient': 'linear-gradient(180deg, #eef4ff 0%, #f8fafc 40%, #f1f5f9 100%)',
      },
    },
  },
  plugins: [],
}
