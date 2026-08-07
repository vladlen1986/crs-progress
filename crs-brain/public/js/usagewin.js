/* Live usage window — a floating, draggable, closable panel showing the context
 * window and the plan limits, refreshing itself while it is open.
 *
 * Where the numbers come from, honestly:
 *  - Plan limits (5-hour, weekly) come from data/usage.json, which Claude Code's
 *    statusline hook writes every time an INTERACTIVE claude session renders.
 *    GET /api/usage is a plain file read, so polling it is free — but the file
 *    only advances when Claude Code actually renders. That is why the footer
 *    always states how old the reading is instead of implying it is real-time.
 *  - The context row is THIS CHAT's, from /api/usage/chat — the newest turn's
 *    input tokens (whole replayed conversation + cache reads) against that
 *    model's window, and live from the stream while a turn runs. usage.json's own
 *    context_window belongs to whatever interactive session last rendered a
 *    statusline, which is a different conversation entirely.
 *  - Refresh (and the opt-in 3-minute auto) calls POST /api/usage/populate, which
 *    drives one tiny HAIKU turn to force a statusline render. That is the only
 *    mechanism that exists — Claude Code has no usage command, and headless
 *    `claude -p` turns never fire the statusline hook. Auto is off by default,
 *    pauses on a hidden tab, and never fires mid-turn.
 *
 * Conventions copied from js/livemap.js: fixed panel at z-index 260, pointer-
 * capture drag, position + open state in localStorage, header button toggles it.
 */
