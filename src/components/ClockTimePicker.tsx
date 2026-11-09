import React, { useState, useRef, useEffect } from 'react';
import { ThemeConfig } from '../types/index.ts';
import { soundEngine } from '../services/soundEngine.ts';

interface ClockTimePickerProps {
  theme: ThemeConfig;
  initialMinutes: number;
  initialBreakDuration: number;
  onSave: (intervalMinutes: number, breakDurationMinutes: number) => void;
  onClose: () => void;
}

export const ClockTimePicker: React.FC<ClockTimePickerProps> = ({
  theme,
  initialMinutes,
  initialBreakDuration,
  onSave,
  onClose,
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);
  const [breakDuration, setBreakDuration] = useState(initialBreakDuration);
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef<SVGSVGElement | null>(null);

  // Angle on 60-minute circle: angle in degrees = (selectedMinutes / 60) * 360
  const angle = (selectedMinutes % 60) * 6; // 360 / 60 = 6 deg per minute

  const handlePointerCalculation = (e: React.PointerEvent<SVGSVGElement> | PointerEvent) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    // Angle in degrees from top (12 o'clock)
    let deg = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;

    // Convert degrees to minutes rounded to nearest 5 min or 1 min
    const mins = Math.max(5, Math.min(120, Math.round(deg / 6)));
    setSelectedMinutes(mins);
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(true);
    handlePointerCalculation(e);
  };

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (isDragging) {
        handlePointerCalculation(e);
      }
    };
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    }
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [isDragging]);

  const presets = [
    { label: '20 min', desc: 'Optic 20-20-20', val: 20 },
    { label: '25 min', desc: 'Pomodoro / Student', val: 25 },
    { label: '45 min', desc: 'Ergonomic Standard', val: 45 },
    { label: '60 min', desc: 'Deep Work Block', val: 60 },
  ];

  const handleConfirm = () => {
    soundEngine.playThemeSound(theme.id);
    onSave(selectedMinutes, breakDuration);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className={`w-full max-w-sm rounded-3xl p-6 border ${theme.cardBgClass} ${theme.borderClass} animate-in fade-in zoom-in-95 duration-200`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>⏰</span> Choose Break Interval
            </h3>
            <p className="text-sm text-white/70 mt-0.5">Rotate clock hand or pick a posture preset</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close clock picker"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Digital display */}
        <div className="text-center mb-4">
          <div className="inline-flex items-baseline gap-2 px-5 py-2 rounded-2xl bg-black/40 border border-white/10">
            <span
              className="text-4xl font-extrabold tracking-tight"
              style={{ color: theme.primaryColor }}
            >
              {selectedMinutes}
            </span>
            <span className="text-sm font-semibold text-white/70">MINUTES WORK</span>
          </div>
        </div>

        {/* Interactive Radial Clock Face */}
        <div className="relative flex justify-center items-center my-3 select-none">
          <svg
            ref={clockRef}
            width="220"
            height="220"
            viewBox="0 0 220 220"
            className="cursor-pointer touch-none"
            onPointerDown={handlePointerDown}
          >
            {/* Clock background ring */}
            <circle cx="110" cy="110" r="100" fill="#0d1117" stroke={theme.primaryColor} strokeWidth="2" strokeOpacity="0.3" />
            <circle cx="110" cy="110" r="92" fill="#0b0f19" />

            {/* Minute tick marks */}
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((min) => {
              const tickAngle = min * 6 * (Math.PI / 180);
              const x1 = 110 + 80 * Math.sin(tickAngle);
              const y1 = 110 - 80 * Math.cos(tickAngle);
              const x2 = 110 + (min % 15 === 0 ? 68 : 74) * Math.sin(tickAngle);
              const y2 = 110 - (min % 15 === 0 ? 68 : 74) * Math.cos(tickAngle);
              const textX = 110 + 58 * Math.sin(tickAngle);
              const textY = 110 - 58 * Math.cos(tickAngle) + 4;

              return (
                <g key={min}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={min % 15 === 0 ? theme.primaryColor : '#ffffff44'}
                    strokeWidth={min % 15 === 0 ? 3 : 1.5}
                    strokeLinecap="round"
                  />
                  {min % 15 === 0 && (
                    <text
                      x={textX}
                      y={textY}
                      fill="#ffffffcc"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {min === 0 ? '60' : min}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Glowing sweep path */}
            <path
              d={`M 110 110 L 110 30 A 80 80 0 ${angle > 180 ? 1 : 0} 1 ${
                110 + 80 * Math.sin(angle * (Math.PI / 180))
              } ${110 - 80 * Math.cos(angle * (Math.PI / 180))} Z`}
              fill={theme.primaryColor}
              fillOpacity="0.12"
            />

            {/* Clock Hand */}
            <g transform={`rotate(${angle} 110 110)`}>
              <line
                x1="110"
                y1="110"
                x2="110"
                y2="32"
                stroke={theme.primaryColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle
                cx="110"
                cy="32"
                r="8"
                fill={theme.primaryColor}
                stroke="#ffffff"
                strokeWidth="2"
                className="shadow-lg"
              />
            </g>

            {/* Center Pivot */}
            <circle cx="110" cy="110" r="7" fill={theme.primaryColor} />
            <circle cx="110" cy="110" r="3" fill="#ffffff" />
          </svg>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-2 gap-2 my-3">
          {presets.map((preset) => (
            <button
              key={preset.val}
              type="button"
              onClick={() => {
                setSelectedMinutes(preset.val);
                soundEngine.playClick();
              }}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                selectedMinutes === preset.val
                  ? `border-white/80 bg-white/15 text-white font-bold`
                  : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <div className="text-sm font-bold">{preset.label}</div>
              <div className="text-xs text-white/60 mt-0.5">{preset.desc}</div>
            </button>
          ))}
        </div>

        {/* Break Duration Selector */}
        <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 my-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-white/90">Break Duration:</span>
            <span className="text-sm font-bold" style={{ color: theme.primaryColor }}>
              {breakDuration} Minutes
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[3, 5, 10].map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => {
                  setBreakDuration(dur);
                  soundEngine.playClick();
                }}
                className={`py-2 rounded-lg text-sm font-bold transition-all ${
                  breakDuration === dur
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {dur} mins
              </button>
            ))}
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={handleConfirm}
          className={`w-full py-3.5 rounded-2xl text-center text-sm uppercase tracking-wider ${theme.buttonClass} transition-transform active:scale-95`}
        >
          Set Custom Break Timer
        </button>
      </div>
    </div>
  );
};
