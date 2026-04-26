"""
Build CRS_Blueprint.html from CRS_Blueprint_Source.html.

Strategy:
1. Keep the <head> verbatim (CSS, fonts, meta)
2. Replace the sidebar nav with new module-grouped nav
3. Replace the main content with: platform pages + module containers
4. Each module container has a tab bar + tab panels
5. Add routing JS at the bottom
"""
import os
import re
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapping import PLATFORM_PAGES, MODULES, TAB_ORDER, TAB_LABELS, CATEGORY_ORDER

def extract_sections_content(html):
    """Extract each section's full HTML keyed by id."""
    pattern = r'<section class="doc-section" id="([^"]+)">'
    matches = list(re.finditer(pattern, html))
    sections = {}
    for m in matches:
        sec_id = m.group(1)
        start = m.start()
        depth = 1
        pos = m.end()
        while depth > 0 and pos < len(html):
            open_m = html.find('<section', pos)
            close_m = html.find('</section>', pos)
            if close_m == -1: break
            if open_m != -1 and open_m < close_m:
                depth += 1
                pos = open_m + len('<section')
            else:
                depth -= 1
                pos = close_m + len('</section>')
        sections[sec_id] = html[start:pos]
    return sections


def build_sidebar():
    """Build the new sidebar nav with module groups + platform pages."""
    html = ['<nav class="sidebar" id="sidebar">']
    # Top section: logo
    html.append('''  <div class="sidebar-header">
    <div class="sidebar-logo">
      <span class="sidebar-logo-text">CRS</span>
      <span class="sidebar-logo-badge">Blueprint</span>
    </div>
    <button class="sidebar-close" onclick="closeMobileSidebar()" aria-label="Close menu">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4L4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
    </button>
  </div>''')

    html.append('  <div class="sidebar-scroll">')

    # Platform pages grouped by 'group'
    platform_groups = {}
    for p in PLATFORM_PAGES:
        platform_groups.setdefault(p['group'], []).append(p)

    # Render Overview + Foundation groups as collapsible categories (all closed by default)
    for gname in ['Overview', 'Foundation']:
        if gname not in platform_groups: continue
        pages_in_group = platform_groups[gname]
        cat_slug = gname.lower().replace(' ', '-').replace('&', 'and')
        html.append(f'    <div class="nav-category-wrap" data-category="{cat_slug}">')
        html.append(f'      <button class="nav-category-toggle" onclick="toggleCategory(this)" type="button">')
        html.append(f'        <span>{gname}</span>')
        html.append(f'        <span class="cat-count">{len(pages_in_group)}</span>')
        html.append(f'        <svg class="cat-chev" viewBox="0 0 10 10" fill="none"><path d="M3.5 2l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>')
        html.append(f'      </button>')
        html.append(f'      <div class="nav-category-content">')
        html.append(f'        <div class="nav-flat">')
        for p in pages_in_group:
            html.append(f'          <a class="nav-item" href="#page={p["id"]}" data-page="{p["id"]}" data-page-category="{cat_slug}">{p["label"]}</a>')
        html.append(f'        </div>')
        html.append(f'      </div>')
        html.append(f'    </div>')

    # Modules grouped by category (CATEGORY_ORDER minus already-shown)
    by_cat = {}
    for m in MODULES:
        by_cat.setdefault(m['category'], []).append(m)

    html.append('    <div class="nav-divider"></div>')

    for cat in CATEGORY_ORDER:
        if cat in ('Overview', 'Foundation'): continue
        if cat not in by_cat: continue
        modules_in_cat = by_cat[cat]
        # Unique slug for the category
        cat_slug = cat.lower().replace(' ', '-').replace('&', 'and')
        html.append(f'    <div class="nav-category-wrap" data-category="{cat_slug}">')
        html.append(f'      <button class="nav-category-toggle" onclick="toggleCategory(this)" type="button">')
        html.append(f'        <span>{cat}</span>')
        html.append(f'        <span class="cat-count">{len(modules_in_cat)}</span>')
        html.append(f'        <svg class="cat-chev" viewBox="0 0 10 10" fill="none"><path d="M3.5 2l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>')
        html.append(f'      </button>')
        html.append(f'      <div class="nav-category-content">')
        html.append(f'        <div class="nav-flat">')
        for m in modules_in_cat:
            status_badge = ''
            if m['status'] == 'complete':
                status_badge = '<span class="nav-status done">DONE</span>'
            elif m['status'] == 'pending':
                status_badge = '<span class="nav-status pending">PENDING</span>'
            html.append(f'          <a class="nav-item" href="#module={m["id"]}" data-module="{m["id"]}" data-module-category="{cat_slug}">{m["label"]}{status_badge}</a>')
        html.append(f'        </div>')
        html.append(f'      </div>')
        html.append(f'    </div>')

    html.append('  </div>')
    html.append('</nav>')
    return '\n'.join(html)


