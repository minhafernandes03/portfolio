import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, Play, Maximize2, Sparkles, Filter } from 'lucide-react';
import { Project, ThemeConfig } from '../types/portfolio';

interface ProjectGridProps {
  projects: Project[];
  theme: ThemeConfig;
  onSelectProject: (project: Project) => void;
}

const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}> = ({ children, className = '', onClick, style }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 4;
    const rotateY = (x / (rect.width / 2)) * 4;
    setTransform(`perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)');
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        ...style,
        transform: transform || undefined,
      }}
    >
      {children}
    </div>
  );
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  theme,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'bento' | 'list'>('bento');

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'campaign', label: 'Campanhas' },
    { id: 'series', label: 'Séries & Streaming' },
    { id: 'convention', label: 'Vídeo Convenção' },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="obras" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b" style={{ borderColor: theme.border }}>
        <div>
          <div className="text-xs uppercase tracking-widest font-medium mb-2 opacity-75" style={{ color: theme.accent }}>
            Portfólio
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal" style={{ color: theme.textMain }}>
            Projetos
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed opacity-80" style={{ color: theme.textMuted }}>
            Bem-vindo ao Portfólio Carmen Fernandes! Fui responsável pela produção, atendimento e coordenação dos projetos.
            Trabalhei em estreita colaboração com a equipa criativa da agência, que desenvolveu as peças gráficas e audiovisuais. Desfrutem!
          </p>
        </div>

        {/* Controls: Filter Segmented Buttons + View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Segmented category filters with smooth micro-interaction */}
          <div
            className="flex flex-wrap items-center gap-1 p-1 rounded-lg border backdrop-blur-sm"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.bgGlass,
            }}
          >
            {categories.map((cat) => {
              const active = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'shadow-sm font-semibold scale-[1.02]' : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'
                  }`}
                  style={{
                    backgroundColor: active ? theme.accent : 'transparent',
                    color: active ? (theme.isLight ? '#ffffff' : '#0a120e') : theme.textMain,
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg border backdrop-blur-sm"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.bgGlass,
            }}
          >
            <button
              onClick={() => setViewMode('bento')}
              className={`p-1.5 rounded-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                viewMode === 'bento' ? 'bg-white/10 opacity-100' : 'opacity-50 hover:opacity-100'
              }`}
              style={{ color: theme.textMain }}
              title="Vista em Grelha Bento"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                viewMode === 'list' ? 'bg-white/10 opacity-100' : 'opacity-50 hover:opacity-100'
              }`}
              style={{ color: theme.textMain }}
              title="Vista em Lista Editorial"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List Display with 3D Tilt Micro-Interaction */}
      {viewMode === 'bento' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const isWide = !!project.featured;
            const spanClass = isWide ? 'md:col-span-2 lg:col-span-3' : '';

            return (
              <TiltCard
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative rounded-2xl overflow-hidden border cursor-pointer shadow-md hover:shadow-2xl ${spanClass}`}
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.bgSurface,
                }}
              >
                {/* Media Container */}
                <div className={`relative overflow-hidden ${isWide ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-square'} bg-black/20`}>
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim for WCAG text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Overlay Badge / Type indicator */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                    <span className="text-[11px] uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10">
                      {project.categoryLabel}
                    </span>
                    {project.year && (
                      <span className="text-[11px] font-mono tabular-nums opacity-80">
                        {project.year}
                      </span>
                    )}
                  </div>

                  {/* Bottom Content within Media Frame */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-1.5 leading-snug group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 font-light mb-3">
                      {project.summary}
                    </p>

                    {/* Unboxed Metadata: Tools & Role */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/60">
                      <span>{project.role}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.tools.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>

                  {/* Hover icon button */}
                  <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all transform group-hover:scale-110 pointer-events-none">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      ) : (
        /* Monograph Editorial List View */
        <div className="divide-y" style={{ borderColor: theme.border }}>
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-colors px-4 -mx-4 rounded-xl hover:bg-white/[0.03]"
            >
              <div className="flex items-start md:items-center gap-6">
                <span className="font-mono text-xs opacity-50 tabular-nums pt-1 md:pt-0">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <div>
                  <h3
                    className="text-xl font-serif font-normal group-hover:translate-x-1 transition-transform inline-flex items-center gap-2"
                    style={{ color: theme.textMain }}
                  >
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.accent }} />
                  </h3>
                  <div className="flex items-center gap-2 text-xs opacity-65 mt-1" style={{ color: theme.textMuted }}>
                    <span>{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.tools.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end md:self-auto">
                {project.year && (
                  <span className="font-mono text-xs opacity-60 tabular-nums" style={{ color: theme.textMuted }}>
                    {project.year}
                  </span>
                )}
                <div className="w-16 h-10 rounded-md overflow-hidden border shrink-0 bg-black/30" style={{ borderColor: theme.border }}>
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="py-16 text-center" style={{ color: theme.textMuted }}>
          <p className="text-sm">Nenhum projeto encontrado nesta categoria.</p>
        </div>
      )}
    </section>
  );
};
