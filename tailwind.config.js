/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kubh: ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        orange: {
          dark: "hsl(26, 100%, 55%)",
          light: "hsl(25, 100%, 70%)",
        },
        "dark-blue": "hsl(220, 13%, 13%)",
        "dark-gray-blue": "hsl(219, 9%, 45%)",
        "gray-blue": "hsl(220, 14%, 75%)",
        "gray-blue-light": "hsl(223, 64%, 98%)",
      },
    },
  },
  plugins: [],
};