def build_platform_pages(sections):
    """Each platform page is a <div class="platform-page" data-page="...">."""
    html = []
    for p in PLATFORM_PAGES:
        html.append(f'<div class="platform-page" data-page="{p["id"]}" id="page-{p["id"]}">')
        html.append(f'  <div class="page-header-bar">')
        html.append(f'    <h1 class="page-title">{p["label"]}</h1>')
        html.append(f'  </div>')
        html.append(f'  <div class="page-content">')
        for sec_id in p['sections']:
            if sec_id in sections:
                html.append(sections[sec_id])
            else:
                html.append(f'<!-- MISSING: {sec_id} -->')
        html.append(f'  </div>')
        html.append(f'</div>')
    return '\n'.join(html)


def build_module_containers(sections):
    """Each module is a <div class="module-container" data-module="...">
       with a tab bar and one <div class="tab-panel"> per tab."""
    html = []
    for m in MODULES:
        html.append(f'<div class="module-container" data-module="{m["id"]}" id="module-{m["id"]}">')
        # Module header
        status_html = ''
        if m['status'] == 'complete':
            status_html = '<span class="module-status done">Complete</span>'
        elif m['status'] == 'pending':
            status_html = '<span class="module-status pending">Pending</span>'
        html.append(f'  <div class="module-header-bar">')
        html.append(f'    <div class="module-header-left">')
        html.append(f'      <div class="module-category-eyebrow">{m["category"]}</div>')
        html.append(f'      <h1 class="module-title">{m["label"]}{status_html}</h1>')
        html.append(f'      <div class="module-desc">{m["description"]}</div>')
        html.append(f'    </div>')
        html.append(f'  </div>')

        # Tab bar
        html.append(f'  <div class="tab-bar">')
        tabs_present = []
        for tab_id in TAB_ORDER:
            if tab_id in ('dependencies', 'ui'):
                # Always shown — dependencies has structured placeholder;
                # ui has the Components Inventory regardless of legacy sections
                tabs_present.append(tab_id)
                continue
            if tab_id in m['tabs'] and m['tabs'][tab_id]:
                tabs_present.append(tab_id)
        for tab_id in tabs_present:
            active = ' active' if tab_id == tabs_present[0] else ''
            html.append(f'    <button class="tab-btn{active}" data-tab="{tab_id}" onclick="switchTab(this, \'{m["id"]}\', \'{tab_id}\')">{TAB_LABELS[tab_id]}</button>')
        html.append(f'  </div>')

        # Tab panels
        html.append(f'  <div class="tab-panels">')
        for tab_id in tabs_present:
            active = ' active' if tab_id == tabs_present[0] else ''
            html.append(f'    <div class="tab-panel{active}" data-tab="{tab_id}">')
            if tab_id == 'dependencies':
                html.append(build_dependencies_stub(m))
            elif tab_id == 'ui':
                # Prepend component inventory to the UI tab
                html.append(build_component_inventory(m))
                # Then any legacy UI sections from v20
                for sec_id in m['tabs'].get('ui', []):
                    if sec_id in sections:
                        html.append(sections[sec_id])
                    else:
                        html.append(f'<!-- MISSING: {sec_id} -->')
            else:
                for sec_id in m['tabs'].get(tab_id, []):
                    if sec_id in sections:
                        html.append(sections[sec_id])
                    else:
                        html.append(f'<!-- MISSING: {sec_id} -->')
            html.append(f'    </div>')
        html.append(f'  </div>')

        html.append(f'</div>')
    return '\n'.join(html)


def build_dependencies_stub(m):
    """Placeholder content for Dependencies tab. To be filled in per-module later."""
    return f'''<div class="dependencies-placeholder">
  <div class="empty-state-inline">
    <div class="empty-title">Dependencies</div>
    <div class="empty-desc">Upstream dependencies, downstream consumers, cross-references, and shared Option Sets for the <strong>{m["label"]}</strong> module will be documented here. Content to be filled in as cross-module mapping is finalized.</div>
  </div>
</div>'''


