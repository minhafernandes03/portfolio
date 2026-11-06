// Web Audio API ambient stream & water droplet generator (self-contained, no external assets required)

class WaterAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private dropletTimer: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public play(volume: number = 0.25) {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    // Master volume gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // 1. Synthesize smooth pink noise for gentle running water / river stream
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Lowpass filter for water warmth (smooth bubbling stream)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    // Subtle LFO for river current oscillation
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.noiseNode.connect(filter);
    filter.connect(this.masterGain);
    this.noiseNode.start();

    // 2. Schedule gentle water droplet pings at random intervals
    this.scheduleDroplets();

    this.isPlaying = true;
  }

  private scheduleDroplets() {
    const playDroplet = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();

      const freqStart = 900 + Math.random() * 400;
      const freqEnd = 400 + Math.random() * 200;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, this.ctx.currentTime + 0.12);

      dropGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.14);

      osc.connect(dropGain);
      dropGain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);

      const nextTime = 3000 + Math.random() * 5000;
      this.dropletTimer = window.setTimeout(playDroplet, nextTime);
    };

    this.dropletTimer = window.setTimeout(playDroplet, 2000);
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
    if (this.dropletTimer) {
      clearTimeout(this.dropletTimer);
      this.dropletTimer = null;
    }
    this.isPlaying = false;
  }

  public playSingleDroplet(freqOffset = 0) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();

      const baseFreq = 950 + freqOffset + Math.random() * 200;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(380, this.ctx.currentTime + 0.12);

      dropGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.13);

      osc.connect(dropGain);
      dropGain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch {
      // AudioContext might be blocked until user interaction
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const waterAudio = new WaterAudioEngine();
