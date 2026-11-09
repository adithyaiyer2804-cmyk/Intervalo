import { haptics } from './haptics.ts';

/**
 * High-Fidelity Web Audio Sound Engine
 * Generates authentic, responsive, zero-latency pop-culture & anime sound effects.
 * 100% offline, zero external asset downloads, zero CORS or network failures.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.85;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
  }

  /**
   * NARUTO JUTSU ACTIVATION SOUND:
   * Authentic multi-stage anime synthesis:
   * 1. Three rapid-fire hand-seal taps (crisp finger clacks: Torii -> Saru -> Tora)
   * 2. High-speed chakra wind whoosh (swept resonant bandpass)
   * 3. Distinctive anime "SHING" chakra ring (dual crystal harmonics)
   * 4. Deep chakra burst release "POOF" (sub-frequency surge)
   */
  public playNarutoJutsu() {
    haptics.jutsu();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // 1. Rapid hand-seal finger clacks (0ms, 55ms, 110ms)
    const clackDelays = [0, 0.055, 0.11];
    clackDelays.forEach((delay, idx) => {
      const clackTime = now + delay;
      const clackOsc = ctx.createOscillator();
      const clackGain = ctx.createGain();
      clackOsc.type = 'triangle';
      // Pitch shifts slightly per seal to simulate moving fingers
      clackOsc.frequency.setValueAtTime(750 + idx * 120, clackTime);
      clackOsc.frequency.exponentialRampToValueAtTime(140, clackTime + 0.035);

      clackGain.gain.setValueAtTime(0.35, clackTime);
      clackGain.gain.exponentialRampToValueAtTime(0.001, clackTime + 0.04);

      clackOsc.connect(clackGain);
      clackGain.connect(masterGain);

      clackOsc.start(clackTime);
      clackOsc.stop(clackTime + 0.04);
    });

    // 2. Chakra blade / wind slicing whoosh (starts right at 0.12s after seals)
    const whooshStart = now + 0.12;
    const bufferSize = ctx.sampleRate * 0.45;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const sweepFilter = ctx.createBiquadFilter();
    sweepFilter.type = 'bandpass';
    sweepFilter.frequency.setValueAtTime(450, whooshStart);
    sweepFilter.frequency.exponentialRampToValueAtTime(4200, whooshStart + 0.18);
    sweepFilter.frequency.exponentialRampToValueAtTime(700, whooshStart + 0.42);
    sweepFilter.Q.setValueAtTime(6.5, whooshStart);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, whooshStart);
    noiseGain.gain.linearRampToValueAtTime(0.55, whooshStart + 0.12);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, whooshStart + 0.45);

    noiseSource.connect(sweepFilter);
    sweepFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noiseSource.start(whooshStart);
    noiseSource.stop(whooshStart + 0.45);

    // 3. Iconic anime "SHING" chakra chime (clean metallic pitch ring)
    const ringFreqs = [1568, 2093, 3136]; // G6, C7, G7 anime overtone
    ringFreqs.forEach((freq, idx) => {
      const ringOsc = ctx.createOscillator();
      const ringGain = ctx.createGain();
      ringOsc.type = idx === 0 ? 'sine' : 'triangle';
      ringOsc.frequency.setValueAtTime(freq, whooshStart + 0.05);

      const peakVol = 0.28 / (idx + 1);
      ringGain.gain.setValueAtTime(0.001, whooshStart + 0.05);
      ringGain.gain.linearRampToValueAtTime(peakVol, whooshStart + 0.08);
      ringGain.gain.exponentialRampToValueAtTime(0.001, whooshStart + 0.42);

      ringOsc.connect(ringGain);
      ringGain.connect(masterGain);

      ringOsc.start(whooshStart + 0.05);
      ringOsc.stop(whooshStart + 0.42);
    });

    // 4. Chakra release sub-bass punch ("POOF")
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, whooshStart + 0.08);
    subOsc.frequency.exponentialRampToValueAtTime(45, whooshStart + 0.35);

    subGain.gain.setValueAtTime(0.45, whooshStart + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.001, whooshStart + 0.35);

    subOsc.connect(subGain);
    subGain.connect(masterGain);

    subOsc.start(whooshStart + 0.08);
    subOsc.stop(whooshStart + 0.35);
  }

  /**
   * RAMAYAN DIVINE SOUND EFFECT:
   * Authentic mythological Indian epic signature:
   * 1. Sacred Shankhnaad (Ancient divine conch horn with rich natural harmonics & prana swell)
   * 2. Sacred Bronze Temple Bell (Maha-Ghanti / Shankh Dhwani celestial shimmer)
   * 3. Divine Kodanda Bowstring Twang ("Tankar" golden sitar-like snap)
   */
  public playRamayanBow() {
    haptics.shankh();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // 1. The Sacred Conch Shell (Shankhnaad) - natural biological horn harmonics
    // Base frequency for divine Shankha: C#3 (~138.59 Hz)
    const fundamental = 138.59;
    const shankhHarmonics = [
      { mult: 1, gain: 0.45, type: 'sine' as OscillatorType },   // Fundamental C#3
      { mult: 2, gain: 0.35, type: 'triangle' as OscillatorType }, // Octave C#4 (277 Hz)
      { mult: 3, gain: 0.28, type: 'sine' as OscillatorType },   // Fifth G#4 (415 Hz)
      { mult: 4, gain: 0.18, type: 'triangle' as OscillatorType }, // Double octave C#5
      { mult: 5, gain: 0.12, type: 'sine' as OscillatorType },   // Major third F5
    ];

    shankhHarmonics.forEach((h) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = h.type;

      // Realistic breath glissando: begins slightly lower then stabilizes and rises with prana swell
      osc.frequency.setValueAtTime(fundamental * h.mult * 0.96, now);
      osc.frequency.linearRampToValueAtTime(fundamental * h.mult, now + 0.18);
      osc.frequency.linearRampToValueAtTime(fundamental * h.mult * 1.03, now + 0.55);

      // Breath envelope (slow sacred swell + majestic resonant decay)
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(h.gain, now + 0.2);
      gain.gain.setValueAtTime(h.gain * 0.9, now + 0.42);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.75);
    });

    // 2. Divine Temple Bronze Bell Chime (Ghanti / Aarti Shimmer)
    const bellFreqs = [830.6, 1244.5, 1661.2]; // G#5, D#6, G#6 temple chime
    bellFreqs.forEach((freq, idx) => {
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(freq, now + 0.05);

      const bVol = 0.2 / (idx + 1);
      bellGain.gain.setValueAtTime(0.001, now + 0.05);
      bellGain.gain.linearRampToValueAtTime(bVol, now + 0.08);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      bellOsc.connect(bellGain);
      bellGain.connect(masterGain);

      bellOsc.start(now + 0.05);
      bellOsc.stop(now + 0.85);
    });

    // 3. Divine Bowstring Twang ("Dhanush Tankar")
    const twangOsc = ctx.createOscillator();
    const twangGain = ctx.createGain();
    twangOsc.type = 'sawtooth';
    twangOsc.frequency.setValueAtTime(650, now + 0.12);
    twangOsc.frequency.exponentialRampToValueAtTime(110, now + 0.45);

    twangGain.gain.setValueAtTime(0.35, now + 0.12);
    twangGain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

    twangOsc.connect(twangGain);
    twangGain.connect(masterGain);

    twangOsc.start(now + 0.12);
    twangOsc.stop(now + 0.48);
  }

  /**
   * SPIDER-MAN "THWIP-THWIP" WEB-SHOOTER:
   * Double-tap compressed aerosol release + sticky web elasticity snap
   */
  public playSpidermanThwip() {
    haptics.thwip();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // Two quick web shots in rapid succession (0ms and 95ms)
    [0, 0.095].forEach((delay) => {
      const shotStart = now + delay;

      // 1. Mechanical wrist-trigger click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(3200, shotStart);
      clickOsc.frequency.exponentialRampToValueAtTime(450, shotStart + 0.035);
      clickGain.gain.setValueAtTime(0.45, shotStart);
      clickGain.gain.exponentialRampToValueAtTime(0.001, shotStart + 0.04);

      clickOsc.connect(clickGain);
      clickGain.connect(masterGain);
      clickOsc.start(shotStart);
      clickOsc.stop(shotStart + 0.04);

      // 2. High pressure fluid aerosol "THWIP"
      const bufferSize = ctx.sampleRate * 0.22;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.045));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const hpFilter = ctx.createBiquadFilter();
      hpFilter.type = 'bandpass';
      hpFilter.frequency.setValueAtTime(2600, shotStart);
      hpFilter.frequency.exponentialRampToValueAtTime(500, shotStart + 0.18);
      hpFilter.Q.setValueAtTime(5, shotStart);

      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.55, shotStart);
      nGain.gain.exponentialRampToValueAtTime(0.001, shotStart + 0.22);

      noise.connect(hpFilter);
      hpFilter.connect(nGain);
      nGain.connect(masterGain);

      noise.start(shotStart);
      noise.stop(shotStart + 0.22);

      // 3. Elastic web tensile snap
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'sine';
      snapOsc.frequency.setValueAtTime(1400, shotStart + 0.02);
      snapOsc.frequency.exponentialRampToValueAtTime(250, shotStart + 0.14);
      snapGain.gain.setValueAtTime(0.3, shotStart + 0.02);
      snapGain.gain.exponentialRampToValueAtTime(0.001, shotStart + 0.15);

      snapOsc.connect(snapGain);
      snapGain.connect(masterGain);
      snapOsc.start(shotStart + 0.02);
      snapOsc.stop(shotStart + 0.15);
    });
  }

  /**
   * DOCTOR DOOM / LATVERIAN DECREE:
   * Heavy Latverian titanium resonance + cosmic emerald beam charge
   */
  public playDoctorDoomBlast() {
    haptics.heavy();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // 1. Deep Latverian fortress bass rumble
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(95, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.55);
    subGain.gain.setValueAtTime(0.55, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.55);

    // 2. Iron gauntlet metallic clank
    const clankOsc = ctx.createOscillator();
    const clankGain = ctx.createGain();
    clankOsc.type = 'square';
    clankOsc.frequency.setValueAtTime(480, now);
    clankOsc.frequency.exponentialRampToValueAtTime(180, now + 0.18);
    clankGain.gain.setValueAtTime(0.35, now);
    clankGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    clankOsc.connect(clankGain);
    clankGain.connect(masterGain);
    clankOsc.start(now);
    clankOsc.stop(now + 0.2);

    // 3. Cosmic emerald plasma charge zap
    const zapOsc = ctx.createOscillator();
    const zapGain = ctx.createGain();
    zapOsc.type = 'sawtooth';
    zapOsc.frequency.setValueAtTime(220, now + 0.05);
    zapOsc.frequency.exponentialRampToValueAtTime(1800, now + 0.18);
    zapOsc.frequency.exponentialRampToValueAtTime(320, now + 0.5);

    const zapFilter = ctx.createBiquadFilter();
    zapFilter.type = 'lowpass';
    zapFilter.frequency.setValueAtTime(1200, now + 0.05);
    zapFilter.frequency.exponentialRampToValueAtTime(3600, now + 0.18);
    zapFilter.frequency.exponentialRampToValueAtTime(450, now + 0.5);

    zapGain.gain.setValueAtTime(0.01, now + 0.05);
    zapGain.gain.linearRampToValueAtTime(0.4, now + 0.14);
    zapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    zapOsc.connect(zapFilter);
    zapFilter.connect(zapGain);
    zapGain.connect(masterGain);

    zapOsc.start(now + 0.05);
    zapOsc.stop(now + 0.5);
  }

  /**
   * F.R.I.E.N.D.S THEME:
   * Authentic syncopated 4-clap cadence ("Clap! Clap! Clap! Clap!") + warm acoustic guitar chord
   */
  public playFriendsClap() {
    haptics.medium();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // 4 crisp syncopated handclaps
    const clapTimes = [0, 0.105, 0.21, 0.315];
    clapTimes.forEach((delay, idx) => {
      const clapStart = now + delay;
      const bufferSize = ctx.sampleRate * 0.09;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.018));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1300 + idx * 80, clapStart);
      filter.Q.setValueAtTime(3.2, clapStart);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.48, clapStart);
      gain.gain.exponentialRampToValueAtTime(0.001, clapStart + 0.09);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noise.start(clapStart);
      noise.stop(clapStart + 0.09);
    });

    // Warm acoustic guitar strum resolve after claps
    const guitarChords = [329.63, 440, 554.37, 659.25]; // E major acoustic notes
    guitarChords.forEach((note, i) => {
      const gOsc = ctx.createOscillator();
      const gGain = ctx.createGain();
      gOsc.type = 'triangle';
      gOsc.frequency.setValueAtTime(note, now + 0.38 + i * 0.02);

      gGain.gain.setValueAtTime(0.01, now + 0.38 + i * 0.02);
      gGain.gain.linearRampToValueAtTime(0.2, now + 0.4 + i * 0.02);
      gGain.gain.exponentialRampToValueAtTime(0.001, now + 0.72);

      gOsc.connect(gGain);
      gGain.connect(masterGain);

      gOsc.start(now + 0.38 + i * 0.02);
      gOsc.stop(now + 0.72);
    });
  }

  /**
   * THE OFFICE THEME:
   * Crisp typewriter silver carriage bell "DING!" + heavy desktop paper stapler "KA-CHUNK!"
   */
  public playOfficeSound() {
    haptics.medium();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // Typewriter silver bell chime
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(2093, now); // C7 silver bell
    bellGain.gain.setValueAtTime(0.48, now);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    bellOsc.connect(bellGain);
    bellGain.connect(masterGain);
    bellOsc.start(now);
    bellOsc.stop(now + 0.65);

    // Heavy Swingline stapler punch
    const staplerOsc = ctx.createOscillator();
    const staplerGain = ctx.createGain();
    staplerOsc.type = 'square';
    staplerOsc.frequency.setValueAtTime(180, now + 0.08);
    staplerOsc.frequency.exponentialRampToValueAtTime(55, now + 0.24);
    staplerGain.gain.setValueAtTime(0.35, now + 0.08);
    staplerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    staplerOsc.connect(staplerGain);
    staplerGain.connect(masterGain);
    staplerOsc.start(now + 0.08);
    staplerOsc.stop(now + 0.25);
  }

  /**
   * BATMAN:
   * Sleek grappling hook line zip + dark hero sweep
   */
  public playBatmanSound() {
    haptics.heavy();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(850, now);
    osc.frequency.exponentialRampToValueAtTime(190, now + 0.38);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 0.38);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.38);
  }

  /**
   * Subtle tactile click with light haptic tap
   */
  public playClick() {
    haptics.light();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Triumph celebration fanfare with celebration haptic sequence
   */
  public playCelebration() {
    haptics.success();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  }

  /**
   * THE MATRIX:
   * Cyberpunk digital rain glyph blip + cyber modem carrier chirp + bullet-time sub whoosh
   */
  public playMatrixSound() {
    haptics.heavy();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // 1. Digital matrix code bleeps
    const codePitches = [1760, 2217, 2637, 3520]; // High digital green pings
    codePitches.forEach((freq, idx) => {
      const pingOsc = ctx.createOscillator();
      const pingGain = ctx.createGain();
      pingOsc.type = 'square';
      pingOsc.frequency.setValueAtTime(freq, now + idx * 0.04);

      pingGain.gain.setValueAtTime(0.001, now + idx * 0.04);
      pingGain.gain.linearRampToValueAtTime(0.18, now + idx * 0.04 + 0.01);
      pingGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.08);

      pingOsc.connect(pingGain);
      pingGain.connect(masterGain);
      pingOsc.start(now + idx * 0.04);
      pingOsc.stop(now + idx * 0.04 + 0.08);
    });

    // 2. Cyberpunk bullet-time sub-bass whoosh
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(160, now + 0.12);
    subOsc.frequency.exponentialRampToValueAtTime(38, now + 0.55);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now + 0.12);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.55);

    subGain.gain.setValueAtTime(0.01, now + 0.12);
    subGain.gain.linearRampToValueAtTime(0.45, now + 0.2);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    subOsc.connect(filter);
    filter.connect(subGain);
    subGain.connect(masterGain);

    subOsc.start(now + 0.12);
    subOsc.stop(now + 0.55);
  }

  /**
   * RETRO 80s SYNTHWAVE:
   * 8-bit arcade power-up chime arpeggio + lush analog saw brass swell
   */
  public playSynthwaveSound() {
    haptics.medium();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // 1. Upbeat arcade 8-bit arpeggio: C4 -> E4 -> G4 -> C5
    const arpeggio = [261.63, 329.63, 392.0, 523.25];
    arpeggio.forEach((note, i) => {
      const arpOsc = ctx.createOscillator();
      const arpGain = ctx.createGain();
      arpOsc.type = 'square';
      arpOsc.frequency.setValueAtTime(note, now + i * 0.065);

      arpGain.gain.setValueAtTime(0.01, now + i * 0.065);
      arpGain.gain.linearRampToValueAtTime(0.24, now + i * 0.065 + 0.015);
      arpGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.065 + 0.12);

      arpOsc.connect(arpGain);
      arpGain.connect(masterGain);
      arpOsc.start(now + i * 0.065);
      arpOsc.stop(now + i * 0.065 + 0.12);
    });

    // 2. Warm analog synth brass swell
    const brassOsc = ctx.createOscillator();
    const brassGain = ctx.createGain();
    brassOsc.type = 'sawtooth';
    brassOsc.frequency.setValueAtTime(261.63, now + 0.24);

    const bFilter = ctx.createBiquadFilter();
    bFilter.type = 'lowpass';
    bFilter.frequency.setValueAtTime(400, now + 0.24);
    bFilter.frequency.exponentialRampToValueAtTime(2800, now + 0.42);
    bFilter.frequency.exponentialRampToValueAtTime(600, now + 0.75);

    brassGain.gain.setValueAtTime(0.01, now + 0.24);
    brassGain.gain.linearRampToValueAtTime(0.35, now + 0.38);
    brassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    brassOsc.connect(bFilter);
    bFilter.connect(brassGain);
    brassGain.connect(masterGain);

    brassOsc.start(now + 0.24);
    brassOsc.stop(now + 0.75);
  }

  /**
   * ONE PIECE / LUFFY (JOYBOY):
   * Iconic Drums of Liberation syncopated heartbeat taiko beat + Gomu Gomu rubber stretch snap
   */
  public playLuffyDrums() {
    haptics.heavy();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // 1. Joyboy Drums of Liberation (Do-Dum-Do-Dum heartbeat taiko)
    const drumBeats = [0, 0.09, 0.22, 0.31];
    drumBeats.forEach((delay, idx) => {
      const beatTime = now + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(idx % 2 === 0 ? 120 : 90, beatTime);
      osc.frequency.exponentialRampToValueAtTime(38, beatTime + 0.1);

      gain.gain.setValueAtTime(0.55, beatTime);
      gain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.1);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(beatTime);
      osc.stop(beatTime + 0.1);
    });

    // 2. Gomu Gomu high-speed rubber stretch snap
    const stretchOsc = ctx.createOscillator();
    const stretchGain = ctx.createGain();
    stretchOsc.type = 'sawtooth';
    stretchOsc.frequency.setValueAtTime(280, now + 0.28);
    stretchOsc.frequency.exponentialRampToValueAtTime(980, now + 0.45);
    stretchOsc.frequency.exponentialRampToValueAtTime(140, now + 0.58);

    stretchGain.gain.setValueAtTime(0.01, now + 0.28);
    stretchGain.gain.linearRampToValueAtTime(0.35, now + 0.42);
    stretchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

    stretchOsc.connect(stretchGain);
    stretchGain.connect(masterGain);
    stretchOsc.start(now + 0.28);
    stretchOsc.stop(now + 0.58);
  }

  /**
   * JUJUTSU KAISEN / GOJO SATORU:
   * Domain Expansion: Infinite Void cosmic suction hum + Hollow Purple cursed energy explosion
   */
  public playJJKDomain() {
    haptics.heavy();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // 1. Cursed energy dimensional hum (Infinite Void resonance)
    const humOsc = ctx.createOscillator();
    const humGain = ctx.createGain();
    humOsc.type = 'sine';
    humOsc.frequency.setValueAtTime(440, now);
    humOsc.frequency.linearRampToValueAtTime(880, now + 0.2);
    humOsc.frequency.exponentialRampToValueAtTime(110, now + 0.6);

    humGain.gain.setValueAtTime(0.4, now);
    humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    humOsc.connect(humGain);
    humGain.connect(masterGain);
    humOsc.start(now);
    humOsc.stop(now + 0.6);

    // 2. Hollow Purple compression chime + cursed burst
    const purplePitches = [1174.66, 1760.0, 2349.32]; // D6, A6, D7 cursed harmonics
    purplePitches.forEach((freq, idx) => {
      const pOsc = ctx.createOscillator();
      const pGain = ctx.createGain();
      pOsc.type = 'triangle';
      pOsc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.03);

      pGain.gain.setValueAtTime(0.001, now + 0.15 + idx * 0.03);
      pGain.gain.linearRampToValueAtTime(0.25, now + 0.18 + idx * 0.03);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      pOsc.connect(pGain);
      pGain.connect(masterGain);
      pOsc.start(now + 0.15 + idx * 0.03);
      pOsc.stop(now + 0.65);
    });
  }

  /**
   * HALLOWEEN SPOOKY GRAVEYARD:
   * Gothic cathedral pipe organ chord + spooky wind chime & eerie raven swoop
   */
  public playHalloweenSound() {
    haptics.medium();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // Minor organ chord: D3, F3, A3, D4
    const organNotes = [146.83, 174.61, 220.0, 293.66];
    organNotes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.7);
    });
  }

  /**
   * THE CONJURING / HORROR:
   * Antique music box eerie lullaby tinkling + wooden creak
   */
  public playConjuringSound() {
    haptics.heavy();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    // Eerie high music box notes
    const musicBoxNotes = [1567.98, 1479.98, 1318.51, 1174.66]; // G6, F#6, E6, D6
    musicBoxNotes.forEach((note, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now + idx * 0.12);

      gain.gain.setValueAtTime(0.3, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.4);
    });
  }

  /**
   * MIDNIGHT DARK MODE:
   * Deep smooth velvety night acoustic pluck & ambient starry resonance
   */
  public playMidnightSound() {
    haptics.light();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume, now);
    masterGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.35); // C4

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * EXECUTIVE SAPPHIRE:
   * Crisp corporate crystal chime with precise high-frequency decay
   */
  public playExecutiveChime() {
    haptics.medium();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume * 0.7, now);
    masterGain.connect(ctx.destination);

    [880, 1318.51, 1760].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      gain.gain.setValueAtTime(0.2, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.35);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.35);
    });
  }

  /**
   * NORDIC SLATE:
   * Minimalist Scandinavian acoustic glass tap & warm harmonic
   */
  public playNordicChime() {
    haptics.light();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume * 0.75, now);
    masterGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1046.5, now); // C6
    osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.15); // C5
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  /**
   * BIOPHILIC FOREST:
   * Organic bamboo drop & gentle serene harmonic resonance
   */
  public playBiophilicTone() {
    haptics.light();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume * 0.8, now);
    masterGain.connect(ctx.destination);

    // Warm wooden bamboo resonance
    [587.33, 880].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.22, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.4);
    });
  }

  /**
   * OBSIDIAN ONYX:
   * Deep luxury bronze bell & warm low-end acoustic warmth
   */
  public playObsidianChime() {
    haptics.heavy();
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.masterVolume * 0.85, now);
    masterGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now); // A4
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.4); // A3
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * Route sound to matching active theme
   */
  public playThemeSound(themeId: string) {
    switch (themeId) {
      case 'doom':
        this.playDoctorDoomBlast();
        break;
      case 'spiderman':
        this.playSpidermanThwip();
        break;
      case 'luffy':
        this.playLuffyDrums();
        break;
      case 'ramayan':
        this.playRamayanBow();
        break;
      case 'friends':
        this.playFriendsClap();
        break;
      case 'office':
        this.playOfficeSound();
        break;
      case 'matrix':
        this.playMatrixSound();
        break;
      case 'synthwave':
        this.playSynthwaveSound();
        break;
      case 'halloween':
        this.playHalloweenSound();
        break;
      case 'midnight':
        this.playMidnightSound();
        break;
      case 'executive':
        this.playExecutiveChime();
        break;
      case 'nordic':
        this.playNordicChime();
        break;
      case 'biophilic':
        this.playBiophilicTone();
        break;
      case 'obsidian':
        this.playObsidianChime();
        break;
      default:
        this.playClick();
        break;
    }
  }
}

export const soundEngine = new SoundEngine();
