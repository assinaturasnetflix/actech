/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Mantém o tema escuro como padrão (o HTML terá a classe 'dark')
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}', // Certifique-se de que este caminho corresponde à sua estrutura
  ],
  prefix: "", // Sem prefixo para as classes do Tailwind
  safelist: [ // Classes que podem ser geradas dinamicamente e precisam estar no CSS final
    'border-brand-cyan', 'bg-brand-cyan', 'text-brand-cyan', 'shadow-neon-cyan', 'hover:border-brand-cyan',
    'border-brand-purple', 'bg-brand-purple', 'text-brand-purple', 'shadow-neon-purple', 'hover:border-brand-purple',
    'border-brand-lime', 'bg-brand-lime', 'text-brand-lime', 'shadow-neon-lime', 'hover:border-brand-lime',
    // Adicione aqui outras classes que você usa dinamicamente, como text-color, bg-color, border-color etc.
    // Exemplo: 'text-green-500', 'bg-blue-500'
    // Para os ícones de serviço:
    'bg-brand-cyan', 'text-brand-darkBg', // para o container do ícone
    'bg-brand-purple',
    'bg-brand-lime',
  ],
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
        background: "hsl(var(--background))", // Controlado pelas variáveis CSS no globals.css
        foreground: "hsl(var(--foreground))", // Controlado pelas variáveis CSS no globals.css
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
        accent: {
          DEFAULT: "hsl(var(--accent))", // Shadcn accent color
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))", // Shadcn card color
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores personalizadas da marca AC TECH
        brand: {
          cyan: '#08D9D6',    // Azul-ciano vibrante
          purple: '#C700FF',  // Roxo neon vibrante
          lime: '#A1FF0A',    // Verde limão vibrante
          darkBg: '#121212',  // Fundo escuro principal do site
          cardBg: '#1E1E1E',  // Fundo para cards e elementos destacados
          textPrimary: '#EAEAEA', // Cor de texto principal (claro)
          textSecondary: '#A0A0A0', // Cor de texto secundário (cinza claro)
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
          "50%": { boxShadow: "0 0 15px var(--tw-shadow-color), 0 0 25px var(--tw-shadow-color), 0 0 35px var(--tw-shadow-color)" },
        },
        "float": { // Animação de flutuação suave
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-bright": "pulse-bright 2.5s infinite ease-in-out",
        "float": "float 4s ease-in-out infinite",
      },
      boxShadow: {
        'neon-cyan': '0 0 7px #08D9D6, 0 0 15px #08D9D6, 0 0 25px #08D9D6',
        'neon-purple': '0 0 7px #C700FF, 0 0 15px #C700FF, 0 0 25px #C700FF',
        'neon-lime': '0 0 7px #A1FF0A, 0 0 15px #A1FF0A, 0 0 25px #A1FF0A',
        // Sombras mais sutis para uso geral, se necessário
        'soft-glow-cyan': '0 0 15px rgba(8, 217, 214, 0.5)',
        'soft-glow-purple': '0 0 15px rgba(199, 0, 255, 0.5)',
        'soft-glow-lime': '0 0 15px rgba(161, 255, 10, 0.5)',
      },
      // Adicionando transições mais elaboradas se necessário
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
