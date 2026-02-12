// Sound utility — generates notification sounds using Web Audio API
// No external audio files needed

let audioCtx = null;

const getAudioContext = () => {
    if (!audioCtx || audioCtx.state === 'closed') {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => { });
    }
    return audioCtx;
};

/**
 * Play a short "pop" / "ding" notification for incoming messages.
 * A pleasant two-tone chime: C5 → E5
 */
export const playMessageSound = () => {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // First tone (C5 ≈ 523 Hz)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now);
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.15);

        // Second tone (E5 ≈ 659 Hz) — slightly delayed
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659.25, now + 0.08);
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.setValueAtTime(0.25, now + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.08);
        osc2.stop(now + 0.25);
    } catch (e) {
        // Silently fail — sound is not critical
    }
};

/**
 * Play a repeating ringtone for incoming calls.
 * Returns a stop() function to cancel the ringtone.
 * Pattern: Two quick beeps, pause, repeat
 */
export const playRingtone = () => {
    let stopped = false;
    let timeoutIds = [];

    const ring = () => {
        if (stopped) return;

        try {
            const ctx = getAudioContext();
            const now = ctx.currentTime;

            // Ring pattern: beep-beep, 1.5s pause, repeat
            const frequencies = [
                { freq: 440, start: 0, end: 0.2 },      // A4 — first beep
                { freq: 440, start: 0.3, end: 0.5 },     // A4 — second beep
                { freq: 554.37, start: 0, end: 0.2 },    // C#5 — harmony 1
                { freq: 554.37, start: 0.3, end: 0.5 },  // C#5 — harmony 2
            ];

            frequencies.forEach(({ freq, start, end }) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + start);
                gain.gain.setValueAtTime(0, now + start);
                gain.gain.linearRampToValueAtTime(0.2, now + start + 0.02);
                gain.gain.setValueAtTime(0.2, now + end - 0.02);
                gain.gain.linearRampToValueAtTime(0, now + end);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + start);
                osc.stop(now + end);
            });
        } catch (e) {
            // Silently fail
        }

        // Repeat every 2 seconds
        const tid = setTimeout(ring, 2000);
        timeoutIds.push(tid);
    };

    // Start the first ring
    ring();

    // Return a stop function
    return {
        stop: () => {
            stopped = true;
            timeoutIds.forEach(clearTimeout);
            timeoutIds = [];
        }
    };
};

/**
 * Play a short "sent" sound effect for outgoing messages (optional).
 * A quick whoosh/pop.
 */
export const playOutgoingSound = () => {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    } catch (e) {
        // Silently fail
    }
};

/**
 * Play a "call ended" sound — descending tone.
 */
export const playCallEndSound = () => {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
    } catch (e) {
        // Silently fail
    }
};
