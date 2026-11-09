import React, { useState } from 'react';
import { ThemeConfig, UserRole } from '../types/index.ts';
import { ERGONOMIC_STRETCHES } from '../data/stretches.ts';
import { soundEngine } from '../services/soundEngine.ts';

interface PostureGuideViewProps {
  theme: ThemeConfig;
  userRole: UserRole;
  onStartStretchSession: (stretchId?: string) => void;
}

export const PostureGuideView: React.FC<PostureGuideViewProps> = ({
  theme,
  userRole,
  onStartStretchSession,
}) => {
  const [selectedStretchId, setSelectedStretchId] = useState<string | null>(null);

  const ergonomicsChecklist = [
    {
      title: 'The 90-90-90 Posture Angle',
      desc: 'Elbows at 90° resting on armrests/desk, hips at 90-100°, knees at 90° with feet flat on the floor.',
      icon: '📐',
    },
    {
      title: 'Eyeline & Monitor Distance',
      desc: 'Top third of your screen should be at horizontal eye level, exactly an arm’s length away.',
      icon: '👁️',
    },
    {
      title: 'Lumbar Inward Curve Support',
      desc: 'If using a rigid static dining/dorm chair, place a rolled towel behind your lower lumbar curve.',
      icon: '🪑',
    },
    {
      title: 'The 45-Minute Micro-Break Rule',
      desc: 'After 45 mins of sitting, intervertebral discs compress by ~15%. Standing for 3 mins restores spinal fluid.',
      icon: '⏱️',
    },
  ];

  return (
    <div className="space-y-4 pb-24">
      {/* Design Thinking Header */}
      <div
        className={`p-5 rounded-3xl border ${theme.cardBgClass} ${theme.borderClass} relative overflow-hidden`}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-2xl">{theme.accentEmoji}</span>
          <span
            className="text-xs font-extrabold uppercase tracking-widest"
            style={{ color: theme.primaryColor }}
          >
            {theme.decreesLabel} • ERGONOMIC SCIENCE
          </span>
        </div>
        <h2 className="text-2xl font-black text-white">Combating Static Chair Syndrome</h2>
        <p className="text-sm text-white/80 mt-1.5 leading-relaxed">
          Prolonged static sitting compresses lumbar spinal discs by 190% compared to standing,
          leading to chronic neck tension, cognitive brain fog, and vascular fatigue.
        </p>

        {/* Role Specific Badge */}
        <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-sm font-semibold text-white/95">
          <span>{userRole === 'wfh' ? '💼 WFH Ergonomics' : '🎓 Student Dorm & Study Guide'}</span>
        </div>
      </div>

      {/* Ergonomic Setup Checklist */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2 px-1">
          <span>✅</span> Static Chair Mitigation Checklist
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {ergonomicsChecklist.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3.5"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-sm text-white/75 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stretch Directory */}
      <div className="space-y-3 mt-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>🧘</span> Guided Ergonomic Exercises
          </h3>
          <span className="text-xs text-white/60 font-semibold">{ERGONOMIC_STRETCHES.length} Exercises</span>
        </div>

        <div className="space-y-2.5">
          {ERGONOMIC_STRETCHES.map((stretch) => (
            <div
              key={stretch.id}
              className="p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/10"
                    style={{ color: theme.accentColor }}
                  >
                    {stretch.targetArea}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{stretch.title}</h4>
                  <div className="text-sm text-white/70 mt-0.5">{stretch.repsText}</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playThemeSound(theme.id);
                    onStartStretchSession(stretch.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-black uppercase ${theme.buttonClass}`}
                >
                  Start
                </button>
              </div>

              <p className="text-sm text-white/80 mt-2.5 bg-black/25 p-3 rounded-xl border border-white/5 leading-relaxed font-normal">
                {stretch.benefits}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
