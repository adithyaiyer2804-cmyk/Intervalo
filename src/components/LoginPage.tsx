import React, { useState } from 'react';
import { ThemeConfig } from '../types/index.ts';
import { soundEngine } from '../services/soundEngine.ts';
import { haptics } from '../services/haptics.ts';

interface LoginPageProps {
  theme: ThemeConfig;
  onLogin: (name: string, email: string, provider: 'google' | 'email') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ theme, onLogin }) => {
  const [authMode, setAuthMode] = useState<'options' | 'email'>('options');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('Adithya');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('ai7432@srmist.edu.in');

  const handleGoogleSubmit = () => {
    soundEngine.playCelebration();
    haptics.success();
    const finalName = customGoogleName.trim() || 'Student Scholar';
    onLogin(finalName, customGoogleEmail.trim() || 'student@srmist.edu.in', 'google');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    soundEngine.playCelebration();
    haptics.success();
    onLogin(
      name.trim(),
      email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '.')}@intervalo.app`,
      'email'
    );
  };

  const handleQuickPreset = (presetName: string, presetEmail: string) => {
    soundEngine.playClick();
    haptics.light();
    setName(presetName);
    setEmail(presetEmail);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center p-4 text-white overflow-hidden">
      {/* Background with thematic overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${theme.backgroundImage})` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgClass} opacity-85 backdrop-blur-sm`} />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#0b111e]/95 border border-white/20 p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-6">
          <div
            className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border-2 shadow-xl relative"
            style={{
              backgroundColor: `${theme.primaryColor}22`,
              borderColor: theme.primaryColor,
              boxShadow: `0 0 25px ${theme.primaryColor}55`,
            }}
          >
            {/* Hourglass vector */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 3H18M6 21H18M7 3C7 9 12 12 12 12C12 12 17 9 17 3M7 21C7 15 12 12 12 12C12 12 17 15 17 21"
                stroke={theme.primaryColor}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="16" r="2" fill={theme.accentColor} />
            </svg>
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-wider text-white">INTERVALO</h1>
            <p className="text-sm uppercase tracking-widest text-white/75 font-bold mt-1">
              Posture Breaks &amp; Reward System
            </p>
          </div>

          <p className="text-base text-white/85 leading-relaxed max-w-sm mx-auto">
            Combat static chair compression, take scheduled micro-breaks, and earn authentic vouchers from Nike, Starbucks, Herman Miller &amp; more.
          </p>
        </div>

        {/* Primary Auth Actions */}
        {authMode === 'options' ? (
          <div className="space-y-4">
            {/* Continue with Google Button */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                haptics.light();
                setIsGoogleModalOpen(true);
              }}
              className="w-full py-4 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-base flex items-center justify-center gap-3 transition-all transform active:scale-98 shadow-lg"
            >
              {/* Google 4-color G Logo */}
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Continue with Email Button */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setAuthMode('email');
              }}
              className="w-full py-4 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all border border-white/15"
            >
              <span>✉️</span>
              <span>Sign in with Email &amp; Name</span>
            </button>

            {/* Quick Demo Personas */}
            <div className="pt-3.5 border-t border-white/10">
              <span className="text-xs uppercase font-bold tracking-wider text-white/60 block text-center mb-2.5">
                Or Quick 1-Tap Login as:
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onLogin('Adithya', 'ai7432@srmist.edu.in', 'google')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all"
                >
                  <div className="text-sm font-bold text-white truncate">Adithya</div>
                  <div className="text-xs text-white/60 truncate mt-0.5">ai7432@srmist.edu.in</div>
                </button>

                <button
                  type="button"
                  onClick={() => onLogin('Priya Sharma', 'priya.sharma@techcorp.in', 'email')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all"
                >
                  <div className="text-sm font-bold text-white truncate">Priya Sharma</div>
                  <div className="text-xs text-white/60 truncate mt-0.5">priya@techcorp.in</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Email Form */
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                Your Full Name <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Adithya, Rohan, Sarah..."
                className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/20 text-white placeholder-white/40 text-base focus:outline-none focus:border-emerald-400 transition-colors"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. adithya@college.edu"
                className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/20 text-white placeholder-white/40 text-base focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            {/* Quick Fill suggestions */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-white/60">Quick Fill:</span>
              {['Adithya', 'Vikram', 'Ananya'].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => handleQuickPreset(n, `${n.toLowerCase()}@intervalo.app`)}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 font-medium"
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setAuthMode('options')}
                className="w-1/3 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className={`flex-1 py-3 rounded-xl text-sm uppercase font-black transition-all ${
                  name.trim()
                    ? `${theme.buttonClass} shadow-lg`
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                Enter Intervalo →
              </button>
            </div>
          </form>
        )}

        {/* Footnote */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-white/50 leading-relaxed">
          Design Thinking &amp; Methodology Course Project • Ergonomic Wellness &amp; Posture Breaks
        </div>
      </div>

      {/* Google Sign-In Confirmation Modal */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-white text-slate-900 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <h3 className="font-bold text-sm text-slate-800">Sign in with Google</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Google Account Email
                </label>
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  placeholder="user@srmist.edu.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {customGoogleName.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {customGoogleName || 'Google User'}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {customGoogleEmail}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGoogleSubmit}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
              >
                Sign In As {customGoogleName.split(' ')[0] || 'User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
