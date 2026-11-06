import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowUpRight, Copy, Check } from 'lucide-react';
import { ProfileData, ThemeConfig } from '../types/portfolio';

interface ContactSectionProps {
  profile: ProfileData;
  theme: ThemeConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'producao',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate clean dispatch + open mailto
    setSubmitted(true);
    const subject = encodeURIComponent(`[Portfólio Carmen Fernandes] Contacto de ${formData.name} - ${formData.projectType}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nEmail: ${formData.email}\nTipo de Projeto: ${formData.projectType}\n\nMensagem:\n${formData.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contacto" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      <div className="rounded-3xl border p-8 md:p-14 relative overflow-hidden backdrop-blur-md" style={{ borderColor: theme.border, backgroundColor: theme.bgSurface }}>
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: theme.accent }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-widest font-medium opacity-75" style={{ color: theme.accent }}>
              Vamos Colaborar
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-normal" style={{ color: theme.textMain }}>
              Vamos conversar?
            </h2>
            <p className="text-xs md:text-sm leading-relaxed opacity-75 font-light" style={{ color: theme.textMuted }}>
              Para oportunidades em produção publicitária, atendimento ou projetos multimédia, fico disponível para contacto.
            </p>

            {/* Email card */}
            <div className="p-4 rounded-xl border flex items-center justify-between" style={{ borderColor: theme.border, backgroundColor: theme.bgGlass }}>
              <div>
                <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-0.5">E-mail Direto</span>
                <span className="font-mono text-sm" style={{ color: theme.textMain }}>{profile.email}</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg border transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-105"
                style={{ borderColor: theme.border, backgroundColor: theme.accentSoft }}
                title="Copiar e-mail"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Links (só aparecem os que tiverem link preenchido) */}
            {Object.values(profile.socials).some((u) => u) && (
            <div>
              <span className="text-xs uppercase tracking-wider opacity-50 block mb-3">Redes & Plataformas</span>
              <div className="flex flex-wrap gap-4 text-xs font-medium">
                {Object.entries(profile.socials).filter(([, url]) => url).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 hover:underline transition-opacity uppercase tracking-wider"
                    style={{ color: theme.textMain }}
                  >
                    <span>{key}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>
            )}
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div
                className="p-8 rounded-2xl border text-center space-y-4"
                style={{ borderColor: theme.border, backgroundColor: theme.bgGlass }}
              >
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
                <h3 className="text-xl font-serif font-normal" style={{ color: theme.textMain }}>
                  Mensagem Preparada com Sucesso!
                </h3>
                <p className="text-xs md:text-sm opacity-80 font-light max-w-md mx-auto" style={{ color: theme.textMuted }}>
                  O teu cliente de e-mail foi aberto com os dados preenchidos. Em alternativa, podes contactar diretamente através de{' '}
                  <span className="font-mono font-medium text-emerald-400">{profile.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs rounded-md border font-medium cursor-pointer"
                  style={{ borderColor: theme.border, color: theme.textMain }}
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 md:p-8 rounded-2xl border"
                style={{ borderColor: theme.border, backgroundColor: theme.bgGlass }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1.5">O Teu Nome</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Clara Ribeiro"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none transition-colors"
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.bgSurface,
                        color: theme.textMain,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1.5">O Teu E-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="clara@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none transition-colors"
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.bgSurface,
                        color: theme.textMain,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1.5">Tipo de Trabalho / Parceria</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none cursor-pointer"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.bgSurface,
                      color: theme.textMain,
                    }}
                  >
                    <option value="producao">Produção Publicitária</option>
                    <option value="atendimento">Atendimento / Gestão de Projetos</option>
                    <option value="multimedia">Projeto Multimédia</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider opacity-60 mb-1.5">Mensagem & Contexto</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Conta-me um pouco sobre o projeto, prazos e objetivos..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none transition-colors resize-none"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.bgSurface,
                      color: theme.textMain,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.isLight ? '#ffffff' : '#0a120e',
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
