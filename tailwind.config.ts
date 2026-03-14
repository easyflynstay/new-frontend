import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        navy: "#0B1F3B",
        gold: "#C9A227",
        charcoal: "#2C2C2C",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Libre Baskerville", "serif"],
        body: ["var(--font-inter)", "Inter", "Open Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0",
        none: "0",
        sm: "0",
        md: "0",
        lg: "0",
        full: "9999px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(11, 31, 59, 0.08)",
        "card-hover": "0 8px 24px rgba(11, 31, 59, 0.12)",
      },
      keyframes: {
        chatSlideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        caretBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "chat-slide-up": "chatSlideUp 0.3s ease-out",
        "caret-blink": "caretBlink 0.8s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
