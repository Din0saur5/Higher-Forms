/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}', "./node_modules/tailwind-datepicker-react/dist/**/*.js", ],
    theme: {
      extend: {
  
        height: {
         '4/5': "80vh",
         '9/10': "90vh",
        },
        scale: {
          '200': '2.00',
          '225': '2.25',
        },
        width: {
          'bg': 'calc(100vw - 20rem)', 
        },
        margin: {
          'rightside':'calc(100vw-10rem)',
        },
        colors: {
          third: '#af4670',
        },
        aspectRatio: {
          '3/2': '3 / 2',
        },
  
  
  
      },
    },
    plugins: [
      require('daisyui'),
     
    ],
    daisyui:{
      themes: [
        {emerald:{
          ...require("daisyui/src/theming/themes")["emerald"],
            primary: '#af4670',
        }}, "coffee" ]
    }
  }