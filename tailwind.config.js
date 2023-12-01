/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      // isi kelas baru
      animation:{
        'getarSlow' :'getarSlow 1s ease-in-out infinite',
      },
      keyframes :{
        getarSlow :{
          '0%,100%':{transform : 'rotate(-2deg)'},
          '50%' :{transform:'rotate(2deg)'},
        },
      }
    },
  },
  plugins: [],
}