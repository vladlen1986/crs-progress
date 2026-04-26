"""
Module + tab mapping for CRS Spec restructure (v20 → v21 tabbed).

Format:
  MODULES = [
    {
      'id': 'module-slug',              # URL hash id
      'label': 'Module Name',           # Sidebar label
      'category': 'Operations',         # Sidebar group
      'icon': 'svg-name',               # From existing icon set
      'status': 'complete' | 'pending', # Progress tag
      'description': 'Short one-liner',  # For overview
      'tabs': {
        'overview':    ['s-xxx-overview', 's-xxx-decisions'],
        'data-model':  ['s-xxx-fields', ...],
        'workflows':   [...],
        'privacy':     [...],  # privacy + permissions merged
        'ui':          [...],
        'activity':    [...],
        'notifications':[...],
        'dependencies':[],  # Always present, content generated
        'api':         [],  # Optional
        'edge-cases':  [],  # Optional
      }
    },
  ]

Global (non-module) sections go to a special "platform" pseudo-module
or are kept as top-level standalone pages (Overview, Principles, Roadmap).
"""

# Top-level / platform-wide pages (not module-specific)
PLATFORM_PAGES = [
    {
        'id': 'app-overview',
        'label': 'App Overview',
        'group': 'Overview',
        'sections': ['s-overview'],
    },
    {
        'id': 'blueprint-progress',
        'label': 'Blueprint Progress',
        'group': 'Overview',
        'sections': ['s-progress'],
    },
    {
        'id': 'critical-decisions',
        'label': 'Critical Decisions',
        'group': 'Overview',
        'sections': ['s-decisions'],
    },
    {
        'id': 'subscription-tiers',
        'label': 'Subscription Tiers',
        'group': 'Overview',
        'sections': ['s-tiers'],
    },
    {
        'id': 'search-architecture',
        'label': 'Search Architecture',
        'group': 'Overview',
        'sections': ['s-search-arch'],
    },
    {
        'id': 'plugins',
        'label': 'Plugins',
        'group': 'Overview',
        'sections': ['s-plugins'],
    },
    {
        'id': 'roadmap',
        'label': 'Development Roadmap',
        'group': 'Overview',
        'sections': ['s-roadmap'],
    },
    {
        'id': 'module-directory',
        'label': 'Module Directory',
        'group': 'Overview',
        'sections': ['s-modules'],
    },
    {
        'id': 'data-model-principles',
        'label': 'Data Model Principles',
        'group': 'Foundation',
        'sections': ['s-dm-principles', 's-dm-core'],
    },
    {
        'id': 'pending-sections',
        'label': 'Pending Sections',
        'group': 'Overview',
        'sections': ['s-pending'],
    },
]

