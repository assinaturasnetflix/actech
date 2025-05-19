import { Helmet } from 'react-helmet-async';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // Ou Fetch API
import { siteConfig } from '@/config/site';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Usando o botão base do Shadcn aqui
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { Send, MessageCircle, Loader2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const quoteSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone inválido (mín. 9 dígitos)").optional().or(z.literal('')),
  projectType: z.enum(["website", "ecommerce", "mobile_app", "custom_system", "other"], {
    errorMap: () => ({ message: "Selecione um tipo de projeto" }),
  }),
  description: z.string().min(20, "Descreva seu projeto com pelo menos 20 caracteres"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export function QuotePage() {
  const { ref: titleRef, whileInViewProps: titleAnimation } = useScrollReveal();
  const { ref: formRef, whileInViewProps: formAnimation } = useScrollReveal({amount: 0.1});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit: SubmitHandler<QuoteFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // FormSubmit.co Integration
    const formSubmitUrl = `https://formsubmit.co/${siteConfig.formSubmitEmail}`;
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("_subject", `Novo Pedido de Orçamento: ${data.projectType}`);
    formData.append("_captcha", "false"); // Desabilitar captcha do FormSubmit (use reCAPTCHA se precisar)
    // formData.append("_next", "URL_DE_REDIRECIONAMENTO_APOS_ENVIO"); // Opcional

    try {
      await axios.post(formSubmitUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Necessário para FormSubmit com FormData
        }
      });
      setSubmitStatus({ type: 'success', message: 'Orçamento enviado com sucesso! Entraremos em contato em breve.' });
      reset();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus({ type: 'error', message: 'Ocorreu um erro ao enviar. Tente novamente ou contate-nos por WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Orçamento Personalizado - {siteConfig.name}</title>
        <meta name="description" content="Solicite um orçamento personalizado para seu projeto de website, e-commerce, app mobile ou sistema web com a AC TECH." />
      </Helmet>

      <div className="section-padding pt-24 md:pt-32">
        <div className="container mx-auto">
          <motion.div ref={titleRef} {...titleAnimation} className="text-center mb-12">
            <h1 className="impact-title mb-4">Orçamento <span className="text-brand-purple">Personalizado</span></h1>
            <p className="text-xl text-brand-textSecondary max-w-2xl mx-auto">
              Conte-nos sobre sua ideia e vamos transformá-la em realidade.
            </p>
          </motion.div>

          <motion.div
            ref={formRef}
            {...formAnimation}
            className="max-w-2xl mx-auto bg-brand-cardBg p-8 md:p-10 rounded-xl shadow-2xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-brand-textPrimary">Nome Completo</Label>
                <Input id="name" {...register("name")} placeholder="Seu nome" className="bg-gray-700 border-gray-600 text-white focus:border-brand-purple" />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-brand-textPrimary">Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" className="bg-gray-700 border-gray-600 text-white focus:border-brand-purple" />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="text-brand-textPrimary">Telefone (Opcional)</Label>
                <Input id="phone" type="tel" {...register("phone")} placeholder="+258 XX XXX XXXX" className="bg-gray-700 border-gray-600 text-white focus:border-brand-purple" />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="projectType" className="text-brand-textPrimary">Tipo de Projeto</Label>
                <select
                  id="projectType"
                  {...register("projectType")}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-brand-purple focus:border-brand-purple"
                >
                  <option value="" disabled>Selecione o tipo de projeto...</option>
                  <option value="website">Criação de Site Profissional</option>
                  <option value="ecommerce">Loja Online (E-commerce)</option>
                  <option value="mobile_app">Aplicativo Mobile (Android/iOS)</option>
                  <option value="custom_system">Sistema Web Personalizado</option>
                  <option value="other">Outro</option>
                </select>
                {errors.projectType && <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>}
              </div>

              <div>
                <Label htmlFor="description" className="text-brand-textPrimary">Descrição do Projeto</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Detalhe sua ideia, funcionalidades desejadas, referências, etc."
                  rows={5}
                  className="bg-gray-700 border-gray-600 text-white focus:border-brand-purple"
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
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

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <AnimatedButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-brand-purple hover:bg-opacity-90"
                  glowColor="purple"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Pedido
                    </>
                  )}
                </AnimatedButton>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto border-brand-lime text-brand-lime hover:bg-brand-lime hover:text-brand-darkBg"
                  onClick={() => window.open(siteConfig.whatsappLink, '_blank')}
                  asChild
                >
                  <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Ou contate por WhatsApp
                  </a>
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
                  }
