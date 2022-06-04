module.exports = {
  darkMode: "class",
  content: ["./plugins/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "-apple-system", "sans-serif"],
      mono: ["Source Code Pro", "monospace"],
    },
    extend: {
      colors: {
        theme: "var(--theme-color)",
      },
      typography: {
        DEFAULT: {
          css: {
            img: {
              margin: "auto",
            },
            p: {
              marginBottom: "1em",
            },
            li: {
              marginTop: 0,
              marginBottom: 0,
            },
            ".box": {
              position: "relative",
              padding: "18px",
              marginBottom: "16px",
            },
            ".box::after": {
              content: "",
              position: "absolute",
              top: 0,
              left: 0,
              width: "2px",
              height: "100%",
            },
            ".box--info": {
              backgroundColor: "#1a5cff1a",
            },
            ".box--info::after": {
              background: "#1a5cff",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
