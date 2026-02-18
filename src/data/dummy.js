import { getPlatformUrl } from './platform-links'

// ── Wine SKUs ──
export const wines = [
  { name: 'Estate Viognier', category: 'White', price: 34, unitsSold: 189, channel: 'Tasting Room', revenue: 6426 },
  { name: 'Pinot Noir Reserve', category: 'Red', price: 48, unitsSold: 156, channel: 'Wine Club', revenue: 7488 },
  { name: 'Petite Sirah', category: 'Red', price: 42, unitsSold: 203, channel: 'Tasting Room', revenue: 8526 },
  { name: 'Primitivo', category: 'Red', price: 38, unitsSold: 134, channel: 'Online Sales', revenue: 5092 },
  { name: 'Chardonnay', category: 'White', price: 32, unitsSold: 221, channel: 'Wine Club', revenue: 7072 },
  { name: 'Sauvignon Blanc', category: 'White', price: 30, unitsSold: 167, channel: 'Online Sales', revenue: 5010 },
  { name: 'Estate Syrah', category: 'Red', price: 46, unitsSold: 142, channel: 'Tasting Room', revenue: 6532 },
  { name: 'Red Blend "Terroir"', category: 'Red', price: 52, unitsSold: 118, channel: 'Wine Club', revenue: 6136 },
]

// ── Monthly Revenue by Channel (12 months) ──
export const monthlyRevenue = [
  { month: 'Jan', tastingRoom: 18200, wineClub: 12400, online: 6800, events: 8200, total: 45600 },
  { month: 'Feb', tastingRoom: 19800, wineClub: 11200, online: 7200, events: 9400, total: 47600 },
  { month: 'Mar', tastingRoom: 24600, wineClub: 28800, online: 8400, events: 11200, total: 73000 },
  { month: 'Apr', tastingRoom: 28400, wineClub: 14600, online: 9200, events: 15800, total: 68000 },
  { month: 'May', tastingRoom: 32200, wineClub: 15200, online: 10600, events: 18400, total: 76400 },
  { month: 'Jun', tastingRoom: 35600, wineClub: 32400, online: 11800, events: 22600, total: 102400 },
  { month: 'Jul', tastingRoom: 38200, wineClub: 16800, online: 12400, events: 24200, total: 91600 },
  { month: 'Aug', tastingRoom: 36800, wineClub: 15400, online: 11200, events: 21800, total: 85200 },
  { month: 'Sep', tastingRoom: 34200, wineClub: 34600, online: 13600, events: 26400, total: 108800 },
  { month: 'Oct', tastingRoom: 42400, wineClub: 18200, online: 14800, events: 28600, total: 104000 },
  { month: 'Nov', tastingRoom: 38600, wineClub: 16400, online: 16200, events: 24800, total: 96000 },
  { month: 'Dec', tastingRoom: 32800, wineClub: 36200, online: 18400, events: 16200, total: 103600 },
]

// ── QuickBooks Categories ──
export const qbCategories = [
  { name: 'Wine Tastings', amount: 28400, pct: 33 },
  { name: 'Wine Club Billings', amount: 18200, pct: 21 },
  { name: 'Online Sales', amount: 14800, pct: 17 },
  { name: 'Tickets & Events', amount: 12600, pct: 15 },
  { name: 'Facility Rental', amount: 8400, pct: 10 },
  { name: 'Food Sales', amount: 3600, pct: 4 },
]

// ── Platform Cards ──
export const platforms = [
  {
    name: 'Commerce7',
    color: '#8B4049',
    url: getPlatformUrl('Commerce7'),
    metrics: [
      { label: 'Club Members', value: '187' },
      { label: 'Avg LTV', value: '$2,840' },
      { label: 'Retention', value: '78%' },
    ],
    description: 'Wine club management, POS, and e-commerce. The backbone of DTC operations.',
  },
  {
    name: 'Tock',
    color: '#2D2D2D',
    url: getPlatformUrl('Tock'),
    metrics: [
      { label: 'Tastings Booked', value: '94' },
      { label: 'Avg Ticket', value: '$68' },
      { label: 'This Month', value: '$6,392' },
    ],
    description: 'Reservation and experience booking. Handles all tasting appointments and events.',
  },
  {
    name: 'Square',
    color: '#4A7EC4',
    url: getPlatformUrl('Square'),
    metrics: [
      { label: 'Transactions', value: '312' },
      { label: 'Avg Sale', value: '$47' },
      { label: 'This Month', value: '$14,664' },
    ],
    description: 'Point-of-sale for walk-in tastings, retail, and food. The daily cash register.',
  },
  {
    name: 'VinoShipper',
    color: '#6B2D5B',
    url: getPlatformUrl('VinoShipper'),
    metrics: [
      { label: 'Orders', value: '43' },
      { label: 'States', value: '11' },
      { label: 'This Month', value: '$3,182' },
    ],
    description: 'Compliance and shipping for DTC wine orders. Handles state-by-state regulations.',
  },
]

