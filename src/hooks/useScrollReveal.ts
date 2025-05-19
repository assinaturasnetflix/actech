// Este hook não é estritamente necessário se você for usar `whileInView` diretamente.
// Mas pode ser útil para centralizar configurações.

import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealOptions {
  once?: boolean;
  amount?: number | 'some' | 'all';
  margin?: string;
}

export function useScrollReveal(options?: ScrollRevealOptions) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: options?.once ?? true, // Revela apenas uma vez por padrão
    amount: options?.amount ?? 0.3, // 30% do elemento visível para disparar
    margin: options?.margin 
  });

  const animationProps = {
    initial: { opacity: 0, y: 50 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, ease: "easeOut" },
  };
  
  // Para usar com whileInView diretamente no componente:
  const whileInViewProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: options?.once ?? true, amount: options?.amount ?? 0.3 },
    transition: { duration: 0.6, ease: "easeOut" },
  };


  return { ref, animationProps, whileInViewProps, isInView };
}
