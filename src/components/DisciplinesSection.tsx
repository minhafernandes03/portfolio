import React from 'react';
import { Megaphone, MonitorPlay, Archive, Check } from 'lucide-react';
import { ThemeConfig } from '../types/portfolio';

interface DisciplinesSectionProps {
  theme: ThemeConfig;
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({ theme }) => {
  const areas = [
    {
      number: '01',
      title: 'Produção Publicitária',
      icon: Megaphone,
      badge: null as string | null,
      skills: [
        'Gestão de Campanhas',
        'Organização da Produção',
        'Atendimento ao Cliente',
        'Planeamento',
        'Gestão de Cronogramas',
        'Mediação B2B e B2C',
        'Aprovação de Materiais',
        'Gestão de Prioridades',
        'Comunicação entre Departamentos',
      ],
    },
    {
      number: '02',
      title: 'Desenvolvimento Multimédia',
      icon: MonitorPlay,
      badge: 'Em formação',
      skills: [
        'Adobe Photoshop',
        'Illustrator',
        'Premiere',
        'After Effects',
        'Affinity',
        'Figma / Penpot',
        'HTML / CSS',
        'UX/UI',
        'Motion Graphics',
        'Produção Audiovisual',
        'Plano de marketing e análise de campanha publicitária',
      ],
    },
    {
      number: '03',
      title: 'Arquivista',
      icon: Archive,
      badge: null as string | null,
      skills: [
        'Atendimento aos Clientes',
        'Gestão de Acervo Físico e Digital',
        'Otimização e Políticas de Armazenamento',
        'Suporte à Produção Audiovisual',
        'Gestão Operacional',
      ],
    },
  ];

  return (
    <section id="disciplinas" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b" style={{ borderColor: theme.border }}>
        <div>
          <div className="text-xs uppercase tracking-widest font-medium mb-2 opacity-75" style={{ color: theme.accent }}>
            Experiência
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal" style={{ color: theme.textMain }}>
            Áreas de Atuação
          </h2>
        </div>
        <p className="text-xs md:text-sm max-w-md font-light opacity-80" style={{ color: theme.textMuted }}>
          Atendimento · Produção Publicitária · Desenvolvimento de Produtos Multimédia (em formação).
          Atualmente frequento o Curso Técnico de Desenvolvimento de Produtos Multimédia, ampliando as minhas competências em
          design, produção audiovisual, desenvolvimento web e conteúdos digitais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group"
              style={{ borderColor: theme.border, backgroundColor: theme.bgSurface }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs opacity-50 tabular-nums">{item.number}.</span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: theme.accentSoft, color: theme.accent }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-serif font-normal mb-1" style={{ color: theme.textMain }}>
                {item.title}
              </h3>
              {item.badge && (
                <span
                  className="inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border mb-3"
                  style={{ borderColor: theme.border, backgroundColor: theme.accentSoft, color: theme.textMain }}
                >
                  {item.badge}
                </span>
              )}

              <div className="pt-4 mt-3 border-t space-y-1.5" style={{ borderColor: theme.border }}>
                {item.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="text-[12px] flex items-start gap-2 opacity-80">
                    <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: theme.accent }} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
