import React, { useState, useEffect } from 'react';
import { Sliders, Sun, Moon, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../types/portfolio';

interface TopBarProps {
  theme: ThemeConfig;
  brandName: string;
  onOpenCustomizer: () => void;
  onToggleDayNight: () => void;
  isDark: boolean;
  activeSection: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  theme,
  brandName,
  onOpenCustomizer,
  onToggleDayNight,
  isDark,
  activeSection,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md transition-colors duration-300 border-b relative"
      style={{
        backgroundColor: theme.bgGlass,
        borderColor: theme.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg md:text-xl font-serif tracking-normal whitespace-nowrap shrink-0 font-medium transition-transform hover:scale-[1.01]"
          style={{ color: theme.textMain }}
        >
          {brandName}
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase whitespace-nowrap shrink-0">
          <a
            href="#obras"
            className={`transition-all py-1 border-b ${
              activeSection === 'obras'
                ? 'border-current'
                : 'border-transparent hover:border-current opacity-70 hover:opacity-100 hover:-translate-y-0.5'
            }`}
            style={{ color: activeSection === 'obras' ? theme.accent : theme.textMain }}
          >
            Projetos
          </a>
          <a
            href="#disciplinas"
            className={`transition-all py-1 border-b ${
              activeSection === 'disciplinas'
                ? 'border-current'
                : 'border-transparent hover:border-current opacity-70 hover:opacity-100 hover:-translate-y-0.5'
            }`}
            style={{ color: activeSection === 'disciplinas' ? theme.accent : theme.textMain }}
          >
            Áreas
          </a>
          <a
            href="#sobre"
            className={`transition-all py-1 border-b ${
              activeSection === 'sobre'
                ? 'border-current'
                : 'border-transparent hover:border-current opacity-70 hover:opacity-100 hover:-translate-y-0.5'
            }`}
            style={{ color: activeSection === 'sobre' ? theme.accent : theme.textMain }}
          >
            Sobre
          </a>
          <a
            href="#contacto"
            className={`transition-all py-1 border-b ${
              activeSection === 'contacto'
                ? 'border-current'
                : 'border-transparent hover:border-current opacity-70 hover:opacity-100 hover:-translate-y-0.5'
            }`}
            style={{ color: activeSection === 'contacto' ? theme.accent : theme.textMain }}
          >
            Contacto
          </a>
        </nav>

        {/* Zone 3: Day/Night Toggle + Primary Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Day / Night Mode Toggle */}
          <button
            onClick={onToggleDayNight}
            className="p-2 rounded-md border transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.accentSoft,
              color: theme.textMain,
            }}
            title={isDark ? 'Mudar para Modo Dia (Luminoso)' : 'Mudar para Modo Noite (Escuro)'}
            aria-label="Alternar modo dia e noite"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-emerald-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Primary Action Button: Personalizar */}
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: theme.accent,
              color: theme.isLight ? '#ffffff' : '#0a120e',
            }}
            title="Personalizar cores, fundo de água e conteúdos"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Personalizar</span>
          </button>
        </div>
      </div>

      {/* River Scroll Progress Indicator */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-150 pointer-events-none"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: theme.accent,
          boxShadow: `0 0 8px ${theme.waterHighlight}`,
        }}
      />
    </header>
  );
};
