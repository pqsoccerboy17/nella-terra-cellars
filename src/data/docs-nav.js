/** Sidebar navigation tree for docs pages. */
export const docsNav = [
  {
    label: 'Overview',
    items: [
      { label: 'System Architecture', path: '/architecture', icon: 'grid' },
    ],
  },
  {
    label: 'Platform Layer',
    items: [
      { label: 'Platform Integrations', path: '/integrations', icon: 'plug' },
      { label: 'Data Pipeline', path: '/pipeline', icon: 'flow' },
    ],
  },
  {
    label: 'Automation Layer',
    items: [
      { label: 'Claude Code + Cowork', path: '/orchestration', icon: 'cpu' },
    ],
  },
  {
    label: 'Output',
    items: [
      { label: 'Live Demo Dashboard', path: '/dashboard', icon: 'chart' },
    ],
  },
]
