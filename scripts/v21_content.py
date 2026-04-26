"""
v21 Gaming Date + Fiscal Week content for Casino Settings module.
Injected into CRS_Spec-20.html by inject_v21.py.
"""


# ═══ NEW SECTION: s-cs-gamingdate ═══
GAMINGDATE_NEW = '''<section class="doc-section" id="s-cs-gamingdate">
      <div class="subsection-header">Gaming Date</div>
      <div class="subsection-desc">
        The operational "business day" for a casino property. A gaming date does not follow the calendar — it opens when the property's daily reconciliation starts
        (typically start of day shift) and closes when the prior day's reconciliation is signed off (soft count + cage + tables closed out). One gaming date per property at a time.
        Every event (report, task, activity log entry, etc.) is stamped with the gaming date active at creation.
      </div>

      <div class="datatype">
        <div class="datatype-header">
          <span class="datatype-name">GamingDate</span>
          <button class="datatype-copy" onclick="copyToClipboard('GamingDate')" title="Copy"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 10V3a1 1 0 0 1 1-1h7" stroke="currentColor" stroke-width="1.2"/></svg></button>
        </div>
        <div class="datatype-desc">One gaming day per property. Created manually; closed manually or auto-closed after grace period.</div>
        <div class="datatype-fields">
          <div class="datatype-field pk"><span class="datatype-field-name">id</span><span class="datatype-field-type">unique id</span><span class="datatype-field-note">Bubble auto</span></div>
          <div class="datatype-field idx fk"><span class="datatype-field-name">company</span><span class="datatype-field-type">Company</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field idx fk"><span class="datatype-field-name">property</span><span class="datatype-field-type">Property</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">label</span><span class="datatype-field-type">text</span><span class="datatype-field-note">Display label, e.g. "GD Apr 17, 2026" — generated at create from opened_at</span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">business_date</span><span class="datatype-field-type">date</span><span class="datatype-field-note">The calendar date this gaming date represents. Derived from opened_at using property's timezone + cutover_rule.</span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">status</span><span class="datatype-field-type">OS - GamingDate Status</span><span class="datatype-field-note">current / closed / reopened</span></div>
          <div class="datatype-field"><span class="datatype-field-name">opened_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note">Timestamp when the gaming date was opened. Source of truth for when it started.</span></div>
          <div class="datatype-field fk"><span class="datatype-field-name">opened_by</span><span class="datatype-field-type">User</span><span class="datatype-field-note">Who opened it (or system-user for auto-carry)</span></div>
          <div class="datatype-field"><span class="datatype-field-name">expected_close_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note">= opened_at + property.gaming_date_duration_hours. Surfaces in UI as "Expected close".</span></div>
          <div class="datatype-field"><span class="datatype-field-name">auto_close_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note">= expected_close_at + property.gaming_date_close_grace_hours. Scheduled backend workflow fires at this time.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">closed_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note">Timestamp when actually closed (manual or auto)</span></div>
          <div class="datatype-field fk"><span class="datatype-field-name">closed_by</span><span class="datatype-field-type">User</span><span class="datatype-field-note">system-user if auto-closed after grace</span></div>
          <div class="datatype-field"><span class="datatype-field-name">close_method</span><span class="datatype-field-type">OS - Close Method</span><span class="datatype-field-note">manual / auto_grace</span></div>
          <div class="datatype-field"><span class="datatype-field-name">close_notes</span><span class="datatype-field-type">text</span><span class="datatype-field-note">Optional close-out notes (shift handover, incidents to flag for next shift)</span></div>
          <div class="datatype-field"><span class="datatype-field-name">reopened_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note">If reopened after closure (rare, for late-arriving amendments)</span></div>
          <div class="datatype-field fk"><span class="datatype-field-name">reopened_by</span><span class="datatype-field-type">User</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field"><span class="datatype-field-name">reopen_reason</span><span class="datatype-field-type">text</span><span class="datatype-field-note">Required when reopening. Logged to ActivityLog.</span></div>
          <div class="datatype-field fk"><span class="datatype-field-name">fiscal_week</span><span class="datatype-field-type">FiscalWeek</span><span class="datatype-field-note">The fiscal week this gaming date rolls up into. Populated at create-time from latest open/reopened FiscalWeek.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">event_count_cached</span><span class="datatype-field-type">number</span><span class="datatype-field-note">Optional denorm: count of events classified under this gaming date. Updated on event create/delete or nightly.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">created_date</span><span class="datatype-field-type">date</span><span class="datatype-field-note">Bubble built-in</span></div>
          <div class="datatype-field"><span class="datatype-field-name">modified_date</span><span class="datatype-field-type">date</span><span class="datatype-field-note">Bubble built-in</span></div>
        </div>
      </div>

      <div class="subsection-header" style="margin-top:24px;">Lifecycle</div>
      <div class="subsection-desc">Gaming date is <strong>manually opened</strong> (deliberate shift handoff) and either manually closed or auto-closed after grace period. No auto-open — the next gaming date does not start automatically when the previous closes.</div>

      <div class="table-wrap">
        <table class="spec-table">
          <thead><tr><th>Status</th><th>Meaning</th><th>Transitions from</th><th>Transitions to</th></tr></thead>
          <tbody>
            <tr><td><code>current</code></td><td>The live gaming date. Events attach here. Only one <code>current</code> per property at any time.</td><td>(new record)</td><td><code>closed</code></td></tr>
            <tr><td><code>closed</code></td><td>Finalized. Events no longer classify here unless explicitly reopened.</td><td><code>current</code></td><td><code>reopened</code></td></tr>
            <tr><td><code>reopened</code></td><td>Temporarily open for late amendments. Behaves like <code>current</code> for classification (only for events matching its business_date).</td><td><code>closed</code></td><td><code>closed</code> (after explicit re-close)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection-header" style="margin-top:20px;">Open flow</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">User with <code>gaming_date.open</code> permission clicks "Open Gaming Date" on dashboard.</span></li>
        <li><span class="dot"></span><span class="txt">System checks: no existing <code>current</code> gaming date for this property. If one exists, block with warning "Gaming date already open — close it first."</span></li>
        <li><span class="dot"></span><span class="txt">Backend workflow creates GamingDate with <code>status = current</code>, <code>opened_at = Current date/time</code>, <code>opened_by = Current User</code>.</span></li>
        <li><span class="dot"></span><span class="txt"><code>business_date</code> derived from opened_at using property timezone — the calendar date when opened_at falls, adjusted by optional cutover hour (e.g. if cutover is 6am, opening at 2am Apr 18 → business_date = Apr 17).</span></li>
        <li><span class="dot"></span><span class="txt"><code>expected_close_at</code> = opened_at + <code>property.gaming_date_duration_hours</code> (default 24). <code>auto_close_at</code> = expected_close_at + <code>gaming_date_close_grace_hours</code> (default 4).</span></li>
        <li><span class="dot"></span><span class="txt">Backend workflow scheduled at <code>auto_close_at</code> — auto-closes if still <code>current</code>.</span></li>
        <li><span class="dot"></span><span class="txt">Activity log entry: <code>gaming_date_opened</code>.</span></li>
        <li><span class="dot"></span><span class="txt">Subscribers receive notification <code>gaming_date_opened</code> (in-app only, low priority).</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Close flow</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">User with <code>gaming_date.close</code> permission clicks "Close Gaming Date" on dashboard. Or scheduled auto-close workflow fires at <code>auto_close_at</code>.</span></li>
        <li><span class="dot"></span><span class="txt">Close modal shows: gaming date label, opened_at, duration elapsed, event count, optional close_notes textarea.</span></li>
        <li><span class="dot"></span><span class="txt">Backend workflow updates: <code>status = closed</code>, <code>closed_at = Current date/time</code>, <code>closed_by = Current User</code> (or system-user), <code>close_method</code>.</span></li>
        <li><span class="dot"></span><span class="txt">Classification sweep: find all events created during [opened_at, closed_at] for this property where <code>gaming_date is empty</code> — should be 0, but safety net.</span></li>
        <li><span class="dot"></span><span class="txt">Check parent <code>fiscal_week</code>: if past its planned_end and all child gaming dates are <code>closed</code>, notify surveillance manager "Fiscal Week ready to close".</span></li>
        <li><span class="dot"></span><span class="txt">Activity log: <code>gaming_date_closed</code>.</span></li>
        <li><span class="dot"></span><span class="txt">Notification <code>gaming_date_closed</code> to subscribers (watchers, next shift manager).</span></li>
        <li><span class="dot"></span><span class="txt"><strong>No auto-open of next gaming date.</strong> Next shift must explicitly open — this is deliberate.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Gap behavior (no current gaming date)</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">When a gaming date is closed but next not yet opened, property is in a "gap" state.</span></li>
        <li><span class="dot"></span><span class="txt">Dashboard shows warning banner: <strong>"Gaming Date not open."</strong> with "Open Gaming Date" button if user has permission.</span></li>
        <li><span class="dot"></span><span class="txt">New events created during the gap classify to the <strong>most recently closed gaming date</strong> for that property (fallback).</span></li>
        <li><span class="dot"></span><span class="txt">When the next gaming date opens, no retro-classification — events stamped with the fallback stay where they are. Prevents gaps from corrupting reporting.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Reopen flow (rare)</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">User with <code>gaming_date.reopen</code> permission (typically Surveillance Manager) can reopen a closed gaming date if a late amendment must be attached.</span></li>
        <li><span class="dot"></span><span class="txt">Reopen requires a <code>reopen_reason</code> (mandatory text field). Logged to ActivityLog.</span></li>
        <li><span class="dot"></span><span class="txt">While reopened, events can be manually attached to it (admin-only workflow). Normal events still classify to whatever gaming date is <code>current</code> at their creation time.</span></li>
        <li><span class="dot"></span><span class="txt">Reopening a gaming date does <strong>not</strong> reopen its parent fiscal week — independent.</span></li>
        <li><span class="dot"></span><span class="txt">Re-close follows standard close flow.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Classification rule (event → gaming_date)</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">At event creation, <code>event.gaming_date</code> = Search for GamingDate where company = event.company, property = event.property, status is <code>current</code> OR <code>reopened</code>, :sorted by opened_at descending :first item.</span></li>
        <li><span class="dot"></span><span class="txt">If none found (gap), fallback: :sorted by closed_at descending :first item (most recently closed).</span></li>
        <li><span class="dot"></span><span class="txt">If still none (brand new property with no gaming dates yet), <code>event.gaming_date</code> is empty. Reports/queries that filter by gaming date must handle empty case.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Server-side assignment</strong> in backend workflows that create events. Never rely on frontend to set it.</span></li>
      </ul>
    </section>'''


