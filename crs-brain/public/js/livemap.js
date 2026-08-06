/* CRS Brain — LIVE SYSTEM MAP v4 (galaxy-cluster scene, map.html's species).
 * A live, draggable, resizable mini-map of what the system is doing RIGHT NOW:
 * You → Brain → Model → Tools → Buildprint → Bubble, plus the learning loop
 * (Playbook / Distiller → Ledger). Real signals only — wired to state.live,
 * the SSE step stream and the learn-events feed via window.LIVEMAP.ping().
 * v4 rebuilds the SCENE as mini-galaxies borrowing map.html's exact visual
 * recipes, translated canvas→SVG (no rAF — everything stays CSS/SVG):
 * (1) each core grows a SATELLITE SWARM from real data (chats → BRAIN,
 * lessons → PLAYBOOK one-dot-per-lesson w/ trigger tooltips, learn events →
 * LEDGER, session tools → TOOLS, categories → DISTILLER, bp chats → BP),
 * spiral-scattered dots with size/alpha variance + faint spoke lines, drawn
 * count capped per cluster while (2) COUNT BADGE PILLS (map.html recipe:
 * --na fill / --border-active stroke, screen-constant 8px number) show the
 * REAL numbers and pop on live increments; (3) ambience = hex lattice
 * (<pattern>, map's s·0.87 rows), a static seeded starfield and 2 drifting
 * Saturn-ringed planets (ellipse r·1.9×r·0.62, map's ring); (4) each swarm
 * GROUP rotates imperceptibly (60-180s, varied directions, one animation per
 * cluster). All v3 behavior preserved: child molecules (bright live
 * satellites vs the dim historical swarm), typewriter ticker, chromeless
 * hover window, drag/resize 300-640, nebula idle skin, ripples, comets,
 * electrons, spinner, shockwave. Swarm redraws REPLACE innerHTML (no leaks),
 * density thins below 360px so 300px never reads as mush. Everything scoped
 * in #lmPanel so closed/pill = zero animations; prefers-reduced-motion kills
 * all motion (static but complete scene: satellites, badges, spokes render).
 * Tokens only; --lm-deco is the single global decoration dimmer (2026-08-06:
 * .35 dark / .22 light — the scene now whispers under the Claude Code restyle).
 * Classic script. */