def build_component_inventory(m):
    """Components + Features inventory block at top of UI tab.

    Two lists: Components (user-facing surfaces) and Features (user capabilities).
    Each item: name · description · status tag (built / in_progress / planned).
    """
    try:
        from components_data import get_components_features
        components, features = get_components_features(m['id'])
    except Exception:
        components, features = [], []

    html = ['<div class="component-inventory">']
    html.append('  <div class="component-inventory-header">')
    html.append('    <h2 class="component-inventory-title">Components &amp; Features</h2>')
    html.append(f'    <div class="component-inventory-sub">User-facing surfaces (<strong>Components</strong>) and user capabilities (<strong>Features</strong>) provided by the {m["label"]} module. Status reflects build progress.</div>')
    html.append('  </div>')

    # Components list
    html.append('  <div class="cf-group">')
    html.append('    <div class="cf-group-header">')
    html.append('      <div class="cf-group-label">Components</div>')
    html.append(f'      <div class="cf-group-count">{len(components)}</div>')
    html.append('    </div>')
    html.append('    <div class="cf-group-desc">Screens, panels, dialogs and reusable UI pieces the user sees and interacts with.</div>')
    if not components:
        html.append('    <div class="cf-empty">No components defined yet.</div>')
    else:
        html.append('    <ul class="cf-list">')
        for item in components:
            name, desc, status = item if len(item) == 3 else (item[0], item[1] if len(item) > 1 else '', 'planned')
            html.append(f'      <li class="cf-item">')
            html.append(f'        <div class="cf-item-head">')
            html.append(f'          <span class="cf-item-name">{name}</span>')
            html.append(f'          <span class="cf-status cf-status-{status}">{_status_label(status)}</span>')
            html.append(f'        </div>')
            if desc:
                html.append(f'        <div class="cf-item-desc">{desc}</div>')
            html.append(f'      </li>')
        html.append('    </ul>')
    html.append('  </div>')

    # Features list
    html.append('  <div class="cf-group">')
    html.append('    <div class="cf-group-header">')
    html.append('      <div class="cf-group-label">Features</div>')
    html.append(f'      <div class="cf-group-count">{len(features)}</div>')
    html.append('    </div>')
    html.append('    <div class="cf-group-desc">User capabilities — the actions a user with appropriate permission can perform.</div>')
    if not features:
        html.append('    <div class="cf-empty">No features defined yet.</div>')
    else:
        html.append('    <ul class="cf-list">')
        for item in features:
            name, desc, status = item if len(item) == 3 else (item[0], item[1] if len(item) > 1 else '', 'planned')
            html.append(f'      <li class="cf-item">')
            html.append(f'        <div class="cf-item-head">')
            html.append(f'          <span class="cf-item-name">{name}</span>')
            html.append(f'          <span class="cf-status cf-status-{status}">{_status_label(status)}</span>')
            html.append(f'        </div>')
            if desc:
                html.append(f'        <div class="cf-item-desc">{desc}</div>')
            html.append(f'      </li>')
        html.append('    </ul>')
    html.append('  </div>')

    html.append('</div>')
    return '\n'.join(html)


def _status_label(s):
    return {'built': 'Built', 'in_progress': 'In Progress', 'planned': 'Planned'}.get(s, s.title())


