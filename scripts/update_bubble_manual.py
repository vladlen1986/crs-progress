#!/usr/bin/env python3
"""Re-sync brain/bubble/ from manual.bubble.io (GitBook llms-full export).

Deterministic mirror: downloads llms.txt (nav) + llms-full.txt chunks (verbatim
content), splits on page headers, rewrites brain/bubble/<path>.md, deletes pages
that no longer exist upstream, regenerates INDEX.md. Prints a change summary.
Exit code: 0 = ok (changes or not), 1 = fatal (structure mismatch — do not trust).
"""
import os, re, sys, html, hashlib, urllib.request
from collections import defaultdict
from datetime import date

BASE='https://manual.bubble.io'
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','brain','bubble')
OUT=os.path.abspath(OUT)
KEEP={'INDEX.md','INVENTORY.md'}
TODAY=date.today().isoformat()

def get(url):
    req=urllib.request.Request(url,headers={'User-Agent':'CRS-Brain-manual-sync/1.0'})
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.read().decode('utf-8')

# nav
urls=[]
for line in get(BASE+'/llms.txt').splitlines():
    m=re.search(r'\[([^\]]*)\]\((https://manual\.bubble\.io/[^)]+?)(?:\.md)?\)',line)
    if m: urls.append((m.group(1).strip(),m.group(2)))
print(f'nav pages: {len(urls)}')

# content chunks: /llms-full.txt then /llms-full.txt/1..N until 404
full=''
i=0
while True:
    u=BASE+'/llms-full.txt'+('' if i==0 else f'/{i}')
    try: chunk=get(u)
    except Exception: break
    full+=chunk.rstrip('\n')+'\n'; i+=1
    if i>40: break
print(f'chunks fetched: {i}')

parts=re.split(r'\n(?=# )','\n'+full.lstrip('\n'))
parts=[p.strip('\n') for p in parts if p.strip().startswith('# ')]
print(f'page blocks: {len(parts)}')
if len(parts)!=len(urls):
    print('FATAL: nav/content count mismatch — aborting without changes'); sys.exit(1)

def norm(s): return re.sub(r'\W+','',s).lower()
mm=sum(1 for (t,_),b in zip(urls,parts) if norm(b.split('\n',1)[0][2:])!=norm(t))
if mm>10:
    print(f'FATAL: {mm} title mismatches — aborting'); sys.exit(1)

import urllib.parse
# Windows-safe path segments: NTFS can't store names ending in '.' or ' ' and
# reserves CON/PRN/AUX/NUL/COM1-9/LPT1-9 — a verbatim URL slug like
# "building-for..." breaks `git checkout` on the office PC. Sanitize each segment.
_RESERVED={'con','prn','aux','nul'}|{f'com{i}' for i in range(1,10)}|{f'lpt{i}' for i in range(1,10)}
def winsafe(path):
    out=[]
    for seg in path.split('/'):
        seg=seg.rstrip('. ')
        if seg.split('.')[0].lower() in _RESERVED: seg='_'+seg
        out.append(seg or '_')
    return '/'.join(out)
new_files={}
index=defaultdict(list)
for (title,url),block in zip(urls,parts):
    path=winsafe(urllib.parse.urlparse(url).path.strip('/') or 'index')
    rel=path+'.md'
    body=block.split('\n',1)[1] if '\n' in block else ''
    content=f'# {title}\n> Source: {url} · Captured: {TODAY} (verbatim from manual.bubble.io llms-full.txt)\n\n'+body.strip()+'\n'
    new_files[rel]=content
    section=path.split('/')[0] if '/' in path else '(top)'
    sub=path.split('/')[1] if path.count('/')>=2 else ''
    index[(section,sub)].append((title,rel))

# diff against disk (ignore the Captured date line when comparing)
def stable(c): return re.sub(r' · Captured: \d{4}-\d{2}-\d{2}','',c)
added=changed=same=0
for rel,content in new_files.items():
    p=os.path.join(OUT,rel)
    os.makedirs(os.path.dirname(p),exist_ok=True)
    if not os.path.exists(p): added+=1
    else:
        old=open(p,encoding='utf-8').read()
        if stable(old)==stable(content): same+=1; continue
        changed+=1
    open(p,'w',encoding='utf-8').write(content)
# stale pages
removed=0
for root,_,files in os.walk(OUT):
    for f in files:
        if not f.endswith('.md'): continue
        rel=os.path.relpath(os.path.join(root,f),OUT)
        if rel in KEEP or rel in new_files: continue
        os.remove(os.path.join(root,f)); removed+=1
# INDEX
lines=['# Bubble.io Manual (complete — manual.bubble.io)','',
       f'> Synced {TODAY} verbatim via GitBook llms-full export. {len(new_files)} pages, all sections.',
       '> Question about HOW Bubble works (data, privacy rules, workflows, API, elements, workload, security…)',
       '> → open the page below. CRS project decisions in ../../decisions.md and ../CLAUDE.md override generic manual advice.',
       '> Buildprint tool manual lives in ../buildprint/INDEX.md.','']
cur=None
for (section,sub) in sorted(index):
    if section!=cur: lines.append(f'\n## {section}'); cur=section
    if sub: lines.append(f'\n### {sub}')
    for title,rel in index[(section,sub)]: lines.append(f'- [{title}]({rel})')
open(os.path.join(OUT,'INDEX.md'),'w',encoding='utf-8').write('\n'.join(lines)+'\n')
print(f'BUBBLE SUMMARY: {len(new_files)} pages | +{added} added, ~{changed} changed, ={same} unchanged, -{removed} removed')
