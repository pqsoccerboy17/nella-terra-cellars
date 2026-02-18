import SectionHeading from '../ui/SectionHeading'
import TableOfContents from '../ui/TableOfContents'
import TechCallout from '../ui/TechCallout'
import CodeBlock from '../ui/CodeBlock'
import DiagramOrchestration from '../ui/DiagramOrchestration'
import { AnimatedSection, AnimatedDiv } from '../shared/AnimatedSection'
import { agentPseudocode, coworkConfig } from '../../data/docs-content'

const TOC = [
  { id: 'orchestration-diagram', label: 'Orchestration Diagram', level: 2 },
  { id: 'agent-loop', label: 'Agent Loop', level: 2 },
  { id: 'multi-agent', label: 'Multi-Agent Parallelism', level: 2 },
  { id: 'scheduling', label: 'Scheduling', level: 2 },
  { id: 'error-handling', label: 'Error Handling', level: 2 },
]

export default function Orchestration() {
  return (
    <>
      <AnimatedSection>
        <span className="section-label">Automation Layer</span>
        <h1 className="text-4xl md:text-[53px] font-bold text-text mb-4">Claude Code + Cowork</h1>
        <p>
          The automation layer uses Claude Code in headless mode as the orchestration engine. A single main agent coordinates four parallel Cowork sub-agents — one per platform — then aggregates results through the normalize-categorize-reconcile pipeline.
        </p>
      </AnimatedSection>

      <TableOfContents items={TOC} />

      <SectionHeading id="orchestration-diagram">Orchestration Diagram</SectionHeading>
      <AnimatedDiv>
        <p className="mb-6">The full execution topology. Cron triggers the main agent, which spawns four Cowork sub-agents in parallel. After all four complete, the main agent aggregates and processes the results.</p>
        <DiagramOrchestration />
      </AnimatedDiv>

      <SectionHeading id="agent-loop">Agent Loop</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">Claude Code's headless mode runs as a non-interactive CLI process — no human in the loop. The agent receives an MCP config (which platforms to connect) and a task prompt (what to do). It autonomously decides which MCP tools to call, how to paginate through results, and how to handle partial data.</p>

        <CodeBlock {...agentPseudocode} />

        <TechCallout variant="info" title="Why headless mode?">
          <p>Headless mode eliminates the interactive terminal UI. The agent runs as a background process, reads MCP tool results, and produces structured output — exactly like a traditional ETL script, but with natural language orchestration instead of hard-coded logic. The prompt IS the business logic.</p>
        </TechCallout>
      </AnimatedDiv>

      <SectionHeading id="multi-agent">Multi-Agent Parallelism</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">Cowork enables the main agent to spawn sub-agents that run in parallel. Each sub-agent gets its own MCP server connection and operates independently. The main agent waits for all four to complete, then merges the results.</p>

        <CodeBlock {...coworkConfig} />

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="card-muted p-5 rounded-lg">
            <p className="text-text font-semibold mb-2">Sequential (without Cowork)</p>
            <div className="space-y-2 text-base">
              <div className="flex justify-between"><span className="text-text-secondary">Commerce7</span><span className="text-text">~30s</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Tock</span><span className="text-text">~25s</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Square</span><span className="text-text">~30s</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">VinoShipper</span><span className="text-text">~20s</span></div>
              <hr className="docs-divider" />
              <div className="flex justify-between font-semibold"><span className="text-text-secondary">Total</span><span className="text-accent">~105s</span></div>
            </div>
          </div>
          <div className="card-muted p-5 rounded-lg">
            <p className="text-text font-semibold mb-2">Parallel (with Cowork)</p>
            <div className="space-y-2 text-base">
              <div className="flex justify-between"><span className="text-text-secondary">All 4 platforms</span><span className="text-text">simultaneously</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Bottleneck</span><span className="text-text">Commerce7 (~30s)</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Overhead</span><span className="text-text">~5s</span></div>
              <hr className="docs-divider" />
              <div className="flex justify-between font-semibold"><span className="text-text-secondary">Total</span><span className="text-success">~35s</span></div>
            </div>
          </div>
        </div>

        <p>Wall-clock time drops by ~67%. The bottleneck shifts from total API time to the slowest single platform (Commerce7, due to pagination depth).</p>
      </AnimatedDiv>

      <SectionHeading id="scheduling">Scheduling</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">A macOS LaunchAgent (or cron job on Linux) triggers the main agent every morning at 6:00 AM. The agent runs, produces its output, and exits. No long-running daemon, no persistent connections.</p>

        <CodeBlock
          title="LaunchAgent plist (macOS)"
          language="xml"
          code={`<key>StartCalendarInterval</key>
<dict>
  <key>Hour</key>
  <integer>6</integer>
  <key>Minute</key>
  <integer>0</integer>
</dict>`}
        />

        <TechCallout variant="info" title="Idempotent by design">
          <p>Every sync run is idempotent. Running the agent twice for the same date produces identical output. Google Sheets rows are keyed by date + source — re-running replaces rather than duplicates. This makes recovery simple: if something fails, just re-run.</p>
        </TechCallout>
      </AnimatedDiv>

      <SectionHeading id="error-handling">Error Handling</SectionHeading>
      <AnimatedDiv>
        <p className="mb-4">Errors are handled per-platform. If one platform's API is down, the other three still process successfully. The agent reports partial success with a clear breakdown of what succeeded and what failed.</p>

        <div className="space-y-3 my-6">
          {[
            { scenario: 'Platform API timeout', response: 'Retry 2x with exponential backoff. After 3rd failure, mark platform as "skipped" and continue.' },
            { scenario: 'Auth credential expired', response: 'Log error with platform name. Email alert to operator. Other platforms unaffected.' },
            { scenario: 'Schema change / unexpected response', response: 'Normalization function throws. Agent catches, logs the raw response for debugging, skips that platform.' },
            { scenario: 'Google Sheets write failure', response: 'Retry once. If still failing, write output to local JSON file as backup. Email alert.' },
            { scenario: 'Reconciliation imbalance', response: 'Sum validation fails. Agent writes report with discrepancy amount. Flagged for manual review.' },
          ].map((item) => (
            <div key={item.scenario} className="card-muted p-4 rounded-lg">
              <p className="text-text font-semibold text-base">{item.scenario}</p>
              <p className="text-text-secondary text-base mt-1">{item.response}</p>
            </div>
          ))}
        </div>

        <TechCallout variant="warning" title="No silent failures">
          <p>The agent never swallows errors. Every platform pull either succeeds (with row count) or fails (with error type and message). The final report always includes a status table — even partial success gets flagged so the operator knows exactly what's stale.</p>
        </TechCallout>
      </AnimatedDiv>
    </>
  )
}
