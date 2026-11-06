import React, { useState } from 'react';
import { X, Palette, Waves, Sliders, Type, RotateCcw, Download, Upload, Check, Plus, Trash2, Edit3 } from 'lucide-react';
import { ThemeConfig, THEMES, ProfileData, Project } from '../types/portfolio';
import { BackgroundStyle } from './WaterBackground';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeConfig;
  onSelectTheme: (theme: ThemeConfig) => void;
  waterIntensity: 'off' | 'subtle' | 'medium' | 'flowing';
  onChangeWaterIntensity: (intensity: 'off' | 'subtle' | 'medium' | 'flowing') => void;
  waterSpeed: number;
  onChangeWaterSpeed: (speed: number) => void;
  waterInteractive: boolean;
  onToggleWaterInteractive: () => void;
  bgStyle: BackgroundStyle;
  onChangeBgStyle: (style: BackgroundStyle) => void;
  onToggleDayNight: () => void;
  profile: ProfileData;
  onUpdateProfile: (profile: ProfileData) => void;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onResetDefaults: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  waterIntensity,
  onChangeWaterIntensity,
  waterSpeed,
  onChangeWaterSpeed,
  waterInteractive,
  onToggleWaterInteractive,
  bgStyle,
  onChangeBgStyle,
  onToggleDayNight,
  profile,
  onUpdateProfile,
  projects,
  onUpdateProjects,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'water' | 'profile' | 'projects'>('theme');
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const data = {
      themeId: currentTheme.id,
      waterIntensity,
      waterSpeed,
      waterInteractive,
      profile,
      projects,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) onUpdateProfile(parsed.profile);
        if (parsed.projects) onUpdateProjects(parsed.projects);
        if (parsed.themeId) {
          const found = THEMES.find((t) => t.id === parsed.themeId);
          if (found) onSelectTheme(found);
        }
        if (parsed.waterIntensity) onChangeWaterIntensity(parsed.waterIntensity);
        if (parsed.waterSpeed) onChangeWaterSpeed(parsed.waterSpeed);
      } catch (err) {
        alert('Erro ao carregar ficheiro JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'Novo Projeto Multimédia',
      subtitle: 'Exploração Conceitual',
      category: 'campaign',
      categoryLabel: 'Campanha 360',
      client: 'Cliente',
      role: 'Produção, atendimento e coordenação',
      summary: 'Descrição sucinta do projeto...',
      description: 'Descrição completa do projeto e da tua atuação.',
      coverImage: '/images/campanha-360.jpg',
      mediaType: 'video',
      videoUrl: '',
      tools: ['Peças digitais'],
      featured: false,
    };
    onUpdateProjects([newProj, ...projects]);
    setEditingProjectId(newProj.id);
  };

  const handleDeleteProject = (id: string) => {
    onUpdateProjects(projects.filter((p) => p.id !== id));
    if (editingProjectId === id) setEditingProjectId(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        style={{
          borderColor: currentTheme.borderHover,
          backgroundColor: currentTheme.bgSurface,
          color: currentTheme.textMain,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: currentTheme.border, backgroundColor: currentTheme.bgGlass }}
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-serif font-medium">Personalizar Portfolio</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md border transition-opacity cursor-pointer opacity-70 hover:opacity-100"
            style={{ borderColor: currentTheme.border }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex border-b px-6 gap-6 text-xs uppercase tracking-wider shrink-0 overflow-x-auto"
          style={{ borderColor: currentTheme.border }}
        >
          <button
            onClick={() => setActiveTab('theme')}
            className={`py-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'theme' ? 'border-emerald-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ color: activeTab === 'theme' ? currentTheme.accent : currentTheme.textMain }}
          >
            Paleta de Verdes
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`py-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'water' ? 'border-emerald-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ color: activeTab === 'water' ? currentTheme.accent : currentTheme.textMain }}
          >
            Fundo de Água
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'profile' ? 'border-emerald-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ color: activeTab === 'profile' ? currentTheme.accent : currentTheme.textMain }}
          >
            Informações & Bio
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-3 border-b-2 font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'projects' ? 'border-emerald-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ color: activeTab === 'projects' ? currentTheme.accent : currentTheme.textMain }}
          >
            Gerir Projetos ({projects.length})
          </button>
        </div>

        {/* Content Pane */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* TAB 1: THEMES */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <p className="text-xs opacity-75 leading-relaxed">
                Escolhe uma paleta em tons de verde orgânico concebida para criar atmosferas naturais, calmas e com legibilidade refinada.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {THEMES.map((theme) => {
                  const isSelected = currentTheme.id === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => onSelectTheme(theme)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected ? 'ring-2 ring-emerald-400' : 'opacity-80 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                      style={{
                        borderColor: isSelected ? currentTheme.accent : currentTheme.border,
                        backgroundColor: currentTheme.bgGlass,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif font-medium text-sm" style={{ color: currentTheme.textMain }}>
                          {theme.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                      </div>

                      <p className="text-[11px] opacity-70 mb-3 font-light leading-snug">
                        {theme.description}
                      </p>

                      {/* Color swatches */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: theme.bgBase, borderColor: theme.border }} title="Base Canvas" />
                        <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: theme.bgSurface, borderColor: theme.border }} title="Superfície" />
                        <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: theme.accent, borderColor: theme.border }} title="Acento Verde" />
                        <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: theme.waterHighlight, borderColor: theme.border }} title="Água & Luz" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: WATER ANIMATION & BG STYLE */}
          {activeTab === 'water' && (
            <div className="space-y-6">
              <p className="text-xs opacity-75 leading-relaxed">
                Personaliza o fundo do site, o comportamento dos reflexos líquidos e as partículas flutuantes.
              </p>

              {/* Background Style Switcher */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider opacity-70">
                  Estilo de Fundo do Site (BG)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'waves', label: 'Ondulações & Caustics', desc: 'Reflexos de correntes e ondas líquidas em movimento suave' },
                    { id: 'dewdrops', label: 'Gotas de Orvalho & Luz', desc: 'Gotas bioluminescentes flutuantes que reagem ao rato' },
                    { id: 'aurora', label: 'Aurora Boreal Orgânica', desc: 'Fluxos luminosos verdes a ondular suavemente' },
                    { id: 'zen', label: 'Lago Calmo Zen', desc: 'Superfície imóvel e reflexiva com gotas ocasionais' },
                  ].map((s) => {
                    const active = bgStyle === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => onChangeBgStyle(s.id as BackgroundStyle)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          active ? 'ring-2 ring-emerald-400' : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'
                        }`}
                        style={{
                          borderColor: active ? currentTheme.accent : currentTheme.border,
                          backgroundColor: currentTheme.bgGlass,
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium" style={{ color: currentTheme.textMain }}>{s.label}</span>
                          {active && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <p className="text-[11px] opacity-60 font-light leading-snug">{s.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider opacity-70">
                  Intensidade do Movimento
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['off', 'subtle', 'medium', 'flowing'] as const).map((lvl) => {
                    const active = waterIntensity === lvl;
                    const labels = {
                      off: 'Desligado',
                      subtle: 'Sutil (Calmo)',
                      medium: 'Equilibrado',
                      flowing: 'Fluido',
                    };
                    return (
                      <button
                        key={lvl}
                        onClick={() => onChangeWaterIntensity(lvl)}
                        className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                          active ? 'shadow-sm font-semibold' : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{
                          borderColor: active ? currentTheme.accent : currentTheme.border,
                          backgroundColor: active ? currentTheme.accentSoft : 'transparent',
                          color: active ? currentTheme.accent : currentTheme.textMain,
                        }}
                      >
                        {labels[lvl]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {waterIntensity !== 'off' && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="opacity-70">Velocidade da Corrente</span>
                      <span className="font-mono">{waterSpeed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.4"
                      max="2.0"
                      step="0.2"
                      value={waterSpeed}
                      onChange={(e) => onChangeWaterSpeed(parseFloat(e.target.value))}
                      className="w-full h-1.5 rounded-lg accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border text-xs" style={{ borderColor: currentTheme.border }}>
                    <div>
                      <span className="font-medium block">Ondulações Reativas com o Cursor</span>
                      <span className="opacity-60 text-[11px]">Cria ondulações suaves quando o rato se move</span>
                    </div>
                    <button
                      onClick={onToggleWaterInteractive}
                      className="px-3 py-1 rounded border text-xs font-medium cursor-pointer"
                      style={{
                        backgroundColor: waterInteractive ? currentTheme.accentSoft : 'transparent',
                        borderColor: currentTheme.border,
                        color: waterInteractive ? currentTheme.accent : currentTheme.textMuted,
                      }}
                    >
                      {waterInteractive ? 'Ativo' : 'Desativado'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <p className="text-xs opacity-75 leading-relaxed">
                Edita os teus dados de autoria e texto de apresentação. Todas as alterações são salvas localmente no teu navegador.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1">Nome de Artista / Designer</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none"
                    style={{ borderColor: currentTheme.border, backgroundColor: currentTheme.bgBase, color: currentTheme.textMain }}
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1">Título Profissional</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => onUpdateProfile({ ...profile, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none"
                    style={{ borderColor: currentTheme.border, backgroundColor: currentTheme.bgBase, color: currentTheme.textMain }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1">E-mail de Contacto</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => onUpdateProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none font-mono"
                  style={{ borderColor: currentTheme.border, backgroundColor: currentTheme.bgBase, color: currentTheme.textMain }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1">Frase de Destaque (Hero)</label>
                <textarea
                  rows={2}
                  value={profile.bioHeadline}
                  onChange={(e) => onUpdateProfile({ ...profile, bioHeadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none resize-none"
                  style={{ borderColor: currentTheme.border, backgroundColor: currentTheme.bgBase, color: currentTheme.textMain }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1">Biografia Detalhada (Parágrafo 1)</label>
                <textarea
                  rows={3}
                  value={profile.bioParagraph1}
                  onChange={(e) => onUpdateProfile({ ...profile, bioParagraph1: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none resize-none"
                  style={{ borderColor: currentTheme.border, backgroundColor: currentTheme.bgBase, color: currentTheme.textMain }}
                />
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-75">
                  Adiciona, edita ou remove projetos do teu portfolio.
                </p>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer"
                  style={{
                    backgroundColor: currentTheme.accent,
                    color: currentTheme.isLight ? '#ffffff' : '#0a120e',
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Novo Projeto</span>
                </button>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => {
                  const isEditing = editingProjectId === proj.id;
                  return (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl border space-y-3"
                      style={{ borderColor: currentTheme.border, backgroundColor: currentTheme.bgGlass }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.coverImage}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover border"
                            style={{ borderColor: currentTheme.border }}
                          />
                          <div>
                            <h4 className="text-xs font-medium" style={{ color: currentTheme.textMain }}>
                              {proj.title}
                            </h4>
                            <span className="text-[11px] opacity-60">
                              {proj.categoryLabel}{proj.year ? ` · ${proj.year}` : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProjectId(isEditing ? null : proj.id)}
                            className="p-1.5 rounded border text-xs cursor-pointer opacity-70 hover:opacity-100"
                            style={{ borderColor: currentTheme.border }}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1.5 rounded border text-xs cursor-pointer opacity-70 hover:opacity-100 hover:text-red-400"
                            style={{ borderColor: currentTheme.border }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Inline quick editor when expanded */}
                      {isEditing && (
                        <div className="pt-3 border-t space-y-3 text-xs" style={{ borderColor: currentTheme.border }}>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase opacity-60 mb-1">Título</label>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => {
                                  const updated = projects.map((p) =>
                                    p.id === proj.id ? { ...p, title: e.target.value } : p
                                  );
                                  onUpdateProjects(updated);
                                }}
                                className="w-full px-2.5 py-1.5 rounded border bg-transparent"
                                style={{ borderColor: currentTheme.border }}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase opacity-60 mb-1">Categoria</label>
                              <select
                                value={proj.category}
                                onChange={(e) => {
                                  const cat = e.target.value as Project['category'];
                                  const labels: Record<Project['category'], string> = {
                                    campaign: 'Campanha 360',
                                    series: 'Séries & Streaming',
                                    convention: 'Vídeo Convenção',
                                  };
                                  const updated = projects.map((p) =>
                                    p.id === proj.id ? { ...p, category: cat, categoryLabel: labels[cat] } : p
                                  );
                                  onUpdateProjects(updated);
                                }}
                                className="w-full px-2.5 py-1.5 rounded border bg-transparent"
                                style={{ borderColor: currentTheme.border }}
                              >
                                <option value="campaign">Campanha 360</option>
                                <option value="series">Séries & Streaming</option>
                                <option value="convention">Vídeo Convenção</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase opacity-60 mb-1">Link do Vídeo (Box, Google Drive, YouTube ou Vimeo)</label>
                            <input
                              type="url"
                              value={proj.videoUrl || ''}
                              onChange={(e) => {
                                const updated = projects.map((p) =>
                                  p.id === proj.id
                                    ? { ...p, videoUrl: e.target.value, externalLink: e.target.value }
                                    : p
                                );
                                onUpdateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded border bg-transparent"
                              style={{ borderColor: currentTheme.border }}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase opacity-60 mb-1">Resumo Curto</label>
                            <textarea
                              rows={2}
                              value={proj.summary}
                              onChange={(e) => {
                                const updated = projects.map((p) =>
                                  p.id === proj.id ? { ...p, summary: e.target.value } : p
                                );
                                onUpdateProjects(updated);
                              }}
                              className="w-full px-2.5 py-1.5 rounded border bg-transparent resize-none"
                              style={{ borderColor: currentTheme.border }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Backup & Reset Tools */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t shrink-0 text-xs"
          style={{ borderColor: currentTheme.border, backgroundColor: currentTheme.bgGlass }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-opacity cursor-pointer opacity-70 hover:opacity-100"
              style={{ borderColor: currentTheme.border }}
              title="Guardar ficheiro JSON com todas as definições"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar JSON</span>
            </button>

            <label
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-opacity cursor-pointer opacity-70 hover:opacity-100"
              style={{ borderColor: currentTheme.border }}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Importar JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetDefaults}
              className="flex items-center gap-1.5 opacity-60 hover:opacity-100 text-xs cursor-pointer hover:underline"
              title="Restaurar definições de design e projetos originais"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Originais</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer"
              style={{
                backgroundColor: currentTheme.accent,
                color: currentTheme.isLight ? '#ffffff' : '#0a120e',
              }}
            >
              Concluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
