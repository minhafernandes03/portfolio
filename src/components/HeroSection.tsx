import React, { useState } from 'react';
import { ArrowDown, Volume2, VolumeX, Play, Eye } from 'lucide-react';
import { ProfileData, ThemeConfig } from '../types/portfolio';
import { waterAudio } from '../utils/waterAudio';

interface HeroSectionProps {
  profile: ProfileData;
  theme: ThemeConfig;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  theme,
  onExploreClick,
  onContactClick,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(0.3);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      waterAudio.stop();
      setIsPlayingAudio(false);
    } else {
      waterAudio.play(volume);
      setIsPlayingAudio(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    waterAudio.setVolume(val);
  };

  return (
    <section className="relative pt-28 md:pt-36 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Typographic Hero */}
      <div className="max-w-4xl flex flex-col justify-center">
        {/* Quiet unboxed kicker */}
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-4 opacity-75" style={{ color: theme.accent }}>
          <span>Portfólio</span>
          <span aria-hidden="true">·</span>
          <span>Produção Publicitária & Multimédia</span>
        </div>

        {/* Primary Display Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-[1.08] mb-6"
          style={{ color: theme.textMain, textWrap: 'balance' }}
        >
          Produção publicitária, atendimento e multimédia.
        </h1>

        {/* Lead Copy */}
        <p
          className="text-base sm:text-lg font-light leading-relaxed mb-8 max-w-2xl"
          style={{ color: theme.textMuted }}
        >
          {profile.bioHeadline}
        </p>

        {/* Metadata & CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: theme.accent,
              color: theme.isLight ? '#ffffff' : '#0a120e',
            }}
          >
            <Eye className="w-4 h-4" />
            <span>Ver Projetos</span>
          </button>

          <button
            onClick={onContactClick}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer border hover:bg-white/5 active:scale-[0.98]"
            style={{
              borderColor: theme.borderHover,
              color: theme.textMain,
            }}
          >
            <span>Entrar em Contacto</span>
          </button>

          {/* Interactive Audio Soundscape Toggle */}
          <div
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-md border text-xs backdrop-blur-sm"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.accentSoft,
              color: theme.textMain,
            }}
          >
            <button
              onClick={toggleAudio}
              className="flex items-center gap-1.5 opacity-90 hover:opacity-100 cursor-pointer"
              title={isPlayingAudio ? 'Silenciar paisagem sonora' : 'Ativar som ambiente de rio e água'}
            >
              {isPlayingAudio ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
              )}
              <span className="whitespace-nowrap">
                {isPlayingAudio ? 'Áudio de Água Ativo' : 'Ouvir Som Ambiente'}
              </span>
            </button>
            {isPlayingAudio && (
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-emerald-500 cursor-pointer"
                title="Volume da água"
              />
            )}
          </div>
        </div>

        {/* Unboxed Metadata: Availability & Location */}
        <div className="flex flex-wrap items-center gap-3 text-xs opacity-70" style={{ color: theme.textMuted }}>
          <span>{profile.location}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.availability}</span>
        </div>
      </div>

      {/* Proof & Domain Metrics Strip: Full-width row below split */}
      <div
        className="mt-16 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
        style={{ borderColor: theme.border }}
      >
        <div>
          <div className="font-serif text-2xl lg:text-3xl font-light tracking-tight" style={{ color: theme.textMain }}>
            01 / Atendimento
          </div>
          <div className="text-xs uppercase tracking-wider mt-1 opacity-70" style={{ color: theme.textMuted }}>
            Clientes B2B e B2C
          </div>
        </div>

        <div>
          <div className="font-serif text-2xl lg:text-3xl font-light tracking-tight" style={{ color: theme.textMain }}>
            02 / Produção
          </div>
          <div className="text-xs uppercase tracking-wider mt-1 opacity-70" style={{ color: theme.textMuted }}>
            Campanhas Publicitárias
          </div>
        </div>

        <div>
          <div className="font-serif text-2xl lg:text-3xl font-light tracking-tight" style={{ color: theme.textMain }}>
            03 / Multimédia
          </div>
          <div className="text-xs uppercase tracking-wider mt-1 opacity-70" style={{ color: theme.textMuted }}>
            Curso Técnico · em formação
          </div>
        </div>

        <div>
          <div className="font-serif text-2xl lg:text-3xl font-light tracking-tight" style={{ color: theme.textMain }}>
            04 / Arquivo
          </div>
          <div className="text-xs uppercase tracking-wider mt-1 opacity-70" style={{ color: theme.textMuted }}>
            Gestão de Acervo Físico e Digital
          </div>
        </div>
      </div>
    </section>
  );
};
