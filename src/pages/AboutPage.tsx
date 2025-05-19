import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Eye, Zap, Users, Lightbulb } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const StatCard = ({ icon: Icon, title, description, color }: { icon: React.ElementType, title: string, description: string, color: string }) => {
  const { ref, whileInViewProps } = useScrollReveal({ amount: 0.4 });
  return (
    <motion.div
      ref={ref}
      {...whileInViewProps}
      className={`bg-brand-cardBg p-6 rounded-lg shadow-lg border-l-4 border-${color}`}
    >
      <Icon className={`w-12 h-12 mb-4 text-${color}`} />
      <h3 className={`text-xl font-semibold mb-2 text-${color}`}>{title}</h3>
      <p className="text-brand-textSecondary">{description}</p>
    </motion.div>
  );
};

export function AboutPage() {
  const { ref: titleRef, whileInViewProps: titleAnimation } = useScrollReveal();
  const { ref: missionRef, whileInViewProps: missionAnimation } = useScrollReveal();
  const { ref: visionRef, whileInViewProps: visionAnimation } = useScrollReveal();
  const { ref: experienceRef, whileInViewProps: experienceAnimation } = useScrollReveal();

  return (
    <>
      <Helmet>
        <title>Sobre Nós - {siteConfig.name}</title>
        <meta name="description" content={`Conheça a AC TECH: nossa missão, visão e experiência em desenvolvimento de software e soluções digitais.`} />
      </Helmet>

      <div className="section-padding pt-24 md:pt-32">
        <div className="container mx-auto">
          <motion.div ref={titleRef} {...titleAnimation}>
            <h1 className="impact-title text-center mb-6">Sobre a <span className="text-brand-cyan">AC</span> <span className="text-brand-purple">TECH</span></h1>
            <p className="text-xl text-brand-textSecondary text-center max-w-3xl mx-auto mb-16">
              Somos apaixonados por tecnologia e inovação, dedicados a transformar suas ideias em realidade digital com agilidade e excelência.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div ref={missionRef} {...missionAnimation}>
              <Target className="w-16 h-16 mb-4 text-brand-cyan" />
              <h2 className="text-3xl font-bold mb-4 text-brand-cyan">Nossa Missão</h2>
              <p className="text-brand-textSecondary text-lg leading-relaxed">
                Capacitar negócios e empreendedores através de soluções tecnológicas personalizadas, intuitivas e de alto impacto visual. Buscamos simplificar processos complexos, otimizar a presença online e impulsionar o crescimento de nossos clientes com entregas rápidas e eficientes.
              </p>
            </motion.div>
            <motion.div
              ref={visionRef}
              {...visionAnimation}
              className="relative p-8 bg-brand-cardBg rounded-xl shadow-2xl"
              style={{ '--shadow-color': 'var(--brand-purple)' } as React.CSSProperties}
            >
               <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-purple rounded-full animate-ping opacity-50"></div>
               <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-lime rounded-lg animate-pulse opacity-60"></div>
              <Eye className="w-16 h-16 mb-4 text-brand-purple" />
              <h2 className="text-3xl font-bold mb-4 text-brand-purple">Nossa Visão</h2>
              <p className="text-brand-textSecondary text-lg leading-relaxed">
                Ser referência em desenvolvimento ágil e design inovador no mercado de tecnologia, reconhecidos pela nossa capacidade de entregar valor rapidamente e pela parceria de confiança que construímos com cada cliente, adaptando-nos constantemente às evoluções do mundo digital.
              </p>
            </motion.div>
          </div>

          <motion.div ref={experienceRef} {...experienceAnimation} className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10"><span className="text-brand-lime">Nossa Experiência</span> no Setor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <StatCard
                icon={Zap}
                title="Agilidade e Eficiência"
                description="Processos otimizados para entregas em prazos curtos (2-7 dias úteis para muitos projetos) sem comprometer a qualidade."
                color="brand-cyan"
              />
              <StatCard
                icon={Lightbulb}
                title="Inovação Constante"
                description="Utilizamos as tecnologias mais recentes e as melhores práticas para criar soluções modernas e à prova de futuro."
                color="brand-purple"
              />
              <StatCard
                icon={Users}
                title="Foco no Cliente"
                description="Trabalhamos em estreita colaboração para entender suas necessidades e superar suas expectativas com soluções sob medida."
                color="brand-lime"
              />
            </div>
          </motion.div>
          
          {/* Pode adicionar uma seção de equipe ou valores aqui se desejar */}

        </div>
      </div>
    </>
  );
}
