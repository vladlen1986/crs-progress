/* Live usage window — a floating, draggable, closable panel showing the context
 * window and the plan limits, refreshing itself while it is open.
 *
 * Where the numbers come from, honestly:
 *  - Plan limits (5-hour, weekly) come from data/usage.json, which Claude Code's
 *    statusline hook writes every time an INTERACTIVE claude session renders.
 *    GET /api/usage is a plain file read, so polling it is free — but the file
 *    only advances when Claude Code actually renders. That is why the footer
 *    always states how old the reading is instead of implying it is real-time.
 *  - The context window row goes live the moment THIS app is running a turn: the
 *    stream reports token counts per message, so during a turn we show the real
 *    figure and fall back to the last statusline reading when idle.
 *  - POST /api/usage/populate is NEVER on a timer: it drives a real interactive
 *    claude session to force a fresh statusline, i.e. it spends a real turn. It
 *    stays a manual button.
 *
 * Conventions copied from js/livemap.js: fixed panel at z-index 260, pointer-
 * capture drag, position + open state in localStorage, header button toggles it.
 */
(function () {
  if (window.USAGEWIN) return;
  const LS_POS = 'crs-usagewin-pos', LS_OPEN = 'crs-usagewin-open';
  const W = 372;
  const $ = (id) => document.getElementById(id);

  const css = document.createElement('style');
  css.textContent = `
  #uwPanel{position:fixed;z-index:260;width:${W}px;background:var(--panel);border:1px solid var(--line2);border-radius:var(--radius-card);box-shadow:var(--shadow-dropdown);overflow:hidden;user-select:none;cursor:grab;font-size:12px}
  #uwPanel.dragging{cursor:grabbing}
  #uwPanel .uw-head{display:flex;align-items:center;gap:8px;height:30px;padding:0 6px 0 12px;border-bottom:1px solid var(--cc-border-divider)}
  #uwPanel .uw-ttl{font-size:12px;font-weight:600;color:var(--text-primary);white-space:nowrap}
  #uwPanel .uw-sub{flex:1;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  #uwPanel .uw-hbtn{background:none;border:none;color:var(--text-muted);width:26px;height:26px;border-radius:var(--radius-btn);cursor:pointer;font-size:12px;line-height:1;font-family:inherit;flex:0 0 auto}
  #uwPanel .uw-hbtn:hover{color:var(--text-primary);background:var(--panel2)}
  #uwPanel .uw-body{padding:12px 13px}
  #uwPanel .uw-row{margin-bottom:13px}
  #uwPanel .uw-row:last-child{margin-bottom:0}
  #uwPanel .uw-lbl{display:flex;align-items:baseline;gap:8px;margin-bottom:6px}
  #uwPanel .uw-name{color:var(--text-primary);font-weight:600}
  #uwPanel .uw-meta{margin-left:auto;color:var(--text-muted);font-variant-numeric:tabular-nums}
  #uwPanel .uw-pct{color:var(--text-primary);font-weight:600;font-variant-numeric:tabular-nums;min-width:34px;text-align:right}
  #uwPanel .uw-bar{height:7px;border-radius:8px;background:var(--veil,rgba(255,255,255,.07));overflow:hidden}
  #uwPanel .uw-bar span{display:block;height:100%;border-radius:8px;transition:width .5s ease}
  #uwPanel .uw-sec{color:var(--text-muted);margin:14px 0 9px;padding-top:12px;border-top:1px solid var(--cc-border-divider)}
  #uwPanel .uw-foot{display:flex;align-items:center;gap:8px;color:var(--text-muted);margin-top:13px;padding-top:11px;border-top:1px solid var(--cc-border-divider)}
  #uwPanel .uw-live{width:6px;height:6px;border-radius:50%;background:var(--good);flex:0 0 6px}
  #uwPanel .uw-live.stale{background:var(--muted)}
  #uwPanel .uw-refresh{margin-left:auto;background:none;border:1px solid var(--line2);color:var(--text-secondary);border-radius:var(--radius-btn);height:22px;padding:0 9px;font-size:12px;font-family:inherit;cursor:pointer}
  #uwPanel .uw-refresh:hover:not(:disabled){color:var(--text-primary);border-color:var(--line3)}
  #uwPanel .uw-refresh:disabled{opacity:.5;cursor:default}
  #uwPanel .uw-empty{color:var(--text-muted);line-height:1.5}
  @media (max-width:900px){#uwPanel,#usageWinBtn{display:none!important}}`;
  document.head.appendChild(css);

  const panel = document.createElement('div');
  panel.id = 'uwPanel';
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
    if (ev.target.closest('button,a')) return;
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

  let busy = false;
  function render(d, enabled) {
    const body = $('uwBody'), sub = $('uwSub');
    if (!enabled) {
      body.innerHTML = '<div class="uw-empty">Usage tracking is off. Turn it on in Settings → Usage to install the statusline hook that reports your plan limits.</div>';
      sub.textContent = 'off'; return;
    }
    if (!d) { body.innerHTML = '<div class="uw-empty">No reading yet. Use Claude Code once, or press Refresh.</div>'; sub.textContent = ''; return; }
    let h = '';
    // context window — live during a turn, last statusline reading when idle
    const live = window.state && state.live && !state.live.done;
    const cw = d.context_window || {};
    if (cw.context_window_size) {
      const used = live && typeof genIn === 'number' && genIn
        ? genIn
        : (cw.current_usage
          ? (cw.current_usage.input_tokens || 0) + (cw.current_usage.cache_read_input_tokens || 0) + (cw.current_usage.cache_creation_input_tokens || 0)
          : Math.round(cw.context_window_size * (cw.used_percentage || 0) / 100));
      const pct = Math.min(100, used / cw.context_window_size * 100);
      h += row('Context window', num(used) + ' / ' + num(cw.context_window_size), pct);
    }
    const rl = d.rate_limits || {};
    if (rl.five_hour || rl.seven_day) {
      h += '<div class="uw-sec">Plan usage limits</div>';
      if (rl.five_hour) h += row('5-hour limit', resetIn(rl.five_hour.resets_at), rl.five_hour.used_percentage || 0);
      if (rl.seven_day) h += row('Weekly · all models', resetIn(rl.seven_day.resets_at), rl.seven_day.used_percentage || 0);
    }
    // Claude Code's statusline exposes exactly these two windows — there is no
    // per-model weekly bucket in the payload, so none is invented here.
    const stale = !d.rate_limits_at || (Date.now() - d.rate_limits_at) > 30 * 60 * 1000;
    h += `<div class="uw-foot"><span class="uw-live${stale ? ' stale' : ''}"></span>`
      + `<span>Limits read ${esc(ago(d.rate_limits_at || d.at))}</span>`
      + `<button class="uw-refresh" id="uwRefresh"${busy ? ' disabled' : ''} title="Drives one real Claude Code turn to force a fresh statusline reading">${busy ? 'Fetching…' : 'Refresh'}</button></div>`;
    body.innerHTML = h;
    sub.textContent = d.model || '';
    const rb = $('uwRefresh');
    if (rb) rb.onclick = async () => {
      busy = true; render(d, enabled);
      try { await fetch('/api/usage/populate', { method: 'POST' }); } catch {}
      busy = false; await tick();
    };
  }

  async function tick() {
    if (panel.style.display === 'none') return;
    try {
      const r = await fetch('/api/usage');
      const j = await r.json();
      render(j.data, j.enabled);
    } catch { /* server down — keep the last paint */ }
  }

  // Poll while OPEN only (the endpoint is a file read, so this is free), and
  // repaint faster during a turn so the context-window row tracks it live.
  let timer = null;
  function startLoop() { stopLoop(); tick(); timer = setInterval(tick, 10000); }
  function stopLoop() { if (timer) clearInterval(timer); timer = null; }

  function setOpen(on) {
    panel.style.display = on ? 'block' : 'none';
    localStorage.setItem(LS_OPEN, on ? '1' : '0');
    const btn = $('usageWinBtn');
    if (btn) btn.classList.toggle('on', on);
    if (on) { place(); startLoop(); requestAnimationFrame(place); } else stopLoop();
  }
  panel.querySelector('#uwX').onclick = () => setOpen(false);

  window.USAGEWIN = {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: (force) => setOpen(force === true ? true : panel.style.display === 'none'),
    isOpen: () => panel.style.display !== 'none',
    refresh: tick,
  };
  if (localStorage.getItem(LS_OPEN) === '1') setOpen(true);
})();