(function () {
  'use strict';
  if (window.LIVEMAP) return;
  const LS_POS = 'crs-livemap-pos', LS_MODE = 'crs-livemap-mode', LS_MODEL = 'crs-livemap-lastmodel', LS_SIZE = 'crs-livemap-size';
  const SCENE_W = 380, SCENE_H = 236, TICK_H = 20, PANEL_W = 380, PILL_W = 56, PILL_H = 34;
  const W_MIN = 300, W_MAX = 640;

  // ---- scene: nodes sized by importance, molecule layout -------------------
  // color keys → tokens (gradients + --ec) — one place, both themes.
  // 2026-08-06 (Claude Code restyle, pass 2): accent/soft already resolve to the
  // NEUTRAL ink (tokens.css re-points --accent at the grey ramp), and the three
  // surviving CATEGORY hues are pulled ~half-way to that ink via color-mix
  // (--lm-purple/--lm-good/--lm-cyan, defined on #lmPanel below) so the scene still
  // reads as a diagram but never as a UI accent. 'warn' is SEMANTIC ONLY now — amber
  // marks "known mistake repeated" (warn ring + shockwave) and nothing else, so the
  // TOOLS node moved off it onto the neutral 'tool' key. Keys stay in TOK because the
  // radial-gradient ids are generated from them (#lmg-warn is used by .lm-node.warn).
  const TOK = { accent: '--accent', soft: '--accent-soft', purple: '--lm-purple', good: '--lm-good', warn: '--warning', cyan: '--lm-cyan', tool: '--accent' };
  // labels are sentence case: the spec kills uppercase + letter-spaced headers.
  const NODES = {
    playbook:  { x: 78,  y: 42,  r: 10, c: 'accent', ic: 'i-book',     lbl: 'Playbook',   tip: 'Playbook' },
    distiller: { x: 185, y: 28,  r: 9,  c: 'purple', ic: 'i-ingest',   lbl: 'Distiller',  tip: 'Distiller' },
    ledger:    { x: 289, y: 40,  r: 10, c: 'good',   ic: 'i-db',       lbl: 'Ledger',     tip: 'Ledger' },
    you:       { x: 36,  y: 168, r: 11, c: 'cyan',   ic: 'i-user',     lbl: 'You',        tip: 'You' },
    brain:     { x: 136, y: 140, r: 19, c: 'accent', ic: 'i-brain',    lbl: 'Brain',      tip: 'Brain' },
    model:     { x: 226, y: 96,  r: 13, c: 'soft',   ic: 'i-sparkle',  lbl: 'Model',      tip: 'Model' },
    tools:     { x: 234, y: 178, r: 11, c: 'tool',   ic: 'i-terminal', lbl: 'Tools',      tip: 'Tools' },
    bp:        { x: 306, y: 202, r: 10, c: 'purple', ic: 'i-tool',     lbl: 'Buildprint', tip: 'Buildprint' },
    bubble:    { x: 348, y: 152, r: 10, c: 'good',   ic: 'i-grid',     lbl: 'Bubble',     tip: 'Bubble' },
  };
  const EDGES = [
    { id: 'you-brain',       a: 'you',       b: 'brain',   c: 'accent', s: +1, dots: 2 },
    { id: 'brain-model',     a: 'brain',     b: 'model',   c: 'soft',   s: -1, dots: 2 },
    { id: 'model-tools',     a: 'model',     b: 'tools',   c: 'tool',   s: +1, dots: 1 },
    { id: 'tools-bp',        a: 'tools',     b: 'bp',      c: 'purple', s: -1, dots: 1 },
    { id: 'bp-bubble',       a: 'bp',        b: 'bubble',  c: 'good',   s: -1, dots: 1 },
    { id: 'playbook-brain',  a: 'playbook',  b: 'brain',   c: 'accent', s: +1, dots: 3 },
    { id: 'brain-distiller', a: 'brain',     b: 'distiller', c: 'purple', s: -1, dots: 1 },
    { id: 'distiller-ledger',a: 'distiller', b: 'ledger',  c: 'purple', s: +1, dots: 2 },
  ];
  const RECENT_MS = 30000;

  // ---- v4 galaxy layer: per-cluster swarm config -----------------------------
  // cap = max DRAWN satellites (badge always shows the REAL count); rmax = swarm
  // ring radius sized to the molecule layout so neighbor galaxies don't collide;
  // dur/dir = the cluster's imperceptible group rotation (one animation each).
  const GAL = {
    brain:     { cap: 40, rmax: 37, dur: 150, dir: 'normal'  },
    playbook:  { cap: 24, rmax: 21, dur: 90,  dir: 'reverse' },
    ledger:    { cap: 30, rmax: 19, dur: 120, dir: 'normal'  },
    tools:     { cap: 20, rmax: 18, dur: 75,  dir: 'reverse' },
    distiller: { cap: 8,  rmax: 13, dur: 60,  dir: 'normal'  },
    bp:        { cap: 10, rmax: 16, dur: 100, dir: 'reverse' },
    bubble:    { cap: 8,  rmax: 14, dur: 170, dir: 'normal'  },
  };
  // real numbers behind the galaxies (fetched on open, refreshed by the 3s poll)
  const G = { chats: null, bp: null, lessons: null, ledger: null, cats: null, tools: new Set(), drawn: {}, inv: 1 };
  const prng = (seed) => () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---- live state (updated by pings + the 3s poll) --------------------------
  const S = {
    mode: localStorage.getItem(LS_MODE) || 'closed',      // open | pill | closed
    turnLive: false, remoteTurn: false, turnT0: 0,
    model: localStorage.getItem(LS_MODEL) || '',          // last-used model id
    until: {},                                            // edgeId → ts (active while > now)
    nodePing: {},                                         // nodeId → ts of last direct activity
    lessons: null, lastApplied: null, lastLearn: null,
    pollIv: null, tickIv: null, warnT: 0,
    thinkUntil: 0,   // distiller "searching for a solution" glow (learning-thinking → saved/clean, 120s cap)
  };
  const now = () => Date.now();
  const nice = (m) => (typeof modelNice === 'function' ? modelNice(m) : m) || '';
  const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();
  // learn events carry "• [tag] Lesson text — …" details → tag = the trigger word
  function evTag(ev) {
    const d = clean(ev && (ev.detail || ev.title) || '');
    const m = d.match(/\[([^\]]{1,16})\]/);
    return (m ? m[1] : (d.replace(/^[•\-\s]+/, '').split(' ')[0] || '')).slice(0, 12);
  }
  function evSnip(ev) {
    let d = clean(ev && (ev.detail || ev.title) || '');
    return d.replace(/^•\s*/, '').replace(/^\[[^\]]*\]\s*/, '').slice(0, 46);
  }

  // ---- size: width 300-640, height locked to scene aspect + ticker ----------
  function loadW() { try { const s = JSON.parse(localStorage.getItem(LS_SIZE)); return Math.min(W_MAX, Math.max(W_MIN, (s && s.w) || PANEL_W)); } catch { return PANEL_W; } }
  let curW = loadW();
  const curH = () => Math.round(curW * SCENE_H / SCENE_W) + TICK_H;

  // ---- CSS (tokens only; light theme dims glow like map.html decoDim) -------
  // 2026-08-06 (Claude Code restyle): the whole galaxy got QUIETER. --lm-deco, the
  // single multiplier every halo/glow/nebula/star opacity is expressed against,
  // dropped 1 → .35 (dark) and .6 → .22 (light) — roughly a third of the old
  // intensity. Glow drop-shadow radii and the nebula color-mix alphas were trimmed
  // in step so they stay in proportion instead of becoming the loudest thing left.
  // Nothing was deleted: every animation, keyframe and reduced-motion guard is intact.
  // 2026-08-06 PASS 2 (spec conformance, brain/design/claude-code-spec.md):
  //  · --lm-deco stays .35/.22 — the scene's quietness is already right.
  //  · DOM chrome is now GLOW-FREE: the live dot and the pill dot lost their
  //    box-shadow halos (§SHADOWS = menus/popovers only). The SVG scene keeps its
  //    ≤1.8px drop-shadows — that layer is the "canvas", i.e. data-viz, not chrome.
  //  · Shadows that remain: #lmPanel.chrome, #lmPill and #lmTip — all floating
  //    overlay surfaces, the popover class the spec still allows.
  //  · Type: chrome is 13px/20 body + 12px/16 meta, weight ≤600, letter-spacing 0,
  //    title switched to sentence case. SVG label sizes are viewBox units and stay.
  //  · Radii already land on the 4/6/8/10 set (card 8 / btn 6 / pill 6) + 50% dots.
  //  · Hue: link-blue emphasis (--accent-text) → a brightness step; amber is reserved
  //    for the recurrence warning; the three category hues are mixed toward the ink.
  const css = document.createElement('style');
  css.textContent = `
  /* chromeless panel: translucent smoke base by default, solid chrome on hover */
  #lmPanel{position:fixed;z-index:260;background:color-mix(in srgb,var(--panel) 55%,transparent);border:1px solid transparent;border-radius:var(--radius-card);overflow:hidden;--lm-deco:.35;user-select:none;cursor:grab;transition:background-color .2s ease-in-out,border-color .2s ease-in-out,box-shadow .2s ease-in-out}
  /* the shadow is spec-legal here: #lmPanel is a floating overlay window (popover
     class), which is the one place §SHADOWS still allows 0 12px 40px. Cards, buttons
     and inputs inside it carry none. */
  #lmPanel.chrome{background:var(--panel);border-color:var(--line2);box-shadow:var(--shadow-dropdown)}
  #lmPanel.dragging{cursor:grabbing}
  [data-theme="light"] #lmPanel{--lm-deco:.22}
  /* data-viz CATEGORY ramp — the only hue left anywhere in this widget. Each is the
     app token pulled ~half-way to the neutral ink with color-mix, so a lane still
     reads as a lane but never as a UI accent (spec PRIME DIRECTIVE: hue is semantic,
     at text scale). Declared on #lmPanel so each theme mixes its own base tokens. */
  #lmPanel{--lm-purple:color-mix(in srgb,var(--purple) 42%,var(--text-muted));
           --lm-good:color-mix(in srgb,var(--success) 38%,var(--text-muted));
           --lm-cyan:color-mix(in srgb,var(--cyan) 45%,var(--text-muted))}
  /* hover chrome: floating header line + buttons, hidden until .chrome */
  #lmPanel .lm-head{position:absolute;top:0;left:0;right:0;z-index:3;display:flex;align-items:center;gap:8px;height:30px;padding:0 6px 0 12px;opacity:0;pointer-events:none;transition:opacity .2s ease-in-out}
  #lmPanel.chrome .lm-head{opacity:1;pointer-events:auto}
  #lmPanel .lm-live-dot{width:7px;height:7px;border-radius:50%;background:var(--text-muted);flex:0 0 7px}
  /* live dot: FLAT fill, no halo at all. Spec §SHADOWS — only menus/popovers carry a
     shadow, so DOM chrome gets none; the live signal is a brightness step from
     --text-muted to --text-primary, the same trick as the spec's nav-row state matrix */
  #lmPanel.live .lm-live-dot{background:var(--text-primary)}
  /* §TYPE — the chrome has exactly two sizes (13/20 and 12/16) and bold runs 600.
     The old 10px/700/.12em uppercase title was three tells in one line. */
  #lmPanel .lm-ttl{font-size:12px;font-weight:600;letter-spacing:0;color:var(--text-primary);white-space:nowrap}
  #lmPanel .lm-sub{font-size:12px;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
  #lmPanel.live .lm-sub{color:var(--text-primary)}
  #lmPanel .lm-hbtn{background:none;border:none;color:var(--text-muted);width:26px;height:26px;border-radius:var(--radius-btn);cursor:pointer;font-size:12px;line-height:1;font-family:inherit;flex:0 0 auto}
  #lmPanel .lm-hbtn:hover{color:var(--text-primary);background:var(--panel2)}
  /* resize grip — bottom-right, chrome-only */
  #lmPanel .lm-grip{position:absolute;right:1px;bottom:1px;width:16px;height:16px;z-index:4;cursor:nwse-resize;opacity:0;pointer-events:none;transition:opacity .2s ease-in-out;color:var(--text-muted)}
  #lmPanel.chrome .lm-grip{opacity:.9;pointer-events:auto}
  #lmPanel .lm-grip svg{display:block;width:100%;height:100%;stroke:currentColor;stroke-width:1.2;fill:none;stroke-linecap:round}
  /* nebula idle skin — token hues only, low alpha, slow drift; hover sharpens away */
  #lmPanel .lm-scene{position:relative}
  #lmPanel .lm-scene svg{display:block;width:100%;position:relative;z-index:1}
  /* the #000 in mask-image is GEOMETRY, not color: a mask reads alpha only, so the
     literal is the opaque stop of the fade — it never paints and needs no token */
  #lmPanel .lm-neb{position:absolute;inset:0;pointer-events:none;opacity:var(--lm-deco);transition:opacity .2s ease-in-out;-webkit-mask-image:radial-gradient(130% 130% at 50% 45%,#000 52%,transparent 97%);mask-image:radial-gradient(130% 130% at 50% 45%,#000 52%,transparent 97%)}
  /* nebula mixes trimmed ~30% (14/12/9/8 → 10/8/6/6) on top of the --lm-deco cut */
  #lmPanel .lm-neb1{background:
    radial-gradient(90% 80% at 25% 30%,color-mix(in srgb,var(--accent) 10%,transparent),transparent 65%),
    radial-gradient(75% 90% at 80% 75%,color-mix(in srgb,var(--lm-purple) 8%,transparent),transparent 62%);
    background-size:165% 165%,175% 175%;background-repeat:no-repeat}
  #lmPanel .lm-neb2{background:
    radial-gradient(80% 70% at 72% 18%,color-mix(in srgb,var(--lm-cyan) 6%,transparent),transparent 60%),
    radial-gradient(95% 90% at 28% 88%,color-mix(in srgb,var(--accent-soft) 6%,transparent),transparent 66%);
    background-size:185% 185%,155% 155%;background-repeat:no-repeat}
  #lmPanel.chrome .lm-neb{opacity:0;animation-play-state:paused}
  /* typewriter ticker — one mono line at the bottom */
  #lmTicker{position:relative;z-index:2;height:${TICK_H}px;display:flex;align-items:center;padding:0 12px;font:500 12px/16px var(--mono);letter-spacing:0;color:var(--text-muted);white-space:nowrap;overflow:hidden;transition:opacity .3s ease}
  /* emphasis = a brightness step, not a hue (the old --accent-text was link blue) */
  #lmTicker.f-acc{color:var(--text-primary)}
  #lmTicker.f-warn{color:var(--warning)}
  #lmTicker.fade{opacity:0}
  /* v4 galaxy scenery — hex lattice + static starfield + Saturn planets (map.html recipes) */
  #lmDeco{pointer-events:none}
  #lmHexRect{opacity:calc(.5*var(--lm-deco))}
  #lmStars{opacity:var(--lm-deco)}
  #lmPlanets{opacity:calc(.85*var(--lm-deco))}
  .lm-planet{transform-box:fill-box;transform-origin:center}
  /* satellite swarms — dim historical dots + faint spokes; the group rotates slowly */
  .lm-rot{transform-box:fill-box;transform-origin:center}
  .lm-swarm-op{opacity:calc(.95*var(--lm-deco))}
  .lm-sat{fill:var(--ec);pointer-events:none}
  /* lesson satellites: transparent stroke = a hoverable hit area around a 1-2px dot */
  .lm-sat.pb{pointer-events:auto;cursor:pointer;stroke:transparent;stroke-width:6}
  .lm-spoke{stroke:var(--ec);stroke-width:.5;pointer-events:none}
  /* count badge pill — map.html recipe: --na fill, --border-active stroke, 600-weight number */
  .lm-badge{transform-box:fill-box;transform-origin:center}
  .lm-badge rect{fill:var(--na);stroke:var(--line3);stroke-width:.7}
  .lm-badge text{fill:var(--text-primary);font-weight:600;font-family:var(--sans);text-anchor:middle;letter-spacing:0}
  /* YOU stays a single bright star (the prompter) — no swarm, brighter halo */
  .lm-node[data-n="you"] .lm-halo{opacity:calc(.3*var(--lm-deco))}
  /* nodes — glow halo (radial gradient on token color) + flat token core */
  .lm-node{cursor:pointer}
  .lm-node .lm-halo{opacity:calc(.14*var(--lm-deco));transform-box:fill-box;transform-origin:center;transition:opacity var(--transition-colors)}
  .lm-node .lm-core{opacity:.5;transition:opacity var(--transition-colors)}
  .lm-node .lm-ic{color:var(--white);opacity:.55;transition:opacity var(--transition-colors)}
  [data-theme="light"] .lm-node .lm-ic{opacity:.8}
  /* §TYPE letter-spacing 0 everywhere; weights cap at 600. These px values are
     viewBox UNITS (the scene scales with the panel), not chrome type — the two-size
     rule governs the DOM chrome above, and resizing them would break the layout. */
  .lm-node text{fill:var(--text-muted);font:600 7.5px var(--sans);letter-spacing:0;text-anchor:middle;transition:fill var(--transition-colors)}
  .lm-node .lm-mlbl{fill:var(--text-secondary);font:600 7px var(--mono);letter-spacing:0;text-transform:none}
  .lm-node.recent .lm-halo{opacity:calc(.4*var(--lm-deco))}
  .lm-node.recent .lm-core{opacity:.82}.lm-node.recent .lm-ic{opacity:.85}
  .lm-node.on .lm-halo{opacity:calc(.95*var(--lm-deco))}
  .lm-node.on .lm-core{opacity:1}.lm-node.on .lm-ic{opacity:1}
  .lm-node.on text{fill:var(--text-primary)}
  .lm-node .lm-warnring{fill:none;stroke:var(--warning);stroke-width:1.6;opacity:0;transition:opacity var(--transition-colors)}
  .lm-node.warn .lm-warnring{opacity:.95}
  .lm-node.warn .lm-halo{opacity:calc(.9*var(--lm-deco));fill:url(#lmg-warn)}
  /* child molecules — ephemeral satellites orbiting their parent, TTL fade */
  .lm-kid{offset-rotate:0deg;transition:opacity 2.4s linear}
  .lm-kid.dying{opacity:0}
  .lm-kid .lm-kid-in{transform-box:fill-box;transform-origin:center}
  .lm-kid circle{fill:var(--ec);opacity:.88;filter:drop-shadow(0 0 1.5px var(--ec))}   /* glow 2.5→1.5px */
  .lm-kid text{fill:var(--text-secondary);font:600 5.5px var(--mono);letter-spacing:0;text-anchor:middle}
  .lm-kid.mote circle{opacity:.85}
  .lm-kid.mote text{font:600 5px var(--mono);letter-spacing:0;fill:var(--text-muted)}
  .lm-mote-travel{fill:var(--lm-purple);r:2.2;filter:drop-shadow(0 0 1.8px var(--lm-purple));offset-rotate:0deg;opacity:0}   /* scene glow, not chrome */
  /* brain core life — faint orbital ring (always-on idle) + electrons + 2nd halo layer (turn only) */
  .lm-orbit{fill:none;stroke:var(--accent);stroke-width:.7;opacity:calc(.18*var(--lm-deco));transform-box:fill-box;transform-origin:center}
  .lm-halo2{opacity:0;transform-box:fill-box;transform-origin:center;transition:opacity var(--transition-colors)}
  .lm-node.on .lm-halo2{opacity:calc(.55*var(--lm-deco))}
  .lm-elec{fill:var(--accent);r:1.4;opacity:0;offset-rotate:0deg;filter:drop-shadow(0 0 1.5px var(--accent));transition:opacity var(--transition-colors)}   /* glow 2.5→1.5px */
  /* model thinking spinner — partial arc, only while a turn is live */
  .lm-spin{fill:none;stroke:var(--accent);stroke-width:1.2;stroke-dasharray:30 90;stroke-linecap:round;opacity:0;transform-box:fill-box;transform-origin:center;transition:opacity var(--transition-colors)}
  /* event ripples — spawned by JS on pings/clicks, self-remove on animationend */
  .lm-ripple{fill:none;stroke:var(--ec);stroke-width:1.4;opacity:0;pointer-events:none}
  .lm-ripple-big{stroke-width:2}
  /* edges — dim base stroke; luminous blurred glow + recolored core when active */
  .lm-edge path{fill:none}
  .lm-edge .lm-ebase{stroke:var(--line2);stroke-width:1;opacity:.9;transition:stroke var(--transition-colors),opacity var(--transition-colors)}
  .lm-edge .lm-eglow{stroke:var(--ec);stroke-width:3.6;opacity:0;filter:url(#lmBlur);transition:opacity var(--transition-colors)}
  .lm-edge .lm-eflow{stroke:var(--ec);stroke-width:1.4;opacity:0;stroke-dasharray:7 11;stroke-linecap:round;transition:opacity var(--transition-colors)}
  .lm-edge.recent .lm-eglow{opacity:calc(.2*var(--lm-deco))}
  .lm-edge.recent .lm-ebase{stroke:var(--ec);opacity:.55}
  .lm-edge.on .lm-eglow{opacity:calc(.6*var(--lm-deco))}
  .lm-edge.on .lm-ebase{stroke:var(--ec);opacity:1;stroke-width:1.3}
  /* traveling comet pulses — CSS motion path; killed entirely under reduced motion */
  .lm-dot{fill:var(--ec);r:2.1;filter:drop-shadow(0 0 1.8px var(--ec));offset-rotate:0deg}   /* glow 3→1.8px */
  @media (prefers-reduced-motion: no-preference){
    .lm-dot{animation:lmTravel 1.6s cubic-bezier(.4,0,.2,1) infinite}
    .lm-edge.on .lm-eflow{opacity:calc(.85*var(--lm-deco));animation:lmFlow .8s linear infinite}
    .lm-node[data-n="brain"] .lm-halo{animation:lmIdleBreathe 5.5s ease-in-out infinite}
    .lm-node.on .lm-halo{animation:lmBreathe 2.6s cubic-bezier(.4,0,.2,1) infinite}
    .lm-node.on .lm-halo2{animation:lmBreathe 2.6s cubic-bezier(.4,0,.2,1) -1.3s infinite}
    .lm-orbit{animation:lmOrbit 20s linear infinite}
    #lmPanel.live .lm-elec{opacity:calc(.95*var(--lm-deco));animation:lmTravel 3.6s linear infinite}
    #lmPanel.live .lm-spin{opacity:calc(.85*var(--lm-deco));animation:lmSpin 2.4s linear infinite}
    .lm-ripple{animation:lmRipple .7s cubic-bezier(0,.55,.45,1) forwards}
    .lm-ripple-big{animation-name:lmRippleBig;animation-duration:.9s}
    .lm-edge.flick .lm-eglow{animation:lmFlick .9s linear 1}
    .lm-kid{animation:lmTravel var(--kd,13s) linear infinite}
    .lm-kid .lm-kid-in{animation:lmKidPop .5s cubic-bezier(.34,1.56,.64,1) both}
    .lm-mote-travel{opacity:1;animation:lmTravelOnce 1.35s cubic-bezier(.4,0,.2,1) forwards}
    #lmPanel .lm-neb1{animation:lmNebA 75s ease-in-out infinite alternate}
    #lmPanel .lm-neb2{animation:lmNebB 90s ease-in-out infinite alternate}
    .lm-rot.lm-go{animation:lmSwarmRot linear infinite}
    .lm-planet{animation:lmPlanetDrift ease-in-out infinite alternate}
    .lm-badge.pop{animation:lmBadgePop .4s cubic-bezier(.34,1.56,.64,1)}
  }
  @media (prefers-reduced-motion: reduce){
    .lm-dot,.lm-eflow,.lm-elec,.lm-spin,.lm-ripple,.lm-halo2,.lm-orbit,.lm-mote-travel{display:none}
    #lmPanel{transition:none!important}
    #lmPanel *{transition:none!important}
  }
  @keyframes lmTravel{from{offset-distance:0%}to{offset-distance:100%}}
  @keyframes lmTravelOnce{from{offset-distance:0%}to{offset-distance:100%}}
  @keyframes lmFlow{to{stroke-dashoffset:-18}}
  @keyframes lmBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.16)}}
  @keyframes lmIdleBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
  @keyframes lmOrbit{to{transform:rotate(360deg)}}
  @keyframes lmSpin{to{transform:rotate(360deg)}}
  @keyframes lmKidPop{from{transform:scale(0)}to{transform:scale(1)}}
  @keyframes lmRipple{from{r:var(--r0);opacity:calc(.9*var(--lm-deco))}to{r:var(--r1);opacity:0}}
  @keyframes lmRippleBig{from{r:var(--r0);opacity:calc(.95*var(--lm-deco))}to{r:var(--r1);opacity:0}}
  @keyframes lmFlick{0%,100%{opacity:calc(.6*var(--lm-deco))}12%,44%,76%{opacity:.04}28%,60%,92%{opacity:calc(.95*var(--lm-deco))}}
  @keyframes lmNebA{from{background-position:0% 0%,100% 100%}to{background-position:100% 60%,0% 20%}}
  @keyframes lmNebB{from{background-position:100% 0%,0% 100%}to{background-position:20% 100%,80% 0%}}
  @keyframes lmSwarmRot{to{transform:rotate(360deg)}}
  @keyframes lmPlanetDrift{from{transform:translate(0,0)}to{transform:translate(5px,-4px)}}
  @keyframes lmBadgePop{0%{transform:scale(1)}45%{transform:scale(1.4)}100%{transform:scale(1)}}
  /* tooltip */
  /* tooltip IS a popover — the one surface §SHADOWS still allows. 13px body / 12px meta. */
  #lmTip{position:absolute;pointer-events:none;background:var(--elev);border:1px solid var(--line2);border-radius:var(--radius-btn);box-shadow:var(--shadow-dropdown);padding:6px 10px;font-size:13px;line-height:20px;color:var(--text-primary);display:none;max-width:220px;z-index:2}
  #lmTip .t2{color:var(--text-muted);font-size:12px;line-height:16px;margin-top:1px}
  /* collapsed pill — a floating overlay surface like the panel, so it keeps the
     popover shadow; the dot inside it is flat (see .lm-live-dot). */
  #lmPill{position:fixed;z-index:260;display:flex;align-items:center;gap:7px;height:${PILL_H}px;padding:0 12px;background:var(--panel);border:1px solid var(--line2);border-radius:var(--radius-pill);box-shadow:var(--shadow-dropdown);cursor:pointer;color:var(--text-secondary)}
  #lmPill:hover{border-color:var(--line3);color:var(--text-primary)}
  #lmPill svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
  #lmPill .lm-pdot{width:7px;height:7px;border-radius:50%;background:var(--text-muted)}
  #lmPill.live .lm-pdot{background:var(--text-primary)}  /* matches .lm-live-dot: flat, no glow */
  @media (max-width:900px){#lmPanel,#lmPill,#livemapBtn{display:none!important}}`;
  document.head.appendChild(css);

  // ---- build DOM ------------------------------------------------------------
  const panel = document.createElement('div'); panel.id = 'lmPanel'; panel.style.display = 'none';
  const trim = (a, b, s) => { const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1; return { x: a.x + dx / d * (a.r + s), y: a.y + dy / d * (a.r + s) }; };
  function edgeD(e) {
    const A = NODES[e.a], B = NODES[e.b];
    const p = trim(A, B, 4), q = trim(B, A, 4);
    const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 1;
    const off = Math.min(24, 8 + d * 0.09) * e.s;
    const cx = (p.x + q.x) / 2 - dy / d * off, cy = (p.y + q.y) / 2 + dx / d * off;
    return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  }
  const grads = Object.entries(TOK).map(([k, v]) =>
    `<radialGradient id="lmg-${k}"><stop offset="0" stop-color="var(${v})" stop-opacity=".85"/><stop offset=".35" stop-color="var(${v})" stop-opacity=".33"/><stop offset="1" stop-color="var(${v})" stop-opacity="0"/></radialGradient>`).join('');
  // v4 scenery — map.html's backdrop translated canvas→SVG (paint-once, no loop):
  // hex lattice = drawBackdrop's pointy-top hexes (rows at s·0.87, odd offset s/2)
  // as a userSpace <pattern>; starfield = seeded static dots (map's z-depth →
  // brightness split on --text-secondary/--text-muted); planets = map's ringed
  // accents (ellipse r·1.9 × r·0.62). All under --lm-deco so light theme dims.
  const HEX_S = 22, HEX_R = HEX_S * 0.56;
  const hexPts = (cx, cy) => { const p = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; p.push((cx + Math.cos(a) * HEX_R).toFixed(1) + ',' + (cy + Math.sin(a) * HEX_R).toFixed(1)); } return p.join(' '); };
  const hexPat = `<pattern id="lmHexPat" width="${HEX_S}" height="${(HEX_S * 1.74).toFixed(2)}" patternUnits="userSpaceOnUse">` +
    [[0, 0], [HEX_S, 0], [HEX_S / 2, HEX_S * 0.87], [0, HEX_S * 1.74], [HEX_S, HEX_S * 1.74]]
      .map(([x, y]) => `<polygon points="${hexPts(x, y)}" fill="none" stroke="var(--text-muted)" stroke-opacity=".12" stroke-width=".6"/>`).join('') + '</pattern>';
  const starsSvg = (() => {
    const r = prng(42); let s = '';
    for (let i = 0; i < 64; i++) {
      const x = (r() * SCENE_W).toFixed(1), y = (r() * SCENE_H).toFixed(1), z = r();
      s += `<circle cx="${x}" cy="${y}" r="${(0.35 + z * 0.75).toFixed(2)}" fill="var(${z > 0.55 ? '--text-secondary' : '--text-muted'})" opacity="${(0.12 + z * 0.38).toFixed(2)}"/>`;
    }
    return s;
  })();
  const planet = (x, y, pr, tok, dur, rot) =>
    `<g class="lm-planet" style="animation-duration:${dur}s"><g transform="translate(${x},${y}) rotate(${rot})">` +
    `<circle r="${pr}" fill="var(${tok})" opacity=".38"/><circle r="${(pr * 0.45).toFixed(1)}" fill="var(${tok})" opacity=".6"/>` +
    `<ellipse rx="${(pr * 1.9).toFixed(1)}" ry="${(pr * 0.62).toFixed(1)}" fill="none" stroke="var(${tok})" stroke-opacity=".55" stroke-width=".9"/></g></g>`;
  const decoSvg = `<g id="lmDeco"><rect id="lmHexRect" width="${SCENE_W}" height="${SCENE_H}" fill="url(#lmHexPat)"/>` +
    `<g id="lmStars">${starsSvg}</g><g id="lmPlanets">${planet(20, 16, 3.4, '--lm-purple', 120, -18)}${planet(172, 221, 2.6, '--lm-cyan', 85, 14)}</g></g>`;
  const edgesSvg = EDGES.map((e) => {
    e.d = edgeD(e);
    return `<g class="lm-edge" data-e="${e.id}" style="--ec:var(${TOK[e.c]})"><path class="lm-eglow" d="${e.d}"/><path class="lm-ebase" d="${e.d}"/><path class="lm-eflow" d="${e.d}"/></g>`;
  }).join('');
  const nodesSvg = Object.entries(NODES).map(([id, n]) => {
    const ir = Math.max(8, n.r * 0.98);
    // brain: orbital ring (idle life) + 2nd halo layer + orbiting electrons (turn only); model: thinking arc
    const under = id === 'brain'
      ? `<g transform="rotate(-14)"><ellipse class="lm-orbit" rx="31" ry="10.5"/></g><circle class="lm-halo2" r="${(n.r * 1.9).toFixed(1)}" fill="url(#lmg-${n.c})"/>`
      : '';
    const over = id === 'brain'
      ? `<circle class="lm-elec" style="offset-path:path('M 25 0 A 25 8.5 0 1 1 -25 0 A 25 8.5 0 1 1 25 0')"/>
        <g transform="rotate(64)"><circle class="lm-elec" style="offset-path:path('M 21 0 A 21 7 0 1 1 -21 0 A 21 7 0 1 1 21 0');animation-duration:2.7s;animation-delay:-1.2s"/></g>`
      : id === 'model' ? `<circle class="lm-spin" r="${n.r + 6}"/>` : '';
    // v4: swarm group (rotating galaxy satellites, under the core) + count badge pill
    const swarm = GAL[id] ? `<g class="lm-rot" data-rot="${id}"></g>` : '';
    const badge = GAL[id] && id !== 'bubble' ? `<g class="lm-badge" data-b="${id}" style="display:none"><rect/><text></text></g>` : '';
    return `<g class="lm-node" data-n="${id}" transform="translate(${n.x},${n.y})" style="--ec:var(${TOK[n.c]})">
      <circle class="lm-halo" r="${(n.r * 2.7).toFixed(1)}" fill="url(#lmg-${n.c})"/>${swarm}${under}
      <circle class="lm-warnring" r="${n.r + 4}"/>
      <circle class="lm-core" r="${n.r}" fill="var(${TOK[n.c]})"/>
      <use class="lm-ic" href="#${n.ic}" x="${-ir / 2}" y="${-ir / 2}" width="${ir}" height="${ir}" fill="none" stroke="currentColor" stroke-width="2"/>${over}
      <text y="${n.r + 12}">${n.lbl}</text>${id === 'model' ? `<text class="lm-mlbl" y="${n.r + 21}" id="lmModelLbl"></text>` : ''}${badge}
    </g>`;
  }).join('');
  panel.innerHTML = `
    <div class="lm-head" id="lmHead">
      <span class="lm-live-dot"></span><span class="lm-ttl">Live system map</span>
      <span class="lm-sub" id="lmStatus">idle</span>
      <button class="lm-hbtn" id="lmMin" title="Collapse to pill">–</button>
      <button class="lm-hbtn" id="lmX" title="Close">✕</button>
    </div>
    <div class="lm-scene">
      <div class="lm-neb lm-neb1"></div><div class="lm-neb lm-neb2"></div>
      <svg viewBox="0 0 ${SCENE_W} ${SCENE_H}" preserveAspectRatio="xMidYMid meet" aria-label="Live system map">
        <defs>${grads}${hexPat}<filter id="lmBlur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
        ${decoSvg}<g id="lmEdges">${edgesSvg}</g><g id="lmNodes">${nodesSvg}</g><g id="lmFx"></g>
      </svg>
      <div id="lmTip"></div>
    </div>
    <div id="lmTicker"><span id="lmTickerTx"></span></div>
    <div class="lm-grip" title="Resize"><svg viewBox="0 0 16 16"><path d="M13 7 7 13M13 11l-2 2"/></svg></div>`;
  document.body.appendChild(panel);
  const pill = document.createElement('button'); pill.id = 'lmPill'; pill.style.display = 'none'; pill.title = 'Live system map';
  pill.innerHTML = `<svg viewBox="0 0 24 24"><use href="#i-brain"/></svg><span class="lm-pdot"></span>`;
  document.body.appendChild(pill);
  const $e = {}; EDGES.forEach((e) => { $e[e.id] = panel.querySelector(`[data-e="${e.id}"]`); });
  const $n = {}; Object.keys(NODES).forEach((id) => { $n[id] = panel.querySelector(`[data-n="${id}"]`); });
  const $rot = {}, $b = {};
  Object.keys(GAL).forEach((id) => { $rot[id] = panel.querySelector(`[data-rot="${id}"]`); $b[id] = panel.querySelector(`[data-b="${id}"]`); });
  const statusEl = panel.querySelector('#lmStatus'), tipEl = panel.querySelector('#lmTip'), modelLbl = panel.querySelector('#lmModelLbl');
  const tickerEl = panel.querySelector('#lmTicker'), tickerTx = panel.querySelector('#lmTickerTx');
  const fxLayer = panel.querySelector('#lmFx'), gripEl = panel.querySelector('.lm-grip');

  // ---- size + position: persist + clamp on-screen ---------------------------
  function applySize(w) { curW = Math.min(W_MAX, Math.max(W_MIN, Math.round(w))); panel.style.width = curW + 'px'; }
  applySize(curW);
  function loadPos() { try { return JSON.parse(localStorage.getItem(LS_POS)) || null; } catch { return null; } }
  function clampPos(p, w, h) {
    return { x: Math.min(Math.max(8, p.x), Math.max(8, innerWidth - w - 8)), y: Math.min(Math.max(8, p.y), Math.max(8, innerHeight - h - 8)) };
  }
  function place() {
    const w = S.mode === 'pill' ? PILL_W : curW, h = S.mode === 'pill' ? PILL_H : curH();
    const p = clampPos(loadPos() || { x: innerWidth - curW - 24, y: innerHeight - curH() - 84 }, w, h);
    const el = S.mode === 'pill' ? pill : panel;
    el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
  }
  addEventListener('resize', () => { if (S.mode !== 'closed') place(); });

  // ---- hover / focus chrome: fade in 200ms, fade out ~1s after leave --------
  let chromeT = null;
  function chromeOn() { clearTimeout(chromeT); chromeT = null; panel.classList.add('chrome'); }
  function chromeOff() { clearTimeout(chromeT); panel.classList.remove('chrome'); }
  panel.addEventListener('mouseenter', chromeOn);
  panel.addEventListener('mouseleave', chromeOff);
  panel.addEventListener('focusin', chromeOn);
  panel.addEventListener('focusout', () => { if (!panel.matches(':hover')) chromeOff(); });

  // drag anywhere on the panel body (nodes / children / buttons / grip excluded)
  (function () {
    let drag = null;
    panel.addEventListener('pointerdown', (ev) => {
      if (ev.target.closest('button,.lm-node,.lm-kid,.lm-grip')) return;
      drag = { dx: ev.clientX - panel.offsetLeft, dy: ev.clientY - panel.offsetTop };
      panel.classList.add('dragging'); panel.setPointerCapture(ev.pointerId); ev.preventDefault();
    });
    panel.addEventListener('pointermove', (ev) => {
      if (!drag) return;
      const p = clampPos({ x: ev.clientX - drag.dx, y: ev.clientY - drag.dy }, curW, curH());
      panel.style.left = p.x + 'px'; panel.style.top = p.y + 'px';
    });
    panel.addEventListener('pointerup', (ev) => {
      if (!drag) return; drag = null; panel.classList.remove('dragging');
      try { panel.releasePointerCapture(ev.pointerId); } catch {}
      localStorage.setItem(LS_POS, JSON.stringify({ x: panel.offsetLeft, y: panel.offsetTop }));
    });
  })();

  // resize via the grip — width 300-640, aspect locked (viewBox scales), persisted
  (function () {
    let rs = null;
    gripEl.addEventListener('pointerdown', (ev) => {
      rs = { x0: ev.clientX, w0: curW };
      gripEl.setPointerCapture(ev.pointerId); ev.preventDefault(); ev.stopPropagation(); chromeOn();
    });
    gripEl.addEventListener('pointermove', (ev) => {
      if (!rs) return;
      applySize(rs.w0 + (ev.clientX - rs.x0));
    });
    gripEl.addEventListener('pointerup', (ev) => {
      if (!rs) return; rs = null;
      try { gripEl.releasePointerCapture(ev.pointerId); } catch {}
      localStorage.setItem(LS_SIZE, JSON.stringify({ w: curW }));
      place();
      redrawGalaxy();   // v4: density + badge inverse-scale follow the new width
    });
  })();

  // ---- v4 galaxy swarms: real data → satellite clusters + count badges --------
  // density thins with panel width so 300px never reads as mush (full at ≥380)
  function densityFac() { return curW <= 330 ? 0.5 : curW <= 360 ? 0.75 : 1; }
  // deterministic spiral scatter (golden angle + seeded jitter), spokes core→sat.
  // Redraw REPLACES innerHTML (keyed on drawn count + tips + inv → no churn/leak).
  function drawSwarm(id, count, tips) {
    const cfg = GAL[id], rot = $rot[id], n = NODES[id];
    if (!cfg || !rot) return;
    const real = Math.max(0, count | 0);
    const dc = real === 0 ? 0 : Math.max(Math.min(3, real), Math.round(Math.min(cfg.cap, real) * densityFac()));
    const key = dc + '|' + (tips ? tips.join('¦') : '') + '|' + G.inv.toFixed(2);
    if (G.drawn[id] === key) return;
    G.drawn[id] = key;
    if (!dc) { rot.innerHTML = ''; rot.classList.remove('lm-go'); return; }
    const rnd = prng(1 + id.length * 37 + id.charCodeAt(0));
    const r0 = n.r * 1.5 + 3, r1 = cfg.rmax;
    let spokes = '', dots = '';
    for (let i = 0; i < dc; i++) {
      const a = rnd() * 0.9 + i * 2.399963;                       // golden-angle spiral + jitter
      const rad = r0 + (r1 - r0) * Math.sqrt((i + 0.5) / dc) * (0.72 + rnd() * 0.28);
      const x = (Math.cos(a) * rad).toFixed(1), y = (Math.sin(a) * rad).toFixed(1);
      const op = (0.3 + rnd() * 0.5).toFixed(2);
      spokes += `<line class="lm-spoke" x1="${(Math.cos(a) * (n.r + 1.5)).toFixed(1)}" y1="${(Math.sin(a) * (n.r + 1.5)).toFixed(1)}" x2="${x}" y2="${y}" stroke-opacity="${(op * 0.38).toFixed(2)}"/>`;
      dots += `<circle class="lm-sat${tips ? ' pb' : ''}" cx="${x}" cy="${y}" r="${(0.7 + rnd()).toFixed(2)}" fill-opacity="${op}"${tips && tips[i] ? ` data-tip="${esc(tips[i])}"` : ''}/>`;
    }
    // leading anchor circle keeps the group's fill-box symmetric → rotation
    // stays centered on the core (same trick as .lm-orbit's transform-box)
    rot.innerHTML = `<g class="lm-swarm-op"><circle class="lm-sat" r="${r1}" fill="none" stroke="none" fill-opacity="0"/>${spokes}${dots}</g>`;
    rot.style.animationDuration = cfg.dur + 's';
    rot.style.animationDirection = cfg.dir;
    rot.classList.add('lm-go');
  }
  // count badge pill — map.html recipe; inv counter-scales vs the viewBox so the
  // number stays ~8px on screen at every panel width (badges always legible)
  function drawBadge(id, count, pop) {
    const b = $b[id]; if (!b) return;
    if (count == null || count === 0) { b.style.display = 'none'; return; }
    const n = NODES[id], inv = G.inv, txt = String(count);
    const w = (txt.length * 4.9 + 7) * inv, h = 11 * inv;
    b.setAttribute('transform', `translate(${(n.r * 0.75 + 7 * inv + w / 2).toFixed(1)},${(-(n.r + 8 * inv)).toFixed(1)})`);
    const rect = b.querySelector('rect'), t = b.querySelector('text');
    rect.setAttribute('x', (-w / 2).toFixed(1)); rect.setAttribute('y', (-h / 2).toFixed(1));
    rect.setAttribute('width', w.toFixed(1)); rect.setAttribute('height', h.toFixed(1)); rect.setAttribute('rx', (h / 2).toFixed(1));
    t.setAttribute('y', (2.9 * inv).toFixed(1));
    t.style.fontSize = (8 * inv).toFixed(2) + 'px';   // inline: .lm-node text's font shorthand must not win
    if (t.textContent !== txt) t.textContent = txt;
    b.style.display = '';
    if (pop && !RM.matches) {
      b.classList.remove('pop'); void b.getBBox();               // restart the pop keyframe
      b.classList.add('pop');
      clearTimeout(b._popT); b._popT = setTimeout(() => b.classList.remove('pop'), 500);
    }
  }
  function redrawGalaxy() {
    G.inv = SCENE_W / curW;
    drawSwarm('brain', G.chats == null ? 0 : G.chats);           drawBadge('brain', G.chats);
    drawSwarm('playbook', G.lessons ? G.lessons.length : 0, G.lessons || undefined);
    drawBadge('playbook', G.lessons && G.lessons.length);
    drawSwarm('ledger', G.ledger == null ? 0 : G.ledger);        drawBadge('ledger', G.ledger);
    drawSwarm('tools', G.tools.size);                            drawBadge('tools', G.tools.size || null);
    drawSwarm('distiller', G.cats == null ? 0 : G.cats);         drawBadge('distiller', G.cats);
    drawSwarm('bp', G.bp == null ? 0 : G.bp);                    drawBadge('bp', G.bp);
    drawSwarm('bubble', G.bp == null ? 0 : Math.min(6, G.bp));
  }
  // fetch the real numbers (on open + with the 3s poll, only while open)
  let galBusy = false;
  async function fetchGalaxy() {
    if (galBusy || S.mode !== 'open') return;
    galBusy = true;
    try {
      const [ch, pb, le] = await Promise.all([
        fetch('/api/chats').then((r) => r.json()).catch(() => null),
        fetch('/api/playbook').then((r) => r.json()).catch(() => null),
        fetch('/api/learn-events').then((r) => r.json()).catch(() => null),
      ]);
      if (ch && ch.chats) { G.chats = ch.chats.length; G.bp = ch.chats.filter((c) => c.bp).length; }
      if (pb && pb.lessons) {
        const act = pb.lessons.filter((l) => l.status === 'active');
        G.lessons = act.map((l) => clean(l.trigger || '').split(',')[0].slice(0, 30) || 'lesson');
        G.cats = (pb.categories || []).length;
        S.lessons = act.length;                                  // v3 tooltip/ambient counter
      }
      // live pings may run ahead of the ledger file — never regress the badge
      if (le && le.events) G.ledger = Math.max(G.ledger || 0, le.events.length);
    } finally { galBusy = false; }
    if (S.mode === 'open') redrawGalaxy();
  }
  // playbook satellite tooltips — hovering a lesson dot names its trigger
  panel.querySelector('.lm-scene svg').addEventListener('mouseover', (ev) => {
    const t = ev.target;
    if (!t.classList || !t.classList.contains('pb') || !t.dataset.tip) return;
    const sc = panel.querySelector('.lm-scene').getBoundingClientRect();
    const tb = t.getBoundingClientRect();
    tipEl.innerHTML = `<b>Lesson</b><div class="t2">${esc(t.dataset.tip)}</div>`;
    tipEl.style.display = 'block';
    tipEl.style.left = Math.min(tb.left - sc.left + 10, sc.width - 190) + 'px';
    tipEl.style.top = Math.max(4, tb.top - sc.top - 34) + 'px';
  });
  panel.querySelector('.lm-scene svg').addEventListener('mouseout', (ev) => {
    if (ev.target.classList && ev.target.classList.contains('pb')) tipEl.style.display = 'none';
  });

  // ---- signals ---------------------------------------------------------------
  const TURN_EDGES = ['you-brain', 'brain-model'];
  const NS = 'http://www.w3.org/2000/svg';
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  function bump(id, ms) { S.until[id] = Math.max(S.until[id] || 0, now() + ms); if (S.mode === 'open') render(); }
  // expanding event ripple from a node — self-removes on animationend (+ timeout fallback: no leak)
  function ripple(id, big) {
    if (S.mode !== 'open' || RM.matches) return;
    const n = NODES[id], g = $n[id];
    if (!n || !g || g.querySelectorAll('.lm-ripple').length >= 4) return;   // cap concurrent
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'lm-ripple' + (big ? ' lm-ripple-big' : ''));
    c.style.cssText = `--r0:${n.r + 2}px;--r1:${(n.r * 2.9 + (big ? 10 : 0)).toFixed(1)}px;--ec:var(${big ? '--warning' : TOK[n.c]})`;
    const kill = () => c.remove();
    c.addEventListener('animationend', kill, { once: true });
    setTimeout(kill, big ? 1300 : 1100);
    g.appendChild(c);
  }
  // recurrence shockwave — amber double-ripple from Playbook + brief flicker on the playbook-brain edge (≤1.2s)
  function shockwave() {
    if (S.mode !== 'open' || RM.matches) return;
    ripple('playbook', true); setTimeout(() => ripple('playbook', true), 180);
    const g = $e['playbook-brain'];
    g.classList.add('flick'); setTimeout(() => g.classList.remove('flick'), 1000);
  }

  // ---- child molecules: ephemeral satellites from REAL activity ---------------
  // max 6 concurrent (LRU), deduped by parent+label (re-ping refreshes TTL),
  // tiny elliptical orbit via offset-path, ~20s life fading to nothing.
  const KIDS = new Map();   // key → {el, dieT, fadeT}
  let KID_TTL = 20000, kidSeq = 0;
  function killKid(key) {
    const k = KIDS.get(key); if (!k) return;
    clearTimeout(k.dieT); clearTimeout(k.fadeT); k.el.remove(); KIDS.delete(key);
  }
  function armKid(key, k, ttl) {
    clearTimeout(k.dieT); clearTimeout(k.fadeT); k.el.classList.remove('dying');
    k.fadeT = setTimeout(() => k.el.classList.add('dying'), Math.max(200, ttl - 2400));
    k.dieT = setTimeout(() => killKid(key), ttl);
  }
  function spawnKid(parent, label, opts) {
    opts = opts || {};
    if (S.mode !== 'open' || !$n[parent]) return;
    label = clean(label).slice(0, 12);
    const key = parent + '|' + (opts.key || label || '•');
    const ttl = opts.ttl || KID_TTL;
    const ex = KIDS.get(key);
    if (ex) {                                  // dedupe: refresh TTL + LRU order, no twin
      KIDS.delete(key); KIDS.set(key, ex); armKid(key, ex, ttl);
      return;
    }
    if (KIDS.size >= 6) killKid(KIDS.keys().next().value);   // LRU evict
    const i = kidSeq++;
    const rx = 14 + (i % 3) * 4, ry = 5 + (i % 3) * 1.5;     // varied orbit per slot
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'lm-kid' + (opts.mote ? ' mote' : ''));
    g.style.cssText = `offset-path:path('M ${rx} 0 A ${rx} ${ry} 0 1 1 ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx} 0');--kd:${(11 + (i % 5) * 1.7).toFixed(1)}s;animation-delay:-${((i * 2.3) % 11).toFixed(1)}s`;
    const r = opts.mote ? 1.8 : 3;
    g.innerHTML = `<g class="lm-kid-in"><circle r="${r}"/>${label ? `<text y="${r + 5.5}">${label.replace(/[<>&]/g, '')}</text>` : ''}</g>`;
    $n[parent].appendChild(g);
    const k = { el: g, dieT: null, fadeT: null };
    KIDS.set(key, k); armKid(key, k, ttl);
    ripple(parent);                            // pop-in = scale keyframe + parent ripple
  }
  // learning-saved: a new mote is BORN — travels Distiller→Playbook, latches briefly
  function lessonBirth(ev) {
    const label = evTag(ev).toLowerCase();
    const latch = () => spawnKid('playbook', label, { mote: true, ttl: Math.min(8000, KID_TTL), key: 'lesson:' + (label || 'new') });
    if (S.mode !== 'open') return;
    if (RM.matches) { latch(); return; }
    const A = NODES.distiller, B = NODES.playbook;
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'lm-mote-travel');
    c.style.cssText = `offset-path:path('M ${A.x - 9} ${A.y + 2} Q ${(A.x + B.x) / 2} ${Math.min(A.y, B.y) - 20} ${B.x + 11} ${B.y - 4}')`;
    const done = () => { c.remove(); latch(); };
    c.addEventListener('animationend', done, { once: true });
    setTimeout(() => { if (c.isConnected) done(); }, 1700);   // fallback: no leak
    fxLayer.appendChild(c);
  }

  // ---- typewriter ticker ------------------------------------------------------
  // queue with coalescing (drop dupes, keep newest 5); types ~18ms/char, holds
  // ~2.8s, fades 300ms; CRITICAL (recurrence) skips the queue and interrupts.
  const TK = { q: [], cur: null, typeIv: null, holdT: null, fadeT: null, lastAct: now(), lastAmb: 0 };
  function tkStop() {
    clearInterval(TK.typeIv); clearTimeout(TK.holdT); clearTimeout(TK.fadeT);
    TK.typeIv = TK.holdT = TK.fadeT = null; TK.cur = null;
  }
  function tkClear() { tkStop(); TK.q = []; tickerTx.textContent = ''; tickerEl.className = ''; }
  function tkNext() {
    const m = TK.q.shift();
    tickerEl.classList.remove('fade');
    if (!m) { tickerTx.textContent = ''; tickerEl.className = ''; return; }
    TK.cur = m; tickerEl.className = m.cls || '';
    if (RM.matches) {                          // reduced motion: instant swap, no fade
      tickerTx.textContent = m.text;
      TK.holdT = setTimeout(tkDone, 2800);
      return;
    }
    let i = 0; tickerTx.textContent = '';
    TK.typeIv = setInterval(() => {
      i++;
      tickerTx.textContent = m.text.slice(0, i) + (i < m.text.length ? '▍' : '');
      if (i >= m.text.length) { clearInterval(TK.typeIv); TK.typeIv = null; TK.holdT = setTimeout(tkDone, 2800); }
    }, 18);
  }
  function tkDone() {
    if (RM.matches) { TK.cur = null; tickerTx.textContent = ''; tkNext(); return; }
    tickerEl.classList.add('fade');
    TK.fadeT = setTimeout(() => { TK.cur = null; tickerTx.textContent = ''; tkNext(); }, 320);
  }
  function tkPush(text, cls, critical) {
    TK.lastAct = now();
    if (S.mode !== 'open' || !text) return;
    if (TK.cur && TK.cur.text === text) return;                       // dupe of the line on screen
    TK.q = TK.q.filter((m) => m.text !== text);                       // coalesce queued dupes
    const m = { text, cls: cls || '' };
    if (critical) { tkStop(); tickerEl.classList.remove('fade'); TK.q.unshift(m); tkNext(); return; }
    TK.q.push(m); while (TK.q.length > 5) TK.q.shift();               // keep newest 5
    if (!TK.cur) tkNext();
  }
  // idle >20s → occasional ambient line from real state (same data as tooltips)
  function tkAmbient() {
    const t = now();
    if (S.mode !== 'open' || S.turnLive || TK.cur || TK.q.length) return;
    if (t - TK.lastAct < 20000 || t - TK.lastAmb < 45000 || S.lessons == null) return;
    TK.lastAmb = t;
    tkPush(S.lessons + ' lesson' + (S.lessons === 1 ? '' : 's') + (S.lastApplied ? ' · last applied ' + clock(S.lastApplied) : ''));
  }

  // session-live TOOLS galaxy: each distinct tool used this session = a satellite
  function toolSat(tool) {
    const k = clean(tool).slice(0, 14);
    if (!k || G.tools.has(k)) return;
    G.tools.add(k);
    if (S.mode === 'open') { drawSwarm('tools', G.tools.size); drawBadge('tools', G.tools.size, true); }
  }

  // ---- ping: the one entry point for real activity ----------------------------
  function ping(kind, arg) {
    const t = now();
    if (kind === 'turn-start') {
      S.turnLive = true; S.turnT0 = t; S.nodePing.you = t; S.nodePing.brain = t; S.nodePing.model = t;
      // first activity auto-reveals the map — but an explicit user choice (any stored mode,
      // incl. 'closed' after the user closed it) always wins
      if (S.mode !== 'open' && !localStorage.getItem(LS_MODE)) setMode('open');
      ripple('brain');
      tkPush('▸ turn — ' + (nice(S.model) || 'auto'));
    }
    else if (kind === 'turn-end') {
      S.turnLive = false; S.remoteTurn = false; TURN_EDGES.forEach((id) => { S.until[id] = t; });
      const secs = arg && arg.secs != null ? arg.secs : (S.turnT0 ? Math.round((t - S.turnT0) / 1000) : null);
      tkPush('✓ done' + (secs != null ? ' · ' + secs + 's' : ''));
    }
    else if (kind === 'tool') {
      bump('model-tools', 3000); S.nodePing.tools = t; ripple('tools');
      if (arg && arg.tool) { spawnKid('tools', String(arg.tool).toUpperCase().slice(0, 9)); toolSat(arg.tool); }
    }
    else if (kind === 'tool-detail') {
      const cmd = clean(arg && arg.cmd);
      if (cmd) {
        tkPush('$ ' + cmd.slice(0, 46));
        const bp = cmd.match(/(?:^|[\s/\\])buildprint(?:\.\w+)?\s+(sync|check|apply)\b/i);
        if (bp) spawnKid('bp', bp[1].toUpperCase());
      }
    }
    else if (kind === 'bp-step') {
      bump('model-tools', 3000); bump('tools-bp', 3400); bump('bp-bubble', 3400); S.nodePing.bp = t; S.nodePing.bubble = t; ripple('bp'); ripple('bubble');
      if (arg && arg.tool) { spawnKid('tools', String(arg.tool).toUpperCase().slice(0, 9)); toolSat(arg.tool); }
    }
    else if (kind === 'model') { if (arg) { S.model = arg; localStorage.setItem(LS_MODEL, arg); } }
    else if (kind === 'playbook-applied') {
      bump('playbook-brain', 3400); S.nodePing.playbook = t; S.lastApplied = t; ripple('playbook');
      spawnKid('playbook', evTag(arg).toLowerCase(), { mote: true, key: 'applied:' + evTag(arg) });
      tkPush('⚡ applying: ' + (evSnip(arg) || 'lesson'), 'f-acc');
    }
    // staged distill run — the three ticker stage lines + distiller life:
    // signal → …searching → ✓ learned (the existing mote-birth stays the payoff)
    else if (kind === 'learning-start') {
      S.nodePing.distiller = t; bump('brain-distiller', 2600); ripple('distiller');
      const sig = clean(arg && arg.signal || '') || evSnip(arg);
      tkPush('🧠 signal: ' + (sig || 'learnable turn').slice(0, 46));
    }
    else if (kind === 'learning-thinking') {
      S.thinkUntil = t + 120000; S.nodePing.distiller = t;   // active glow while the distiller thinks
      tkPush('…searching for a solution', 'f-acc');
    }
    else if (kind === 'learning-clean') { S.thinkUntil = 0; }   // release the glow — no ticker line (silent by design)
    else if (kind === 'learning-saved') {
      S.thinkUntil = 0;
      bump('brain-distiller', 3400); bump('distiller-ledger', 3400); S.nodePing.distiller = t; S.nodePing.ledger = t; ripple('ledger');
      lessonBirth(arg);
      // galaxy: a new learn event → LEDGER swarm +1, badge pops with the real count
      G.ledger = (G.ledger || 0) + 1;
      if (S.mode === 'open') { drawSwarm('ledger', G.ledger); drawBadge('ledger', G.ledger, true); }
      const sol = arg && arg.lessons && arg.lessons[0] && arg.lessons[0].solution;
      tkPush('✓ learned: ' + clean(sol || evSnip(arg) || 'new lesson').slice(0, 46));
    }
    else if (kind === 'recurrence') {
      S.warnT = t; S.nodePing.playbook = t; shockwave();
      tkPush('⚠ known mistake repeated', 'f-warn', true);
    }
    if (S.mode === 'open') render();
  }

  // ---- render ----------------------------------------------------------------
  function edgeState(id) {
    if (S.turnLive && TURN_EDGES.includes(id)) return 'on';
    const u = S.until[id] || 0, t = now();
    if (u > t) return 'on';
    if (t - u < RECENT_MS && u > 0) return 'recent';
    return '';
  }
  // one comet per active edge: lead dot + 2 trailing circles of decreasing size/opacity,
  // trailing via negative animation-delay on the same motion path (seamless from cycle 1).
  // v4 CHANGED BASELINE: 3 dots per comet (was 4) + global cap 15 (≤5 comets at once)
  // so the busiest turn stays under the <50 running-animation budget on the galaxy scene.
  function syncDots(e, on) {
    const g = $e[e.id];
    const have = g.querySelectorAll('.lm-dot').length;
    if (on && !have) {
      if (RM.matches) return;                                    // reduced motion: no comets at all
      if (panel.querySelectorAll('.lm-dot').length >= 15) return; // global cap (≤5 comets at once)
      const mk = (cls, r, op, delay) => {
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('class', cls);
        c.style.cssText = `--ec:var(${TOK[e.c]});offset-path:path('${e.d}');r:${r}px;opacity:${op};animation-delay:${delay}s`;
        g.appendChild(c);
      };
      mk('lm-dot', 2.2, 1, 0);
      for (let i = 1; i <= 2; i++) mk('lm-dot lm-comet', 2.2 - i * 0.5, 1 - i * 0.3, -(1.6 - i * 0.09));
    } else if (!on && have) g.querySelectorAll('.lm-dot').forEach((d) => d.remove());
  }
  function render() {
    const t = now();
    const nodeOn = {}, nodeRecent = {};
    for (const e of EDGES) {
      const st = edgeState(e.id);
      $e[e.id].classList.toggle('on', st === 'on');
      $e[e.id].classList.toggle('recent', st === 'recent');
      syncDots(e, st === 'on');
      if (st === 'on') { nodeOn[e.a] = nodeOn[e.b] = true; }
      else if (st === 'recent') { nodeRecent[e.a] = nodeRecent[e.b] = true; }
    }
    for (const id of Object.keys(NODES)) {
      const p = S.nodePing[id] || 0;
      const on = !!nodeOn[id] || (S.turnLive && (id === 'you' || id === 'brain' || id === 'model'))
        || (id === 'distiller' && S.thinkUntil > t);   // active glow while searching for a solution
      const rec = !on && (!!nodeRecent[id] || (p && t - p < RECENT_MS));
      $n[id].classList.toggle('on', on);
      $n[id].classList.toggle('recent', rec);
    }
    $n.playbook.classList.toggle('warn', t - S.warnT < 2600);
    modelLbl.textContent = S.turnLive ? (nice(S.model) || 'auto') : (S.model ? nice(S.model) : 'idle');
    panel.classList.toggle('live', S.turnLive);
    pill.classList.toggle('live', S.turnLive);
    statusEl.textContent = S.turnLive ? ('turn running' + (S.model ? ' · ' + nice(S.model) : '')) : 'idle';
  }

  // ---- 3s poll (only while open + expanded) -----------------------------------
  async function poll() {
    try {
      const r = await (await fetch('/api/livemap')).json();
      const lts = r.liveTurns || [];
      if (lts.length) {
        if (!S.turnLive) { S.remoteTurn = true; ping('turn-start'); }
        if (lts[0].model) ping('model', lts[0].model);
        if (lts[0].bp) { S.nodePing.bp = now(); }
      } else if (S.remoteTurn && !(typeof state !== 'undefined' && state.live && !state.live.done)) {   // app 'state' is a top-level let, not window.state
        ping('turn-end');
      }
      if (r.lastLearnEvent) {
        S.lastLearn = r.lastLearnEvent;
        if (r.lastLearnEvent.kind === 'playbook-applied' && !S.lastApplied) S.lastApplied = Date.parse(r.lastLearnEvent.ts) || null;
      }
    } catch {}
    fetchGalaxy();   // v4: galaxy counts ride the same 3s poll (open-only, no overlap)
    render();
  }
  function startLoops() {
    if (S.pollIv) return;
    poll();
    S.pollIv = setInterval(poll, 3000);
    S.tickIv = setInterval(() => { render(); tkAmbient(); }, 1000);
  }
  function stopLoops() { clearInterval(S.pollIv); clearInterval(S.tickIv); S.pollIv = S.tickIv = null; tkClear(); }

  // ---- tooltips ----------------------------------------------------------------
  const clock = (ts) => ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }) : '';
  function nodeStatus(id) {
    const live = S.turnLive;
    switch (id) {
      case 'you': return live ? 'prompt in flight' : 'the prompter · idle';
      case 'brain': return live ? 'orchestrating this turn' : 'orchestrator · idle';
      case 'model': return live ? (nice(S.model) || 'auto') + ' · streaming' : (S.model ? 'last used ' + nice(S.model) : 'idle');
      case 'tools': return edgeState('model-tools') === 'on' ? 'running a tool step' : 'Bash & tool steps';
      case 'bp': return edgeState('tools-bp') === 'on' ? 'Buildprint step running' : 'Bubble CLI lane';
      case 'bubble': return 'workspace · test branch';
      case 'playbook': return (S.lessons != null ? S.lessons + ' lesson' + (S.lessons === 1 ? '' : 's') : 'lessons') + (S.lastApplied ? ' · last applied ' + clock(S.lastApplied) : '');
      case 'distiller': return 'distills lessons from turns';
      case 'ledger': return S.lastLearn ? 'last event ' + clock(Date.parse(S.lastLearn.ts)) : 'learn-events ledger';
    }
    return '';
  }
  panel.querySelectorAll('.lm-node').forEach((g) => {
    g.addEventListener('mouseenter', () => {
      if (g.querySelector('.lm-sat.pb:hover')) return;   // a lesson satellite owns the tip
      const id = g.dataset.n, n = NODES[id];
      tipEl.innerHTML = `<b>${n.tip}</b><div class="t2">${nodeStatus(id)}</div>`;
      const sc = panel.querySelector('.lm-scene').getBoundingClientRect();
      const px = n.x / SCENE_W * sc.width, py = n.y / SCENE_H * sc.height;
      tipEl.style.display = 'block';
      tipEl.style.left = Math.min(px + 12, sc.width - 190) + 'px';
      tipEl.style.top = Math.max(4, py - 40) + 'px';
    });
    g.addEventListener('mouseleave', () => { tipEl.style.display = 'none'; });
    g.addEventListener('click', () => ripple(g.dataset.n));   // click feedback = same event ripple
  });

  // ---- open / collapse / close ---------------------------------------------------
  function setMode(m) {
    S.mode = m; localStorage.setItem(LS_MODE, m);
    panel.style.display = m === 'open' ? 'block' : 'none';
    pill.style.display = m === 'pill' ? 'flex' : 'none';
    if (m !== 'closed') place();
    if (m === 'open') { syncFromApp(); startLoops(); render(); } else stopLoops();
  }
  function syncFromApp() {   // a turn may already be running when the panel opens
    if (typeof state !== 'undefined' && state.live && !state.live.done) S.turnLive = true;
    else if (!S.remoteTurn) S.turnLive = false;
  }
  panel.querySelector('#lmMin').onclick = () => setMode('pill');
  panel.querySelector('#lmX').onclick = () => setMode('closed');
  pill.onclick = () => setMode('open');

  window.LIVEMAP = {
    ping,
    open: () => setMode('open'),
    close: () => setMode('closed'),
    toggle: (force) => setMode(force === true || S.mode === 'closed' ? 'open' : S.mode === 'open' ? 'closed' : 'open'),
    _test: {   // rig-only hooks
      kidTTL: (ms) => { KID_TTL = ms; }, kids: () => KIDS.size,
      gal: () => ({ chats: G.chats, bp: G.bp, lessons: G.lessons ? G.lessons.length : null, ledger: G.ledger, cats: G.cats, tools: G.tools.size, inv: G.inv, fac: densityFac() }),
      resetTools: () => { G.tools.clear(); drawSwarm('tools', 0); drawBadge('tools', null); },
    },
  };
  if (S.mode !== 'closed') setMode(S.mode);   // restore across reloads
})();