# ═══ REPLACEMENT: s-cs-fiscalweek ═══
FISCALWEEK_NEW = '''<section class="doc-section" id="s-cs-fiscalweek">
      <div class="subsection-header">Fiscal Week</div>
      <div class="subsection-desc">
        Operational weekly period for financial and operational reporting. Per-property, pre-generated 5 years ahead at property setup + extended annually.
        Fiscal weeks follow a fixed close-day configured per property (e.g. "Mondays at 06:00"). They cascade — closing Week N automatically opens Week N+1.
        Every event carries a <code>fiscal_week</code> FK stamped at create-time.
      </div>

      <div class="datatype">
        <div class="datatype-header">
          <span class="datatype-name">FiscalWeek</span>
          <button class="datatype-copy" onclick="copyToClipboard('FiscalWeek')" title="Copy"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 10V3a1 1 0 0 1 1-1h7" stroke="currentColor" stroke-width="1.2"/></svg></button>
        </div>
        <div class="datatype-desc">One row per fiscal week per property. Pre-generated; planned dates immutable after generation.</div>
        <div class="datatype-fields">
          <div class="datatype-field pk"><span class="datatype-field-name">id</span><span class="datatype-field-type">unique id</span><span class="datatype-field-note">Bubble auto</span></div>
          <div class="datatype-field idx fk"><span class="datatype-field-name">company</span><span class="datatype-field-type">Company</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field idx fk"><span class="datatype-field-name">property</span><span class="datatype-field-type">Property</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field idx fk"><span class="datatype-field-name">fiscal_year</span><span class="datatype-field-type">FiscalYear</span><span class="datatype-field-note">Parent year (see FiscalYear DT below)</span></div>
          <div class="datatype-field"><span class="datatype-field-name">label</span><span class="datatype-field-type">text</span><span class="datatype-field-note">"Week 16, 2026 · Apr 13 – Apr 20" — generated at pre-gen time</span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">week_number</span><span class="datatype-field-type">number</span><span class="datatype-field-note">1–53. Property-scoped; resets at year boundary.</span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">year</span><span class="datatype-field-type">number</span><span class="datatype-field-note">Assigned as year of planned_start</span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">planned_start</span><span class="datatype-field-type">date</span><span class="datatype-field-note"><strong>Immutable after pre-gen.</strong> Scheduled open timestamp (e.g. "2026-04-13 06:00 property-TZ"). Used for classification and reporting.</span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">planned_end</span><span class="datatype-field-type">date</span><span class="datatype-field-note"><strong>Immutable after pre-gen.</strong> Scheduled close timestamp (= next week's planned_start, exclusive).</span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">status</span><span class="datatype-field-type">OS - FiscalWeek Status</span><span class="datatype-field-note">upcoming / current / closed / reopened</span></div>
          <div class="datatype-field"><span class="datatype-field-name">opened_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note">Actual timestamp it became current (= cascade time from prior week close). Empty if still upcoming.</span></div>
          <div class="datatype-field fk"><span class="datatype-field-name">opened_by</span><span class="datatype-field-type">User</span><span class="datatype-field-note">User who closed the previous week (cascade). system-user if auto-closed.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">auto_close_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note">= planned_end + <code>property.week_close_grace_hours</code>. Scheduled backend workflow fires here.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">closed_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note">Timestamp when actually closed (manual or auto)</span></div>
          <div class="datatype-field fk"><span class="datatype-field-name">closed_by</span><span class="datatype-field-type">User</span><span class="datatype-field-note">system-user if auto-closed</span></div>
          <div class="datatype-field"><span class="datatype-field-name">close_method</span><span class="datatype-field-type">OS - Close Method</span><span class="datatype-field-note">manual / auto_grace</span></div>
          <div class="datatype-field"><span class="datatype-field-name">close_notes</span><span class="datatype-field-type">text</span><span class="datatype-field-note">Optional</span></div>
          <div class="datatype-field"><span class="datatype-field-name">reopened_at</span><span class="datatype-field-type">date</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field fk"><span class="datatype-field-name">reopened_by</span><span class="datatype-field-type">User</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field"><span class="datatype-field-name">reopen_reason</span><span class="datatype-field-type">text</span><span class="datatype-field-note">Required when reopening</span></div>
          <div class="datatype-field"><span class="datatype-field-name">is_short_week</span><span class="datatype-field-type">yes/no</span><span class="datatype-field-note">True for the two year-boundary weeks (end-of-year partial + start-of-year partial). See "Year boundary rule" below.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">event_count_cached</span><span class="datatype-field-type">number</span><span class="datatype-field-note">Optional denorm count of events classified here</span></div>
          <div class="datatype-field"><span class="datatype-field-name">report_ids_cached</span><span class="datatype-field-type">list of text</span><span class="datatype-field-note">Generated WeeklyReport IDs — populated at close-time when weekly reports fire</span></div>
          <div class="datatype-field"><span class="datatype-field-name">created_date</span><span class="datatype-field-type">date</span><span class="datatype-field-note">Bubble built-in</span></div>
          <div class="datatype-field"><span class="datatype-field-name">modified_date</span><span class="datatype-field-type">date</span><span class="datatype-field-note">Bubble built-in</span></div>
        </div>
      </div>

      <div class="datatype" style="margin-top:16px;">
        <div class="datatype-header">
          <span class="datatype-name">FiscalYear</span>
          <button class="datatype-copy" onclick="copyToClipboard('FiscalYear')" title="Copy"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 10V3a1 1 0 0 1 1-1h7" stroke="currentColor" stroke-width="1.2"/></svg></button>
        </div>
        <div class="datatype-desc">Parent grouping for fiscal weeks. Created during pre-gen. Minimal — mostly for reporting rollups.</div>
        <div class="datatype-fields">
          <div class="datatype-field pk"><span class="datatype-field-name">id</span><span class="datatype-field-type">unique id</span><span class="datatype-field-note">Bubble auto</span></div>
          <div class="datatype-field idx fk"><span class="datatype-field-name">company</span><span class="datatype-field-type">Company</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field idx fk"><span class="datatype-field-name">property</span><span class="datatype-field-type">Property</span><span class="datatype-field-note"></span></div>
          <div class="datatype-field idx"><span class="datatype-field-name">year</span><span class="datatype-field-type">number</span><span class="datatype-field-note">Calendar year (derived from first week's planned_start)</span></div>
          <div class="datatype-field"><span class="datatype-field-name">label</span><span class="datatype-field-type">text</span><span class="datatype-field-note">"FY 2026"</span></div>
          <div class="datatype-field"><span class="datatype-field-name">week_count</span><span class="datatype-field-type">number</span><span class="datatype-field-note">52 or 53 depending on year (incl. short weeks)</span></div>
          <div class="datatype-field"><span class="datatype-field-name">planned_start</span><span class="datatype-field-type">date</span><span class="datatype-field-note">= Week 1 planned_start</span></div>
          <div class="datatype-field"><span class="datatype-field-name">planned_end</span><span class="datatype-field-type">date</span><span class="datatype-field-note">= last week planned_end</span></div>
          <div class="datatype-field"><span class="datatype-field-name">status</span><span class="datatype-field-type">OS - FiscalYear Status</span><span class="datatype-field-note">active / closed (all weeks closed)</span></div>
        </div>
      </div>

      <div class="subsection-header" style="margin-top:24px;">Pre-generation</div>
      <div class="subsection-desc">When a property is created, a backend workflow generates 5 years of fiscal weeks upfront. Every Oct 1 thereafter, a scheduled workflow extends another year forward. This keeps planned dates stable and allows forward-dated reports / planning.</div>

      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt"><strong>Trigger at property setup:</strong> after Property is created + <code>week_close_day</code> / <code>week_close_time</code> configured, admin clicks "Initialize Fiscal Weeks". Backend workflow generates 5 years (~260 weeks) of FiscalWeek records + 5 FiscalYear records.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Annual extension:</strong> scheduled workflow runs Oct 1 each year per active property. Generates next full year of weeks if not already exists.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Generation algorithm (per year):</strong> find first occurrence of <code>week_close_day</code> at <code>week_close_time</code> in the year. That's Week 1's planned_start. Each subsequent week = planned_start + 7 days. Continue until past Dec 31. Apply year-boundary cut (see below) to last week + first week of next year.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Planned dates are immutable after pre-gen.</strong> Changing <code>property.week_close_day</code> does NOT rewrite existing weeks — only affects weeks generated after the change. A config change mid-year creates a discontinuity. Admin must accept this trade-off.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Year boundary rule</div>
      <div class="subsection-desc">To prevent weeks from spanning calendar years, the last week of each year is cut short at Jan 1 (at <code>week_close_time</code>), and a new Week 1 starts there. Produces two short weeks per year-end.</div>

      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt"><strong>Example with week_close_day = Monday, week_close_time = 06:00:</strong></span></li>
        <li><span class="dot"></span><span class="txt">Week 52 of 2025: planned_start = Mon Dec 29 2025 06:00, planned_end = Thu Jan 1 2026 06:00 (<strong>3 days</strong>, is_short_week = true)</span></li>
        <li><span class="dot"></span><span class="txt">Week 1 of 2026: planned_start = Thu Jan 1 2026 06:00, planned_end = Mon Jan 5 2026 06:00 (<strong>4 days</strong>, is_short_week = true)</span></li>
        <li><span class="dot"></span><span class="txt">Week 2 of 2026 onwards: normal 7-day weeks</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Year assignment:</strong> a week's <code>year</code> = year of planned_start. Week 52 of 2025 stays in FY 2025 even though it extends into Jan 1; Week 1 of 2026 is in FY 2026.</span></li>
        <li><span class="dot"></span><span class="txt">Short weeks flagged with <code>is_short_week = true</code> so weekly report generation can handle them (scale metrics, show "3-day week" caveat).</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Lifecycle states</div>
      <div class="table-wrap">
        <table class="spec-table">
          <thead><tr><th>Status</th><th>Meaning</th><th>Transitions from</th><th>Transitions to</th></tr></thead>
          <tbody>
            <tr><td><code>upcoming</code></td><td>Pre-generated, not yet opened. Planned dates set; no events classify here.</td><td>(initial)</td><td><code>current</code></td></tr>
            <tr><td><code>current</code></td><td>The live week. Events attach here. Only one <code>current</code> per property.</td><td><code>upcoming</code></td><td><code>closed</code></td></tr>
            <tr><td><code>closed</code></td><td>Finalized. WeeklyReports generated. Events no longer attach.</td><td><code>current</code></td><td><code>reopened</code></td></tr>
            <tr><td><code>reopened</code></td><td>Temporarily open for late amendments. Behaves like <code>current</code> for classification.</td><td><code>closed</code></td><td><code>closed</code></td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection-header" style="margin-top:20px;">Open flow</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt"><strong>Week 1 of property's first year</strong> — opened manually by admin when ready to go live. Admin controls when reporting clock starts.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>All subsequent weeks</strong> — auto-cascade: closing Week N automatically opens Week N+1 at the same timestamp. No manual open needed.</span></li>
        <li><span class="dot"></span><span class="txt">When opening: <code>status = current</code>, <code>opened_at = Current date/time</code>, <code>opened_by = </code> user who closed previous week (or system-user if auto-closed). <code>auto_close_at = planned_end + grace_hours</code>. Schedule auto-close backend workflow.</span></li>
        <li><span class="dot"></span><span class="txt">If there is no Week N+1 record (e.g. pre-gen gap), abort cascade and alert admin — should never happen if annual extension runs, but safety net.</span></li>
        <li><span class="dot"></span><span class="txt">Activity log: <code>fiscal_week_opened</code>.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Close flow</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt"><strong>Pre-check:</strong> Are all child gaming dates (opened_at ∈ [week.planned_start, week.planned_end]) closed? If not, show warning with list of open gaming dates. User can force-close (admin override) or cancel.</span></li>
        <li><span class="dot"></span><span class="txt">Close modal shows: week label, planned_start/end, actual opened_at, event count, list of gaming dates within week (with close status), optional close_notes.</span></li>
        <li><span class="dot"></span><span class="txt">Backend workflow: <code>status = closed</code>, <code>closed_at = Current date/time</code>, <code>closed_by</code>, <code>close_method</code>.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Classification sweep:</strong> find all events for this property where <code>created_date</code> ∈ [planned_start, planned_end] AND <code>fiscal_week is empty</code>. Attach them now. Should be 0, but safety net.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Cascade open next week:</strong> find FiscalWeek where property = current.property, <code>status = upcoming</code>, :sorted by planned_start ascending :first item. Update its status to <code>current</code>, <code>opened_at = Current date/time</code>, <code>opened_by</code>.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Trigger WeeklyReport generation:</strong> schedule backend workflow "Generate Weekly Reports for FiscalWeek X" (deferred — reports module extends this).</span></li>
        <li><span class="dot"></span><span class="txt">Check parent FiscalYear: if all weeks closed, set FiscalYear.status = closed.</span></li>
        <li><span class="dot"></span><span class="txt">Activity log: <code>fiscal_week_closed</code>. Notification <code>fiscal_week_closed</code> to subscribers.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Grace period + auto-close</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">If manual close doesn't happen by <code>planned_end</code>, the week enters grace period.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Notification 1 — at planned_end:</strong> "Week ready to close. You have <code>grace_hours</code> hours to close manually or it will auto-close."</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Notification 2 — 1 hour before auto_close_at:</strong> "Week will auto-close in 1 hour. Close now to add notes."</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Notification 3 — at auto_close_at (execution):</strong> "Week auto-closed by system. Reopen if needed."</span></li>
        <li><span class="dot"></span><span class="txt">Auto-close backend workflow scheduled at <code>auto_close_at</code>. Checks week.status is still current — if already closed manually, aborts silently.</span></li>
        <li><span class="dot"></span><span class="txt">Auto-close uses <code>close_method = auto_grace</code>, <code>closed_by = system-user</code>, empty close_notes.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Reopen flow</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">User with <code>fiscal_week.reopen</code> permission clicks "Reopen" on a closed week. Requires <code>reopen_reason</code>.</span></li>
        <li><span class="dot"></span><span class="txt">Backend workflow: <code>status = reopened</code>, <code>reopened_at</code>, <code>reopened_by</code>, <code>reopen_reason</code>. Log to ActivityLog.</span></li>
        <li><span class="dot"></span><span class="txt">While reopened, week behaves like <code>current</code> for classification — new events can be manually assigned to it (admin workflow). Normal event creation still attaches to the genuinely current week.</span></li>
        <li><span class="dot"></span><span class="txt">Reopening does NOT reopen child gaming dates, and does NOT un-generate weekly reports (those persist with a "pre-reopen" snapshot).</span></li>
        <li><span class="dot"></span><span class="txt">Re-close follows standard close flow. WeeklyReport can optionally be regenerated (future enhancement — flagged deferred).</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Classification rule (event → fiscal_week)</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">At event creation, <code>event.fiscal_week</code> = Search for FiscalWeek where company = event.company, property = event.property, status is <code>current</code> OR <code>reopened</code>, :sorted by opened_at descending :first item.</span></li>
        <li><span class="dot"></span><span class="txt">If none found (very first week not yet opened), fallback: :sorted by planned_start ascending :first item. Handles "fresh property, events before first close" edge case.</span></li>
        <li><span class="dot"></span><span class="txt">Classification happens server-side in the backend workflow that creates the event. Same pattern as gaming_date classification.</span></li>
      </ul>
    </section>'''


