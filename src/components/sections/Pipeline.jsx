import SectionHeading from '../ui/SectionHeading'
import TableOfContents from '../ui/TableOfContents'
import TechCallout from '../ui/TechCallout'
import CodeBlock from '../ui/CodeBlock'
import DiagramPipeline from '../ui/DiagramPipeline'
import { AnimatedSection, AnimatedDiv } from '../shared/AnimatedSection'
import { fieldMappings, qbCategoryRules } from '../../data/docs-content'

const TOC = [
  { id: 'pipeline-overview', label: 'Pipeline Overview', level: 2 },
  { id: 'normalize', label: 'Stage 1: Normalize', level: 2 },
  { id: 'categorize', label: 'Stage 2: Categorize', level: 2 },
  { id: 'reconcile', label: 'Stage 3: Reconcile', level: 2 },
  { id: 'output', label: 'Stage 4: Output', level: 2 },
]

export default function Pipeline() {
  return (
    <>
      <AnimatedSection>
        <span className="section-label-light">Platform Layer</span>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-cream mb-4">Data Pipeline</h1>
        <p>
          Raw API responses from four platforms with different schemas, currencies, and ID systems get transformed into a unified order format, categorized into QuickBooks accounts, deduplicated across overlapping platforms, and written to structured outputs.
        </p>
      </AnimatedSection>

      <TableOfContents items={TOC} />

      <SectionHeading id="pipeline-overview">Pipeline Overview</SectionHeading>
      <AnimatedDiv>
        <p className="mb-6">Five stages, executed sequentially after all parallel data pulls complete. Each stage is a pure transformation — no side effects, no external calls. If any stage fails, the pipeline stops and reports exactly where.</p>
        <DiagramPipeline />
      </AnimatedDiv>

      <SectionHeading id="normalize">Stage 1: Normalize</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">Each platform returns data in its own schema. Commerce7 uses cents, Tock uses dollars, Square nests amounts inside <code>money</code> objects. The normalize stage converts every order into a common schema:</p>

        <div className="glass-dark p-4 rounded-lg mb-6">
          <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-3">Common Order Schema</p>
          <div className="text-sm text-cream/80 font-mono space-y-1">
            <p>{'{ id, source, date, amount, channel, customer, items[] }'}</p>
            <p className="text-cream/50">{'  items[]: { sku, name, qty, price }'}</p>
          </div>
        </div>

        <p className="mb-4">Platform-specific normalization functions:</p>

        {Object.values(fieldMappings).map(mapping => (
          <CodeBlock key={mapping.title} {...mapping} />
        ))}

        <TechCallout variant="info" title="Why normalize first?">
          <p>All downstream logic (categorization, reconciliation, output formatting) operates on the common schema — never on raw API responses. This means adding a new platform only requires writing one normalization function. The rest of the pipeline stays unchanged.</p>
        </TechCallout>
      </AnimatedDiv>

      <SectionHeading id="categorize">Stage 2: Categorize</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">Each normalized order gets mapped to a QuickBooks category and account code. Rules are evaluated in order — first match wins.</p>

        <div className="overflow-x-auto rounded-xl border border-cream/10 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/10">
                <th className="px-4 py-3 text-left font-semibold text-cream/70">Rule</th>
                <th className="px-4 py-3 text-left font-semibold text-cream/70">QB Category</th>
                <th className="px-4 py-3 text-left font-semibold text-cream/70">Account</th>
              </tr>
            </thead>
            <tbody>
              {qbCategoryRules.map((rule, i) => (
                <tr key={i} className="border-b border-cream/5">
                  <td className="px-4 py-3 font-mono text-sm text-gold">{rule.condition}</td>
                  <td className="px-4 py-3 text-cream">{rule.category}</td>
                  <td className="px-4 py-3 text-cream/70">{rule.account}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>Categories align with Nella Terra's existing QuickBooks chart of accounts. The default rule catches any edge cases that don't match specific conditions.</p>
      </AnimatedDiv>

      <SectionHeading id="reconcile">Stage 3: Reconcile</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">Cross-platform deduplication. The primary overlap is between Commerce7 and VinoShipper — both systems record club shipment orders, but Commerce7 is authoritative.</p>

        <TechCallout variant="detail" title="Commerce7/VinoShipper Overlap">
          <p>When a wine club shipment is processed, Commerce7 creates the order record and VinoShipper handles fulfillment/compliance. Both report revenue for the same transaction. The reconciliation stage matches orders by ID and keeps the Commerce7 record, discarding the VinoShipper duplicate.</p>
          <p>Sum validation runs after dedup: <code>total(all_sources) - total(deduped) === total(VS_duplicates)</code>. If the equation doesn't balance, the pipeline flags the discrepancy for manual review.</p>
        </TechCallout>

        <CodeBlock
          title="Reconciliation Logic (simplified)"
          language="javascript"
          code={`function reconcile(orders) {
  const c7Ids = new Set(
    orders.filter(o => o.source === 'commerce7').map(o => o.id)
  )

  return orders.filter(order => {
    if (order.source === 'vinoshipper' && c7Ids.has(order.id)) {
      return false  // C7 is authoritative — drop VS duplicate
    }
    return true
  })
}`}
        />
      </AnimatedDiv>

      <SectionHeading id="output">Stage 4: Output</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">Reconciled, categorized orders get written to two destinations:</p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="glass-dark p-5 rounded-lg">
            <p className="text-cream font-semibold mb-2">Google Sheets</p>
            <p className="text-cream/70 text-sm mb-3">One row per order, one sheet per month. Structured columns: date, source, channel, amount, QB category, account code.</p>
            <p className="text-cream/50 text-xs">Appends new rows — never overwrites. Monthly sheet auto-created on first entry.</p>
          </div>
          <div className="glass-dark p-5 rounded-lg">
            <p className="text-cream font-semibold mb-2">QuickBooks Journal Entry</p>
            <p className="text-cream/70 text-sm mb-3">Draft journal entry grouped by QB category. Debit revenue accounts, credit bank deposit. Ready for bookkeeper review.</p>
            <p className="text-cream/50 text-xs">Phase 2 — initial deployment targets Sheets-only output.</p>
          </div>
        </div>
      </AnimatedDiv>
    </>
  )
}