(function () {
  if (window.USAGEWIN) return;
  const LS_POS = 'crs-usagewin-pos', LS_OPEN = 'crs-usagewin-open', LS_AUTO = 'crs-usagewin-auto';
  const W = 372;
  const $ = (id) => document.getElementById(id);

  const css = document.createElement('style');
  css.textContent = `
  #uwPanel{position:fixed;z-index:260;width:${W}px;background:var(--panel);border:1px solid var(--line2);border-radius:var(--radius-card);box-shadow:var(--shadow-dropdown);overflow:hidden;user-select:none;cursor:grab;font-size:12px}
  #uwPanel.dragging{cursor:grabbing}
  .uw-scope .uw-head{display:flex;align-items:center;gap:8px;height:30px;padding:0 6px 0 12px;border-bottom:1px solid var(--cc-border-divider)}
  .uw-scope .uw-ttl{font-size:12px;font-weight:600;color:var(--text-primary);white-space:nowrap}
  .uw-scope .uw-sub{flex:1;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .uw-scope .uw-hbtn{background:none;border:none;color:var(--text-muted);width:26px;height:26px;border-radius:var(--radius-btn);cursor:pointer;font-size:12px;line-height:1;font-family:inherit;flex:0 0 auto}
  .uw-scope .uw-hbtn:hover{color:var(--text-primary);background:var(--panel2)}
  .uw-scope .uw-body{padding:12px 13px}
  .uw-scope .uw-row{margin-bottom:13px}
  .uw-scope .uw-row:last-child{margin-bottom:0}
  .uw-scope .uw-lbl{display:flex;align-items:baseline;gap:8px;margin-bottom:6px}
  .uw-scope .uw-name{color:var(--text-primary);font-weight:600}
  .uw-scope .uw-meta{margin-left:auto;color:var(--text-muted);font-variant-numeric:tabular-nums}
  .uw-scope .uw-pct{color:var(--text-primary);font-weight:600;font-variant-numeric:tabular-nums;min-width:34px;text-align:right}
  .uw-scope .uw-bar{height:7px;border-radius:8px;background:var(--veil,rgba(255,255,255,.07));overflow:hidden}
  .uw-scope .uw-bar span{display:block;height:100%;border-radius:8px;transition:width .5s ease}
  .uw-scope .uw-sec{color:var(--text-muted);margin:14px 0 9px;padding-top:12px;border-top:1px solid var(--cc-border-divider)}
  .uw-scope .uw-foot{display:flex;align-items:center;gap:8px;color:var(--text-muted);margin-top:13px;padding-top:11px;border-top:1px solid var(--cc-border-divider)}
  .uw-scope .uw-live{width:6px;height:6px;border-radius:50%;background:var(--good);flex:0 0 6px}
  .uw-scope .uw-live.stale{background:var(--muted)}
  .uw-scope .uw-refresh{background:none;border:1px solid var(--line2);color:var(--text-secondary);border-radius:var(--radius-btn);height:22px;padding:0 9px;font-size:12px;font-family:inherit;cursor:pointer}
  .uw-scope .uw-refresh:hover:not(:disabled){color:var(--text-primary);border-color:var(--line3)}
  .uw-scope .uw-refresh:disabled{opacity:.5;cursor:default}
  .uw-scope .uw-empty{color:var(--text-muted);line-height:1.5}
  .uw-scope .uw-cap{margin-top:5px;font-size:12px;color:var(--cc-text-faint)}
  .uw-scope .uw-auto{display:inline-flex;align-items:center;gap:5px;color:var(--text-muted);cursor:pointer;user-select:none;margin-left:auto}
  .uw-scope .uw-auto input{margin:0}
  .uw-scope .uw-refresh{margin-left:8px}
  @media (max-width:900px){#uwPanel,#usageWinBtn{display:none!important}}`;
  document.head.appendChild(css);

  const panel = document.createElement('div');
  panel.id = 'uwPanel';
  panel.className = 'uw-scope';
  panel.style.display = 'none';
  panel.innerHTML = `<div class="uw-head">
      <span class="uw-ttl">Usage</span><span class="uw-sub" id="uwSub"></span>
      <button class="uw-hbtn" id="uwX" title="Close">✕</button>
    </div><div class="uw-body" id="uwBody"></div>`;
  document.body.appendChild(panel);

  // ---- placement + drag (livemap's pointer-capture pattern) -----------------
  const clamp = (p, w, h) => ({
    x: Math.min(Math.max(8, p.x), Math.max(8, innerWidth - w - 8)),
    y: Math.min(Math.max(8, p.y), Math.max(8, innerHeight - h - 8)),
  });
  const loadPos = () => { try { return JSON.parse(localStorage.getItem(LS_POS)) || null; } catch { return null; } };
  function place() {
    const h = panel.offsetHeight || 260;
    const p = clamp(loadPos() || { x: innerWidth - W - 24, y: 60 }, W, h);
    panel.style.left = p.x + 'px'; panel.style.top = p.y + 'px';
  }
  addEventListener('resize', () => { if (panel.style.display !== 'none') place(); });
  let drag = null;
  panel.addEventListener('pointerdown', (ev) => {
    // Never start a window drag from an interactive control: the drag calls
    // preventDefault(), which swallows the click a checkbox/label needs to
    // toggle. Missing `input,label` here is why the "auto" box could not be
    // ticked at all — clicking it just dragged the panel. (2026-08-07)
    if (ev.target.closest('button,a,input,label,select,textarea')) return;
    drag = { dx: ev.clientX - panel.offsetLeft, dy: ev.clientY - panel.offsetTop };
    panel.classList.add('dragging'); panel.setPointerCapture(ev.pointerId); ev.preventDefault();
  });
  panel.addEventListener('pointermove', (ev) => {
    if (!drag) return;
    const p = clamp({ x: ev.clientX - drag.dx, y: ev.clientY - drag.dy }, W, panel.offsetHeight);
    panel.style.left = p.x + 'px'; panel.style.top = p.y + 'px';
  });
  panel.addEventListener('pointerup', (ev) => {
    if (!drag) return; drag = null; panel.classList.remove('dragging');
    try { panel.releasePointerCapture(ev.pointerId); } catch {}
    localStorage.setItem(LS_POS, JSON.stringify({ x: panel.offsetLeft, y: panel.offsetTop }));
  });

  // ---- rendering ------------------------------------------------------------
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = (n) => n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n);
  function barColor(p) { return p >= 90 ? 'var(--danger)' : p >= 75 ? 'var(--warn)' : 'var(--accent-text, #6DA7EC)'; }
  function ago(ms) {
    if (!ms) return 'never';
    const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
    if (s < 60) return s + 's ago';
    if (s < 3600) return Math.round(s / 60) + 'm ago';
    if (s < 86400) return Math.round(s / 3600) + 'h ago';
    return Math.round(s / 86400) + 'd ago';
  }
  function resetIn(sec) {
    if (!sec) return '';
    const d = sec * 1000 - Date.now();
    if (d <= 0) return 'resetting';
    const h = Math.floor(d / 3600000), m = Math.round((d % 3600000) / 60000);
    if (h >= 24) return 'Resets ' + new Date(sec * 1000).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' });
    return 'Resets in ' + (h ? h + ' hr ' : '') + m + ' min';
  }
  function row(name, meta, pct) {
    const p = Math.max(0, Math.min(100, Math.round(pct)));
    return `<div class="uw-row"><div class="uw-lbl"><span class="uw-name">${esc(name)}</span>`
      + `<span class="uw-meta">${esc(meta)}</span><span class="uw-pct">${p}%</span></div>`
      + `<div class="uw-bar"><span style="width:${p}%;background:${barColor(p)}"></span></div></div>`;
  }

  let busy = false, chatCtx = null, autoTimer = null, lastData = null;

  // Pretty name for the model the BRAIN is running. The old header showed
  // usage.json's `model`, which is whatever INTERACTIVE Claude Code session last
  // rendered a statusline — a different session on a different model, which is
  // why it read "Opus 4.7 (1M context)" while the app was on Sonnet 5.
  // index.html declares `state` with let at the top level of its inline script,
  // which makes it a LEXICAL global — never a property of window. Reading
  // window.state silently yields undefined, so probe the bare identifier.
  const curChat = () => { try { return state.chatId || ''; } catch (e) { return ''; } };
  const liveTurn = () => { try { return !!(state.live && !state.live.done); } catch (e) { return false; } };
  function brainModel() {
    try {
      if (typeof genModel === 'string' && genModel) return modelNice(genModel);
      if (chatCtx && chatCtx.model) return modelNice(chatCtx.model);
      const sel = document.getElementById('modelSel');
      if (sel) { const o = sel.querySelector('option[value=auto]'); if (sel.value === 'auto' && o && /·/.test(o.textContent)) return o.textContent.split('·')[1].trim(); if (sel.value !== 'auto') return modelNice(sel.value); }
    } catch (e) {}
    return '';
  }
  // Every window the payload carries, not a hardcoded pair. Claude Code exposes
  // five_hour and seven_day today; if it ever adds per-model weekly buckets
  // (seven_day_opus, …) they appear here automatically instead of being dropped.
  const WINDOW_NAMES = { five_hour: '5-hour limit', seven_day: 'Weekly · all models' };
  function windowLabel(key) {
    if (WINDOW_NAMES[key]) return WINDOW_NAMES[key];
    const m = /^seven_day_(.+)$/.exec(key);
    if (m) return 'Weekly · ' + m[1].replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  }

  // The body is built as a STRING and painted into every mounted surface (the
  // window itself + the account popover), so the two cards are identical by
  // construction rather than by two implementations agreeing. Controls are
  // addressed by CLASS, never id — the same markup exists in more than one place
  // at a time and duplicate ids would break the handler wiring. (2026-08-07)
  function bodyHtml(d, enabled) {
    if (!enabled) return '<div class="uw-empty">Usage tracking is off. Turn it on in Settings → Usage to install the statusline hook that reports your plan limits.</div>';
    let h = '';
    // ---- context window: THIS chat, not the statusline's session -------------
    const live = liveTurn();
    const liveIn = (typeof genIn === 'number' && genIn) ? genIn : 0;
    if (chatCtx && (chatCtx.used || liveIn)) {
      const used = live && liveIn ? liveIn : chatCtx.used;
      const size = chatCtx.size || 1000000;
      h += row('Context window', num(used) + ' / ' + num(size), Math.min(100, used / size * 100));
      h += '<div class="uw-cap">this chat · ' + (chatCtx.turns || 0) + ' turn' + (chatCtx.turns === 1 ? '' : 's')
        + (live && liveIn ? ' · live' : chatCtx.estimated ? ' · estimated from the transcript' : '') + '</div>';
    } else {
      h += '<div class="uw-empty" style="margin-bottom:12px">No turns in this chat yet — the context bar fills once you send something.</div>';
    }
    // ---- plan limits ---------------------------------------------------------
    const rl = (d && d.rate_limits) || {};
    const keys = Object.keys(rl).filter((k) => rl[k] && typeof rl[k].used_percentage === 'number');
    if (keys.length) {
      h += '<div class="uw-sec">Plan usage limits</div>';
      keys.sort((a, b) => (a === 'five_hour' ? -1 : b === 'five_hour' ? 1 : a.localeCompare(b)));
      for (const k of keys) h += row(windowLabel(k), resetIn(rl[k].resets_at), rl[k].used_percentage || 0);
    } else {
      h += '<div class="uw-sec">Plan usage limits</div><div class="uw-empty">No reading yet — press Refresh.</div>';
    }
    const stale = !d || !d.rate_limits_at || (Date.now() - d.rate_limits_at) > 6 * 60 * 1000;
    h += '<div class="uw-foot"><span class="uw-live' + (stale ? ' stale' : '') + '"></span>'
      + '<span>' + (busy ? 'Refreshing…' : 'Limits read ' + esc(ago(d && (d.rate_limits_at || d.at)))) + '</span>'
      + '<label class="uw-auto" title="Refresh the plan limits every 3 minutes — and immediately when switched on if the reading is stale. Each refresh runs one tiny Haiku turn, the only way to make Claude Code emit a fresh reading.">'
      + '<input type="checkbox" class="uw-auto-cb"' + (autoOn() ? ' checked' : '') + '> auto</label>'
      + '<button class="uw-refresh"' + (busy ? ' disabled' : '') + '>Refresh</button></div>';
    return h;
  }
  function wireBody(root) {
    const rb = root.querySelector('.uw-refresh');
    if (rb) rb.onclick = () => populate();
    const ab = root.querySelector('.uw-auto-cb');
    if (ab) ab.onchange = () => { localStorage.setItem(LS_AUTO, ab.checked ? '1' : '0'); armAuto(); paintAll(lastData, lastEnabled); };
  }
  // Extra surfaces (the account popover) register here and get the identical body.
  const mounts = new Set();
  let lastEnabled = true;
  function paintAll(d, enabled) {
    const h = bodyHtml(d, enabled);
    const body = $('uwBody');
    if (body && panel.style.display !== 'none') { body.innerHTML = h; wireBody(body); }
    const sub = $('uwSub');
    if (sub) sub.textContent = enabled ? brainModel() : 'off';
    for (const el of [...mounts]) {
      if (!el.isConnected) { mounts.delete(el); continue; }
      el.innerHTML = h; wireBody(el);
    }
  }
  function render(d, enabled) { lastEnabled = enabled; paintAll(d, enabled); }

  // The ONLY way to get a fresh rate-limit reading: Claude Code's statusline hook
  // fires in interactive sessions after an API response, so the server drives one
  // tiny Haiku turn. That costs a fraction of a cent, which is what makes putting
  // it on a timer defensible at all — it is still opt-in.
  async function populate() {
    if (busy) return;
    busy = true; await tick();
    try { await fetch('/api/usage/populate', { method: 'POST' }); } catch (e) {}
    busy = false; await tick();
  }
  const autoOn = () => localStorage.getItem(LS_AUTO) === '1';
  const AUTO_MS = 3 * 60 * 1000;
  function armAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
    if (!autoOn() || !anyLive()) return;
    // Don't make the user wait a full interval to see auto do anything: if the
    // reading on screen is already older than one interval when auto is switched
    // on (or the window is reopened), refresh right now. Otherwise ticking the
    // box next to a 25-minute-old number appears to do nothing for 3 minutes.
    const readAt = lastData && (lastData.rate_limits_at || lastData.at);
    if (!liveTurn() && !document.hidden && (!readAt || Date.now() - readAt > AUTO_MS)) populate();
    autoTimer = setInterval(() => {
      if (!anyLive()) return;
      if (document.hidden) return;                       // don't burn turns on a hidden tab
      if (liveTurn()) return;   // never mid-turn
      populate();
    }, AUTO_MS);
  }

  // Live whenever ANY surface is showing — the window, or the account popover.
  const anyLive = () => panel.style.display !== 'none' || [...mounts].some((el) => el.isConnected && el.offsetParent !== null);
  async function tick() {
    if (!anyLive()) return;
    try {
      const id = curChat();
      const [r, c] = await Promise.all([
        fetch('/api/usage').then((x) => x.json()),
        id ? fetch('/api/usage/chat?id=' + encodeURIComponent(id)).then((x) => x.json()).catch(() => null) : Promise.resolve(null),
      ]);
      chatCtx = (c && c.ok) ? c : null;
      lastData = r.data;
      render(r.data, r.enabled);
    } catch (e) { /* server down — keep the last paint */ }
  }
  // Poll while OPEN only. /api/usage and /api/usage/chat are both plain file
  // reads, so this is free; 4s keeps the context row close to a running turn.
  let timer = null;
  function startLoop() { stopLoop(); tick(); timer = setInterval(tick, 4000); }
  function stopLoop() { if (timer) clearInterval(timer); timer = null; }

  function setOpen(on) {
    panel.style.display = on ? 'block' : 'none';
    localStorage.setItem(LS_OPEN, on ? '1' : '0');
    const btn = $('usageWinBtn');
    if (btn) btn.classList.toggle('on', on);
    if (on) { place(); startLoop(); armAuto(); requestAnimationFrame(place); } else { stopLoop(); if (autoTimer) clearInterval(autoTimer); autoTimer = null; }
  }
  panel.querySelector('#uwX').onclick = () => setOpen(false);

  window.USAGEWIN = {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: (force) => setOpen(force === true ? true : panel.style.display === 'none'),
    isOpen: () => panel.style.display !== 'none',
    refresh: tick,
    // Render the SAME body into another container (the account popover) and keep
    // it live: registering starts the shared poll loop even when the window is closed.
    mount(el) {
      if (!el) return;
      mounts.add(el);
      el.classList.add('uw-scope');
      if (lastData !== null) { el.innerHTML = bodyHtml(lastData, lastEnabled); wireBody(el); }
      startLoop(); armAuto();
    },
    // ---- shared renderers (single source of truth for limit visuals) --------
    // The account popover shows the SAME numbers in the same place in the UI;
    // when it drew its own bars with its own labels the two drifted — different
    // colours, different names, and the popover silently missed per-model
    // windows because it hardcoded five_hour/seven_day. Both surfaces now call
    // these, inside a `.uw-scope` container. (2026-08-07)
    row,                 // row(name, meta, pct) -> html
    windowLabel,         // 'seven_day_fable' -> 'Weekly · Fable'
    resetIn,             // epoch seconds -> 'Resets in 22 hr 48 min'
    ago,                 // epoch ms -> '28m ago'
    // Every rate-limit window the payload carries, five_hour first.
    limitsHtml(rl) {
      const keys = Object.keys(rl || {}).filter((k) => rl[k] && typeof rl[k].used_percentage === 'number');
      if (!keys.length) return '';
      keys.sort((a, b) => (a === 'five_hour' ? -1 : b === 'five_hour' ? 1 : a.localeCompare(b)));
      return keys.map((k) => row(windowLabel(k), resetIn(rl[k].resets_at), rl[k].used_percentage || 0)).join('');
    },
  };
  if (localStorage.getItem(LS_OPEN) === '1') setOpen(true);
})();
