/* CRS Brain — approved sound set (24 sounds), pure Web Audio synthesis.
 * Single source of truth for BOTH the one-time WAV render (OfflineAudioContext)
 * and the live-synthesis fallback when a WAV file is missing.
 * No network, no libraries. Implemented verbatim from the approved spec. */
(function () {
  'use strict';

  // ---- helpers ------------------------------------------------------------
  // Every helper schedules nodes into `ctx` routed to `dest`, starting at t0.

  function tone(ctx, dest, f, t0, dur, opts) {
    opts = opts || {};
    var type = opts.type || 'sine';
    var g = opts.g != null ? opts.g : 0.5;
    var a = opts.a != null ? opts.a : 0.008;
    var osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(f, t0);
    if (opts.pitchTo) osc.frequency.exponentialRampToValueAtTime(opts.pitchTo, t0 + dur);
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(g, t0 + a);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function bell(ctx, dest, f, t0, dur, g) {
    tone(ctx, dest, f, t0, dur, { g: g });
    tone(ctx, dest, f * 2.76, t0, dur * 0.6, { g: g * 0.28 });
    tone(ctx, dest, f * 5.4, t0, dur * 0.32, { g: g * 0.10 });
  }

  function mar(ctx, dest, f, t0, dur, g) {
    g = g != null ? g : 0.55;
    tone(ctx, dest, f, t0, dur, { g: g });
    tone(ctx, dest, f * 4, t0, dur * 0.35, { g: g * 0.18 });
  }

  function pluck(ctx, dest, f, t0, g) {
    g = g != null ? g : 0.5;
    tone(ctx, dest, f, t0, 0.16, { type: 'triangle', g: g });
  }

  function noise(ctx, dest, t0, dur, g, fc) {
    g = g != null ? g : 0.25;
    var len = Math.max(1, Math.ceil(ctx.sampleRate * dur));
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource();
    src.buffer = buf;
    var bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(fc, t0);
    bp.Q.setValueAtTime(1.2, t0);
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(g, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(bp); bp.connect(gain); gain.connect(dest);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  // ---- approved sound set -------------------------------------------------
  // cat: notif | done | warn | err | info
  // dur = seconds to render into the WAV (last event end + decay tail).
  // build(ctx, dest, t) schedules the sound at time t.

  var SOUNDS = [
    { id: 's01', slug: 'terminal-chime-up', name: 'Terminal chime up', cat: 'notif',
      desc: 'Three rising bells — the classic “something arrived”.', dur: 2.6,
      build: function (c, d, t) { bell(c, d, 523, t, 1.4, 0.5); bell(c, d, 659, t + 0.28, 1.4, 0.5); bell(c, d, 784, t + 0.56, 1.8, 0.55); } },
    { id: 's02', slug: 'terminal-chime-down', name: 'Terminal chime down', cat: 'done',
      desc: 'Three descending bells — settled, finished.', dur: 2.7,
      build: function (c, d, t) { bell(c, d, 784, t, 1.4, 0.5); bell(c, d, 659, t + 0.28, 1.4, 0.5); bell(c, d, 523, t + 0.56, 1.9, 0.55); } },
    { id: 's03', slug: 'bing-bong', name: 'Bing-bong', cat: 'notif',
      desc: 'Two-note doorbell.', dur: 2.2,
      build: function (c, d, t) { bell(c, d, 880, t, 1.1, 0.5); bell(c, d, 587, t + 0.32, 1.6, 0.5); } },
    { id: 's04', slug: 'quad-flourish', name: 'Quad flourish', cat: 'notif',
      desc: 'Four quick ascending bells with a long last note.', dur: 2.6,
      build: function (c, d, t) { bell(c, d, 523, t, 0.9, 0.42); bell(c, d, 587, t + 0.19, 0.9, 0.42); bell(c, d, 659, t + 0.38, 0.9, 0.42); bell(c, d, 784, t + 0.57, 1.7, 0.5); } },
    { id: 's05', slug: 'executive-gong', name: 'Executive gong', cat: 'done',
      desc: 'Deep, slow gong with a low undertone.', dur: 3.0,
      build: function (c, d, t) { bell(c, d, 330, t, 2.6, 0.6); tone(c, d, 165, t, 2.2, { g: 0.18 }); } },
    { id: 's06', slug: 'glass-ding', name: 'Glass ding', cat: 'notif',
      desc: 'Single high crystalline ding.', dur: 1.5,
      build: function (c, d, t) { bell(c, d, 1318, t, 1.2, 0.45); } },
    { id: 's07', slug: 'elevator-ding', name: 'Elevator ding', cat: 'done',
      desc: 'Arrived — one warm mid-high bell.', dur: 1.8,
      build: function (c, d, t) { bell(c, d, 988, t, 1.5, 0.5); } },
    { id: 's08', slug: 'marimba-triad', name: 'Marimba triad', cat: 'done',
      desc: 'Wooden major triad, quick and warm.', dur: 1.6,
      build: function (c, d, t) { mar(c, d, 523, t, 0.7); mar(c, d, 659, t + 0.12, 0.7); mar(c, d, 784, t + 0.24, 1.0, 0.6); } },
    { id: 's09', slug: 'achievement-run', name: 'Achievement run', cat: 'done',
      desc: 'Fast four-note marimba run up to the octave.', dur: 1.5,
      build: function (c, d, t) { mar(c, d, 523, t, 0.4); mar(c, d, 659, t + 0.09, 0.4); mar(c, d, 784, t + 0.18, 0.4); mar(c, d, 1046, t + 0.27, 0.9, 0.6); } },
    { id: 's10', slug: 'double-confirm', name: 'Double confirm', cat: 'done',
      desc: 'Two quick plucks, low then high.', dur: 0.7,
      build: function (c, d, t) { pluck(c, d, 880, t, 0.5); pluck(c, d, 1174, t + 0.13, 0.55); } },
    { id: 's11', slug: 'soft-major-third', name: 'Soft major third', cat: 'done',
      desc: 'Two gentle overlapping sine notes.', dur: 1.6,
      build: function (c, d, t) { tone(c, d, 659, t, 0.8, { g: 0.4 }); tone(c, d, 830, t + 0.16, 1.1, { g: 0.45 }); } },
    { id: 's12', slug: 'sonar-ping', name: 'Sonar ping', cat: 'info',
      desc: 'Submarine ping with a falling tail.', dur: 1.5,
      build: function (c, d, t) { tone(c, d, 1200, t, 1.1, { g: 0.4, pitchTo: 900 }); bell(c, d, 1200, t, 0.5, 0.15); } },
    { id: 's13', slug: 'droplet', name: 'Droplet', cat: 'notif',
      desc: 'Single water drop.', dur: 0.6,
      build: function (c, d, t) { tone(c, d, 1400, t, 0.22, { g: 0.5, pitchTo: 600 }); } },
    { id: 's14', slug: 'message-pluck-pair', name: 'Message pluck pair', cat: 'notif',
      desc: 'Two soft plucks, high then low.', dur: 0.7,
      build: function (c, d, t) { pluck(c, d, 1046, t, 0.5); pluck(c, d, 784, t + 0.14, 0.5); } },
    { id: 's15', slug: 'knock-knock', name: 'Knock knock', cat: 'notif',
      desc: 'Two muffled knocks.', dur: 0.7,
      build: function (c, d, t) { noise(c, d, t, 0.09, 0.5, 700); noise(c, d, t + 0.16, 0.09, 0.5, 650); } },
    { id: 's16', slug: 'crystal-pop', name: 'Crystal pop', cat: 'notif',
      desc: 'Tiny sparkling pop.', dur: 0.8,
      build: function (c, d, t) { bell(c, d, 1760, t, 0.5, 0.3); tone(c, d, 2637, t + 0.05, 0.25, { g: 0.12 }); } },
    { id: 's17', slug: 'attention-pips', name: 'Attention pips', cat: 'warn',
      desc: 'Three short beeps, same pitch.', dur: 0.9,
      build: function (c, d, t) { tone(c, d, 880, t, 0.12, { g: 0.5 }); tone(c, d, 880, t + 0.2, 0.12, { g: 0.5 }); tone(c, d, 880, t + 0.4, 0.16, { g: 0.55 }); } },
    { id: 's18', slug: 'rising-whistle', name: 'Rising whistle', cat: 'warn',
      desc: 'Quick upward sweep — heads up.', dur: 0.8,
      build: function (c, d, t) { tone(c, d, 600, t, 0.5, { g: 0.45, pitchTo: 1100 }); } },
    { id: 's19', slug: 'two-tone-caution', name: 'Two-tone caution', cat: 'warn',
      desc: 'High-low caution interval.', dur: 1.0,
      build: function (c, d, t) { tone(c, d, 740, t, 0.28, { g: 0.5 }); tone(c, d, 554, t + 0.3, 0.42, { g: 0.5 }); } },
    { id: 's20', slug: 'soft-alarm', name: 'Soft alarm', cat: 'warn',
      desc: 'Gentle alternating alarm, four pulses.', dur: 1.2,
      build: function (c, d, t) {
        tone(c, d, 830, t, 0.16, { g: 0.45 }); tone(c, d, 622, t + 0.2, 0.16, { g: 0.45 });
        tone(c, d, 830, t + 0.44, 0.16, { g: 0.45 }); tone(c, d, 622, t + 0.64, 0.2, { g: 0.45 });
      } },
    { id: 's21', slug: 'error-descend', name: 'Error descend', cat: 'err',
      desc: 'Two falling tones — something went wrong.', dur: 1.1,
      build: function (c, d, t) { tone(c, d, 494, t, 0.3, { g: 0.5 }); tone(c, d, 370, t + 0.28, 0.55, { g: 0.55 }); } },
    { id: 's22', slug: 'low-buzz', name: 'Low buzz', cat: 'err',
      desc: 'Short low sawtooth buzz.', dur: 0.6,
      build: function (c, d, t) { tone(c, d, 180, t, 0.32, { type: 'sawtooth', g: 0.4 }); tone(c, d, 90, t, 0.32, { g: 0.3 }); } },
    { id: 's23', slug: 'tritone-alert', name: 'Tritone alert', cat: 'err',
      desc: 'Dissonant stacked alert.', dur: 0.9,
      build: function (c, d, t) { tone(c, d, 622, t, 0.22, { g: 0.5 }); tone(c, d, 440, t + 0.02, 0.34, { g: 0.4 }); tone(c, d, 311, t + 0.26, 0.4, { g: 0.45 }); } },
    { id: 's24', slug: 'fail-thud', name: 'Fail thud', cat: 'err',
      desc: 'Dull thud with a low tail.', dur: 0.9,
      build: function (c, d, t) { noise(c, d, t, 0.12, 0.5, 300); tone(c, d, 120, t, 0.6, { g: 0.5 }); } }
  ];

  var CAT_LABEL = { notif: 'Notification', done: 'Success', warn: 'Warning', err: 'Error', info: 'Info' };

  function byId(id) {
    for (var i = 0; i < SOUNDS.length; i++) if (SOUNDS[i].id === id) return SOUNDS[i];
    return null;
  }

  function fileName(s) { return s.id + '-' + s.slug + '.wav'; }

  // Render one sound offline → AudioBuffer (mono, 44.1 kHz).
  function renderOffline(id) {
    var s = byId(id);
    if (!s) return Promise.reject(new Error('unknown sound ' + id));
    var sr = 22050; // plenty for notification tones; halves the on-disk WAV size
    var pad = 0.25; // decay tail
    var ctx = new OfflineAudioContext(1, Math.ceil(sr * (s.dur + pad)), sr);
    s.build(ctx, ctx.destination, 0.01);
    return ctx.startRendering();
  }

  // AudioBuffer → 16-bit PCM WAV ArrayBuffer.
  function encodeWav(buffer) {
    var ch = buffer.getChannelData(0);
    var n = ch.length;
    var sr = buffer.sampleRate;
    var bytes = 44 + n * 2;
    var ab = new ArrayBuffer(bytes);
    var v = new DataView(ab);
    function wstr(off, str) { for (var i = 0; i < str.length; i++) v.setUint8(off + i, str.charCodeAt(i)); }
    wstr(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); wstr(8, 'WAVE');
    wstr(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    wstr(36, 'data'); v.setUint32(40, n * 2, true);
    for (var i = 0, off = 44; i < n; i++, off += 2) {
      var x = Math.max(-1, Math.min(1, ch[i]));
      v.setInt16(off, x < 0 ? x * 0x8000 : x * 0x7FFF, true);
    }
    return ab;
  }

  window.SOUNDS_SYNTH = {
    list: SOUNDS,
    catLabel: CAT_LABEL,
    byId: byId,
    fileName: fileName,
    renderOffline: renderOffline,
    encodeWav: encodeWav
  };
})();
