import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Code, ShoppingCart, Smartphone, DatabaseZap, CheckCircle, DollarSign, Clock, Package, Bell, Globe, Search, Settings, Users, BarChart, ShieldCheck, Cloud } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const servicesData = [
  {
    id: "sites",
    icon: Code,
    title: "Criação de Sites Profissionais",
    price: "desde 10.000 MZN",
    delivery: "Entrega entre 2 a 7 dias úteis",
    color: "brand-cyan",
    shadow: "shadow-neon-cyan",
    description: "Websites impactantes, responsivos e otimizados para converter visitantes em clientes.",
    includes: [
      { icon: CheckCircle, text: "Design Responsivo (Mobile, Tablet, Desktop)" },
      { icon: Globe, text: "Domínio e Hospedagem por 1 ano inclusos" },
      { icon: Smartphone, text: "Integração com WhatsApp e Redes Sociais" },
      { icon: Search, text: "Otimização básica para Google (SEO)" },
    ],
    benefits: [
      { icon: Zap, text: "Presença online profissional e moderna" },
      { icon: Users, text: "Maior alcance e visibilidade para sua marca" },
      { icon: DollarSign, text: "Excelente custo-benefício e retorno rápido" },
    ]
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "Lojas Online (E-commerce)",
    price: "desde 18.000 MZN",
    delivery: "Entrega entre 2 a 7 dias úteis",
    color: "brand-purple",
    shadow: "shadow-neon-purple",
    description: "Plataformas de e-commerce robustas e fáceis de gerenciar para você vender 24/7.",
    includes: [
      { icon: Package, text: "Carrinho de compras e gestão de produtos/estoque" },
      { icon: DollarSign, text: "Integração com pagamentos (M-Pesa, e-Mola, Cartões)" },
      { icon: Settings, text: "Painel de administração intuitivo" },
      { icon: Bell, text: "E-mails e/ou SMS automáticos de transação" },
    ],
    benefits: [
      { icon: Zap, text: "Venda seus produtos online de forma eficiente" },
      { icon: BarChart, text: "Aumente suas vendas e expanda seu mercado" },
      { icon: Clock, text: "Automatize processos e economize tempo" },
    ]
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Apps Mobile (Android/iOS)",
    price: "desde 25.000 MZN",
    delivery: "Entrega entre 2 a 7 dias úteis",
    color: "brand-lime",
    shadow: "shadow-neon-lime",
    description: "Aplicativos móveis nativos ou híbridos para engajar seus usuários e oferecer serviços inovadores.",
    includes: [
      { icon: Package, text: "Publicação na Play Store (e App Store sob consulta)" },
      { icon: Bell, text: "Notificações Push para engajamento" },
      { icon: Globe, text: "Integração com serviços e APIs locais/externas" },
      { icon: Users, text: "Interface intuitiva e focada na experiência do usuário" },
    ],
    benefits: [
      { icon: Zap, text: "Alcance seus clientes diretamente no celular" },
      { icon: Users, text: "Fidelize usuários e crie um canal de comunicação direto" },
      { icon: Lightbulb, text: "Ofereça funcionalidades inovadoras e se destaque" }, // Usando Lightbulb de AboutPage
    ]
  },
  {
    id: "custom",
    icon: DatabaseZap,
    title: "Sistemas Web Personalizados",
    price: "Orçamento sob consulta",
    delivery: "Prazo definido conforme o projeto",
    color: "brand-cyan", // Reutilizando cor para variedade
    shadow: "shadow-neon-cyan",
    description: "Soluções sob medida para otimizar processos, gerenciar dados e integrar sistemas.",
    includes: [
      { icon: Settings, text: "ERPs, CRMs, sistemas de gestão escolar, etc." },
      { icon: BarChart, text: "Geração de relatórios e dashboards analíticos" },
      { icon: Users, text: "Gestão de permissões e níveis de acesso" },
      { icon: Cloud, text: "Integrações com APIs de terceiros e sistemas legados" },
    ],
    benefits: [
      { icon: Zap, text: "Automatize tarefas e aumente a produtividade" },
      { icon: ShieldCheck, text: "Segurança robusta e escalabilidade para o futuro" },
      { icon: Settings, text: "Solução 100% adaptada às suas necessidades específicas" },
    ]
  }
];

const ServiceSection = ({ service }: { service: typeof servicesData[0] }) => {
  const { ref, whileInViewProps } = useScrollReveal({ amount: 0.15 });
  const Icon = service.icon;

  return (
    <motion.section
      id={service.id}
      ref={ref}
      {...whileInViewProps}
      className={`section-padding my-12 rounded-2xl bg-brand-cardBg border-t-8 border-${service.color} ${service.shadow} relative overflow-hidden`}
    >
      {/* Elemento decorativo */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 md:w-48 md:h-48 bg-${service.color} opacity-10 rounded-full animate-pulse`}></div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-left">
            <Icon size={80} className={`mx-auto md:mx-0 mb-6 text-${service.color} animate-float`} />
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-${service.color}`}>{service.title}</h2>
            <p className={`text-lg font-semibold text-${service.color} mb-1`}>{service.price}</p>
            <p className="text-sm text-brand-textSecondary mb-6">{service.delivery}</p>
            <AnimatedButton glowColor={service.color.split('-')[1] as any} asChild className={`bg-${service.color} hover:opacity-90`}>
              <Link to="/orcamento">Solicitar Orçamento</Link>
            </AnimatedButton>
          </div>

          <div className="md:col-span-8">
            <p className="text-lg text-brand-textSecondary mb-8">{service.description}</p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-brand-textPrimary">O que está incluído:</h4>
                <ul className="space-y-2">
                  {service.includes.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <motion.li 
                        key={idx} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                      >
                        <ItemIcon className={`w-5 h-5 mr-3 mt-1 text-${service.color} flex-shrink-0`} />
                        <span className="text-brand-textSecondary">{item.text}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-brand-textPrimary">Benefícios Visuais:</h4>
                <ul className="space-y-2">
                  {service.benefits.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <motion.li 
                        key={idx} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                      >
                        <ItemIcon className={`w-5 h-5 mr-3 mt-1 text-${service.color} flex-shrink-0`} />
                        <span className="text-brand-textSecondary">{item.text}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export function ServicesPage() {
  const { ref: titleRef, whileInViewProps: titleAnimation } = useScrollReveal();
  return (
    <>
      <Helmet>
        <title>Nossos Serviços - {siteConfig.name}</title>
        <meta name="description" content="Conheça os serviços da AC TECH: criação de sites, lojas online, aplicativos mobile e sistemas web personalizados." />
      </Helmet>

      <div className="pt-24 md:pt-32 section-padding">
        <div className="container mx-auto">
          <motion.div ref={titleRef} {...titleAnimation} className="text-center mb-16">
            <h1 className="impact-title mb-4">Nossos <span className="text-brand-cyan">Serviços</span></h1>
            <p className="text-xl text-brand-textSecondary max-w-2xl mx-auto">
              Soluções digitais criativas e eficientes, adaptadas para o sucesso do seu projeto.
            </p>
          </motion.div>

          {servicesData.map((service) => (
            <ServiceSection key={service.id} service={service} />
          ))}
        </div>
      </div>
    </>
  );
          }