# Full modules (each with tabbed content)
# Each module has a 'components' dict describing Bubble elements the user builds:
#   - pages: list of {'name': '#PageName', 'note': 'optional description'}
#   - popups: list of {'name': 'PP - Name', 'note': '...'}
#   - floating_groups: list of {'name': 'FG - Name', 'note': '...'}
#   - reusable_groups: list of {'name': 'GR - Name', 'note': '...'}
# Filled in progressively as the user confirms each module.
MODULES = [
    # ═══ ADMIN CORE ═══
    {
        'id': 'roles-permissions',
        'label': 'Roles & Permissions',
        'category': 'Admin',
        'status': 'complete',
        'description': 'Role management, permission taxonomy, permission requests, audit trail',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-rp-overview'],
            'data-model':    ['s-rp-model', 's-rp-permissions-os'],
            'workflows':     ['s-rp-workflows', 's-rp-requests'],
            'privacy':       ['s-rp-privacy'],
            'ui':            ['s-rp-picker'],
            'activity':      ['s-rp-audit'],
        },
    },
    {
        'id': 'notifications',
        'label': 'Notifications',
        'category': 'Admin',
        'status': 'complete',
        'description': 'In-app + email notification infrastructure, preferences, dedupe, batching',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-notif-overview'],
            'data-model':    ['s-notif-model', 's-notif-events'],
            'workflows':     ['s-notif-recipients', 's-notif-dedupe', 's-notif-workflow'],
            'privacy':       ['s-notif-privacy'],
            'ui':            ['s-notif-ui', 's-notif-preferences', 's-notif-email'],
            'edge-cases':    ['s-notif-retention'],
        },
    },
    {
        'id': 'activity-log',
        'label': 'System Activity Log',
        'category': 'Admin',
        'status': 'complete',
        'description': 'Unified audit trail across all modules with filtering + export',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-activity-overview'],
            'data-model':    ['s-dm-activity', 's-activity-model', 's-activity-actions', 's-activity-subjects'],
            'workflows':     ['s-activity-mapping', 's-activity-write'],
            'privacy':       ['s-activity-privacy'],
            'ui':            ['s-activity-ui', 's-activity-export'],
            'edge-cases':    ['s-activity-retention'],
        },
    },
    {
        'id': 'casino-settings',
        'label': 'Casino Settings',
        'category': 'Admin',
        'status': 'complete',
        'description': 'Company + Property settings — timezone, currency, fiscal week, branding',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-cs-overview'],
            'data-model':    ['s-cs-company', 's-cs-property', 's-cs-tzcurrency', 's-cs-gamingdate', 's-cs-fiscalweek', 's-cs-branding', 's-cs-numbering'],
            'workflows':     ['s-cs-time-retrofit'],
            'privacy':       ['s-cs-privacy'],
            'ui':            ['s-cs-ui', 's-cs-time-ui'],
            'activity':      ['s-cs-time-activity'],
            'notifications': ['s-cs-time-notifications'],
        },
    },
    {
        'id': 'user-management',
        'label': 'User Management',
        'category': 'Admin',
        'status': 'complete',
        'description': 'Create users, assign roles + departments, deactivate, anonymize, sessions, 2FA',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-um-overview'],
            'data-model':    ['s-um-user', 's-um-preferences', 's-um-session', 's-um-presence'],
            'workflows':     ['s-um-creation', 's-um-auth', 's-um-password', 's-um-deactivation', 's-um-roles'],
            'privacy':       ['s-um-privacy', 's-um-permissions'],
            'ui':            ['s-um-profile', 's-um-directory'],
        },
    },

    # ═══ OPERATIONS ═══
    {
        'id': 'reporting',
        'label': 'Reporting',
        'category': 'Operations',
        'status': 'complete',
        'description': 'Incident reporting pipeline — Draft → Submit → Verify → Review → Send → Close',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-rep-overview', 's-rep-groups'],
            'data-model':    ['s-dm-reporting', 's-rep-fields'],
            'workflows':     ['s-rep-pipeline', 's-rep-flows', 's-rep-send', 's-rep-people', 's-rep-locking', 's-rep-sla'],
            'privacy':       ['s-rep-visibility'],
            'ui':            ['s-rep-comments', 's-rep-export', 's-rep-pdf', 's-rep-collections'],
            'activity':      ['s-rep-audit'],
            'notifications': ['s-rep-notifications'],
            'edge-cases':    ['s-rep-stats', 's-rep-future'],
        },
    },
    {
        'id': 'task-management',
        'label': 'Task Management',
        'category': 'Operations',
        'status': 'complete',
        'description': 'Task assignment, tracking, Kanban/List/Minimal views + Subtasks',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-tasks'],
            'data-model':    ['s-dm-tasks', 's-tasks-fields', 's-tasks-subtasks', 's-tasks-tags'],
            'workflows':     ['s-tasks-pipeline'],
            'privacy':       ['s-tasks-visibility'],
            'ui':            ['s-tasks-views'],
            'notifications': ['s-tasks-notifications'],
            'edge-cases':    ['s-tasks-stats'],
        },
    },
    {
        'id': 'request-for-investigation',
        'label': 'Request for Investigation',
        'category': 'Operations',
        'status': 'complete',
        'description': 'Cross-department investigation requests with acceptance workflow',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-rfi'],
            'data-model':    ['s-rfi-fields', 's-rfi-roles'],
            'workflows':     ['s-rfi-pipeline', 's-rfi-lifecycle'],
            'notifications': ['s-rfi-notifications'],
        },
    },

    # ═══ HR ═══
    {
        'id': 'employee-management',
        'label': 'Employee Management',
        'category': 'HR',
        'status': 'complete',
        'description': 'Employee directory, org hierarchy, multi-property, documents, notes, GDPR',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-em-overview'],
            'data-model':    ['s-em-option-sets', 's-em-hierarchy', 's-em-employee', 's-em-assignment', 's-em-leave-separation', 's-em-documents', 's-em-notes', 's-em-skills', 's-em-history'],
            'workflows':     ['s-em-anonymization'],
            'privacy':       ['s-em-privacy'],
            'activity':      ['s-em-activity'],
            'notifications': ['s-em-notifications'],
        },
    },
    {
        'id': 'onboarding-job-board',
        'label': 'Onboarding + Job Board',
        'category': 'HR',
        'status': 'complete',
        'description': 'Public job board, applicant tracking, onboarding checklists, GDPR compliance',
        'components': {
            'pages': [],
            'popups': [],
            'floating_groups': [],
            'reusable_groups': [],
        },
        'tabs': {
            'overview':      ['s-hire-overview', 's-hire-decisions'],
            'data-model':    ['s-hire-option-sets', 's-hire-applicant-account', 's-hire-job-opening', 's-hire-opening-translation', 's-hire-screening-question', 's-hire-applicant', 's-hire-applicant-draft', 's-hire-applicant-children', 's-hire-interview'],
            'workflows':     ['s-hire-pipeline', 's-hire-conversion', 's-hire-duplicates', 's-hire-onboarding-templates', 's-hire-onboarding-checklist', 's-hire-onboarding-workflow', 's-hire-public-wf'],
            'privacy':       ['s-hire-permissions', 's-hire-privacy-matrix', 's-hire-gdpr'],
            'ui':            ['s-hire-applicant-detail', 's-hire-urls', 's-hire-form', 's-hire-portal', 's-hire-i18n'],
            'activity':      ['s-hire-activity'],
            'notifications': ['s-hire-notifications-events'],
            'edge-cases':    ['s-hire-kpis'],
        },
    },
]

