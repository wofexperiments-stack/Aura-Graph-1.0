
export const playManifestSound = () => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const now = ctx.currentTime;

  const playNote = (freq: number, startTime: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Sparkly FM-ish effect
    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2, startTime);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.2, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    subOsc.connect(subGain);
    subGain.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    subOsc.start(startTime);
    osc.stop(startTime + duration);
    subOsc.stop(startTime + duration);
  };

  // Celestial Chime Sequence: E5 -> G5 -> C6
  playNote(659.25, now, 0.8);
  playNote(783.99, now + 0.1, 0.8);
  playNote(1046.50, now + 0.2, 1.0);
};
