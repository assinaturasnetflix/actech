import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react'; // Placeholders
import { siteConfig, navLinks } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-brand-cardBg text-brand-textSecondary section-padding mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-brand-textPrimary mb-2">{siteConfig.name}</h3>
            <p className="text-sm">Transformando ideias em soluções digitais reais.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-brand-textPrimary mb-3">Navegação</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-brand-cyan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/orcamento" className="hover:text-brand-cyan transition-colors">
                  Orçamento
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-brand-textPrimary mb-3">Contato</h4>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center space-x-2 hover:text-brand-cyan transition-colors mb-2">
              <Mail size={18} />
              <span>{siteConfig.email}</span>
            </a>
            <a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-brand-cyan transition-colors">
              <Phone size={18} />
              <span>{siteConfig.whatsappNumber}</span>
            </a>
            <div className="flex space-x-4 mt-4">
              {/* Placeholder Icons - Adicione seus links reais em siteConfig */}
              {siteConfig.socials.facebook && <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan"><Facebook /></a>}
              {siteConfig.socials.instagram && <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan"><Instagram /></a>}
              {siteConfig.socials.linkedin && <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan"><Linkedin /></a>}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
