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
  const [activeTab, setActiveTab] = useState<'theme' | 'water'>('theme');
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