# ═══ NEW SECTION: s-cs-time-retrofit ═══
RETROFIT_NEW = '''<section class="doc-section" id="s-cs-time-retrofit">
      <div class="subsection-header">Gaming Date + Fiscal Week — Retrofit scope</div>
      <div class="subsection-desc">
        Gaming Date and Fiscal Week are <strong>cached classification fields</strong> on every event DT in the system. Adding them to existing modules requires a one-time retrofit.
        Real timestamps on event records remain the source of truth — <code>gaming_date</code> and <code>fiscal_week</code> are denormalized pointers for fast filtering and reporting.
      </div>

      <div class="subsection-header" style="margin-top:16px;">Why cached (not derived)?</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt"><strong>Performance:</strong> "All reports in Week 16" becomes a single FK filter, not a date range search across millions of records.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Stability:</strong> if a fiscal week is reopened or a property's week_close_day changes, historical classifications stay frozen. Value reflects what was live when the event was created.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Reporting simplicity:</strong> weekly / monthly / yearly rollups become GROUP BY on the cached FK rather than complex date-math.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Trade-off accepted:</strong> fields must be populated at event creation in every backend workflow. One line per workflow — doable. Forgetting leaves an event unclassified — safety-net sweep at close catches this.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">DTs that need the fields added</div>
      <div class="subsection-desc">Every event DT (anything that represents "something that happened at a moment in time") gets <code>gaming_date</code> + <code>fiscal_week</code> as indexed FK fields. Config / reference DTs do NOT get these fields.</div>

      <div class="table-wrap">
        <table class="spec-table">
          <thead><tr><th>Module</th><th>Data Type</th><th>Why an event</th></tr></thead>
          <tbody>
            <tr><td>Reporting</td><td><code>Report</code></td><td>Filed at a moment; reportable by week</td></tr>
            <tr><td>Reporting</td><td><code>ReportResponse</code></td><td>Response sent at a moment</td></tr>
            <tr><td>Reporting</td><td><code>ReportComment</code></td><td>Comment made at a moment</td></tr>
            <tr><td>Reporting</td><td><code>ReportRevision</code></td><td>Revision submitted at a moment</td></tr>
            <tr><td>Task Management</td><td><code>Task</code></td><td>Created at a moment; reportable by week</td></tr>
            <tr><td>Task Management</td><td><code>Subtask</code></td><td>Subtask created at a moment</td></tr>
            <tr><td>Task Management</td><td><code>SubtaskUpdate</code></td><td>Update logged at a moment</td></tr>
            <tr><td>Task Management</td><td><code>TaskComment</code></td><td>Comment at a moment</td></tr>
            <tr><td>Request for Investigation</td><td><code>RFI</code> (TBD)</td><td>Filed at a moment</td></tr>
            <tr><td>Employee Management</td><td><code>EmployeeHistory</code></td><td>Event log</td></tr>
            <tr><td>Employee Management</td><td><code>EmployeeNote</code></td><td>Note added at a moment</td></tr>
            <tr><td>Employee Management</td><td><code>EmployeeDocument</code></td><td>Uploaded at a moment</td></tr>
            <tr><td>Onboarding + Job Board</td><td><code>Applicant</code></td><td>Applied at a moment</td></tr>
            <tr><td>Onboarding + Job Board</td><td><code>ApplicantNote</code></td><td>Note at a moment</td></tr>
            <tr><td>Onboarding + Job Board</td><td><code>ApplicantInterview</code></td><td>Scheduled / held at a moment</td></tr>
            <tr><td>Onboarding + Job Board</td><td><code>ApplicantEvent</code></td><td>Pipeline event</td></tr>
            <tr><td>System Activity Log</td><td><code>ActivityLog</code></td><td>Every log row</td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection-header" style="margin-top:20px;">DTs that do NOT need the fields</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt"><code>Notification</code> — ephemeral, aged out. No reporting by week.</span></li>
        <li><span class="dot"></span><span class="txt">Config DTs: <code>Role</code>, <code>User</code>, <code>Company</code>, <code>Property</code>, <code>ReportType</code>, <code>Department</code>, etc. These are reference data, not events.</span></li>
        <li><span class="dot"></span><span class="txt"><code>NotificationPreferences</code>, <code>EventPreference</code>, <code>Subscription</code>, <code>EmailTemplate</code> — all config.</span></li>
        <li><span class="dot"></span><span class="txt">Option Sets — not DTs; they don't have FK fields.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Retrofit steps per DT</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt"><strong>Add fields:</strong> in Bubble DT editor, add <code>gaming_date</code> (type: GamingDate, indexed) and <code>fiscal_week</code> (type: FiscalWeek, indexed).</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Update creation workflows:</strong> every backend workflow that creates a record of this DT must populate the two fields using the classification rule above. Typically 2 extra "search for" actions + assign on Create.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Backfill existing records:</strong> one-time backend workflow. Iterate over existing records; for each, find the fiscal_week/gaming_date whose [planned_start, planned_end] contains the record's created_date. Assign. Run in batches of 500 to avoid WU spikes.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Add to Activity Log:</strong> when events log to ActivityLog, pass through the event's gaming_date + fiscal_week so ActivityLog also carries the classification.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Performance notes</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt"><strong>Index both fields.</strong> All weekly/daily filtering runs off these indexes. Without indexes, Bubble does table scans.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Classification lookup is cheap.</strong> "Latest current/reopened fiscal_week for property X" search is O(1) with index on (property, status). Cache result at start of batch workflow when creating many events.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Safety sweep at close is bounded.</strong> Only events in [planned_start, planned_end] for that property. With proper indexes, fast even at 100k events/week.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Backfill is expensive but one-time.</strong> Batch 500 records at a time; run overnight. Budget ~1 WU per event.</span></li>
      </ul>
    </section>'''


