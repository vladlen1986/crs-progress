/* CRS Brain — sound playback engine.
 * Preloads the 24 local WAVs (data/sounds/, served at /sounds/<file>) into
 * AudioBuffers behind one AudioContext + master GainNode.
 * Missing/corrupt WAV → live synthesis of the same id via SOUNDS_SYNTH (offline-safe).
 * Depends on sounds-synth.js being loaded first. */
(function () {
  'use strict';

  var ctx = null;          // lazy — created on first user gesture / first play
  var master = null;
  var buffers = {};        // id -> AudioBuffer
  var missing = {};        // id -> true (fell back to synthesis)
  var volume = 0.8;        // 0..1, master; UI works in 0..100
  var events = {};         // eventName -> sound id | 'none'

  var DEFAULT_EVENTS = {
    'new-notification': 's01',
    'task-complete': 's02',
    'warning': 's19',
    'error': 's21',
    'process-start': 's12',
    'connection-lost': 's22',
    'connection-restored': 's07'
  };

  function ensureCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = volume;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function loadOne(s) {
    return fetch('/sounds/' + SOUNDS_SYNTH.fileName(s), { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.arrayBuffer();
      })
      .then(function (ab) { return ensureCtx().decodeAudioData(ab); })
      .then(function (buf) { buffers[s.id] = buf; delete missing[s.id]; })
      .catch(function (e) {
        missing[s.id] = true;
        console.warn('[sounds] WAV missing/corrupt for ' + s.id + ' (' + e.message + ') — will synthesize live');
      });
  }

  function preload() {
    var chain = Promise.resolve();
    SOUNDS_SYNTH.list.forEach(function (s) {
      chain = chain.then(function () { return loadOne(s); });
    });
    return chain.then(function () {
      var n = Object.keys(missing).length;
      if (n) console.warn('[sounds] ' + n + ' sound file(s) missing — synthesis fallback active');
      return { loaded: SOUNDS_SYNTH.list.length - Object.keys(missing).length, missing: Object.keys(missing) };
    });
  }

  function playSound(id) {
    if (!id || id === 'none') return;
    var c = ensureCtx();
    var buf = buffers[id];
    if (buf) {
      var src = c.createBufferSource();
      src.buffer = buf;
      src.connect(master);
      src.start();
    } else {
      var s = SOUNDS_SYNTH.byId(id);
      if (!s) { console.warn('[sounds] unknown sound ' + id); return; }
      s.build(c, master, c.currentTime + 0.01);
    }
  }

  function playEvent(eventName) {
    var id = events.hasOwnProperty(eventName) ? events[eventName] : DEFAULT_EVENTS[eventName];
    if (id && id !== 'none') playSound(id);
  }

  function setVolume(v100) {
    volume = Math.max(0, Math.min(100, Number(v100) || 0)) / 100;
    if (master) master.gain.value = volume;
  }

  function configure(cfg) {
    cfg = cfg || {};
    if (cfg.volume != null) setVolume(cfg.volume);
    if (cfg.events) events = Object.assign({}, DEFAULT_EVENTS, cfg.events);
  }

  window.SOUNDS = {
    preload: preload,
    playSound: playSound,
    playEvent: playEvent,
    setVolume: setVolume,
    configure: configure,
    defaults: DEFAULT_EVENTS,
    reload: function (id) { var s = SOUNDS_SYNTH.byId(id); return s ? loadOne(s) : Promise.resolve(); },
    status: function () { return { loaded: Object.keys(buffers), missing: Object.keys(missing) }; }
  };
})();
