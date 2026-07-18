#!/usr/bin/env node
// gen.js — `brain gen`: the ONE boxed-in model call of the CRS prompt engine.
// Pipeline (order is the contract): retrieval check → assemble (deterministic,
// verbatim) → GUARD (script, pre-model, can hard-stop) → one model call rendering
// the strict output template → archive with the bundle hash.
// Usage: node brain/engine/gen.js "<intent>" --module <name|id> [--model sonnet] [--effort low]
// The brain app's /api/modules/edit-prompt calls this same pipeline in-process —
// the chat does not freelance its own generation.
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');
const { assemble } = require('./assemble.js');
const { guard } = require('./guard.js');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const GENERATED_DIR = path.join(REPO_ROOT, 'brain', 'buildprint', 'generated');

const GEN_SYSTEM_PROMPT = `You are the CRS prompt engine's single generation step. You turn ONE intent plus a VERBATIM context bundle into ONE complete Buildprint prompt. The bundle between ===== markers is the ONLY source of truth — use ONLY facts present in it. Do not use outside knowledge about the app. Do not paraphrase rule text: where a rule is needed, copy the rule line from the bundle verbatim. If a needed fact is not in the bundle, write "VERIFY: <question>" instead of guessing — never invent element names, IDs, fields, or statuses. Never resolve anything the bundle marks open, ambiguous, or ⚠ — flag it.

OUTPUT exactly this markdown skeleton — all seven parts, this order, no extra sections, no preamble or closing chatter:

# Buildprint Prompt — <verb + precise scope>

**TEST/DEV branch only. Never live. Savepoint: "Before <scope>". Run \`buildprint check\` after each task. Do not push to live. Apply directly without confirmation.**

## TARGET
Branch (TEST), the page/reusable being changed (by name + ID from the bundle), the savepoint name.

## EXISTING REUSABLES BY ID
The reusable components from the bundle relevant to this change, each as \`name — ID\`. Recreating an existing element is FORBIDDEN — reuse it, or clone by id (\`--copy\`). If the bundle lists no relevant reusable, say so and make Task 0 locate one.

## STEPS FOR BP
Numbered tasks. Task 0 is ALWAYS locate-and-report: exact element / reusable / style names + IDs (and the data types touched) before any change. Each later task independently verifiable. Styling per the bundle's conventions: named paired styles \`Name (Dark)\` / \`Name (Light)\`, theme = full style swap on \`dark_theme is "no"\` only, zero property-level color conditionals, approved literals stay literal, reuse existing styles — do not fork near-duplicates.

## DATA / PRIVACY
Tenant scoping per the bundle's security rules — quote the applicable privacy-rule text verbatim (Pattern A: company AND property) and name exceptions only if the bundle names them. Any write goes through a private server-guarded backend workflow — no UI-only or auto-bound writes.

## WU NOTES
Only the WU guardrails from the bundle this change actually touches, each tagged with its bundle source file. If none apply, write exactly: "No WU-relevant surface in this change." plus one line of why.

## MANUAL VERIFICATION
The [NEG] list: checks Buildprint CANNOT run as the app owner (cross-tenant negatives, lesser-privileged accounts) — manual steps for Vlad, each line starting with "[NEG]". This section is LAST.`;

function buildGenMessage(bundleText, intent) {
  return '===== CONTEXT BUNDLE (verbatim, sole source of truth) =====\n' + bundleText +
    '\n===== END BUNDLE =====\n\nINTENT:\n' + intent +
    '\n\nWrite the Buildprint prompt for this intent per the template. Bundle facts only.';
}

// ---- retrieval transparency (deterministic, no model) ----
function normWords(s) { return new Set(String(s).toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/).filter(w => w.length > 2)); }
function jaccard(a, b) { const A = normWords(a), B = normWords(b); if (!A.size || !B.size) return 0; let i = 0; for (const w of A) if (B.has(w)) i++; return i / (A.size + B.size - i); }

function retrievalCheck(intent, threshold = 0.8) {
  if (!fs.existsSync(GENERATED_DIR)) return null;
  let best = null;
  for (const f of fs.readdirSync(GENERATED_DIR).filter(f => f.endsWith('.md')).sort()) {
    const full = path.join(GENERATED_DIR, f);
    const content = fs.readFileSync(full, 'utf8');
    const m = content.match(/^Intent:\s*(.+)$/m);
    const basis = m ? m[1] : f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    const sim = jaccard(intent, basis);
    if (!best || sim > best.sim) best = { rel: 'brain/buildprint/generated/' + f, sim, content };
  }
  return best && best.sim >= threshold ? { ...best, sim: best.sim.toFixed(2) } : null;
}

