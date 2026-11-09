import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ThemeConfig, StretchExercise, UserRole } from '../types/index.ts';
import { ERGONOMIC_STRETCHES } from '../data/stretches.ts';
import { soundEngine } from '../services/soundEngine.ts';
import { calculateBreakPoints, formatTime } from '../utils/rewards.ts';

interface ActiveBreakModalProps {
  theme: ThemeConfig;
  userRole: UserRole;
  streakDays: number;
  breakDurationMinutes: number;
  onCompleteBreak: (earnedPoints: number, minutesRested: number) => void;
  onCancel: () => void;
}

export const ActiveBreakModal: React.FC<ActiveBreakModalProps> = ({
  theme,
  userRole,
  streakDays,
  breakDurationMinutes,
  onCompleteBreak,
  onCancel,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(breakDurationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [completedStretches, setCompletedStretches] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Filter stretches recommended for role or all
  const availableStretches = ERGONOMIC_STRETCHES.filter(
    (s) => s.recommendedFor === 'all' || s.recommendedFor === userRole
  );
  const currentStretch = availableStretches[currentStepIndex % availableStretches.length];

  // Countdown timer
  useEffect(() => {
    if (isFinished || isPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleFinishBreak();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, isPaused]);

  const handleNextStretch = () => {
    if (!completedStretches.includes(currentStretch.id)) {
      setCompletedStretches((prev) => [...prev, currentStretch.id]);
    }
    soundEngine.playThemeSound(theme.id);
    if (currentStepIndex + 1 < availableStretches.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinishBreak();
    }
  };

  const handleFinishBreak = () => {
    const totalSecsRested = breakDurationMinutes * 60 - secondsRemaining;
    const pts = calculateBreakPoints(
      Math.max(60, totalSecsRested),
      completedStretches.length + 1,
      streakDays
    );
    setEarnedPoints(pts);
    setIsFinished(true);

    // Audio & Confetti
    soundEngine.playCelebration();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: [theme.primaryColor, '#ffffff', theme.accentColor],
    });
  };

  const handleCloseDone = () => {
    onCompleteBreak(earnedPoints, breakDurationMinutes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div
        className={`w-full max-w-md rounded-3xl p-6 border ${theme.cardBgClass} ${theme.borderClass} shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95`}
      >
        {!isFinished ? (
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span
                  className="text-xs uppercase tracking-widest font-extrabold"
                  style={{ color: theme.primaryColor }}
                >
                  {theme.decreesLabel} • ACTIVE BREAK
                </span>
                <h3 className="text-lg font-bold text-white">Posture &amp; Spine Relief</h3>
              </div>
              <button
                onClick={onCancel}
                aria-label="Exit break"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Big Countdown Timer */}
            <div className="flex flex-col items-center justify-center py-4 bg-black/40 rounded-2xl border border-white/10 mb-5 relative">
              <span className="text-xs text-white/50 mb-1">TOTAL BREAK TIME REMAINING</span>
              <div
                className="text-5xl font-black tracking-tight"
                style={{ color: theme.primaryColor }}
              >
                {formatTime(secondsRemaining)}
              </div>

              {/* Pause / Resume button */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 hover:bg-white/20"
              >
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </button>
            </div>

            {/* Current Stretch Exercise Card */}
            <div className="bg-white/5 rounded-2xl p-4.5 border border-white/10 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold bg-white/10"
                  style={{ color: theme.accentColor }}
                >
                  Target: {currentStretch.targetArea}
                </span>
                <span className="text-sm text-white/70 font-semibold">
                  Step {currentStepIndex + 1} of {availableStretches.length}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-1.5">{currentStretch.title}</h4>
              <p className="text-sm text-white/80 mb-3 font-medium">{currentStretch.repsText}</p>

              {/* Step instructions */}
              <div className="space-y-2 bg-black/30 p-3.5 rounded-xl border border-white/5">
                {currentStretch.instructions.map((inst, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-white/85 leading-relaxed">
                    <span
                      className="font-bold flex-shrink-0"
                      style={{ color: theme.primaryColor }}
                    >
                      {i + 1}.
                    </span>
                    <span>{inst}</span>
                  </div>
                ))}
              </div>

              {/* Ergonomic Benefit */}
              <div className="mt-3.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300 leading-relaxed">
                💡 <span className="font-bold">Why this works:</span> {currentStretch.benefits}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleNextStretch}
                className={`flex-1 py-3.5 rounded-xl text-center text-sm uppercase font-extrabold ${theme.buttonClass}`}
              >
                {currentStepIndex + 1 < availableStretches.length
                  ? 'Complete & Next Stretch'
                  : 'Finish Break & Claim Points'}
              </button>
              <button
                type="button"
                onClick={handleFinishBreak}
                className="px-4 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white/90"
              >
                Finish Now
              </button>
            </div>
          </div>
        ) : (
          /* Finished State */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-3xl mb-3 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              🎉
            </div>
            <h3 className="text-2xl font-black text-white mb-1.5">Posture Break Complete!</h3>
            <p className="text-sm text-white/80 max-w-sm mx-auto mb-4 leading-relaxed font-normal">
              {theme.heroBannerText}
            </p>

            <div className="bg-black/50 p-4 rounded-2xl border border-white/10 mb-5 max-w-xs mx-auto">
              <div className="text-xs text-white/60 mb-0.5 font-bold uppercase tracking-wider">POINTS EARNED</div>
              <div
                className="text-4xl font-extrabold tracking-tight"
                style={{ color: theme.primaryColor }}
              >
                +{earnedPoints} PTS
              </div>
              <div className="text-xs text-emerald-400 mt-1.5 font-bold">
                🔥 {streakDays + 1} Day Streak Active!
              </div>
            </div>

            <p className="text-sm text-white/70 mb-5 leading-relaxed font-normal">
              Spinal decompression verified. Your static chair strain index has decreased!
            </p>

            <button
              type="button"
              onClick={handleCloseDone}
              className={`w-full py-4 rounded-2xl text-sm uppercase font-black tracking-wider ${theme.buttonClass}`}
            >
              Back to Workstation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
