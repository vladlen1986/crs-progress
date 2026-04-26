"""
Parse <div class="datatype"> blocks from v20 content and rewrite them as
clean Bubble-style tables.

Extracts:
  - datatype name
  - datatype description (may be absent)
  - fields: name, type (raw), note
Transforms type into:
  - base_type (without annotations)
  - is_list (inferred from type or from raw list markers in v20 it's not marked)

Emits:
  <div class="dt-table">
    <div class="dt-table-head">Thing: Name <span class="dt-table-desc">...</span></div>
    <table class="dt-fields">
      <thead><tr><th>Field name</th><th>Type</th><th>List</th><th>Notes</th></tr></thead>
      <tbody>...</tbody>
    </table>
  </div>

NOTE on 'List' column: v20 did NOT consistently mark list fields. Common v20 type-text patterns that indicate lists:
  - "list of X"
  - "List of X"
  - "X list"
  - ", list"  (rare)
We match these and set list=True. For all others we default to list=False.
A follow-up pass may need manual correction for any that got missed.
"""
import re
from html import unescape as html_unescape


LIST_PATTERNS = [
    re.compile(r'^list of\s+', re.IGNORECASE),
    re.compile(r'\blist of\s+', re.IGNORECASE),
    re.compile(r'\s+list$', re.IGNORECASE),
    re.compile(r',\s*list\b', re.IGNORECASE),
]


def is_list_type(type_text):
    """Return True if the raw type text indicates a list field."""
    if not type_text:
        return False
    t = type_text.strip()
    for p in LIST_PATTERNS:
        if p.search(t):
            return True
    return False