# ═══ NEW SECTION: s-cs-time-ui ═══
TIME_UI_NEW = '''<section class="doc-section" id="s-cs-time-ui">
      <div class="subsection-header">Gaming Date + Fiscal Week — UI Components</div>
      <div class="subsection-desc">Operational controls surface in the main app dashboard, not buried in Settings. Only admin <em>configuration</em> lives in Casino Settings; open/close operations are one click from the top bar.</div>

      <div class="subsection-header" style="margin-top:16px;">Top-bar status chip</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">Persistent chip in app top bar (right side, near user avatar). Shows two stacked pills:</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Line 1 — Gaming Date:</strong> "GD Apr 17" with green dot if current, amber dot if in gap, red dot if expired past grace.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Line 2 — Fiscal Week:</strong> "Week 16, 2026" with green/amber/red dot on same rules.</span></li>
        <li><span class="dot"></span><span class="txt">Clicking the chip opens the "Time &amp; Periods" floating group: summary + quick actions (Close, Open, Reopen) gated by permissions.</span></li>
        <li><span class="dot"></span><span class="txt">States: <code>current</code> (green), <code>in_grace</code> (amber, tooltip shows countdown to auto-close), <code>gap</code> (red, gaming date only), <code>closed</code> (gray — shown briefly before next opens).</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Gap warning banner</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">When there is no <code>current</code> gaming date for the user's property, show a dismissible banner at top of every page: <strong>"Gaming Date not open — new events will be classified to the previous day."</strong></span></li>
        <li><span class="dot"></span><span class="txt">Banner has an "Open Gaming Date" button if user has <code>gaming_date.open</code> permission.</span></li>
        <li><span class="dot"></span><span class="txt">Dismissing hides it for the session (Custom State). Returns on page reload until resolved.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Open Gaming Date modal</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">Simple modal: title "Open Gaming Date for [Property Name]".</span></li>
        <li><span class="dot"></span><span class="txt">Body: "This will start a new gaming date now. Previous date: <code>[label]</code> closed at <code>[closed_at]</code>."</span></li>
        <li><span class="dot"></span><span class="txt">Shows expected close + auto close preview: "Expected close: Apr 18 06:00. Auto-close: Apr 18 10:00 (4h grace)."</span></li>
        <li><span class="dot"></span><span class="txt">Buttons: Cancel / Open.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Close Gaming Date modal</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">Title: "Close Gaming Date — <code>[label]</code>".</span></li>
        <li><span class="dot"></span><span class="txt">Summary block: opened_at, duration elapsed, event count (reports filed, tasks created, activity events).</span></li>
        <li><span class="dot"></span><span class="txt">Warning if significant gap from expected_close (&gt;2 hours over or under).</span></li>
        <li><span class="dot"></span><span class="txt">Optional <code>close_notes</code> textarea — shift handover notes.</span></li>
        <li><span class="dot"></span><span class="txt">Button: Close. On click, triggers close backend workflow.</span></li>
        <li><span class="dot"></span><span class="txt">After close, shows toast "Gaming Date closed. Next date not yet open." with inline "Open new date" button.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Close Fiscal Week modal</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">Title: "Close <code>[Week label]</code>".</span></li>
        <li><span class="dot"></span><span class="txt">Pre-check display: list of child gaming dates within this week with close status. Green check if closed, red X if still open. If any open, button "Close week anyway" requires second confirmation.</span></li>
        <li><span class="dot"></span><span class="txt">Summary: event count, report count, user count active this week.</span></li>
        <li><span class="dot"></span><span class="txt">Preview of what happens: "Next week (<code>[next label]</code>) will auto-open. Weekly reports will be generated (deferred)."</span></li>
        <li><span class="dot"></span><span class="txt">Optional <code>close_notes</code>.</span></li>
        <li><span class="dot"></span><span class="txt">Button: Close Week.</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Fiscal Week list view (admin)</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">In Casino Settings UI: section "Fiscal Weeks" shows a repeating group of FiscalWeek records for the property, sorted by planned_start desc.</span></li>
        <li><span class="dot"></span><span class="txt">Columns: Week #, Year, Label, Planned Range, Status pill, Actual opened_at, Actual closed_at, Close method, Actions.</span></li>
        <li><span class="dot"></span><span class="txt">Actions per row: View Details (floating group with child gaming dates + event counts), Reopen (if closed + user has permission).</span></li>
        <li><span class="dot"></span><span class="txt">Filter by: Year, Status. Paginated (50/page).</span></li>
      </ul>

      <div class="subsection-header" style="margin-top:20px;">Property Setup — initialize fiscal weeks</div>
      <ul class="spec-list">
        <li><span class="dot"></span><span class="txt">On Property create screen, after timezone + basic info, a setup card: "Initialize Fiscal Weeks".</span></li>
        <li><span class="dot"></span><span class="txt">Fields: <code>week_close_day</code> (dropdown Mon-Sun), <code>week_close_time</code> (time picker), <code>week_close_grace_hours</code> (number, default 6), <code>gaming_date_duration_hours</code> (number, default 24), <code>gaming_date_close_grace_hours</code> (number, default 4).</span></li>
        <li><span class="dot"></span><span class="txt">Preview shows: "Your first week will start <code>[first Monday at 06:00 after today]</code>." Recalculates on field change.</span></li>
        <li><span class="dot"></span><span class="txt">Button "Generate 5 Years of Weeks". On click, backend workflow fires; progress bar shows "Generated 47 / 260 weeks...". Takes ~30s for 260 weeks.</span></li>
        <li><span class="dot"></span><span class="txt">After success: shows summary + button to open Week 1 manually.</span></li>
      </ul>
    </section>'''


