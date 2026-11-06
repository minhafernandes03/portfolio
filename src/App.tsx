/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { WaterBackground, BackgroundStyle } from './components/WaterBackground';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { ProjectGrid } from './components/ProjectGrid';
import { DisciplinesSection } from './components/DisciplinesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CustomizerModal } from './components/CustomizerModal';
import { ZenInteractionDock } from './components/ZenInteractionDock';
import {
  ThemeConfig,
  THEMES,
  ProfileData,
  INITIAL_PROFILE,
  Project,
  INITIAL_PROJECTS,
} from './types/portfolio';

export default function App() {
  // Theme state with local persistence
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    try {
      const savedThemeId = localStorage.getItem('mf_portfolio_theme_id');
      const found = THEMES.find((t) => t.id === savedThemeId);
      return found || THEMES[0];
    } catch {
      return THEMES[0];
    }
  });

  // Background style state: 'waves' | 'dewdrops' | 'aurora' | 'zen'
  const [bgStyle, setBgStyle] = useState<BackgroundStyle>(() => {
    try {
      const saved = localStorage.getItem('mf_portfolio_bg_style') as BackgroundStyle;
      return saved || 'dewdrops';
    } catch {
      return 'dewdrops';
    }
  });

  // Water Background animation settings
  const [waterIntensity, setWaterIntensity] = useState<'off' | 'subtle' | 'medium' | 'flowing'>(() => {
    try {
      return (localStorage.getItem('mf_portfolio_water_intensity') as any) || 'subtle';
    } catch {
      return 'subtle';
    }
  });

  const [waterSpeed, setWaterSpeed] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mf_portfolio_water_speed');
      return saved ? parseFloat(saved) : 1.0;
    } catch {
      return 1.0;
    }
  });

  const [waterInteractive, setWaterInteractive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mf_portfolio_water_interactive');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  // Profile data state
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('mf_portfolio_profile_v2');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  // Projects state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('mf_portfolio_projects_v2');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Active modal & drawer states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Toggle Day and Night Modes smoothly
  const handleToggleDayNight = useCallback(() => {
    if (theme.isLight) {
      // Switch to default dark/night theme
      const darkTheme = THEMES.find((t) => !t.isLight) || THEMES[0];
      setTheme(darkTheme);
    } else {
      // Switch to day/light theme
      const lightTheme = THEMES.find((t) => t.isLight) || THEMES[THEMES.length - 1];
      setTheme(lightTheme);
    }
  }, [theme]);

  // Sync theme changes to CSS root variables and HTML
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-bg-base', theme.bgBase);
    root.style.setProperty('--color-bg-surface', theme.bgSurface);
    root.style.setProperty('--color-bg-glass', theme.bgGlass);
    root.style.setProperty('--color-border', theme.border);
    root.style.setProperty('--color-border-hover', theme.borderHover);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-accent-soft', theme.accentSoft);
    root.style.setProperty('--color-accent-glow', theme.accentGlow);
    root.style.setProperty('--color-text-main', theme.textMain);
    root.style.setProperty('--color-text-muted', theme.textMuted);
    root.style.setProperty('--color-water-highlight', theme.waterHighlight);

    if (theme.isLight) {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }

    try {
      localStorage.setItem('mf_portfolio_theme_id', theme.id);
    } catch {
      // ignore
    }
  }, [theme]);

  // Persist background and profile settings
  useEffect(() => {
    try {
      localStorage.setItem('mf_portfolio_bg_style', bgStyle);
      localStorage.setItem('mf_portfolio_water_intensity', waterIntensity);
      localStorage.setItem('mf_portfolio_water_speed', waterSpeed.toString());
      localStorage.setItem('mf_portfolio_water_interactive', waterInteractive.toString());
      localStorage.setItem('mf_portfolio_profile_v2', JSON.stringify(profile));
      localStorage.setItem('mf_portfolio_projects_v2', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [bgStyle, waterIntensity, waterSpeed, waterInteractive, profile, projects]);

  // Intersection observer for active navigation section
  useEffect(() => {
    const sections = ['obras', 'disciplinas', 'sobre', 'contacto'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTriggerSplash = () => {
    // Dispatch a synthetic click event on window center to trigger canvas water ripple
    const evt = new MouseEvent('click', {
      clientX: window.innerWidth * (0.3 + Math.random() * 0.4),
      clientY: window.innerHeight * (0.3 + Math.random() * 0.4),
      bubbles: true,
    });
    window.dispatchEvent(evt);
  };

  const handleResetDefaults = () => {
    if (confirm('Desejas restaurar todas as definições e projetos para o estado inicial?')) {
      setTheme(THEMES[0]);
      setBgStyle('dewdrops');
      setWaterIntensity('subtle');
      setWaterSpeed(1.0);
      setWaterInteractive(true);
      setProfile(INITIAL_PROFILE);
      setProjects(INITIAL_PROJECTS);
      try {
        localStorage.clear();
      } catch {
        // ignore
      }
    }
  };

  return (
    <div
      className="min-h-screen relative font-sans selection:bg-emerald-500/30 selection:text-emerald-100 transition-colors duration-700"
      style={{
        backgroundColor: theme.bgBase,
        color: theme.textMain,
      }}
    >
      {/* Upgraded Interactive Water & Nature Canvas Ambient Background */}
      <WaterBackground
        theme={theme}
        intensity={waterIntensity}
        speed={waterSpeed}
        interactive={waterInteractive}
        bgStyle={bgStyle}
        soundOnClick={true}
      />

      {/* Top Bar with Strict Contract, Day/Night Toggle, and Scroll Line */}
      <TopBar
        theme={theme}
        brandName={profile.name}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onToggleDayNight={handleToggleDayNight}
        isDark={!theme.isLight}
        activeSection={activeSection}
      />

      {/* Main Content Layout with smooth scroll rhythm */}
      <main className="relative z-10 space-y-12">
        <HeroSection
          profile={profile}
          theme={theme}
          onExploreClick={() => {
            document.getElementById('obras')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => {
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ProjectGrid
          projects={projects}
          theme={theme}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        <DisciplinesSection theme={theme} />

        <AboutSection profile={profile} theme={theme} />

        <ContactSection profile={profile} theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} brandName={profile.name} />

      {/* Playful Zen Interaction Dock (Bottom Right) */}
      <ZenInteractionDock
        theme={theme}
        onTriggerSplash={handleTriggerSplash}
      />

      {/* Project Lightbox / Detailed View Modal */}
      <ProjectModal
        project={selectedProject}
        projects={projects}
        theme={theme}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Live Customizer Drawer / Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentTheme={theme}
        onSelectTheme={setTheme}
        waterIntensity={waterIntensity}
        onChangeWaterIntensity={setWaterIntensity}
        waterSpeed={waterSpeed}
        onChangeWaterSpeed={setWaterSpeed}
        waterInteractive={waterInteractive}
        onToggleWaterInteractive={() => setWaterInteractive(!waterInteractive)}
        bgStyle={bgStyle}
        onChangeBgStyle={setBgStyle}
        onToggleDayNight={handleToggleDayNight}
        profile={profile}
        onUpdateProfile={setProfile}
        projects={projects}
        onUpdateProjects={setProjects}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