def clean_type(type_text):
    """Strip list markers from type text to leave just the base type."""
    t = type_text.strip()
    # Remove "list of " prefix
    t = re.sub(r'^list of\s+', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\blist of\s+', '', t, flags=re.IGNORECASE)
    # Remove trailing " list"
    t = re.sub(r'\s+list$', '', t, flags=re.IGNORECASE)
    # Remove ", list"
    t = re.sub(r',\s*list\b', '', t, flags=re.IGNORECASE)
    return t.strip()


def find_datatype_blocks(html):
    """Find all <div class="datatype"...> blocks with correct nesting.
    Returns list of (start, end, block_html) tuples."""
    results = []
    pattern = re.compile(r'<div class="datatype(?:\s+[^"]*)?"\s*>')
    for m in pattern.finditer(html):
        start = m.start()
        # Walk forward counting div nesting
        pos = m.end()
        depth = 1
        while depth > 0 and pos < len(html):
            next_open = html.find('<div', pos)
            next_close = html.find('</div>', pos)
            if next_close == -1:
                break
            if next_open != -1 and next_open < next_close:
                depth += 1
                pos = next_open + 4
            else:
                depth -= 1
                pos = next_close + 6
        end = pos
        results.append((start, end, html[start:end]))
    return results


def parse_datatype_block(block):
    """Parse one datatype block into a structured dict.

    Handles 3-span fields (name/type/note), 2-span fields (name/type),
    and type/note spans that may contain nested inline HTML.
    """
    # Extract name
    name_m = re.search(r'<span class="datatype-name">([^<]+)</span>', block)
    name = name_m.group(1).strip() if name_m else 'Unknown'

    # Extract description (may be absent; may contain nested tags)
    desc = extract_div_content(block, r'<div class="datatype-desc"\s*>')

    # Parse each field div
    fields = []
    field_start_re = re.compile(r'<div class="datatype-field(\s+[^"]*)?"\s*>')
    for m in field_start_re.finditer(block):
        cls = (m.group(1) or '').strip()
        # Find matching close </div>
        field_end = find_matching_close(block, m.end(), 'div')
        field_inner = block[m.end():field_end]

        # Extract the three spans with proper nesting
        fname = extract_span_content(field_inner, 'datatype-field-name') or ''
        ftype_raw = extract_span_content(field_inner, 'datatype-field-type') or ''
        fnote = extract_span_content(field_inner, 'datatype-field-note') or ''

        if not fname.strip():
            continue

        is_list = is_list_type(strip_tags_for_check(ftype_raw))
        ftype = clean_type(strip_tags_for_check(ftype_raw))

        flags = []
        if 'pk' in cls: flags.append('pk')
        if 'idx' in cls: flags.append('idx')
        if 'fk' in cls: flags.append('fk')

        fields.append({
            'name': fname.strip(),
            'type_raw': ftype_raw.strip(),
            'type': ftype,
            'is_list': is_list,
            'note': fnote.strip(),
            'flags': flags,
        })

    return {
        'name': name,
        'desc': desc,
        'fields': fields,
    }


def find_matching_close(html, start_pos, tag):
    """Given html, starting position (after opening tag), find the matching </tag>."""
    pos = start_pos
    depth = 1
    open_pattern = f'<{tag}'
    close_pattern = f'</{tag}>'
    while depth > 0 and pos < len(html):
        no = html.find(open_pattern, pos)
        nc = html.find(close_pattern, pos)
        if nc == -1: break
        if no != -1 and no < nc:
            depth += 1
            pos = no + len(open_pattern)
        else:
            depth -= 1
            pos = nc + len(close_pattern)
            if depth == 0:
                return pos - len(close_pattern)
    return pos


def extract_span_content(html, class_name):
    """Find <span class="{class_name}">...</span> with balanced nested spans.
    Returns the inner content (may include nested HTML)."""
    pattern = re.compile(r'<span class="' + re.escape(class_name) + r'"\s*>')
    m = pattern.search(html)
    if not m:
        return None
    start = m.end()
    end = find_matching_close(html, start, 'span')
    return html[start:end]


def extract_div_content(html, opening_pattern_str):
    """Find the matching </div> for an opening <div class="...">."""
    m = re.search(opening_pattern_str, html)
    if not m:
        return ''
    start = m.end()
    end = find_matching_close(html, start, 'div')
    return html[start:end].strip()


def strip_tags_for_check(s):
    """Remove HTML tags for string matching only."""
    return re.sub(r'<[^>]+>', '', s)


def render_dt_table(dt):
    """Render a parsed datatype as an HTML Bubble-style table."""
    rows = []
    for f in dt['fields']:
        # List column: ✓ if is_list, blank otherwise
        list_cell = '<span class="dt-list-yes">✓</span>' if f['is_list'] else '<span class="dt-list-no">—</span>'

        # Notes column — plain text flag prefix (PK/Index/FK) + existing note
        flag_parts = []
        if 'pk' in f['flags']:
            flag_parts.append('Primary key')
        if 'idx' in f['flags']:
            flag_parts.append('Indexed')
        if 'fk' in f['flags']:
            flag_parts.append('Foreign key')
        flag_text = ', '.join(flag_parts)

        notes_parts = []
        if flag_text:
            if f['note']:
                notes_parts.append(f'<span class="dt-flag-inline">{flag_text}.</span> {f["note"]}')
            else:
                notes_parts.append(f'<span class="dt-flag-inline">{flag_text}</span>')
        elif f['note']:
            notes_parts.append(f['note'])
        notes_html = ' '.join(notes_parts)

        rows.append(
            f'        <tr>'
            f'<td class="dt-field-name">{f["name"]}</td>'
            f'<td class="dt-field-type">{f["type"]}</td>'
            f'<td class="dt-field-list">{list_cell}</td>'
            f'<td class="dt-field-note">{notes_html}</td>'
            f'</tr>'
        )

    desc_html = f'<div class="dt-table-desc">{dt["desc"]}</div>' if dt['desc'] else ''

    html = f'''<div class="dt-table">
  <div class="dt-table-head">
    <div class="dt-table-head-row">
      <span class="dt-table-label">Thing</span>
      <span class="dt-table-name">{dt["name"]}</span>
      <span class="dt-table-count">{len(dt["fields"])} fields</span>
    </div>
    {desc_html}
  </div>
  <table class="dt-fields">
    <thead>
      <tr>
        <th class="dt-col-name">Field name</th>
        <th class="dt-col-type">Type</th>
        <th class="dt-col-list">List</th>
        <th class="dt-col-note">Notes</th>
      </tr>
    </thead>
    <tbody>
{chr(10).join(rows)}
    </tbody>
  </table>
</div>'''
    return html


def rewrite_content(html):
    """Find all datatype blocks and replace with clean tables."""
    blocks = find_datatype_blocks(html)
    # Process from back to front to preserve offsets
    result = html
    count = 0
    for start, end, block in reversed(blocks):
        try:
            dt = parse_datatype_block(block)
            new_html = render_dt_table(dt)
            result = result[:start] + new_html + result[end:]
            count += 1
        except Exception as e:
            print(f'WARN: failed to parse block at {start}: {e}')
    return result, count


if __name__ == '__main__':
    import sys
    with open('CRS_Blueprint.html') as f:
        html = f.read()
    new_html, count = rewrite_content(html)
    with open('CRS_Blueprint.html', 'w') as f:
        f.write(new_html)
    print(f'Rewrote {count} datatype blocks to tables')
