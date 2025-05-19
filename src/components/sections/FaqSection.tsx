import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqData = [
  {
    question: "Quanto tempo leva para meu site ficar pronto?",
    answer: "Dependendo da complexidade, um site institucional pode ser entregue entre 2 a 7 dias úteis. Projetos maiores como e-commerce ou sistemas personalizados têm prazos específicos definidos após análise.",
    value: "item-1",
  },
  {
    question: "O que está incluído no serviço de criação de sites?",
    answer: "Inclui design responsivo, otimização básica para SEO, integração com WhatsApp/Redes Sociais, e para novos sites, geralmente oferecemos domínio e hospedagem por 1 ano.",
    value: "item-2",
  },
  {
    question: "Vocês oferecem suporte após a entrega do projeto?",
    answer: "Sim, oferecemos um período de suporte para correções e ajustes pós-entrega. Planos de manutenção contínua também estão disponíveis para garantir que seu projeto permaneça atualizado e funcional.",
    value: "item-3",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Normalmente, solicitamos um pagamento inicial (ex: 50%) para começar o projeto e o restante na entrega. Aceitamos diversas formas de pagamento, incluindo transferências, M-Pesa e e-Mola.",
    value: "item-4",
  },
];

export function FaqSection() {
  const { ref: titleRef, whileInViewProps: titleAnimation } = useScrollReveal();
  const { ref: accordionRef, whileInViewProps: accordionAnimation } = useScrollReveal({amount: 0.1});

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div ref={titleRef} {...titleAnimation} className="text-center mb-12">
          <HelpCircle className="mx-auto text-brand-purple h-16 w-16 mb-4" />
          <h2 className="impact-title">Dúvidas <span className="text-brand-purple">Frequentes</span></h2>
        </motion.div>
        <motion.div
          ref={accordionRef}
          {...accordionAnimation}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={faq.value} value={faq.value} className="border-b-gray-700">
                <AccordionTrigger className="text-left text-lg hover:no-underline text-brand-textPrimary hover:text-brand-purple data-[state=open]:text-brand-purple transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-textSecondary text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
      }