// ── KPI Data (per month for dashboard) ──
export const kpiByMonth = {
  Oct: {
    totalRevenue: 104000,
    activeMembers: 187,
    avgOrderValue: 68,
    tastingsBooked: 94,
    timeToReport: '< 5 min',
    trends: {
      totalRevenue: { value: 12, direction: 'up' },
      activeMembers: { value: 3, direction: 'up' },
      avgOrderValue: { value: -2, direction: 'down' },
      tastingsBooked: { value: 18, direction: 'up' },
    },
  },
  Nov: {
    totalRevenue: 96000,
    activeMembers: 191,
    avgOrderValue: 72,
    tastingsBooked: 82,
    timeToReport: '< 5 min',
    trends: {
      totalRevenue: { value: -8, direction: 'down' },
      activeMembers: { value: 2, direction: 'up' },
      avgOrderValue: { value: 6, direction: 'up' },
      tastingsBooked: { value: -13, direction: 'down' },
    },
  },
  Dec: {
    totalRevenue: 103600,
    activeMembers: 194,
    avgOrderValue: 74,
    tastingsBooked: 78,
    timeToReport: '< 5 min',
    trends: {
      totalRevenue: { value: 8, direction: 'up' },
      activeMembers: { value: 2, direction: 'up' },
      avgOrderValue: { value: 3, direction: 'up' },
      tastingsBooked: { value: -5, direction: 'down' },
    },
  },
}

// ── Integration Feasibility ──
export const integrations = [
  { platform: 'Commerce7', url: getPlatformUrl('Commerce7'), api: 'REST', auth: 'Basic Auth', mcp: 'None verified', status: 'Ready', note: 'Well-documented, cursor pagination, 100 req/min' },
  { platform: 'Tock', url: getPlatformUrl('Tock'), api: 'REST', auth: 'API Key', mcp: 'None', status: 'Verify Plan', note: 'Premium plan required — must verify current plan' },
  { platform: 'Square', url: getPlatformUrl('Square'), api: 'REST', auth: 'Access Token', mcp: 'Official MCP', status: 'Ready', note: 'Best integration path, read-only mode available' },
  { platform: 'VinoShipper', url: getPlatformUrl('VinoShipper'), api: 'REST', auth: 'API Key + Secret', mcp: 'None', status: 'Ready', note: 'Simple API; native C7 integration may overlap' },
  { platform: 'Google Sheets', url: getPlatformUrl('Google Sheets'), api: 'REST', auth: 'Service Account', mcp: 'Official Google MCP', status: 'Ready', note: 'Clean automation path' },
  { platform: 'QuickBooks', url: getPlatformUrl('QuickBooks'), api: 'REST', auth: 'OAuth 2.0', mcp: 'Intuit MCP (preview)', status: 'Possible', note: 'OAuth token lifecycle adds complexity' },
]

// ── Recent Activity (static) ──
export const recentActivity = [
  { time: '6:02 AM', event: 'Commerce7 sync completed', detail: '187 member records, 34 new orders', status: 'success' },
  { time: '6:03 AM', event: 'Square daily pull', detail: '312 transactions totaling $14,664', status: 'success' },
  { time: '6:04 AM', event: 'Tock reservations synced', detail: '94 bookings for current month', status: 'success' },
  { time: '6:05 AM', event: 'VinoShipper orders imported', detail: '43 shipments across 11 states', status: 'success' },
  { time: '6:06 AM', event: 'Google Sheet updated', detail: 'October report generated, QB categories mapped', status: 'success' },
]
