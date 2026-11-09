import React from 'react';
import { ThemeConfig } from '../types/index.ts';
import { ThemeIcon } from './ThemeIcon.tsx';
import { soundEngine } from '../services/soundEngine.ts';

export type NavTab = 'dashboard' | 'breaks' | 'rewards' | 'guide' | 'profile';

interface BottomNavProps {
  theme: ThemeConfig;
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenBreakReminder?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  theme,
  currentTab,
  onSelectTab,
  onOpenBreakReminder,
}) => {
  const tabs: { id: NavTab; label: string; iconKey: keyof ThemeConfig['navIcons'] }[] = [
    { id: 'dashboard', label: 'Dashboard', iconKey: 'dashboard' },
    { id: 'breaks', label: 'Breaks', iconKey: 'breaks' },
    { id: 'rewards', label: 'Rewards', iconKey: 'rewards' },
    { id: 'guide', label: 'Guide', iconKey: 'guide' },
    { id: 'profile', label: 'Profile', iconKey: 'profile' },
  ];

  const handleTabClick = (tabId: NavTab) => {
    soundEngine.playThemeSound(theme.id);
    onSelectTab(tabId);
  };

  // Determine flame & HUD accent colors
  const flameColor =
    theme.id === 'doom'
      ? '#10b981'
      : theme.id === 'spiderman'
      ? '#ef4444'
      : theme.id === 'luffy'
      ? '#f59e0b'
      : theme.id === 'executive'
      ? '#3b82f6'
      : theme.id === 'nordic'
      ? '#38bdf8'
      : theme.id === 'biophilic'
      ? '#10b981'
      : theme.id === 'obsidian'
      ? '#f59e0b'
      : theme.id === 'halloween'
      ? '#f97316'
      : theme.id === 'ramayan'
      ? '#fbbf24'
      : theme.id === 'friends'
      ? '#d97706'
      : theme.id === 'matrix'
      ? '#22c55e'
      : theme.id === 'synthwave'
      ? '#ec4899'
      : '#38bdf8';

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto px-2 pb-1.5 pt-0 pointer-events-auto"
    >
      <div className="relative rounded-3xl bg-[#090e18]/95 backdrop-blur-2xl border border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* ======================================================== */}
        {/* ORNATE METALLIC TOP RAIL WITH RIVETS (Matching User Image 1) */}
        {/* ======================================================== */}
        <div
          className="relative h-3.5 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-black/60 flex items-center justify-between px-3"
          style={{
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 8px ${flameColor}33`,
          }}
        >
          {/* Metallic horizontal rails */}
          <div className="absolute inset-x-0 top-1 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0.5 h-[1px] bg-black/80" />

          {/* Left Corner Brazier Torch / Gem Head (Matching Image 1) */}
          <div className="relative z-10 flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full border border-black shadow-[0_0_8px_var(--glow)] animate-pulse"
              style={
                {
                  backgroundColor: flameColor,
                  '--glow': flameColor,
                } as React.CSSProperties
              }
            />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600 shadow-sm" />
          </div>

          {/* Center Rivets across the bar */}
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-600 shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-600 shadow-inner" />
            <div
              className="w-2 h-2 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: `${theme.primaryColor}` }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-600 shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-600 shadow-inner" />
          </div>

          {/* Right Corner Brazier Torch / Gem Head (Matching Image 1) */}
          <div className="relative z-10 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600 shadow-sm" />
            <div
              className="w-2.5 h-2.5 rounded-full border border-black shadow-[0_0_8px_var(--glow)] animate-pulse"
              style={
                {
                  backgroundColor: flameColor,
                  '--glow': flameColor,
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* NAV TABS WITH HIGH-FIDELITY THEMATIC CRESTS */}
        {/* ======================================================== */}
        <div className="px-2 py-1.5 flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            const iconName = theme.navIcons[tab.iconKey];

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex-1 py-1 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isActive ? 'scale-105' : 'opacity-65 hover:opacity-90'
                }`}
              >
                {/* Crest Frame */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all relative ${
                    isActive
                      ? 'shadow-lg border'
                      : 'bg-white/[0.03] border border-white/5 hover:border-white/20'
                  }`}
                  style={{
                    backgroundColor: isActive ? `${theme.primaryColor}22` : undefined,
                    borderColor: isActive ? theme.primaryColor : undefined,
                    boxShadow: isActive ? `0 0 16px ${theme.primaryColor}55` : undefined,
                  }}
                >
                  <ThemeIcon
                    name={iconName}
                    size={22}
                    color={isActive ? theme.primaryColor : '#ffffffcc'}
                  />

                  {/* Corner jewel accent on active crest */}
                  {isActive && (
                    <span
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-black shadow-sm"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                  )}
                </div>

                <span
                  className={`text-xs mt-1 tracking-tight font-black ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}
                  style={{
                    color: isActive ? theme.accentColor : undefined,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* SUBTLE BOTTOM DRAWER HANDLE */}
        {/* ======================================================== */}
        <div
          onClick={onOpenBreakReminder}
          className="cursor-pointer px-4 py-1.5 border-t border-white/10 bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-between text-xs text-white/80"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white/95">Today&apos;s Posture Breaks</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white flex items-center gap-1">
            <span>View Schedule</span>
            <span>›</span>
          </span>
        </div>
      </div>
    </nav>
  );
};
