import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
// import { NotFoundPage } from './pages/NotFoundPage'; // Criar esta página
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';

// Componente para transições de página
const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname} // Importante para AnimatePresence detectar a mudança de rota
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};


function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop /> {/* Componente para rolar para o topo ao mudar de rota */}
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <AnimatePresence mode="wait">
                <Routes>
                    <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
                    <Route path="/sobre" element={<PageLayout><AboutPage /></PageLayout>} />
                    <Route path="/servicos" element={<PageLayout><ServicesPage /></PageLayout>} />
                    <Route path="/orcamento" element={<PageLayout><QuotePage /></PageLayout>} />
                    <Route path="/contato" element={<PageLayout><ContactPage /></PageLayout>} />
                    {/* <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} /> */}
                </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
        <FloatingWhatsApp />
      </Router>
    </HelmetProvider>
  );
}

// Componente auxiliar para rolar para o topo
import { useEffect } from 'react';
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default App;