# ═══ FRAGMENTS ═══

# Core Principles bullets for s-cs-overview (3 new <li>)
OVERVIEW_ADD = '''
        <li><span class="dot"></span><span class="txt"><strong>Gaming Date + Fiscal Week as cached classification fields.</strong> Every event record (reports, tasks, comments, activity logs, etc.) carries <code>gaming_date</code> and <code>fiscal_week</code> FKs populated at create-time. Denormalized pointers for fast weekly/daily rollups — real timestamps remain source of truth.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>Fiscal weeks pre-generated, gaming dates manual.</strong> Fiscal weeks generated 5 years ahead at property setup, with planned_start/end immutable once created — stability for reporting. Gaming dates are NOT pre-generated; each is manually opened (deliberate shift handoff) and auto-closed after grace period.</span></li>
        <li><span class="dot"></span><span class="txt"><strong>"Attach to latest open" classification.</strong> New events pick up whichever fiscal week + gaming date is currently open (or reopened) for their property. No date-math at write time — simple FK lookup, O(1) with indexes.</span></li>'''


# 9 new permission rows for s-cs-privacy permissions table
PERMISSIONS_ADD = '''
            <tr><td><code>gaming_date.open</code></td><td>Gaming Date</td><td>Open a new gaming date for the user's property</td><td>Surveillance Manager, Shift Manager</td></tr>
            <tr><td><code>gaming_date.close</code></td><td>Gaming Date</td><td>Manually close the current gaming date</td><td>Surveillance Manager, Shift Manager</td></tr>
            <tr><td><code>gaming_date.reopen</code></td><td>Gaming Date</td><td>Reopen a closed gaming date (late amendment)</td><td>Surveillance Manager only</td></tr>
            <tr><td><code>gaming_date.close_digest</code></td><td>Gaming Date</td><td>View daily close summary dashboards</td><td>Surveillance Manager, Department Head</td></tr>
            <tr><td><code>fiscal_week.open</code></td><td>Fiscal Week</td><td>Manually open the first fiscal week at go-live (rarely used after)</td><td>Admin only</td></tr>
            <tr><td><code>fiscal_week.close</code></td><td>Fiscal Week</td><td>Close the current fiscal week (force-close even with open gaming dates)</td><td>Surveillance Manager only</td></tr>
            <tr><td><code>fiscal_week.reopen</code></td><td>Fiscal Week</td><td>Reopen a closed fiscal week for late amendments</td><td>Surveillance Manager only</td></tr>
            <tr><td><code>fiscal_week.close_digest</code></td><td>Fiscal Week</td><td>View weekly close summary + weekly report</td><td>All managers</td></tr>
            <tr><td><code>fiscal_week.classify</code></td><td>Fiscal Week</td><td>Manually assign a specific event to a different fiscal_week (admin corrective)</td><td>Admin only</td></tr>'''


