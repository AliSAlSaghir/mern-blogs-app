import flowbite from "flowbite-react/tailwind";
import scrollbarPlugin from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      screens: {
        "md-lg": "880px",
      },
    },
  },
  plugins: [flowbite.plugin(), scrollbarPlugin()],
};
