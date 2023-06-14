/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#6ca5d1",         
          "secondary": "#addcea",                   
          "accent": "#495eaf",                  
          "neutral": "#2d1f33",        
          "base-100": "#323539",                  
          "info": "#a3b5ef",                  
         "success": "#15a27a",                  
         "warning": "#f7c059",           
          "error": "#f86898",
        },
      },
      {
        mytheme: {
          primary: "#db0267",
          secondary: "#f4b5bb",
          accent: "#78a6e2",
          neutral: "#19222e",
          "base-100": "#edf0f2",
          info: "#6596d2",
          success: "#1c824c",
          warning: "#d07c16",
          error: "#ee5a58",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
