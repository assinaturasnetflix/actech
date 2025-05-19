/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Manter tema escuro como padrão, mas permitir alternância se desejar
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // Ex: Cinza escuro principal
        foreground: "hsl(var(--foreground))", // Ex: Texto claro
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: { // Cores de destaque multicoloridas
          DEFAULT: "hsl(var(--accent))", // Pode ser uma delas como padrão
          foreground: "hsl(var(--accent-foreground))",
          cyan: "#00FFFF", // Azul-ciano
          purple: "#A020F0", // Roxo neon (ajustar para neon real)
          lime: "#32CD32",   // Verde limão
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores específicas do tema
        brand: {
          cyan: '#08D9D6',
          purple: '#C700FF', // Roxo neon mais vibrante
          lime: '#A1FF0A',   // Verde limão vibrante
          darkBg: '#121212', // Fundo escuro principal
          cardBg: '#1E1E1E', // Fundo para cards e elementos destacados
          textPrimary: '#EAEAEA',
          textSecondary: '#A0A0A0',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-bright": { // Animação para botões e destaques
          "0%, 100%": { boxShadow: "0 0 5px var(--tw-shadow-color), 0 0 10px var(--tw-shadow-color)" },
          "50%": { boxShadow: "0 0 15px var(--tw-shadow-color), 0 0 25px var(--tw-shadow-color)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-bright": "pulse-bright 2s infinite ease-in-out",
        "float": "float 3s ease-in-out infinite",
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #08D9D6, 0 0 10px #08D9D6, 0 0 15px #08D9D6, 0 0 20px #08D9D6',
        'neon-purple': '0 0 5px #C700FF, 0 0 10px #C700FF, 0 0 15px #C700FF, 0 0 20px #C700FF',
        'neon-lime': '0 0 5px #A1FF0A, 0 0 10px #A1FF0A, 0 0 15px #A1FF0A, 0 0 20px #A1FF0A',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
