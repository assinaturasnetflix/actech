import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Code, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { useScrollReveal } from '@/hooks/useScrollReveal'; // Hook para animação de scroll

// Dados dos serviços para destaque
const highlightedServices = [
  {
    icon: Code,
    title: "Websites Profissionais",
    description: "Design moderno, responsivo e otimizado para performance.",
    color: "brand-cyan",
    shadow: "shadow-neon-cyan",
    link: "/servicos#sites"
  },
  {
    icon: ShoppingCart,
    title: "Lojas Online (E-commerce)",
    description: "Soluções completas para você vender mais e gerenciar seu negócio.",
    color: "brand-purple",
    shadow: "shadow-neon-purple",
    link: "/servicos#ecommerce"
  },
  {
    icon: Smartphone,
    title: "Apps Mobile (Android/iOS)",
    description: "Aplicativos nativos e intuitivos para alcançar seus clientes onde estiverem.",
    color: "brand-lime",
    shadow: "shadow-neon-lime",
    link: "/servicos#mobile"
  },
];

// Elemento visual flutuante no topo
const FloatingTopElement = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center p-4"
    >
      <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tighter">
        <span className="text-brand-cyan">AC</span>
        <span className="text-brand-purple"> T</span>
        <span className="text-brand-lime">ECH</span>
      </Link>
    </motion.div>
  );
};

export function HomePage() {
  const { ref: ctaRef, whileInViewProps: ctaAnimation } = useScrollReveal();
  const { ref: servicesTitleRef, whileInViewProps: servicesTitleAnimation } = useScrollReveal();

  return (
    <>
      <Helmet>
        <title>{siteConfig.name} - Soluções Digitais Inovadoras</title>
        <meta name="description" content="AC TECH: Transformamos ideias em soluções digitais reais. Criação de websites, aplicativos mobile e sistemas personalizados com entrega rápida e eficiente." />
      </Helmet>

      <FloatingTopElement />

      <div className="relative min-h-screen flex flex-col items-center justify-center section-padding text-center pt-24 md:pt-32 overflow-hidden">
        {/* Background elements (opcional, para efeito "pesado") */}
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Adicionar SVGs, gradientes, ou patterns aqui */}
          <Zap size={200} className="absolute top-1/4 left-1/4 text-brand-cyan animate-float" />
          <Code size={150} className="absolute bottom-1/4 right-1/4 text-brand-purple animate-float animation-delay-1000" />
        </div>

        <motion.div
          ref={ctaRef}
          {...ctaAnimation}
          className="z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter mb-8">
            <span className="block leading-tight">Transformamos <span className="text-brand-cyan">Ideias</span> em</span>
            <span className="block leading-tight"><span className="text-brand-purple">Soluções</span> Digitais <span className="text-brand-lime">Reais</span></span>
          </h1>
          <p className="text-lg md:text-xl text-brand-textSecondary mb-10 max-w-2xl mx-auto">
            Criação de websites, aplicativos mobile e sistemas personalizados. Entregas rápidas, eficientes e com alto padrão visual.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <AnimatedButton glowColor="cyan" size="lg" asChild>
              <Link to="/orcamento">Quero um Orçamento</Link>
            </AnimatedButton>
            <AnimatedButton variant="outline" glowColor="lime" size="lg" className="border-brand-lime text-brand-lime hover:bg-brand-lime hover:text-brand-darkBg" asChild>
              <Link to="/servicos">Nossos Serviços <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* Resumo dos Serviços */}
      <section className="section-padding bg-brand-cardBg">
        <div className="container mx-auto">
          <motion.h2
            ref={servicesTitleRef}
            {...servicesTitleAnimation}
            className="impact-title text-center mb-12 md:mb-16"
          >
            Soluções que <span className="text-brand-cyan">Impulsionam</span> seu Negócio
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlightedServices.map((service, index) => {
              const { ref: serviceRef, whileInViewProps: serviceAnimation } = useScrollReveal({amount: 0.2});
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  ref={serviceRef}
                  {...serviceAnimation}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-8 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2
                              border-2 border-transparent hover:border-${service.color} ${service.shadow}
                              flex flex-col items-center text-center`}
                >
                  <div className={`p-4 rounded-full bg-${service.color} mb-6 inline-block`}>
                    <Icon size={40} className="text-brand-darkBg" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 text-${service.color}`}>{service.title}</h3>
                  <p className="text-brand-textSecondary mb-6 flex-grow">{service.description}</p>
                  <Link to={service.link} className={`mt-auto text-${service.color} font-semibold hover:underline flex items-center`}>
                    Saiba Mais <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
       {/* ... Adicionar FAQ aqui ... */}
    </>
  );
}
