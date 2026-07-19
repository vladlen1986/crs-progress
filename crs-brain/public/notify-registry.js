/* CRS Brain — notification type registry (Phase 10, notification system v2).
 * Single source of truth for every notification type the app can emit.
 * Each type: { id, name, description, category, level, defaultSound,
 *              defaults:{banner,sound,bell} }.
 * Channel-default policy: errors / needs-attention and routine completions
 * ship on all three channels; chatty informational types are banner-only.
 * User overrides live server-side in settings.notifyPrefs.types[<id>]
 * ({banner,sound,bell,soundId}) — the registry only holds the defaults.
 * Loaded as a classic script (one shared global scope, like icons.js). */
(function () {
  'use strict';

  // Category → icon (§16: Feather-style stroke symbols already in index.html)
  // + role color (§20.5 initials-fallback color roles / §2.5.1 utility colors).
  var CATEGORIES = [
    { id: 'system', name: 'System',      icon: 'i-plug',    color: 'var(--cyan)' },
    { id: 'tasks',  name: 'Tasks',       icon: 'i-list',    color: 'var(--good)' },
    { id: 'bubble', name: 'Bubble sync', icon: 'i-refresh', color: 'var(--purple)' },
    { id: 'general', name: 'General',    icon: 'i-bell',    color: 'var(--accent2)' },
  ];

  function T(id, name, description, category, level, defaultSound, banner, sound, bell) {
    return { id: id, name: name, description: description, category: category, level: level,
             defaultSound: defaultSound, defaults: { banner: !!banner, sound: !!sound, bell: !!bell } };
  }

  var LIST = [
    // ---- System ----
    T('connection-lost',     'Connection lost',       'Internet dropped — Claude/agent work will fail until it returns.', 'system', 'error',   's22', 1, 1, 1),
    T('connection-restored', 'Connection restored',   'Internet or the brain server came back.',                          'system', 'success', 's07', 1, 1, 1),
    T('server-unreachable',  'Server unreachable',    'The local brain server stopped responding.',                       'system', 'error',   's24', 1, 1, 1),
    // ---- Tasks ----
    T('task-complete',       'Task complete',         'A chat, agent, or queue task finished.',                           'tasks',  'success', 's02', 1, 1, 1),
    T('task-failed',         'Task failed',           'A run errored — nothing is retried automatically.',                'tasks',  'error',   's21', 1, 1, 1),
    T('queue-blocked-limit', 'Queue paused — limit',  'The task queue hit the usage window and armed an auto-resume.',    'tasks',  'warning', 's20', 1, 1, 1),
    T('queue-resumed',       'Queue resumed',         'The usage window reset — queued tasks are running again.',         'tasks',  'info',    's12', 1, 1, 1),
    T('follow-up-due',       'Follow-up due',         'A dashboard follow-up hit its due time and needs you.',            'tasks',  'warning', 's19', 1, 1, 1),
    T('question-pending',    'Question pending',      'A session is blocked on a question — answer the card to resume it.', 'tasks', 'warning', 's15', 1, 1, 1),
    // ---- Bubble sync ----
    T('forum-new-topics',    'Forum: new topics',     'New CRS-relevant Bubble forum topics appended to the digest.',     'bubble', 'info',    's01', 1, 1, 1),
    T('release-notes-new',   'Release notes: new',    'New Bubble release-notes entries were recorded.',                  'bubble', 'info',    's01', 1, 1, 1),
    T('decision-attention',  'Decision attention',    'A platform change may affect a locked CRS decision.',              'bubble', 'warning', 's19', 1, 1, 1),
    T('sync-failed',         'Sync failed',           'A Bubble watcher (forum / release notes / issues) errored.',       'bubble', 'error',   's21', 1, 1, 1),
    T('issue-report-new',    'Issue report ready',    'The read-only Bubble issue check flagged issue lines.',            'bubble', 'warning', 's17', 1, 1, 1),
    // ---- General ----
    T('info',                'Info',                  'General informational messages — banner only by default.',         'general', 'info',    's13', 1, 0, 0),
    T('success',             'Success',               'A general action completed.',                                      'general', 'success', 's10', 1, 1, 1),
    T('warning',             'Warning',               'Something needs your attention.',                                  'general', 'warning', 's19', 1, 1, 1),
    T('error',               'Error',                 'Something failed.',                                                'general', 'error',   's21', 1, 1, 1),
  ];

  var TYPES = {};
  LIST.forEach(function (t) { TYPES[t.id] = t; });

  // Legacy records (pre-v2 jsonl rows + old notify() levels) → registry ids.
  var BY_LEVEL = { info: 'info', success: 'success', warning: 'warning', error: 'error' };
  var LEGACY = {
    connection: { success: 'connection-restored', error: 'connection-lost' },
    queue:      { success: 'task-complete', warning: 'queue-blocked-limit', error: 'task-failed', info: 'queue-resumed' },
    bubble:     { warning: 'decision-attention', error: 'sync-failed', info: 'release-notes-new' },
    generation: { success: 'task-complete', error: 'task-failed' },
  };
  function legacyType(type, level) {
    if (TYPES[type]) return type;
    var m = LEGACY[type];
    return (m && m[level]) || BY_LEVEL[level] || 'info';
  }

  window.NOTIFY_TYPES = TYPES;
  window.NOTIFY_CATEGORIES = CATEGORIES;
  window.NOTIFY_ORDER = LIST.map(function (t) { return t.id; });
  window.NOTIFY_LEGACY = legacyType;
})();
