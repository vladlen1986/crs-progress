/* CRS Brain — LIVE SYSTEM MAP (floating molecule panel).
 * A live, draggable mini-map of what the system is doing RIGHT NOW: You →
 * Brain → Model → Tools → Buildprint → Bubble, plus the learning loop
 * (Playbook / Distiller → Ledger). Real signals only — wired to state.live,
 * the SSE step stream and the learn-events feed via window.LIVEMAP.ping().
 * Visual language borrowed from map.html's galaxy: soft radial-gradient halos
 * on token colors, luminous curved edges with animated dash-flow, comet-trail
 * pulses, node event ripples, an orbital ring + electrons around Brain and a
 * thinking arc on Model while a turn runs. CSS/SVG animations only (no rAF);
 * everything is scoped inside #lmPanel so a closed/collapsed map runs zero
 * animations, and prefers-reduced-motion kills all motion. Tokens only;
 * light theme dims decorative glow (map.html decoDim() ≈ .55 → --lm-deco).
 * Classic script sharing the app's global scope (loads after the core). */

(function () {
  'use strict';
  if (window.LIVEMAP) return;
  const LS_POS = 'crs-livemap-pos', LS_MODE = 'crs-livemap-mode', LS_MODEL = 'crs-livemap-lastmodel';
  const PANEL_W = 380, PANEL_H = 272, PILL_W = 56, PILL_H = 34;

  // ---- scene: nodes sized by importance, molecule layout -------------------
  // color keys → tokens (gradients + --ec) — one place, both themes
  const TOK = { accent: '--accent', soft: '--accent-soft', purple: '--purple', good: '--good', warn: '--warning', cyan: '--cyan' };
  const NODES = {
    playbook:  { x: 78,  y: 42,  r: 10, c: 'accent', ic: 'i-book',     lbl: 'PLAYBOOK',   tip: 'Playbook' },
    distiller: { x: 185, y: 28,  r: 9,  c: 'purple', ic: 'i-ingest',   lbl: 'DISTILLER',  tip: 'Distiller' },
    ledger:    { x: 289, y: 40,  r: 10, c: 'good',   ic: 'i-db',       lbl: 'LEDGER',     tip: 'Ledger' },
    you:       { x: 36,  y: 168, r: 11, c: 'cyan',   ic: 'i-user',     lbl: 'YOU',        tip: 'You' },
    brain:     { x: 136, y: 140, r: 19, c: 'accent', ic: 'i-brain',    lbl: 'BRAIN',      tip: 'Brain' },
    model:     { x: 226, y: 96,  r: 13, c: 'soft',   ic: 'i-sparkle',  lbl: 'MODEL',      tip: 'Model' },
    tools:     { x: 234, y: 178, r: 11, c: 'warn',   ic: 'i-terminal', lbl: 'TOOLS',      tip: 'Tools' },
    bp:        { x: 306, y: 202, r: 10, c: 'purple', ic: 'i-tool',     lbl: 'BUILDPRINT', tip: 'Buildprint' },
    bubble:    { x: 348, y: 152, r: 10, c: 'good',   ic: 'i-grid',     lbl: 'BUBBLE',     tip: 'Bubble' },
  };
  const EDGES = [
    { id: 'you-brain',       a: 'you',       b: 'brain',   c: 'accent', s: +1, dots: 2 },
    { id: 'brain-model',     a: 'brain',     b: 'model',   c: 'soft',   s: -1, dots: 2 },
    { id: 'model-tools',     a: 'model',     b: 'tools',   c: 'warn',   s: +1, dots: 1 },
    { id: 'tools-bp',        a: 'tools',     b: 'bp',      c: 'purple', s: -1, dots: 1 },
    { id: 'bp-bubble',       a: 'bp',        b: 'bubble',  c: 'good',   s: -1, dots: 1 },
    { id: 'playbook-brain',  a: 'playbook',  b: 'brain',   c: 'accent', s: +1, dots: 3 },
    { id: 'brain-distiller', a: 'brain',     b: 'distiller', c: 'purple', s: -1, dots: 1 },
    { id: 'distiller-ledger',a: 'distiller', b: 'ledger',  c: 'purple', s: +1, dots: 2 },
  ];
  const RECENT_MS = 30000;

  // ---- live state (updated by pings + the 3s poll) --------------------------
  const S = {
    mode: localStorage.getItem(LS_MODE) || 'closed',      // open | pill | closed
    turnLive: false, remoteTurn: false,
    model: localStorage.getItem(LS_MODEL) || '',          // last-used model id
    until: {},                                            // edgeId → ts (active while > now)
    nodePing: {},                                         // nodeId → ts of last direct activity
    lessons: null, lastApplied: null, lastLearn: null,
    pollIv: null, tickIv: null, warnT: 0,
  };
  const now = () => Date.now();
  const nice = (m) => (typeof modelNice === 'function' ? modelNice(m) : m) || '';

  // ---- CSS (tokens only; light theme dims glow like map.html decoDim) -------
  const css = document.createElement('style');
  css.textContent = `
  #lmPanel{position:fixed;width:${PANEL_W}px;z-index:260;background:var(--panel);border:1px solid var(--line2);border-radius:var(--radius-card);box-shadow:var(--shadow-dropdown);overflow:hidden;--lm-deco:1;user-select:none}
  [data-theme="light"] #lmPanel{--lm-deco:.6}
  #lmPanel .lm-head{display:flex;align-items:center;gap:8px;height:34px;padding:0 6px 0 12px;border-bottom:1px solid var(--line);cursor:grab;touch-action:none}
  #lmPanel .lm-head.drag{cursor:grabbing}
  #lmPanel .lm-live-dot{width:7px;height:7px;border-radius:50%;background:var(--text-muted);flex:0 0 7px}
  #lmPanel.live .lm-live-dot{background:var(--accent);box-shadow:0 0 8px var(--accent-glow),0 0 4px var(--accent)}
  #lmPanel .lm-ttl{font-size:10px;font-weight:700;letter-spacing:.12em;color:var(--text-primary)}
  #lmPanel .lm-sub{font-size:10.5px;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
  #lmPanel.live .lm-sub{color:var(--accent-text)}
  #lmPanel .lm-hbtn{background:none;border:none;color:var(--text-muted);width:26px;height:26px;border-radius:var(--radius-btn);cursor:pointer;font-size:12px;line-height:1;font-family:inherit;flex:0 0 auto}
  #lmPanel .lm-hbtn:hover{color:var(--text-primary);background:var(--panel2)}
  #lmPanel .lm-scene{position:relative;background:radial-gradient(circle at 36% 60%,var(--accent-tint),transparent 62%)}
  #lmPanel svg{display:block;width:100%}
  /* nodes — glow halo (radial gradient on token color) + flat token core */
  .lm-node .lm-halo{opacity:calc(.14*var(--lm-deco));transform-box:fill-box;transform-origin:center;transition:opacity var(--transition-colors)}
  .lm-node .lm-core{opacity:.5;transition:opacity var(--transition-colors)}
  .lm-node .lm-ic{color:var(--white);opacity:.55;transition:opacity var(--transition-colors)}
  [data-theme="light"] .lm-node .lm-ic{opacity:.8}
  .lm-node text{fill:var(--text-muted);font:600 7.5px Inter,-apple-system,sans-serif;letter-spacing:.09em;text-anchor:middle;transition:fill var(--transition-colors)}
  .lm-node .lm-mlbl{fill:var(--text-secondary);font:600 7px var(--mono);letter-spacing:.02em;text-transform:none}
  .lm-node.recent .lm-halo{opacity:calc(.4*var(--lm-deco))}
  .lm-node.recent .lm-core{opacity:.82}.lm-node.recent .lm-ic{opacity:.85}
  .lm-node.on .lm-halo{opacity:calc(.95*var(--lm-deco))}
  .lm-node.on .lm-core{opacity:1}.lm-node.on .lm-ic{opacity:1}
  .lm-node.on text{fill:var(--text-primary)}
  .lm-node .lm-warnring{fill:none;stroke:var(--warning);stroke-width:1.6;opacity:0;transition:opacity var(--transition-colors)}
  .lm-node.warn .lm-warnring{opacity:.95}
  .lm-node.warn .lm-halo{opacity:calc(.9*var(--lm-deco));fill:url(#lmg-warn)}
  /* brain core life — faint orbital ring (always-on idle) + electrons + 2nd halo layer (turn only) */
  .lm-orbit{fill:none;stroke:var(--accent);stroke-width:.7;opacity:calc(.18*var(--lm-deco));transform-box:fill-box;transform-origin:center}
  .lm-halo2{opacity:0;transform-box:fill-box;transform-origin:center;transition:opacity var(--transition-colors)}
  .lm-node.on .lm-halo2{opacity:calc(.55*var(--lm-deco))}
  .lm-elec{fill:var(--accent);r:1.4;opacity:0;offset-rotate:0deg;filter:drop-shadow(0 0 2.5px var(--accent));transition:opacity var(--transition-colors)}
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
  .lm-dot{fill:var(--ec);r:2.1;filter:drop-shadow(0 0 3px var(--ec));offset-rotate:0deg}
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
  }
  @media (prefers-reduced-motion: reduce){
    .lm-dot,.lm-eflow,.lm-elec,.lm-spin,.lm-ripple,.lm-halo2,.lm-orbit{display:none}
    #lmPanel *{transition:none!important}
  }
  @keyframes lmTravel{from{offset-distance:0%}to{offset-distance:100%}}
  @keyframes lmFlow{to{stroke-dashoffset:-18}}
  @keyframes lmBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.16)}}
  @keyframes lmIdleBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
  @keyframes lmOrbit{to{transform:rotate(360deg)}}
  @keyframes lmSpin{to{transform:rotate(360deg)}}
  @keyframes lmRipple{from{r:var(--r0);opacity:calc(.9*var(--lm-deco))}to{r:var(--r1);opacity:0}}
  @keyframes lmRippleBig{from{r:var(--r0);opacity:calc(.95*var(--lm-deco))}to{r:var(--r1);opacity:0}}
  @keyframes lmFlick{0%,100%{opacity:calc(.6*var(--lm-deco))}12%,44%,76%{opacity:.04}28%,60%,92%{opacity:calc(.95*var(--lm-deco))}}
  /* tooltip */
  #lmTip{position:absolute;pointer-events:none;background:var(--elev);border:1px solid var(--line2);border-radius:var(--radius-btn);box-shadow:var(--shadow-dropdown);padding:6px 10px;font-size:11px;color:var(--text-primary);display:none;max-width:220px;z-index:2}
  #lmTip .t2{color:var(--text-muted);font-size:10px;margin-top:1px}
  /* collapsed pill */
  #lmPill{position:fixed;z-index:260;display:flex;align-items:center;gap:7px;height:${PILL_H}px;padding:0 12px;background:var(--panel);border:1px solid var(--line2);border-radius:var(--radius-pill);box-shadow:var(--shadow-dropdown);cursor:pointer;color:var(--text-secondary)}
  #lmPill:hover{border-color:var(--line3);color:var(--text-primary)}
  #lmPill svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
  #lmPill .lm-pdot{width:7px;height:7px;border-radius:50%;background:var(--text-muted)}
  #lmPill.live .lm-pdot{background:var(--accent);box-shadow:0 0 7px var(--accent-glow),0 0 4px var(--accent)}
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
    return `<g class="lm-node" data-n="${id}" transform="translate(${n.x},${n.y})" style="--ec:var(${TOK[n.c]})">
      <circle class="lm-halo" r="${(n.r * 2.7).toFixed(1)}" fill="url(#lmg-${n.c})"/>${under}
      <circle class="lm-warnring" r="${n.r + 4}"/>
      <circle class="lm-core" r="${n.r}" fill="var(${TOK[n.c]})"/>
      <use class="lm-ic" href="#${n.ic}" x="${-ir / 2}" y="${-ir / 2}" width="${ir}" height="${ir}" fill="none" stroke="currentColor" stroke-width="2"/>${over}
      <text y="${n.r + 12}">${n.lbl}</text>${id === 'model' ? `<text class="lm-mlbl" y="${n.r + 21}" id="lmModelLbl"></text>` : ''}
    </g>`;
  }).join('');
  panel.innerHTML = `
    <div class="lm-head" id="lmHead">
      <span class="lm-live-dot"></span><span class="lm-ttl">LIVE SYSTEM MAP</span>
      <span class="lm-sub" id="lmStatus">idle</span>
      <button class="lm-hbtn" id="lmMin" title="Collapse to pill">–</button>
      <button class="lm-hbtn" id="lmX" title="Close">✕</button>
    </div>
    <div class="lm-scene">
      <svg viewBox="0 0 380 236" aria-label="Live system map">
        <defs>${grads}<filter id="lmBlur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
        <g id="lmEdges">${edgesSvg}</g><g id="lmNodes">${nodesSvg}</g>
      </svg>
      <div id="lmTip"></div>
    </div>`;
  document.body.appendChild(panel);
  const pill = document.createElement('button'); pill.id = 'lmPill'; pill.style.display = 'none'; pill.title = 'Live system map';
  pill.innerHTML = `<svg viewBox="0 0 24 24"><use href="#i-brain"/></svg><span class="lm-pdot"></span>`;
  document.body.appendChild(pill);
  const $e = {}; EDGES.forEach((e) => { $e[e.id] = panel.querySelector(`[data-e="${e.id}"]`); });
  const $n = {}; Object.keys(NODES).forEach((id) => { $n[id] = panel.querySelector(`[data-n="${id}"]`); });
  const statusEl = panel.querySelector('#lmStatus'), tipEl = panel.querySelector('#lmTip'), modelLbl = panel.querySelector('#lmModelLbl');

  // ---- position: persist + clamp on-screen -----------------------------------
  function loadPos() { try { return JSON.parse(localStorage.getItem(LS_POS)) || null; } catch { return null; } }
  function clampPos(p, w, h) {
    return { x: Math.min(Math.max(8, p.x), Math.max(8, innerWidth - w - 8)), y: Math.min(Math.max(8, p.y), Math.max(8, innerHeight - h - 8)) };
  }
  function place() {
    const w = S.mode === 'pill' ? PILL_W : PANEL_W, h = S.mode === 'pill' ? PILL_H : PANEL_H;
    const p = clampPos(loadPos() || { x: innerWidth - PANEL_W - 24, y: innerHeight - PANEL_H - 84 }, w, h);
    const el = S.mode === 'pill' ? pill : panel;
    el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
  }
  addEventListener('resize', () => { if (S.mode !== 'closed') place(); });

  // drag by header (buttons excluded)
  (function () {
    const head = panel.querySelector('#lmHead'); let drag = null;
    head.addEventListener('pointerdown', (ev) => {
      if (ev.target.closest('button')) return;
      drag = { dx: ev.clientX - panel.offsetLeft, dy: ev.clientY - panel.offsetTop };
      head.classList.add('drag'); head.setPointerCapture(ev.pointerId); ev.preventDefault();
    });
    head.addEventListener('pointermove', (ev) => {
      if (!drag) return;
      const p = clampPos({ x: ev.clientX - drag.dx, y: ev.clientY - drag.dy }, PANEL_W, PANEL_H);
      panel.style.left = p.x + 'px'; panel.style.top = p.y + 'px';
    });
    head.addEventListener('pointerup', (ev) => {
      if (!drag) return; drag = null; head.classList.remove('drag');
      try { head.releasePointerCapture(ev.pointerId); } catch {}
      localStorage.setItem(LS_POS, JSON.stringify({ x: panel.offsetLeft, y: panel.offsetTop }));
    });
  })();

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
  function ping(kind, arg) {
    const t = now();
    if (kind === 'turn-start') {
      S.turnLive = true; S.nodePing.you = t; S.nodePing.brain = t; S.nodePing.model = t;
      // first activity auto-reveals the map — but an explicit user choice (any stored mode,
      // incl. 'closed' after the user closed it) always wins
      if (S.mode !== 'open' && !localStorage.getItem(LS_MODE)) setMode('open');
      ripple('brain');
    }
    else if (kind === 'turn-end') { S.turnLive = false; S.remoteTurn = false; TURN_EDGES.forEach((id) => { S.until[id] = t; }); }
    else if (kind === 'tool') { bump('model-tools', 3000); S.nodePing.tools = t; ripple('tools'); }
    else if (kind === 'bp-step') { bump('model-tools', 3000); bump('tools-bp', 3400); bump('bp-bubble', 3400); S.nodePing.bp = t; S.nodePing.bubble = t; ripple('bp'); ripple('bubble'); }
    else if (kind === 'model') { if (arg) { S.model = arg; localStorage.setItem(LS_MODEL, arg); } }
    else if (kind === 'playbook-applied') { bump('playbook-brain', 3400); S.nodePing.playbook = t; S.lastApplied = t; ripple('playbook'); }
    else if (kind === 'learning-saved') { bump('brain-distiller', 3400); bump('distiller-ledger', 3400); S.nodePing.distiller = t; S.nodePing.ledger = t; ripple('ledger'); }
    else if (kind === 'recurrence') { S.warnT = t; S.nodePing.playbook = t; shockwave(); }
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
  // one comet per active edge: lead dot + 3 trailing circles of decreasing size/opacity,
  // trailing via negative animation-delay on the same motion path (seamless from cycle 1)
  function syncDots(e, on) {
    const g = $e[e.id];
    const have = g.querySelectorAll('.lm-dot').length;
    if (on && !have) {
      if (RM.matches) return;                                    // reduced motion: no comets at all
      if (panel.querySelectorAll('.lm-dot').length >= 20) return; // global cap (≤5 comets at once)
      const mk = (cls, r, op, delay) => {
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('class', cls);
        c.style.cssText = `--ec:var(${TOK[e.c]});offset-path:path('${e.d}');r:${r}px;opacity:${op};animation-delay:${delay}s`;
        g.appendChild(c);
      };
      mk('lm-dot', 2.2, 1, 0);
      for (let i = 1; i <= 3; i++) mk('lm-dot lm-comet', 2.2 - i * 0.45, 1 - i * 0.26, -(1.6 - i * 0.085));
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
      const on = !!nodeOn[id] || (S.turnLive && (id === 'you' || id === 'brain' || id === 'model'));
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
    render();
  }
  function startLoops() {
    if (S.pollIv) return;
    poll();
    S.pollIv = setInterval(poll, 3000);
    S.tickIv = setInterval(render, 1000);
    if (S.lessons === null) fetch('/api/playbook').then((r) => r.json()).then((j) => { S.lessons = (j.lessons || []).filter((l) => l.status === 'active').length; }).catch(() => {});
  }
  function stopLoops() { clearInterval(S.pollIv); clearInterval(S.tickIv); S.pollIv = S.tickIv = null; }

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
      const id = g.dataset.n, n = NODES[id];
      tipEl.innerHTML = `<b>${n.tip}</b><div class="t2">${nodeStatus(id)}</div>`;
      const sc = panel.querySelector('.lm-scene').getBoundingClientRect();
      const px = n.x / 380 * sc.width, py = n.y / 236 * sc.height;
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
  };
  if (S.mode !== 'closed') setMode(S.mode);   // restore across reloads
})();