// ---- archive ----
function slugify(s, max = 44) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, max).replace(/-+$/, '');
}
function archive({ intent, module: modId, bundleSha, model, output, protoSha, chunkId }) {
  const date = new Date().toISOString().slice(0, 10);
  let name = date + '-' + modId + '-' + slugify(intent) + '.md', n = 2;
  while (fs.existsSync(path.join(GENERATED_DIR, name))) name = date + '-' + modId + '-' + slugify(intent) + '-' + (n++) + '.md';
  const head = ['<!-- generated by brain/engine/gen.js -->',
    'Intent: ' + intent.replace(/\s+/g, ' ').trim(),
    'Module: ' + modId,
    'Generated: ' + new Date().toISOString(),
    'Bundle-SHA256: ' + bundleSha,
    // Chunk emissions (brain/engine/chunk.js) stamp their provenance pair too:
    // the settled prototype hash + the chunk id the prompt was emitted for.
    ...(protoSha ? ['Prototype-SHA256: ' + protoSha] : []),
    ...(chunkId ? ['Chunk-Id: ' + chunkId] : []),
    'Model: ' + model, '', '---', '', ''].join('\n');
  fs.writeFileSync(path.join(GENERATED_DIR, name), head + output + '\n');
  return 'brain/buildprint/generated/' + name;
}

// ---- the one model call (CLI path; the server uses runClaudeStream with the same prompt) ----
function callModel(message, { model = 'sonnet', effort = 'low' } = {}) {
  return new Promise((resolve, reject) => {
    const args = ['-p', '--output-format', 'text', '--model', model, '--effort', effort,
      '--append-system-prompt', GEN_SYSTEM_PROMPT];
    // spawn WITHOUT shell:true (locked decision — args concatenate unescaped under a shell).
    const child = process.platform === 'win32'
      ? spawn('cmd.exe', ['/c', 'claude', ...args], { cwd: os.tmpdir(), windowsHide: true })
      : spawn('claude', args, { cwd: os.tmpdir() });
    let out = '', err = '';
    child.stdout.on('data', d => out += d);
    child.stderr.on('data', d => err += d);
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve(out.trim()) : reject(new Error('claude exited ' + code + ': ' + err.slice(0, 400))));
    child.stdin.end(message);
  });
}

// callModel exported for chunk.js's CLI emission path (same boxed call, same
// template); the server keeps supplying runClaudeStream instead.
module.exports = { GEN_SYSTEM_PROMPT, buildGenMessage, retrievalCheck, archive, jaccard, callModel };

if (require.main === module) {
  (async () => {
    const argv = process.argv.slice(2);
    const get = f => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : null; };
    const intent = argv[0] && !argv[0].startsWith('--') ? argv[0] : get('--intent');
    const modKey = get('--module');
    if (!intent || !modKey) { console.error('usage: node brain/engine/gen.js "<intent>" --module <name|id> [--model sonnet] [--effort low]'); process.exit(1); }

    // (a) retrieval transparency — before any generation
    const hit = retrievalCheck(intent);
    if (hit) {
      console.log('RETRIEVED from ' + hit.rel + ', not generated (similarity ' + hit.sim + '):\n');
      console.log(hit.content);
      return;
    }
    // (b) assemble — deterministic
    const bundle = assemble(modKey);
    console.error('bundle: ' + bundle.text.length + ' bytes · sha256 ' + bundle.sha256.slice(0, 16) + '… · module ' + bundle.module.id);
    // (c) GUARD — script, pre-model, hard stop
    const hits = guard(intent, bundle.module.id + ' ' + bundle.module.name);
    if (hits.length) {
      for (const h of hits) console.error('DECISION-NEEDED: ' + h.title + ' → decisions.md  (trigger: "' + h.trigger + '")');
      console.error('Generation stopped — make the call in decisions.md first.');
      process.exit(2);
    }
    console.error('guard: PASS');
    // (d) one model call + archive
    const model = get('--model') || 'sonnet', effort = get('--effort') || 'low';
    const out = await callModel(buildGenMessage(bundle.text, intent), { model, effort });
    if (!out) { console.error('gen: model returned nothing'); process.exit(1); }
    const file = archive({ intent, module: bundle.module.id, bundleSha: bundle.sha256, model, output: out });
    console.error('archived → ' + file);
    console.log(out);
  })().catch(e => { console.error('gen: ' + e.message); process.exit(1); });
}
