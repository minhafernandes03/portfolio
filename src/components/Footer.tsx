import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { ThemeConfig } from '../types/portfolio';

interface FooterProps {
  theme: ThemeConfig;
  brandName: string;
}

export const Footer: React.FC<FooterProps> = ({ theme, brandName }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="border-t py-12 px-6 lg:px-12 max-w-7xl mx-auto transition-colors"
      style={{ borderColor: theme.border }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-serif text-lg font-normal tracking-tight block" style={{ color: theme.textMain }}>
            {brandName}
          </span>
          <span className="text-xs opacity-60 font-light mt-0.5 block" style={{ color: theme.textMuted }}>
            Portfólio · Produção Publicitária & Multimédia
          </span>
        </div>

        {/* Quiet Nav Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider opacity-70">
          <a href="#obras" className="hover:opacity-100 transition-opacity">
            Obras
          </a>
          <a href="#disciplinas" className="hover:opacity-100 transition-opacity">
            Áreas
          </a>
          <a href="#sobre" className="hover:opacity-100 transition-opacity">
            Sobre
          </a>
          <a href="#contacto" className="hover:opacity-100 transition-opacity">
            Contacto
          </a>
        </div>

        {/* Scroll To Top Action */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          style={{ color: theme.textMain }}
          title="Voltar ao início da página"
        >
          <span>Voltar ao topo</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div
        className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] opacity-50"
        style={{ borderColor: theme.border, color: theme.textMuted }}
      >
        <p>© {new Date().getFullYear()} {brandName}. Todos os direitos reservados.</p>
        <p>Portfólio profissional · Produção, atendimento e multimédia.</p>
      </div>
    </footer>
  );
};
