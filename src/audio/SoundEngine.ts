// Web Audio API Procedural Sound Engine for Zenitsu Agatsuma Portfolio
// Zero external files required: 100% synthesized in real time

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;
  private currentSection: string = 'hero';

  constructor() {
    // Check saved state in LocalStorage (default muted as per guidelines)
    const saved = localStorage.getItem('zenitsu_audio_enabled');
    this.isMuted = saved !== 'true';
  }

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
      if (!this.isMuted) {
        this.startAmbientRain();
      }
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    localStorage.setItem('zenitsu_audio_enabled', String(!this.isMuted));

    const targetGain = this.isMuted ? 0 : 0.65;
    this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);

    if (!this.isMuted) {
      this.startAmbientRain();
      this.playThunder(0.5);
    } else {
      this.stopAmbientRain();
    }

    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentSection(): string {
    return this.currentSection;
  }

  // Generate 5-second buffer of pink noise for realistic rainfall
  private createNoiseBuffer(): AudioBuffer {
    if (!this.ctx) throw new Error('No audio context');
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  public startAmbientRain(volume: number = 0.18) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    if (this.rainSource) return; // already playing

    try {
      const noiseBuffer = this.createNoiseBuffer();
      this.rainSource = this.ctx.createBufferSource();
      this.rainSource.buffer = noiseBuffer;
      this.rainSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.rainGain.gain.exponentialRampToValueAtTime(volume, this.ctx.currentTime + 1.2);

      this.rainSource.connect(filter);
      filter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

      this.rainSource.start();
    } catch {
      // Ignored
    }
  }

  public stopAmbientRain() {
    if (!this.ctx || !this.rainGain || !this.rainSource) return;
    try {
      this.rainGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.rainSource) {
          try { this.rainSource.stop(); } catch {}
          this.rainSource.disconnect();
          this.rainSource = null;
        }
      }, 500);
    } catch {}
  }

  public playThunder(intensity: number = 0.7) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      
      // Noise burst for rumble
      const buffer = this.createNoiseBuffer();
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(80, now);
      filter.frequency.exponentialRampToValueAtTime(35, now + 1.5);
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(intensity * 0.45, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      // Sub-bass sine oscillator for chest-thumping rumble
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 2.0);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(intensity * 0.35, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 3.0);
      osc.start(now);
      osc.stop(now + 2.5);
    } catch {}
  }

  public playElectricHum(duration: number = 0.8) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + duration * 0.5);
      osc.frequency.exponentialRampToValueAtTime(80, now + duration);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.Q.value = 5.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  public playSwordSlash(type: 'standard' | 'sixfold' | 'eightfold' | 'godspeed' = 'standard') {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;

      // 1. High velocity air slash whoosh
      const buffer = this.createNoiseBuffer();
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(4000, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.18);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noise.start(now);
      noise.stop(now + 0.25);

      // 2. Metallic Nichirin steel blade chime
      const ringOsc = this.ctx.createOscillator();
      ringOsc.type = 'sine';
      ringOsc.frequency.setValueAtTime(1850, now);
      ringOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);

      const ringGain = this.ctx.createGain();
      ringGain.gain.setValueAtTime(0.25, now + 0.02);
      ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      ringOsc.connect(ringGain);
      ringGain.connect(this.masterGain);
      ringOsc.start(now);
      ringOsc.stop(now + 0.55);

      if (type === 'godspeed') {
        this.playThunder(1.0);
      } else if (type === 'sixfold' || type === 'eightfold') {
        this.playElectricHum(0.4);
      }
    } catch {}
  }

  public playHeartbeat() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;

      // First lub
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(68, now);
      osc1.frequency.exponentialRampToValueAtTime(38, now + 0.1);

      const gain1 = this.ctx.createGain();
      gain1.gain.setValueAtTime(0.5, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc1.connect(gain1);
      gain1.connect(this.masterGain);
      osc1.start(now);
      osc1.stop(now + 0.14);

      // Second dub (150ms later)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(54, now + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(32, now + 0.28);

      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.38, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.32);
    } catch {}
  }

  public playThunderclap() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;

      // Blinding transient crack
      const buffer = this.createNoiseBuffer();
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(50, now + 0.8);
      filter.Q.value = 1.2;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      // Deep sub boom
      const sub = this.ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(110, now);
      sub.frequency.exponentialRampToValueAtTime(25, now + 1.4);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      sub.connect(subGain);
      subGain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 2.0);
      sub.start(now);
      sub.stop(now + 1.8);
    } catch {}
  }

  public setSection(section: string) {
    this.currentSection = section;
    if (this.isMuted || !this.ctx) return;

    switch (section) {
      case 'hero':
      case 'ch01':
        if (this.rainGain) this.rainGain.gain.setTargetAtTime(0.18, this.ctx.currentTime, 0.5);
        break;
      case 'ch02':
        if (this.rainGain) this.rainGain.gain.setTargetAtTime(0.08, this.ctx.currentTime, 0.5);
        break;
      case 'ch03':
        this.playElectricHum(0.6);
        if (this.rainGain) this.rainGain.gain.setTargetAtTime(0.24, this.ctx.currentTime, 0.5);
        break;
      case 'ch04':
        if (this.rainGain) this.rainGain.gain.setTargetAtTime(0.05, this.ctx.currentTime, 0.5);
        break;
      case 'ch06':
        this.playElectricHum(0.8);
        this.playThunder(0.5);
        break;
      case 'ch07':
        this.playHeartbeat();
        break;
      case 'ch08':
        if (this.rainGain) this.rainGain.gain.setTargetAtTime(0.03, this.ctx.currentTime, 0.8);
        break;
      default:
        break;
    }
  }
}

export const sound = new SoundEngine();
