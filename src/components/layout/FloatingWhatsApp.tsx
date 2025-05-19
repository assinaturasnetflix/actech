import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg
                 hover:bg-green-600 transition-colors duration-300 animate-pulse-bright"
      style={{ '--tw-shadow-color': 'rgba(34, 197, 94, 0.5)' } as React.CSSProperties}
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
