/** Technical content data for docs pages — MCP configs, code snippets, field mappings. */
import { getPlatformUrl } from './platform-links'

export const techStack = {
  platform: [
    { name: 'Commerce7', url: getPlatformUrl('Commerce7'), role: 'Wine club, POS, e-commerce', api: 'REST', auth: 'Basic Auth' },
    { name: 'Tock', url: getPlatformUrl('Tock'), role: 'Reservations & experiences', api: 'REST', auth: 'API Key' },
    { name: 'Square', url: getPlatformUrl('Square'), role: 'Walk-in POS, retail, food', api: 'REST', auth: 'Access Token' },
    { name: 'VinoShipper', url: getPlatformUrl('VinoShipper'), role: 'DTC compliance & shipping', api: 'REST', auth: 'API Key + Secret' },
  ],
  automation: [
    { name: 'Claude Code', role: 'Headless agent loop — orchestrates all data pulls', version: 'Claude 4 Opus/Sonnet' },
    { name: 'Cowork', role: 'Multi-agent parallelism — 4 platform agents run simultaneously', version: 'Built-in' },
    { name: 'MCP Servers', role: 'One Model Context Protocol server per platform', version: 'Various' },
    { name: 'Cron / LaunchAgent', role: 'Nightly trigger at 6:00 AM', version: 'macOS native' },
  ],
  output: [
    { name: 'Google Sheets', url: getPlatformUrl('Google Sheets'), role: 'Revenue report — one sheet per month', auth: 'Service Account' },
    { name: 'QuickBooks Online', url: getPlatformUrl('QuickBooks'), role: 'Journal entries with QB categories', auth: 'OAuth 2.0' },
  ],
}

export const mcpConfigs = {
  commerce7: {
    title: 'Commerce7 MCP Server',
    language: 'json',
    code: `{
  "mcpServers": {
    "commerce7": {
      "command": "node",
      "args": ["mcp-server-commerce7/index.js"],
      "env": {
        "C7_TENANT": "nella-terra",
        "C7_API_KEY": "$C7_API_KEY"
      }
    }
  }
}`,
  },
  tock: {
    title: 'Tock MCP Server',
    language: 'json',
    code: `{
  "mcpServers": {
    "tock": {
      "command": "node",
      "args": ["mcp-server-tock/index.js"],
      "env": {
        "TOCK_API_KEY": "$TOCK_API_KEY",
        "TOCK_VENUE_ID": "nella-terra-cellars"
      }
    }
  }
}`,
  },
  square: {
    title: 'Square MCP Server (Official)',
    language: 'json',
    code: `{
  "mcpServers": {
    "square": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-square"],
      "env": {
        "SQUARE_ACCESS_TOKEN": "$SQUARE_ACCESS_TOKEN",
        "SQUARE_ENVIRONMENT": "production"
      }
    }
  }
}`,
  },
  vinoshipper: {
    title: 'VinoShipper MCP Server',
    language: 'json',
    code: `{
  "mcpServers": {
    "vinoshipper": {
      "command": "node",
      "args": ["mcp-server-vinoshipper/index.js"],
      "env": {
        "VS_API_KEY": "$VS_API_KEY",
        "VS_API_SECRET": "$VS_API_SECRET"
      }
    }
  }
}`,
  },
  googleSheets: {
    title: 'Google Sheets MCP Server (Official)',
    language: 'json',
    code: `{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-google-sheets"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "$GOOGLE_SA_KEY",
        "SPREADSHEET_ID": "$SHEET_ID"
      }
    }
  }
}`,
  },
  quickbooks: {
    title: 'QuickBooks MCP Server (Intuit Preview)',
    language: 'json',
    code: `{
  "mcpServers": {
    "quickbooks": {
      "command": "node",
      "args": ["mcp-server-quickbooks/index.js"],
      "env": {
        "QB_CLIENT_ID": "$QB_CLIENT_ID",
        "QB_CLIENT_SECRET": "$QB_CLIENT_SECRET",
        "QB_REFRESH_TOKEN": "$QB_REFRESH_TOKEN",
        "QB_REALM_ID": "$QB_REALM_ID"
      }
    }
  }
}`,
  },
}

