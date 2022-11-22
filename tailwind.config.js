/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#0FCFEC",
        
"secondary": "#3A4256",

"info": "#19D3AE",

"accent": "#212121",
        
"neutral": "#1D262F",
        
"base-100": "#FDFEFE",
        
"success": "#117358",
        
"warning": "#AF640D",
        
"error": "#ED6868",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
