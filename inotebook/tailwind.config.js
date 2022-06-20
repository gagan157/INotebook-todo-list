module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('https://cdn.pixabay.com/photo/2018/07/12/21/32/subscribe-3534409_960_720.jpg')",
        'singnup-bg': "url('https://cdn.pixabay.com/photo/2020/02/17/18/12/office-4857268_960_720.jpg')",
        
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
