#!/usr/bin/env python3
"""Re-sync brain/buildprint/ from docs.buildprint.ai.

Per-page refresh: each captured page stores its `> Source:` URL; we refetch
<url>.md (GitBook raw-markdown endpoint), and rewrite the body when upstream
changed. New pages found in llms.txt are added; pages gone upstream are flagged
in INDEX.md (not deleted — some of ours are consolidations).
Skips: INDEX.md, crs-brain-operations.md (ours), api-reference.md (OpenAPI-built).
"""
import os, re, sys, time, urllib.request
from datetime import date

BASE='https://docs.buildprint.ai'
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','brain','buildprint')
OUT=os.path.abspath(OUT)
SKIP={'INDEX.md','crs-brain-operations.md','api-reference.md'}
TODAY=date.today().isoformat()

def get(url):
    req=urllib.request.Request(url,headers={'User-Agent':'CRS-Brain-manual-sync/1.0'})
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.read().decode('utf-8')

def stable(s): return re.sub(r'\s+',' ',s).strip()

updated=same=failed=added=hubs=0
import urllib.error
known_urls=set()
for fn in sorted(os.listdir(OUT)):
    if not fn.endswith('.md') or fn in SKIP: continue
    p=os.path.join(OUT,fn)
    txt=open(p,encoding='utf-8').read()
    m=re.search(r'^> Source: (\S+)',txt,re.M)
    if not m: continue
    url=m.group(1); known_urls.add(url)
    title=txt.split('\n',1)[0][2:].strip()
    try:
        raw=get(url+'.md'); time.sleep(0.4)
    except urllib.error.HTTPError as e:
        if e.code==404: hubs+=1; continue   # section hub pages have no .md — keep our captured copy
        print(f'  fetch failed {fn}: {e}'); failed+=1; continue
    except Exception as e:
        print(f'  fetch failed {fn}: {e}'); failed+=1; continue
    if len(raw.strip())<80: failed+=1; continue
    # strip a leading duplicated title line from raw if present
    raw=raw.strip()
    raw=re.sub(r'^\[[^\]]*\]\s*\n','',raw)          # gitbook breadcrumb line
    raw=re.sub(r'^#\s+.+\n','',raw,count=1)          # duplicate h1
    old_body=txt.split('\n\n',1)[1] if '\n\n' in txt else ''
    if stable(old_body)==stable(raw): same+=1; continue
    open(p,'w',encoding='utf-8').write(f'# {title}\n> Source: {url} · Captured: {TODAY} (verbatim .md)\n\n{raw.strip()}\n')
    updated+=1

# new pages upstream?
try:
    nav=get(BASE+'/llms.txt')
    nav_urls=set(re.findall(r'\((https://docs\.buildprint\.ai/[^)]+?)(?:\.md)?\)',nav))
    fresh=[u for u in nav_urls if u not in known_urls and '/api-reference' not in u]
    for u in fresh:
        slug=u.rsplit('/',1)[-1]
        name=re.sub(r'-[a-z0-9]{5}$','',slug)+'.md'
        p=os.path.join(OUT,name)
        if os.path.exists(p): continue
        try:
            raw=get(u+'.md'); time.sleep(0.4)
        except Exception: failed+=1; continue
        if len(raw.strip())<80: continue
        t=re.match(r'#\s+(.+)',raw.strip())
        title=t.group(1).strip() if t else name[:-3].replace('-',' ').title()
        body=re.sub(r'^#\s+.+\n','',raw.strip(),count=1)
        open(p,'w',encoding='utf-8').write(f'# {title}\n> Source: {u} · Captured: {TODAY} (verbatim .md)\n\n{body.strip()}\n')
        print(f'  NEW page: {name} ← {u}')
        added+=1
except Exception as e:
    print(f'  nav check failed: {e}')

print(f'BUILDPRINT SUMMARY: ~{updated} updated, ={same} unchanged, +{added} new, ◦{hubs} hub pages kept, !{failed} failed')
