/**
 * Mobile Haptics Service
 * Triggers native device vibration patterns using Navigator.vibrate API,
 * with graceful fallback for devices without vibration hardware.
 */

class HapticsService {
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ergoforge_haptics');
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ergoforge_haptics', String(val));
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private vibrate(pattern: number | number[]) {
    if (!this.enabled || typeof window === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore vibration error in non-supporting browsers
    }
  }

  /** Subtle light tap for standard button clicks & toggles */
  public light() {
    this.vibrate(10);
    this.triggerVisualRipple();
  }

  /** Medium tactile click for tabs & theme switching */
  public medium() {
    this.vibrate(22);
    this.triggerVisualRipple();
  }

  /** Heavy solid pulse for timers & primary CTAs */
  public heavy() {
    this.vibrate([35, 20, 35]);
    this.triggerVisualRipple();
  }

  /** Triumph celebration vibration pattern when redeeming vouchers or finishing breaks */
  public success() {
    this.vibrate([40, 50, 60, 50, 100]);
    this.triggerVisualRipple();
  }

  /** Signature Jutsu hand-seals multi-tap vibration for Naruto */
  public jutsu() {
    this.vibrate([15, 25, 15, 25, 45]);
    this.triggerVisualRipple();
  }

  /** Signature double-tap web-shooter recoil for Spider-Man */
  public thwip() {
    this.vibrate([20, 30, 45]);
    this.triggerVisualRipple();
  }

  /** Sacred deep resonant vibration for Ramayan Shankhnaad */
  public shankh() {
    this.vibrate([70, 40, 110]);
    this.triggerVisualRipple();
  }

  /** Visual tactile micro-pulse feedback for all devices (including desktop) */
  private triggerVisualRipple() {
    if (typeof document === 'undefined') return;
    document.body.classList.add('haptic-active');
    setTimeout(() => {
      document.body.classList.remove('haptic-active');
    }, 120);
  }
}

export const haptics = new HapticsService();
