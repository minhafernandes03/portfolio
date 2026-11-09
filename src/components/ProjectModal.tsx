import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, ExternalLink, Calendar, User, Wrench, Clock, Award } from 'lucide-react';
import { Project, ThemeConfig } from '../types/portfolio';
import { getEmbedUrl } from '../utils/video';

interface ProjectModalProps {
  project: Project | null;
  projects: Project[];
  theme: ThemeConfig;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  projects,
  theme,
  onClose,
  onSelectProject,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Ao mudar de projeto, o vídeo volta ao estado inicial (imagem + botão play)
  useEffect(() => {
    setIsPlaying(false);
    setActiveImage(null);
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      const currentIndex = projects.findIndex((p) => p.id === project.id);
      if (e.key === 'ArrowRight' && currentIndex < projects.length - 1) {
        onSelectProject(projects[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectProject(projects[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projects, onClose, onSelectProject]);

  if (!project) return null;

  const embedUrl = getEmbedUrl(project.videoUrl);
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        style={{
          borderColor: theme.borderHover,
          backgroundColor: theme.bgSurface,
          color: theme.textMain,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: theme.border, backgroundColor: theme.bgGlass }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-mono opacity-60">
              {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <span aria-hidden="true" className="opacity-30">|</span>
            <span className="text-xs tracking-wider uppercase" style={{ color: theme.accent }}>
              {project.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next navigation */}
            <button
              onClick={() => prevProject && onSelectProject(prevProject)}
              disabled={!prevProject}
              className={`p-1.5 rounded-md border transition-opacity cursor-pointer ${
                prevProject ? 'opacity-80 hover:opacity-100 hover:bg-white/5' : 'opacity-25 cursor-not-allowed'
              }`}
              style={{ borderColor: theme.border }}
              title="Projeto Anterior (Seta Esquerda)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nextProject && onSelectProject(nextProject)}
              disabled={!nextProject}
              className={`p-1.5 rounded-md border transition-opacity cursor-pointer ${
                nextProject ? 'opacity-80 hover:opacity-100 hover:bg-white/5' : 'opacity-25 cursor-not-allowed'
              }`}
              style={{ borderColor: theme.border }}
              title="Próximo Projeto (Seta Direita)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md border transition-opacity cursor-pointer opacity-80 hover:opacity-100 hover:bg-white/10 ml-2"
              style={{ borderColor: theme.border }}
              title="Fechar (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Main Media Showcase Container: imagem + vídeo com play */}
          <div className="relative rounded-xl overflow-hidden border bg-black aspect-[16/9] shadow-lg" style={{ borderColor: theme.border }}>
            {isPlaying && embedUrl ? (
              <iframe
                key={project.id}
                src={embedUrl}
                title={project.title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {/* Fundo desfocado + imagem inteira (os posters são quadrados) */}
                <img
                  src={activeImage ?? project.coverImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
                />
                <img
                  src={activeImage ?? project.coverImage}
                  alt={project.title}
                  className="relative w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                {embedUrl && (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group"
                    title="Reproduzir vídeo"
                    aria-label={`Reproduzir vídeo: ${project.title}`}
                  >
                    <span className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Galeria (várias imagens / temporadas) */}
          {project.gallery && project.gallery.length > 1 && (
            <div className="flex flex-wrap gap-3 -mt-2">
              {project.gallery.map((g) => {
                const selected = (activeImage ?? project.coverImage) === g.src;
                return (
                  <button
                    key={g.src}
                    onClick={() => {
                      setActiveImage(g.src);
                      setIsPlaying(false);
                    }}
                    className="group text-left"
                    title={g.label}
                    aria-label={`Ver imagem: ${g.label}`}
                  >
                    <span
                      className="block w-20 h-20 rounded-lg overflow-hidden border-2 transition-all"
                      style={{ borderColor: selected ? theme.accent : theme.border, opacity: selected ? 1 : 0.7 }}
                    >
                      <img src={g.src} alt={g.label} className="w-full h-full object-cover" />
                    </span>
                    <span className="block mt-1 text-[10px] uppercase tracking-wider opacity-70 max-w-[80px]">{g.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-normal mb-2" style={{ color: theme.textMain }}>
                  {project.title}
                </h2>
                <p className="text-sm font-medium opacity-80" style={{ color: theme.accent }}>
                  {project.subtitle}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold opacity-60 mb-2">Visão Geral</h4>
                <p className="text-sm md:text-base leading-relaxed opacity-90 font-light" style={{ color: theme.textMain }}>
                  {project.description}
                </p>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold opacity-60 mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Atuação no Projeto</span>
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((hl, i) => (
                      <li key={i} className="text-xs md:text-sm flex items-start gap-2.5 opacity-85">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: theme.accent }} />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Metadata Column */}
            <div
              className="lg:col-span-4 rounded-xl p-5 border space-y-4 text-xs"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.bgGlass,
              }}
            >
              <div>
                <span className="opacity-50 block uppercase tracking-wider text-[10px] mb-1">Cliente</span>
                <span className="font-medium">{project.client}</span>
              </div>

              <div>
                <span className="opacity-50 block uppercase tracking-wider text-[10px] mb-1">Atuação</span>
                <span className="font-medium">{project.role}</span>
              </div>

              {project.year && (
                <div>
                  <span className="opacity-50 block uppercase tracking-wider text-[10px] mb-1">Ano</span>
                  <span className="font-mono tabular-nums">{project.year}</span>
                </div>
              )}

              {project.duration && (
                <div>
                  <span className="opacity-50 block uppercase tracking-wider text-[10px] mb-1">Formato / Duração</span>
                  <span className="font-medium">{project.duration}</span>
                </div>
              )}

              <div>
                <span className="opacity-50 block uppercase tracking-wider text-[10px] mb-2">Entregas & Canais</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] border"
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.accentSoft,
                        color: theme.textMain,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {project.externalLink && (
                <div className="pt-2 border-t" style={{ borderColor: theme.border }}>
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.isLight ? '#ffffff' : '#0a120e',
                    }}
                  >
                    <span>Abrir vídeo noutro separador</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
