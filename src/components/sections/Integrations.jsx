import { platforms } from '../../data/dummy'
import { mcpConfigs } from '../../data/docs-content'
import SectionHeading from '../ui/SectionHeading'
import TableOfContents from '../ui/TableOfContents'
import TechCallout from '../ui/TechCallout'
import CodeBlock from '../ui/CodeBlock'
import IntegrationTable from '../ui/IntegrationTable'
import PlatformCard from '../ui/PlatformCard'
import { AnimatedSection, AnimatedDiv } from '../shared/AnimatedSection'

const TOC = [
  { id: 'commerce7', label: 'Commerce7', level: 2 },
  { id: 'tock', label: 'Tock', level: 2 },
  { id: 'square', label: 'Square', level: 2 },
  { id: 'vinoshipper', label: 'VinoShipper', level: 2 },
  { id: 'google-sheets', label: 'Google Sheets', level: 2 },
  { id: 'quickbooks', label: 'QuickBooks', level: 2 },
  { id: 'feasibility-matrix', label: 'Feasibility Matrix', level: 2 },
]

const PLATFORM_DETAILS = [
  {
    id: 'commerce7',
    platformIndex: 0,
    mcpKey: 'commerce7',
    api: 'REST API with cursor-based pagination',
    auth: 'Basic Auth (base64-encoded API key)',
    rate: '100 requests/minute',
    data: 'Orders, club members, customers, products',
    notes: 'The backbone of DTC — wine club, POS, and e-commerce. Well-documented API. Custom MCP server wraps their pagination model into simple tool calls.',
  },
  {
    id: 'tock',
    platformIndex: 1,
    mcpKey: 'tock',
    api: 'REST API',
    auth: 'API Key in header',
    rate: 'Not published — conservative polling',
    data: 'Reservations, experiences, guest details',
    notes: null,
    warning: 'Tock API access requires a Premium or Enterprise plan. Must verify Nella Terra\'s current Tock plan before integration. If on a lower tier, reservation data could be pulled from email confirmations as a fallback.',
  },
  {
    id: 'square',
    platformIndex: 2,
    mcpKey: 'square',
    api: 'REST API (v2)',
    auth: 'Access Token (OAuth optional)',
    rate: 'Generous — no practical limit for nightly batch',
    data: 'Transactions, line items, payments, catalog',
    notes: 'Best integration path. Square has an official Anthropic MCP server — no custom wrapper needed. Read-only mode available for production safety.',
  },
  {
    id: 'vinoshipper',
    platformIndex: 3,
    mcpKey: 'vinoshipper',
    api: 'REST API',
    auth: 'API Key + Secret',
    rate: 'Standard REST limits',
    data: 'Orders, shipments, compliance, customers',
    notes: null,
    overlapNote: 'VinoShipper orders often duplicate Commerce7 club orders (same order, different system). The reconciliation stage deduplicates by matching order IDs — Commerce7 is authoritative when both report the same transaction.',
  },
]

const OUTPUT_PLATFORMS = [
  {
    id: 'google-sheets',
    mcpKey: 'googleSheets',
    name: 'Google Sheets',
    auth: 'Service Account (no user OAuth)',
    notes: 'Official Google MCP server. Clean automation path — service account auth means no token refresh. One spreadsheet per month with structured rows: date, source, channel, amount, QB category.',
  },
  {
    id: 'quickbooks',
    mcpKey: 'quickbooks',
    name: 'QuickBooks Online',
    auth: 'OAuth 2.0 (refresh token lifecycle)',
    notes: null,
    warning: 'QuickBooks OAuth requires token refresh every 100 days. The Intuit MCP server is in preview — token lifecycle management adds operational complexity. Initial implementation targets Sheets-only output, with QB journal entry drafts as phase 2.',
  },
]

export default function Integrations() {
  return (
    <>
      <AnimatedSection>
        <span className="section-label-light">Platform Layer</span>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-cream mb-4">Platform Integrations</h1>
        <p>
          Each platform connects through its own MCP server — a thin wrapper that converts REST API calls into Claude Code tool invocations. One server per platform, read-only credentials, standardized tool interface.
        </p>
      </AnimatedSection>

      <TableOfContents items={TOC} />

      {/* Source platforms */}
      {PLATFORM_DETAILS.map(detail => {
        const platform = platforms[detail.platformIndex]
        return (
          <div key={detail.id}>
            <SectionHeading id={detail.id}>{platform.name}</SectionHeading>
            <AnimatedDiv>
              <div className="mb-6">
                <PlatformCard {...platform} />
              </div>
              <div className="glass-dark p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-cream/50 text-xs uppercase tracking-wider">API</p>
                    <p className="text-cream">{detail.api}</p>
                  </div>
                  <div>
                    <p className="text-cream/50 text-xs uppercase tracking-wider">Auth</p>
                    <p className="text-cream">{detail.auth}</p>
                  </div>
                  <div>
                    <p className="text-cream/50 text-xs uppercase tracking-wider">Rate Limit</p>
                    <p className="text-cream">{detail.rate}</p>
                  </div>
                  <div>
                    <p className="text-cream/50 text-xs uppercase tracking-wider">Data</p>
                    <p className="text-cream">{detail.data}</p>
                  </div>
                </div>
              </div>

              {detail.notes && <p>{detail.notes}</p>}
              {detail.warning && (
                <TechCallout variant="warning" title="Plan Requirement">
                  <p>{detail.warning}</p>
                </TechCallout>
              )}
              {detail.overlapNote && (
                <TechCallout variant="detail" title="C7/VinoShipper Overlap">
                  <p>{detail.overlapNote}</p>
                </TechCallout>
              )}

              <CodeBlock {...mcpConfigs[detail.mcpKey]} />
            </AnimatedDiv>
          </div>
        )
      })}

      {/* Output platforms */}
      {OUTPUT_PLATFORMS.map(op => (
        <div key={op.id}>
          <SectionHeading id={op.id}>{op.name}</SectionHeading>
          <AnimatedDiv>
            <div className="glass-dark p-4 rounded-lg mb-4">
              <div className="text-sm">
                <p className="text-cream/50 text-xs uppercase tracking-wider">Auth</p>
                <p className="text-cream">{op.auth}</p>
              </div>
            </div>
            {op.notes && <p>{op.notes}</p>}
            {op.warning && (
              <TechCallout variant="warning" title="OAuth Complexity">
                <p>{op.warning}</p>
              </TechCallout>
            )}
            <CodeBlock {...mcpConfigs[op.mcpKey]} />
          </AnimatedDiv>
        </div>
      ))}

      <SectionHeading id="feasibility-matrix">Feasibility Matrix</SectionHeading>
      <AnimatedDiv>
        <p className="mb-6">Summary of integration readiness across all six platforms. Platforms with official MCP servers (Square, Google Sheets) have the fastest path to production.</p>
        <IntegrationTable />
      </AnimatedDiv>
    </>
  )
}