TAB_ORDER = ['overview', 'data-model', 'workflows', 'privacy', 'ui', 'activity', 'notifications', 'dependencies', 'api', 'edge-cases']

TAB_LABELS = {
    'overview': 'Overview',
    'data-model': 'Data Model',
    'workflows': 'Workflows',
    'privacy': 'Privacy & Permissions',
    'ui': 'UI Components',
    'activity': 'Activity Log',
    'notifications': 'Notifications',
    'dependencies': 'Dependencies',
    'api': 'API',
    'edge-cases': 'Edge Cases',
}

CATEGORY_ORDER = ['Overview', 'Foundation', 'Operations', 'Surveillance', 'Guests', 'HR', 'Compliance', 'Communication', 'Admin']

if __name__ == '__main__':
    # Verify completeness: every section_id in v20 should be assigned somewhere
    all_section_ids = set()
    for p in PLATFORM_PAGES:
        for s in p['sections']:
            all_section_ids.add(s)
    for m in MODULES:
        for tab_id, sections in m['tabs'].items():
            for s in sections:
                all_section_ids.add(s)
    print(f'Assigned section IDs: {len(all_section_ids)}')
    print(f'Modules: {len(MODULES)}')
    print(f'Platform pages: {len(PLATFORM_PAGES)}')
