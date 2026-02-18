import SectionHeading from '../ui/SectionHeading'
import TableOfContents from '../ui/TableOfContents'
import TechCallout from '../ui/TechCallout'
import DiagramArchitecture from '../ui/DiagramArchitecture'
import FlowDiagram from '../ui/FlowDiagram'
import { AnimatedSection, AnimatedDiv } from '../shared/AnimatedSection'
import { techStack, designPatterns } from '../../data/docs-content'

const TOC = [
  { id: 'system-diagram', label: 'System Diagram', level: 2 },
  { id: 'tech-stack', label: 'Tech Stack', level: 2 },
  { id: 'design-patterns', label: 'Design Patterns', level: 2 },
  { id: 'why-mcp', label: 'Why MCP', level: 2 },
  { id: 'simplified-view', label: 'Simplified View', level: 2 },
]

export default function Architecture() {
  return (
    <>
      <AnimatedSection>
        <span className="section-label">Overview</span>
        <h1 className="text-4xl md:text-[53px] font-bold text-text mb-4">System Architecture</h1>
        <p>
          Nella Terra's revenue automation connects four wine industry platforms through Model Context Protocol (MCP) servers, orchestrated by Claude Code running in headless mode. Data flows through a normalize-categorize-reconcile pipeline every night, producing QuickBooks-ready reports in Google Sheets.
        </p>
      </AnimatedSection>

      <TableOfContents items={TOC} />

      <SectionHeading id="system-diagram">System Diagram</SectionHeading>
      <AnimatedDiv>
        <p className="mb-6">Four tiers from source platforms to final outputs. Each MCP server wraps one platform's REST API, giving Claude Code a uniform tool interface regardless of the underlying auth or pagination differences.</p>
        <DiagramArchitecture />
      </AnimatedDiv>

      <SectionHeading id="tech-stack">Tech Stack</SectionHeading>
      <AnimatedDiv>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          {/* Platform layer */}
          <div className="card-muted p-5 rounded-lg">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Platform Layer</p>
            <div className="space-y-3">
              {techStack.platform.map(t => (
                <div key={t.name} className="flex justify-between items-start">
                  <div>
                    <p className="text-text font-semibold text-base">{t.name}</p>
                    <p className="text-text-secondary text-sm">{t.role}</p>
                  </div>
                  <span className="text-text-secondary text-sm shrink-0 ml-4">{t.api} / {t.auth}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Automation layer */}
          <div className="card-muted p-5 rounded-lg">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Automation Layer</p>
            <div className="space-y-3">
              {techStack.automation.map(t => (
                <div key={t.name} className="flex justify-between items-start">
                  <div>
                    <p className="text-text font-semibold text-base">{t.name}</p>
                    <p className="text-text-secondary text-sm">{t.role}</p>
                  </div>
                  <span className="text-text-secondary text-sm shrink-0 ml-4">{t.version}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output layer */}
        <div className="card-muted p-5 rounded-lg max-w-md">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Output Layer</p>
          <div className="space-y-3">
            {techStack.output.map(t => (
              <div key={t.name} className="flex justify-between items-start">
                <div>
                  <p className="text-text font-semibold text-base">{t.name}</p>
                  <p className="text-text-secondary text-sm">{t.role}</p>
                </div>
                <span className="text-text-secondary text-sm shrink-0 ml-4">{t.auth}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedDiv>

      <SectionHeading id="design-patterns">Design Patterns</SectionHeading>
      <AnimatedDiv>
        <div className="space-y-4 my-4">
          {designPatterns.map((p) => (
            <div key={p.name} className="card-muted p-4 rounded-lg">
              <p className="text-text font-semibold text-base mb-1">{p.name}</p>
              <p className="text-text-secondary text-base">{p.description}</p>
            </div>
          ))}
        </div>
      </AnimatedDiv>

      <SectionHeading id="why-mcp">Why MCP</SectionHeading>
      <AnimatedDiv>
        <TechCallout variant="info" title="Why MCP is the right abstraction">
          <p>Model Context Protocol gives Claude Code a uniform tool interface across all platforms. Instead of embedding HTTP calls, auth headers, and pagination logic into prompts, each MCP server encapsulates that complexity. The agent just calls <code>list_orders()</code> — regardless of whether that's Commerce7's cursor-paginated REST API or Square's OAuth-protected endpoint.</p>
          <p>This also means swapping a platform (e.g., replacing Tock with another reservation system) only requires writing a new MCP server — the agent prompt and pipeline logic stay unchanged.</p>
        </TechCallout>
      </AnimatedDiv>

      <SectionHeading id="simplified-view">Simplified View</SectionHeading>
      <AnimatedDiv>
        <p className="mb-6">The same flow, condensed. Data enters from four platforms on the left, passes through the automation layer, and exits as structured reports on the right.</p>
        <FlowDiagram />
      </AnimatedDiv>
    </>
  )
}
