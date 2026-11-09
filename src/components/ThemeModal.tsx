import React from 'react';
import { THEMES } from '../data/themes.ts';
import { ThemeId, ThemeConfig } from '../types/index.ts';
import { ThemeIcon } from './ThemeIcon.tsx';
import { soundEngine } from '../services/soundEngine.ts';

interface ThemeModalProps {
  currentTheme: ThemeConfig;
  onSelectTheme: (themeId: ThemeId) => void;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  currentTheme,
  onSelectTheme,
  onClose,
}) => {
  const [filter, setFilter] = React.useState<'all' | 'professional' | 'culture'>('all');
  const themeList = Object.values(THEMES);
  const professionalIds: ThemeId[] = ['executive', 'nordic', 'biophilic', 'obsidian', 'minimal', 'midnight'];

  const filteredThemes = themeList.filter((t) => {
    if (filter === 'professional') return professionalIds.includes(t.id);
    if (filter === 'culture') return !professionalIds.includes(t.id);
    return true;
  });

  const handleSelect = (id: ThemeId) => {
    soundEngine.playThemeSound(id);
    onSelectTheme(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md max-h-[92vh] flex flex-col rounded-3xl bg-[#090d16] border border-white/15 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/50">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>🎨</span> Theme &amp; SFX Vault
            </h2>
            <p className="text-sm text-white/70 mt-0.5">Choose theme, bespoke buttons &amp; audio effects</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close theme vault"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-sm"
          >
            ✕
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 pt-3 pb-2 flex items-center gap-2 border-b border-white/10 bg-black/30">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all ${
              filter === 'all'
                ? 'bg-white text-black shadow-sm'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            All Themes ({themeList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('professional')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all ${
              filter === 'professional'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            💼 Professional
          </button>
          <button
            type="button"
            onClick={() => setFilter('culture')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition-all ${
              filter === 'culture'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            🎬 Pop-Culture &amp; Fun
          </button>
        </div>

        {/* Theme Cards Grid matching user screenshot */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {filteredThemes.map((t) => {
              const isSelected = currentTheme.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  className={`group relative cursor-pointer rounded-2xl p-2.5 border-2 transition-all flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/20 shadow-[0_0_22px_rgba(16,185,129,0.35)]'
                      : 'border-white/10 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.08]'
                  }`}
                >
                  {/* Card Artwork Banner matching Image 2 */}
                  <div
                    className="w-full h-28 rounded-xl p-2 relative flex flex-col justify-between overflow-hidden mb-2 bg-cover bg-center border border-white/10"
                    style={{
                      backgroundImage: `url(${t.backgroundImage})`,
                    }}
                  >
                    {/* Dark gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${t.secondaryColor}aa 0%, rgba(0,0,0,0.75) 100%)`,
                      }}
                    />

                    {/* Top row: Avatar icon & emoji */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg border border-white/20"
                        style={{ backgroundColor: `${t.primaryColor}33`, color: t.primaryColor }}
                      >
                        <ThemeIcon name={t.avatarIcon || t.navIcons.dashboard} size={18} color={t.primaryColor} />
                      </div>
                      <span className="text-xs">{t.accentEmoji}</span>
                    </div>

                    {/* Simulated Mini App Card lines matching user screenshot */}
                    <div className="relative z-10 space-y-1">
                      <div
                        className="h-1.5 w-14 rounded-full"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <div className="h-1 w-8 bg-white/30 rounded-full" />
                    </div>

                    {/* Quick Sound preview button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEngine.playThemeSound(t.id);
                      }}
                      title="Play theme audio"
                      className="relative z-10 self-end px-1.5 py-0.5 rounded text-[10px] bg-black/70 text-white/90 border border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span>🔊</span>
                    </button>
                  </div>

                  {/* Title and Radio Check matching Image 2 */}
                  <div className="px-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white truncate">{t.name}</span>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs font-black shadow-[0_0_10px_rgba(16,185,129,0.6)]">
                          ✓
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/40 group-hover:border-white/70" />
                      )}
                    </div>

                    {/* 3 Theme Swatch Dots matching user screenshot dots "..." */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                        style={{ backgroundColor: t.paletteDots[0] }}
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                        style={{ backgroundColor: t.paletteDots[1] }}
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                        style={{ backgroundColor: t.paletteDots[2] }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/60 flex items-center justify-between">
          <div className="text-sm text-white/80">
            Active: <span className="font-black text-white">{currentTheme.name}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl text-sm uppercase font-extrabold ${currentTheme.buttonClass}`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