def build_new_css():
    """Extra CSS for module/tab structure. Added on top of existing v20 CSS."""
    return '''
/* ═══════════════════════════════════════════════════════════════
   v21 TABBED STRUCTURE — additions on top of v20 CSS
═══════════════════════════════════════════════════════════════ */

/* Hide old doc-section visual (we're wrapping them in new containers) */
.doc-section { display: block; }

/* Sidebar additions — scoped under .nav-flat to override v20 .nav-item default 30px indent */
.sidebar-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 0 40px;
  scrollbar-width: thin;
  scrollbar-color: var(--border-hover) transparent;
}
.sidebar-scroll::-webkit-scrollbar { width: 6px; }
.sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
.sidebar-scroll::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 3px; }
.sidebar-scroll::-webkit-scrollbar-thumb:hover { background: var(--border-active); }

/* Collapsible category */
.nav-category-wrap {
  margin-bottom: 2px;
}
.nav-category-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 20px 8px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  text-transform: uppercase;
  text-align: left;
  transition: color var(--ease);
}
.nav-category-toggle:hover { color: var(--text-secondary); }
.nav-category-toggle .cat-chev {
  width: 10px; height: 10px;
  transition: transform var(--ease);
  flex-shrink: 0;
  margin-left: 8px;
}
.nav-category-wrap.open .nav-category-toggle .cat-chev {
  transform: rotate(90deg);
}
.nav-category-toggle .cat-count {
  color: var(--text-disabled);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  margin-left: auto;
  margin-right: 8px;
  letter-spacing: 0;
}
.nav-category-content {
  display: none;
}
.nav-category-wrap.open .nav-category-content {
  display: block;
}

.nav-flat { display: flex; flex-direction: column; gap: 1px; padding: 0 12px 8px; }
.nav-flat .nav-item {
  padding: 7px 10px !important;
  justify-content: space-between;
}
.nav-flat .nav-item.active::before {
  display: none;
}
.nav-status {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 1px 5px;
  border-radius: 3px;
  border: 1px solid;
}
.nav-status.done {
  color: #6DD5A1;
  border-color: rgba(109,213,161,0.3);
  background: rgba(109,213,161,0.05);
}
.nav-status.pending {
  color: var(--text-disabled);
  border-color: var(--border);
  background: transparent;
}

/* Platform pages + Module containers — hidden by default; active one shows */
.platform-page, .module-container {
  display: none;
}
.platform-page.active, .module-container.active {
  display: block;
}

/* Module header bar */
.module-header-bar {
  padding: 24px 40px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.module-header-left { display: flex; flex-direction: column; gap: 4px; }
.module-category-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
}
.module-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  display: flex;
  align-items: center;
  gap: 12px;
}
.module-status {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid;
  text-transform: uppercase;
}
.module-status.done {
  color: #6DD5A1;
  background: rgba(34,197,94,0.10);
  border-color: rgba(34,197,94,0.25);
}
.module-status.pending {
  color: var(--text-muted);
  background: var(--surface-2);
  border-color: var(--border);
}
.module-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.55;
  max-width: 900px;
}

/* Platform page header */
.page-header-bar {
  padding: 24px 40px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}
.page-content {
  padding: 20px 40px 60px;
}

/* Tab bar */
.tab-bar {
  display: flex;
  gap: 0;
  padding: 0 40px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 10;
  overflow-x: auto;
  scrollbar-width: thin;
}
.tab-bar::-webkit-scrollbar { height: 3px; }
.tab-bar::-webkit-scrollbar-thumb { background: var(--border-hover); }
.tab-btn {
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  font: 500 13px var(--font-sans);
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: -1px;
  transition: color var(--ease), border-color var(--ease);
}
.tab-btn:hover { color: var(--text-primary); }
.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
  font-weight: 600;
}

/* Tab panels */
.tab-panels { padding: 20px 40px 60px; }
.tab-panel { display: none; }
.tab-panel.active { display: block; }

/* Dependencies placeholder */
.dependencies-placeholder {
  padding: 40px 20px;
}
.empty-state-inline {
  max-width: 600px;
  padding: 24px 28px;
  background: var(--surface-1);
  border: 1px dashed var(--border-hover);
  border-radius: 10px;
  text-align: center;
}
.empty-state-inline .empty-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.empty-state-inline .empty-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ═══ Components + Features Inventory ═══ */
.component-inventory {
  padding: 4px 0 32px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 32px;
}
.component-inventory-header {
  margin-bottom: 20px;
}
.component-inventory-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin: 0 0 6px;
}
.component-inventory-sub {
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.55;
  max-width: 800px;
}
.component-inventory-sub strong {
  color: var(--text-secondary);
  font-weight: 600;
}

/* Group (Components / Features) */
.cf-group {
  margin-top: 20px;
  padding: 18px 20px;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: 10px;
}
.cf-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.cf-group-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.cf-group-count {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  font-family: var(--font-mono);
  background: var(--surface-2);
  border: 1px solid var(--border-hover);
  border-radius: 4px;
  padding: 2px 7px;
  min-width: 22px;
  text-align: center;
}
.cf-group-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 14px;
}

.cf-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border);
}
.cf-item {
  padding: 10px 14px;
  background: var(--surface-2);
  transition: background var(--ease);
}
.cf-item:hover {
  background: var(--surface-3);
}
.cf-item-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 3px;
}
.cf-item-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.005em;
}
.cf-item-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.45;
}

/* Status tags */
.cf-status {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 2px 7px;
  border-radius: 4px;
  border: 1px solid;
  text-transform: uppercase;
  flex-shrink: 0;
  font-family: var(--font-mono);
}
.cf-status-built {
  color: #6DD5A1;
  background: rgba(34,197,94,0.10);
  border-color: rgba(34,197,94,0.25);
}
.cf-status-in_progress {
  color: #FBBF24;
  background: rgba(245,158,11,0.10);
  border-color: rgba(245,158,11,0.25);
}
.cf-status-planned {
  color: var(--text-muted);
  background: var(--surface-3);
  border-color: var(--border-hover);
}

.cf-empty {
  font-size: 12px;
  color: var(--text-disabled);
  font-style: italic;
  padding: 12px 14px;
  background: var(--bg);
  border: 1px dashed var(--border);
  border-radius: 6px;
}

/* ═══ Bubble-style Data Type tables ═══ */
.dt-table {
  margin: 18px 0 28px;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}
.dt-table-head {
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--border);
}
.dt-table-head-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.dt-table-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.dt-table-name {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--accent-soft);
  letter-spacing: -0.01em;
}
.dt-table-count {
  margin-left: auto;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-mono);
  background: var(--surface-2);
  border: 1px solid var(--border-hover);
  border-radius: 3px;
  padding: 2px 7px;
}
.dt-table-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.55;
  margin-top: 6px;
}
.dt-fields {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}
.dt-fields th {
  text-align: left;
  padding: 9px 14px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}
.dt-fields td {
  padding: 8px 14px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}
.dt-fields tr:last-child td { border-bottom: none; }
.dt-fields tr:hover td { background: var(--surface-2); }

.dt-field-name {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-primary);
  font-weight: 600;
  white-space: nowrap;
  width: 24%;
}
.dt-field-type {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--accent-soft);
  white-space: nowrap;
  width: 22%;
}
.dt-field-list {
  width: 52px;
  text-align: center;
}
.dt-list-yes {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  background: rgba(34,197,94,0.12);
  color: var(--success-soft);
  border: 1px solid rgba(34,197,94,0.25);
  border-radius: 3px;
  font-size: 11px;
  font-weight: 700;
}
.dt-list-no {
  color: var(--text-disabled);
  font-family: var(--font-mono);
  font-size: 11px;
}
.dt-field-note {
  font-size: 11.5px;
  color: var(--text-muted);
  line-height: 1.45;
}
.dt-field-note code {
  font-size: 10.5px;
  padding: 1px 4px;
}
.dt-flag-inline {
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 11px;
}

/* Mobile */
@media (max-width: 900px) {
  .module-header-bar, .page-header-bar { padding: 18px 20px 14px; }
  .tab-bar { padding: 0 20px; }
  .tab-panels, .page-content { padding: 16px 20px 60px; }
  .module-title { font-size: 18px; }
  .page-title { font-size: 18px; }
}
'''


