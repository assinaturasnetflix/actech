import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button'; // Shadcn Button
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'lime' | string; // string para cores customizadas
}

const glowClasses = {
  cyan: 'shadow-neon-cyan hover:shadow-neon-cyan',
  purple: 'shadow-neon-purple hover:shadow-neon-purple',
  lime: 'shadow-neon-lime hover:shadow-neon-lime',
};

export function AnimatedButton({ children, className, glowColor, ...props }: AnimatedButtonProps) {
  const baseClasses = `
    transition-all duration-300 ease-in-out
    transform hover:scale-105 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-darkBg
  `;

  let finalGlowClass = '';
  if (glowColor && glowClasses[glowColor as keyof typeof glowClasses]) {
    finalGlowClass = glowClasses[glowColor as keyof typeof glowClasses];
  } else if (typeof glowColor === 'string') {
    // Se for uma string, assume que é uma classe de sombra customizada ou um valor CSS
    // Para simplificar, aqui vamos apenas aplicar se for uma das keys pré-definidas
    // Ou você pode usar style={{ boxShadow: glowColor }} se for um valor direto
  }


  return (
    <motion.div
      whileHover={{ scale: 1.02 }} // Animação sutil no container do botão
      whileTap={{ scale: 0.98 }}
    >
      <Button
        className={cn(
          baseClasses,
          finalGlowClass,
          "bg-brand-purple text-white hover:bg-opacity-90 px-8 py-3 text-lg font-semibold rounded-lg", // Estilo base do botão
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
    }