export const fieldMappings = {
  commerce7: {
    title: 'Commerce7 → Normalized',
    language: 'javascript',
    code: `// Commerce7 order normalization
function normalizeC7Order(raw) {
  return {
    id: raw.id,
    source: 'commerce7',
    date: raw.completedAt,
    amount: raw.total / 100,        // cents → dollars
    channel: raw.orderType,          // 'club' | 'pos' | 'web'
    customer: raw.customer?.email,
    items: raw.lineItems.map(li => ({
      sku: li.sku,
      name: li.title,
      qty: li.quantity,
      price: li.price / 100,
    })),
  }
}`,
  },
  tock: {
    title: 'Tock → Normalized',
    language: 'javascript',
    code: `// Tock reservation normalization
function normalizeTockBooking(raw) {
  return {
    id: raw.booking_id,
    source: 'tock',
    date: raw.date,
    amount: raw.total_price,         // already in dollars
    channel: 'tasting',
    customer: raw.guest_email,
    items: [{
      sku: 'TASTING-' + raw.experience_id,
      name: raw.experience_name,
      qty: raw.party_size,
      price: raw.price_per_guest,
    }],
  }
}`,
  },
  square: {
    title: 'Square → Normalized',
    language: 'javascript',
    code: `// Square transaction normalization
function normalizeSquareTxn(raw) {
  return {
    id: raw.id,
    source: 'square',
    date: raw.created_at,
    amount: raw.total_money.amount / 100,
    channel: 'pos',
    customer: raw.customer_id || null,
    items: raw.line_items.map(li => ({
      sku: li.catalog_object_id,
      name: li.name,
      qty: parseInt(li.quantity),
      price: li.base_price_money.amount / 100,
    })),
  }
}`,
  },
  vinoshipper: {
    title: 'VinoShipper → Normalized',
    language: 'javascript',
    code: `// VinoShipper order normalization
function normalizeVSOrder(raw) {
  return {
    id: raw.order_number,
    source: 'vinoshipper',
    date: raw.created_date,
    amount: parseFloat(raw.total),
    channel: 'dtc-ship',
    customer: raw.customer.email,
    items: raw.items.map(item => ({
      sku: item.product_sku,
      name: item.product_name,
      qty: item.quantity,
      price: parseFloat(item.unit_price),
    })),
  }
}`,
  },
}

export const qbCategoryRules = [
  { condition: 'source === "tock"', category: 'Wine Tastings', account: '4100' },
  { condition: 'channel === "club"', category: 'Wine Club Billings', account: '4200' },
  { condition: 'channel === "web" || channel === "dtc-ship"', category: 'Online Sales', account: '4300' },
  { condition: 'item.sku.startsWith("EVENT")', category: 'Tickets & Events', account: '4400' },
  { condition: 'item.sku.startsWith("RENTAL")', category: 'Facility Rental', account: '4500' },
  { condition: 'item.category === "food"', category: 'Food Sales', account: '4600' },
  { condition: 'default', category: 'Wine Tastings', account: '4100' },
]

export const agentPseudocode = {
  title: 'Agent Entry Point (simplified)',
  language: 'bash',
  code: `#!/bin/bash
# Nightly automation — triggered by cron at 6:00 AM

claude --headless \\
  --model claude-sonnet-4-6 \\
  --mcp-config ./mcp-servers.json \\
  --prompt "$(cat <<'PROMPT'
    Pull yesterday's transactions from all four platforms.
    Normalize each into the standard order schema.
    Categorize line items into QuickBooks accounts.
    Reconcile C7/VinoShipper overlap (dedup by order ID).
    Write the summary row to Google Sheets.
    Generate a QuickBooks journal entry draft.
    Report: totals, anomalies, and any platform errors.
PROMPT
)"`,
}

export const coworkConfig = {
  title: 'Cowork Multi-Agent Spawn',
  language: 'javascript',
  code: `// Main agent spawns 4 parallel Cowork sub-agents
const agents = [
  { name: 'commerce7-agent', mcp: 'commerce7', task: 'Pull C7 orders + club data' },
  { name: 'tock-agent',      mcp: 'tock',      task: 'Pull Tock reservations' },
  { name: 'square-agent',    mcp: 'square',     task: 'Pull Square transactions' },
  { name: 'vino-agent',      mcp: 'vinoshipper', task: 'Pull VinoShipper orders' },
]

// All 4 run simultaneously via Cowork
// Sequential: ~2 min total  →  Parallel: ~35 seconds
// Main agent waits for all, then merges + categorizes`,
}

export const designPatterns = [
  {
    name: 'Read-Only Access',
    description: 'Every MCP server connects with read-only credentials. No writes to source platforms — eliminates the risk of corrupting POS or club data.',
  },
  {
    name: 'Nightly Batch',
    description: 'Data pulls run once per night at 6:00 AM. No real-time sync complexity. Batch processing is simpler, cheaper, and easier to debug.',
  },
  {
    name: 'Parallel Agents',
    description: 'Cowork spawns one agent per platform. All four pull data simultaneously. Wall-clock time drops from ~2 minutes to ~35 seconds.',
  },
  {
    name: 'Idempotent Sync',
    description: 'Every sync run produces the same output given the same input. Re-running a failed sync is always safe — no duplicate entries, no side effects.',
  },
  {
    name: 'Normalize First',
    description: 'All platform data converts to a common order schema before any business logic. Categorization rules never touch raw API responses.',
  },
  {
    name: 'Source-of-Truth Hierarchy',
    description: 'Commerce7 is authoritative for club orders. When C7 and VinoShipper report the same order (by ID), C7 wins and VS is deduplicated.',
  },
]