def build_routing_js():
    return '''
<script>
/* ═══════════════ v21 ROUTER ═══════════════ */
(function() {
  function parseHash() {
    const h = (location.hash || '').replace(/^#/, '');
    const params = {};
    h.split('&').forEach(p => {
      const [k, v] = p.split('=');
      if (k) params[k] = decodeURIComponent(v || '');
    });
    return params;
  }

  function setActive(selectorAll, activeSelector) {
    document.querySelectorAll(selectorAll).forEach(el => el.classList.remove('active'));
    const el = document.querySelector(activeSelector);
    if (el) el.classList.add('active');
    return el;
  }

  function route() {
    const params = parseHash();
    // Hide everything
    document.querySelectorAll('.platform-page').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.module-container').forEach(el => el.classList.remove('active'));

    let target = null;
    if (params.page) {
      target = document.querySelector('.platform-page[data-page="' + params.page + '"]');
      if (target) target.classList.add('active');
      setActive('.nav-item', '.nav-item[data-page="' + params.page + '"]');
      const bc = document.getElementById('breadcrumbCurrent');
      if (bc && target) bc.textContent = target.querySelector('.page-title')?.textContent || params.page;

      // Auto-open the category containing this platform page
      const navItem = document.querySelector('.nav-item[data-page="' + params.page + '"]');
      if (navItem) {
        const catSlug = navItem.getAttribute('data-page-category');
        if (catSlug) {
          const wrap = document.querySelector('.nav-category-wrap[data-category="' + catSlug + '"]');
          if (wrap) wrap.classList.add('open');
        }
      }
    } else if (params.module) {
      target = document.querySelector('.module-container[data-module="' + params.module + '"]');
      if (target) {
        target.classList.add('active');
        // Activate tab
        const tab = params.tab || 'overview';
        const tabBtns = target.querySelectorAll('.tab-btn');
        const tabPanels = target.querySelectorAll('.tab-panel');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        const activeBtn = target.querySelector('.tab-btn[data-tab="' + tab + '"]');
        const activePanel = target.querySelector('.tab-panel[data-tab="' + tab + '"]');
        if (activeBtn) activeBtn.classList.add('active');
        else if (tabBtns.length) tabBtns[0].classList.add('active');
        if (activePanel) activePanel.classList.add('active');
        else if (tabPanels.length) tabPanels[0].classList.add('active');
      }
      setActive('.nav-item', '.nav-item[data-module="' + params.module + '"]');
      const bc = document.getElementById('breadcrumbCurrent');
      if (bc && target) bc.textContent = target.querySelector('.module-title')?.childNodes[0]?.textContent.trim() || params.module;

      // Auto-open the category containing this module
      const navItem = document.querySelector('.nav-item[data-module="' + params.module + '"]');
      if (navItem) {
        const catSlug = navItem.getAttribute('data-module-category');
        if (catSlug) {
          const wrap = document.querySelector('.nav-category-wrap[data-category="' + catSlug + '"]');
          if (wrap) wrap.classList.add('open');
        }
      }
    }

    // Default route if nothing matched
    if (!target) {
      const first = document.querySelector('.platform-page[data-page="app-overview"]');
      if (first) first.classList.add('active');
      setActive('.nav-item', '.nav-item[data-page="app-overview"]');
    }

    // Scroll to top on route change
    try { document.querySelector('.main')?.scrollTo({top: 0, behavior: 'auto'}); } catch(e) {}
    try { window.scrollTo({top: 0, behavior: 'auto'}); } catch(e) {}
    closeMobileSidebar();
  }

  window.toggleCategory = function(btn) {
    const wrap = btn.closest('.nav-category-wrap');
    if (wrap) wrap.classList.toggle('open');
  };

  window.switchTab = function(btn, moduleId, tabId) {
    const params = parseHash();
    params.module = moduleId;
    params.tab = tabId;
    delete params.page;
    location.hash = Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&');
  };

  window.openMobileSidebar = function() {
    document.getElementById('sidebar')?.classList.add('open');
    document.body.classList.add('sidebar-open');
  };
  window.closeMobileSidebar = function() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.body.classList.remove('sidebar-open');
  };

  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', route);
  if (document.readyState !== 'loading') route();
})();
</script>
'''


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    source_path = os.path.join(script_dir, '..', 'specs', 'CRS_Blueprint_Source.html')
    output_path = os.path.join(script_dir, '..', 'specs', 'CRS_Blueprint.html')

    with open(source_path, encoding='utf-8') as f:
        content = f.read()

    # Extract sections
    sections = extract_sections_content(content)
    print(f'Extracted {len(sections)} sections')

    # Extract head
    body_start = content.find('<body>')
    head = content[:body_start]

    # Rename document title
    head = re.sub(
        r'<title>[^<]+</title>',
        '<title>CRS — Blueprint</title>',
        head
    )

    # Inject additional CSS into <head> (just before </style>)
    extra_css = build_new_css()
    head = head.replace('</style>', extra_css + '\n</style>')

    # Build new body
    sidebar = build_sidebar()
    platform_pages = build_platform_pages(sections)
    modules_html = build_module_containers(sections)
    routing_js = build_routing_js()

    new_body = f'''<body>

{sidebar}

<div class="main" id="main">
  <div class="topbar">
    <div class="topbar-left">
      <button class="topbar-hamburger" onclick="openMobileSidebar()" aria-label="Open menu">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="topbar-breadcrumb">
        <span class="crs-label">CRS</span>
        <span class="sep">›</span>
        <span id="breadcrumbCurrent" class="current">App Overview</span>
      </div>
    </div>
    <div class="topbar-right">
      <span class="topbar-badge">Blueprint</span>
      <span class="topbar-date">APR 2026</span>
    </div>
  </div>

  <!-- ═══════════════ PLATFORM PAGES ═══════════════ -->
{platform_pages}

  <!-- ═══════════════ MODULE CONTAINERS ═══════════════ -->
{modules_html}

</div>

{routing_js}

</body>
</html>
'''

    final = head + new_body
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(final)
    print(f'Wrote {len(final)} chars to {output_path}')


if __name__ == '__main__':
    main()
