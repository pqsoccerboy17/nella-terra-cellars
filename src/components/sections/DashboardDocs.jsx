import TechCallout from '../ui/TechCallout'
import SectionHeading from '../ui/SectionHeading'
import TableOfContents from '../ui/TableOfContents'
import Dashboard from './Dashboard'
import { AnimatedSection, AnimatedDiv } from '../shared/AnimatedSection'

const TOC = [
  { id: 'data-context', label: 'Data Context', level: 2 },
  { id: 'live-demo', label: 'Live Demo', level: 2 },
  { id: 'data-freshness', label: 'Data Freshness', level: 2 },
]

export default function DashboardDocs() {
  return (
    <>
      <AnimatedSection>
        <span className="section-label">Output</span>
        <h1 className="font-display text-4xl md:text-[53px] font-bold text-text mb-4">Live Demo Dashboard</h1>
        <p>
          The dashboard below shows what Nella Terra's unified revenue view looks like after the automation pipeline runs. All four platforms' data is merged, categorized, and displayed in a single interactive view.
        </p>
      </AnimatedSection>

      <TableOfContents items={TOC} />

      <SectionHeading id="data-context">Data Context</SectionHeading>
      <AnimatedDiv>
        <TechCallout variant="warning" title="Representative data">
          <p>This demo uses representative data that reflects realistic revenue patterns for a winery of Nella Terra's size. In production, this dashboard updates every morning at 6:15 AM after the automation pipeline completes.</p>
        </TechCallout>

        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="card-muted p-4 rounded-lg text-center">
            <p className="text-text-secondary text-sm uppercase tracking-wider mb-1">Data Sources</p>
            <p className="text-text font-semibold text-lg">4 platforms</p>
          </div>
          <div className="card-muted p-4 rounded-lg text-center">
            <p className="text-text-secondary text-sm uppercase tracking-wider mb-1">Update Frequency</p>
            <p className="text-text font-semibold text-lg">Daily at 6:15 AM</p>
          </div>
          <div className="card-muted p-4 rounded-lg text-center">
            <p className="text-text-secondary text-sm uppercase tracking-wider mb-1">Latency</p>
            <p className="text-text font-semibold text-lg">~35 seconds</p>
          </div>
        </div>
      </AnimatedDiv>

      <SectionHeading id="live-demo">Live Demo</SectionHeading>
      <AnimatedDiv>
        <p className="mb-6">Interactive dashboard with month tabs, revenue chart, QuickBooks categories, and wine sales detail. All data comes from the automation pipeline's output.</p>
      </AnimatedDiv>

      {/* Embedded Dashboard */}
      <div className="-mx-6 lg:-mx-6">
        <Dashboard embedded />
      </div>

      <SectionHeading id="data-freshness">Data Freshness</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">In production, the dashboard knows how old its data is. Each platform pull records a timestamp. The UI can show staleness indicators:</p>

        <div className="space-y-2 my-6">
          {[
            { platform: 'Commerce7', time: '6:02 AM', status: 'Fresh' },
            { platform: 'Square', time: '6:03 AM', status: 'Fresh' },
            { platform: 'Tock', time: '6:04 AM', status: 'Fresh' },
            { platform: 'VinoShipper', time: '6:05 AM', status: 'Fresh' },
          ].map(item => (
            <div key={item.platform} className="flex items-center justify-between card-muted px-4 py-2 rounded-lg text-base">
              <span className="text-text font-semibold">{item.platform}</span>
              <span className="text-text-secondary">{item.time}</span>
              <span className="text-success font-semibold text-sm">{item.status}</span>
            </div>
          ))}
        </div>

        <TechCallout variant="info" title="Staleness detection">
          <p>If any platform's data is older than 24 hours, the dashboard shows a yellow warning. If older than 48 hours, it shows red. This catches scenarios where a single platform's API was down during the nightly sync — the operator sees exactly which data is stale.</p>
        </TechCallout>
      </AnimatedDiv>
    </>
  )
}
