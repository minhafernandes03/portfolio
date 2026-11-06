import React from 'react';
import { Compass, Sparkles, Feather, Globe } from 'lucide-react';
import { ProfileData, ThemeConfig } from '../types/portfolio';

interface AboutSectionProps {
  profile: ProfileData;
  theme: ThemeConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, theme }) => {
  const steps = [
    {
      title: 'Receção do briefing',
      text: 'Compreender os objetivos da campanha e as necessidades do cliente.',
    },
    {
      title: 'Planeamento',
      text: 'Organização das tarefas, definição de prioridades e cronograma.',
    },
    {
      title: 'Produção',
      text: 'Acompanhamento da equipa criativa durante o desenvolvimento dos materiais.',
    },
    {
      title: 'Revisões',
      text: 'Validação dos materiais, ajustes e alinhamento com o cliente.',
    },
    {
      title: 'Entrega',
      text: 'Garantir que todos os materiais são entregues corretamente e dentro do prazo.',
    },
  ];

  return (
    <section id="sobre" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Philosophy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs uppercase tracking-widest font-medium opacity-85" style={{ color: theme.accent }}>
            Sobre {profile.name || 'Carmen Fernandes'}
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal leading-tight" style={{ color: theme.textMain }}>
            Da produção publicitária ao desenvolvimento multimédia.
          </h2>
          <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: theme.accent }} />

          <div className="space-y-4 text-xs md:text-sm font-light leading-relaxed" style={{ color: theme.textMuted }}>
            <p>{profile.bioParagraph1}</p>
            <p>{profile.bioParagraph2}</p>
          </div>

          {/* Quick info list */}
          <div className="pt-4 border-t space-y-2 text-xs" style={{ borderColor: theme.border }}>
            <div className="flex items-center justify-between">
              <span className="opacity-50">Localização</span>
              <span className="font-medium" style={{ color: theme.textMain }}>{profile.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-50">Foco Atual</span>
              <span className="font-medium text-right" style={{ color: theme.textMain }}>Produção publicitária & multimédia</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-50">Contacto Direto</span>
              <span className="font-medium font-mono text-emerald-400">{profile.email}</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Core Pillars & Background */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 rounded-2xl border backdrop-blur-sm space-y-6" style={{ borderColor: theme.border, backgroundColor: theme.bgSurface }}>
            <h3 className="text-lg font-serif font-normal" style={{ color: theme.textMain }}>
              A Minha Forma de Trabalhar
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((p, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="font-mono text-xs opacity-40">{idx + 1}.</div>
                  <h4 className="text-sm font-medium" style={{ color: theme.textMain }}>
                    {p.title}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-70 font-light" style={{ color: theme.textMuted }}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="pt-6 border-t space-y-4" style={{ borderColor: theme.border }}>
              <h4 className="text-xs uppercase tracking-wider font-semibold opacity-60">Línguas</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-medium" style={{ color: theme.textMain }}>Inglês</span>
                  <span className="font-mono text-[11px] opacity-60">B1</span>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span className="font-medium" style={{ color: theme.textMain }}>Português</span>
                  <span className="font-mono text-[11px] opacity-60">Língua nativa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
