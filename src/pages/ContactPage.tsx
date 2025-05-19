import { Helmet } from 'react-helmet-async';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { siteConfig } from '@/config/site';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { Send, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const contactSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactPage() {
  const { ref: titleRef, whileInViewProps: titleAnimation } = useScrollReveal();
  const { ref: formRef, whileInViewProps: formAnimation } = useScrollReveal({amount: 0.1});
  const { ref: infoRef, whileInViewProps: infoAnimation } = useScrollReveal({amount: 0.2});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formSubmitUrl = `https://formsubmit.co/${siteConfig.formSubmitEmail}`; // Pode usar o mesmo email ou um diferente para contato geral
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("_subject", `Contato via Site: ${data.subject}`);
    formData.append("_captcha", "false");

    try {
      await axios.post(formSubmitUrl, formData);
      setSubmitStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Responderemos em breve.' });
      reset();
    } catch (error) {
      console.error("Erro ao enviar formulário de contato:", error);
      setSubmitStatus({ type: 'error', message: 'Ocorreu um erro ao enviar. Tente novamente mais tarde.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contato - {siteConfig.name}</title>
        <meta name="description" content={`Entre em contato com a AC TECH. Estamos prontos para ouvir sobre seu projeto ou responder suas dúvidas.`} />
      </Helmet>

      <div className="section-padding pt-24 md:pt-32">
        <div className="container mx-auto">
          <motion.div ref={titleRef} {...titleAnimation} className="text-center mb-12">
            <h1 className="impact-title mb-4">Fale <span className="text-brand-lime">Conosco</span></h1>
            <p className="text-xl text-brand-textSecondary max-w-2xl mx-auto">
              Tem alguma dúvida ou quer iniciar um projeto? Estamos aqui para ajudar!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              ref={formRef}
              {...formAnimation}
              className="bg-brand-cardBg p-8 md:p-10 rounded-xl shadow-2xl"
            >
              <h2 className="text-2xl font-semibold text-brand-textPrimary mb-6">Envie-nos uma Mensagem</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="contact-name" className="text-brand-textPrimary">Nome</Label>
                  <Input id="contact-name" {...register("name")} placeholder="Seu nome" className="bg-gray-700 border-gray-600 text-white focus:border-brand-lime" />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-brand-textPrimary">Email</Label>
                  <Input id="contact-email" type="email" {...register("email")} placeholder="seu@email.com" className="bg-gray-700 border-gray-600 text-white focus:border-brand-lime" />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="contact-subject" className="text-brand-textPrimary">Assunto</Label>
                  <Input id="contact-subject" {...register("subject")} placeholder="Sobre o que gostaria de falar?" className="bg-gray-700 border-gray-600 text-white focus:border-brand-lime" />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <Label htmlFor="contact-message" className="text-brand-textPrimary">Mensagem</Label>
                  <Textarea
                    id="contact-message"
                    {...register("message")}
                    placeholder="Sua mensagem..."
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white focus:border-brand-lime"
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-md text-sm ${
                      submitStatus.type === 'success' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                <AnimatedButton type="submit" disabled={isSubmitting} className="w-full bg-brand-lime text-brand-darkBg hover:bg-opacity-90" glowColor="lime">
                  {isSubmitting ? (
                     <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </AnimatedButton>
              </form>
            </motion.div>

            <motion.div
              ref={infoRef}
              {...infoAnimation}
              className="space-y-8 mt-10 md:mt-0"
            >
              <h2 className="text-2xl font-semibold text-brand-textPrimary mb-6">Outras Formas de Contato</h2>
              <div className="bg-brand-cardBg p-6 rounded-lg shadow-lg flex items-start space-x-4 hover:shadow-neon-cyan transition-shadow duration-300">
                <Mail size={32} className="text-brand-cyan mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-brand-cyan">Email</h3>
                  <a href={`mailto:${siteConfig.email}`} className="text-brand-textSecondary hover:text-brand-cyan transition-colors break-all">{siteConfig.email}</a>
                </div>
              </div>
              <div className="bg-brand-cardBg p-6 rounded-lg shadow-lg flex items-start space-x-4 hover:shadow-neon-purple transition-shadow duration-300">
                <Phone size={32} className="text-brand-purple mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-brand-purple">WhatsApp</h3>
                  <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-brand-textSecondary hover:text-brand-purple transition-colors">{siteConfig.whatsappNumber}</a>
                </div>
              </div>
              {/* Se tiver endereço físico: */}
              {/* <div className="bg-brand-cardBg p-6 rounded-lg shadow-lg flex items-start space-x-4 hover:shadow-neon-lime transition-shadow duration-300">
                <MapPin size={32} className="text-brand-lime mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-brand-lime">Localização</h3>
                  <p className="text-brand-textSecondary">Av. Exemplo, 123, Cidade, País (Atendimento com hora marcada)</p>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
    }
