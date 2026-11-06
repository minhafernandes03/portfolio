import React, { useState } from 'react';
import { Waves, Sparkles, Volume2, VolumeX, Droplets, Compass } from 'lucide-react';
import { ThemeConfig } from '../types/portfolio';
import { waterAudio } from '../utils/waterAudio';

interface ZenInteractionDockProps {
  theme: ThemeConfig;
  onTriggerSplash: () => void;
}

export const ZenInteractionDock: React.FC<ZenInteractionDockProps> = ({
  theme,
  onTriggerSplash,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [splashCount, setSplashCount] = useState(0);

  const toggleSound = () => {
    if (isPlayingAudio) {
      waterAudio.stop();
      setIsPlayingAudio(false);
    } else {
      waterAudio.play(0.25);
      setIsPlayingAudio(true);
    }
  };

  const handlePebbleThrow = () => {
    setSplashCount((prev) => prev + 1);
    waterAudio.playSingleDroplet(Math.sin(splashCount) * 150);
    onTriggerSplash();
  };

  return (
    <aside
      aria-label="Jardim Zen Interativo"
      className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5"
    >
      {/* Expanded Zen Controls Panel */}
      {isExpanded && (
        <div
          className="p-3.5 rounded-2xl border shadow-xl backdrop-blur-lg flex flex-col gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{
            borderColor: theme.borderHover,
            backgroundColor: theme.bgGlass,
            color: theme.textMain,
          }}
        >
          <div className="flex items-center justify-between gap-4 pb-2 border-b text-[11px]" style={{ borderColor: theme.border }}>
            <span className="flex items-center gap-1.5 opacity-70">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Viana do Castelo · Rio Lima</span>
            </span>
            <span className="font-mono text-[10px] opacity-50">Norte PT</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Pebble Throw Action */}
            <button
              onClick={handlePebbleThrow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all hover:scale-105 active:scale-95"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.accentSoft,
                color: theme.textMain,
              }}
              title="Lançar um seixo para criar ondulações na água"
            >
              <Droplets className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>Lançar Gota ({splashCount})</span>
            </button>

            {/* River Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all hover:scale-105 active:scale-95"
              style={{
                borderColor: theme.border,
                backgroundColor: isPlayingAudio ? theme.accent : 'transparent',
                color: isPlayingAudio ? (theme.isLight ? '#ffffff' : '#0a120e') : theme.textMain,
              }}
              title={isPlayingAudio ? 'Silenciar som do rio' : 'Ouvir som de corrente de água'}
            >
              {isPlayingAudio ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
              )}
              <span>{isPlayingAudio ? 'Rio Ativo' : 'Som do Rio'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 text-xs font-medium group"
        style={{
          borderColor: theme.borderHover,
          backgroundColor: theme.bgGlass,
          color: theme.textMain,
        }}
        title="Interações da Água & Natureza"
      >
        <Waves className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Jardim de Água</span>
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: theme.accent }}
        />
      </button>
    </aside>
  );
};