# 3 new privacy rule rows
PRIVACY_ADD = '''
            <tr><td><code>GamingDate</code></td><td>Current User's company = This GamingDate's company AND Current User's property = This GamingDate's property (or Current User is Admin)</td><td>Strict property isolation. Admin sees all properties in company.</td></tr>
            <tr><td><code>FiscalWeek</code></td><td>Current User's company = This FiscalWeek's company AND Current User's property = This FiscalWeek's property (or Current User is Admin)</td><td>Same as above.</td></tr>
            <tr><td><code>FiscalYear</code></td><td>Current User's company = This FiscalYear's company AND Current User's property = This FiscalYear's property (or Current User is Admin)</td><td>Same as above.</td></tr>'''


# 5 new Property DT fields
PROPERTY_ADDS = '''
          <div class="datatype-field"><span class="datatype-field-name">week_close_day</span><span class="datatype-field-type">OS - Day of Week</span><span class="datatype-field-note">Monday / Tuesday / ... Which day fiscal weeks close. Set at property setup; changing later does not rewrite existing weeks.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">week_close_time</span><span class="datatype-field-type">text</span><span class="datatype-field-note">HH:MM in 24-hour format (e.g. "06:00"). Property-local time.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">week_close_grace_hours</span><span class="datatype-field-type">number</span><span class="datatype-field-note">Default 6. Hours after planned_end before auto-close fires.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">gaming_date_duration_hours</span><span class="datatype-field-type">number</span><span class="datatype-field-note">Default 24. Length of a gaming date before expected close.</span></div>
          <div class="datatype-field"><span class="datatype-field-name">gaming_date_close_grace_hours</span><span class="datatype-field-type">number</span><span class="datatype-field-note">Default 4. Hours after expected_close_at before auto-close fires.</span></div>'''
