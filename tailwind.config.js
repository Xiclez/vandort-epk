/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-bg)",
        elevated: "var(--color-bg-elevated)",
        surface: "var(--color-surface)",
        bone: "var(--color-bone)",
        muted: "var(--color-muted)",
        line: "var(--color-border)",
        blood: "var(--color-blood)",
        "blood-bright": "var(--color-blood-bright)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      letterSpacing: {
        ritual: "0.35em",
      },
    },
  },
  plugins: [],
};
