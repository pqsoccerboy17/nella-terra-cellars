import { integrations, recentActivity } from '../../data/dummy'
import FlowDiagram from '../ui/FlowDiagram'
import { AnimatedSection, AnimatedDiv } from '../shared/AnimatedSection'
import PageTransition from '../shared/PageTransition'

const STEPS = [
  {
    number: '1',
    title: 'Connect',
    description: 'We connect each platform\'s API. One-time setup, secure credentials, read-only access.',
  },
  {
    number: '2',
    title: 'Sync',
    description: 'Every night, fresh data is pulled, categorized, and reconciled automatically.',
  },
  {
    number: '3',
    title: 'Report',
    description: 'Your Google Sheet updates automatically. QuickBooks-ready categories, every morning.',
  },
]

export default function HowItWorks() {
  return (
    <PageTransition>
      <section className="section-padding bg-charcoal text-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="section-label-light">Architecture</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              How It Works
            </h2>
          </AnimatedSection>

          {/* 3-step explainer */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {STEPS.map((step, i) => (
              <AnimatedDiv key={step.number} delay={i * 0.15} className="glass-dark p-6 text-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wine text-cream font-bold text-xl mb-4">
                  {step.number}
                </span>
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-cream/70 leading-relaxed">{step.description}</p>
              </AnimatedDiv>
            ))}
          </div>

          {/* Flow diagram */}
          <AnimatedDiv className="mb-16">
            <FlowDiagram />
          </AnimatedDiv>

          {/* Integration feasibility table */}
          <AnimatedDiv className="mb-16">
            <h3 className="font-semibold text-xl mb-6 text-center">Integration Feasibility</h3>
            <div className="overflow-x-auto rounded-xl border border-cream/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream/10">
                    <th className="px-4 py-3 text-left font-semibold text-cream/70">Platform</th>
                    <th className="px-4 py-3 text-left font-semibold text-cream/70">API</th>
                    <th className="px-4 py-3 text-left font-semibold text-cream/70">Auth</th>
                    <th className="px-4 py-3 text-left font-semibold text-cream/70">MCP</th>
                    <th className="px-4 py-3 text-left font-semibold text-cream/70">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {integrations.map((row) => (
                    <tr key={row.platform} className="border-b border-cream/5 hover:bg-cream/5">
                      <td className="px-4 py-3 font-semibold">{row.platform}</td>
                      <td className="px-4 py-3 text-cream/70">{row.api}</td>
                      <td className="px-4 py-3 text-cream/70">{row.auth}</td>
                      <td className="px-4 py-3">
                        {row.mcp.includes('Official') || row.mcp.includes('Intuit') ? (
                          <span className="text-sage font-semibold">{row.mcp}</span>
                        ) : (
                          <span className="text-cream/50">{row.mcp}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          row.status === 'Ready'
                            ? 'bg-sage/20 text-sage'
                            : row.status === 'Verify Plan'
                            ? 'bg-gold/20 text-gold'
                            : 'bg-cream/10 text-cream/60'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-cream/40 text-xs mt-3">
              MCP = Model Context Protocol. Platforms with official MCPs have the smoothest integration path.
            </p>
          </AnimatedDiv>

          {/* Recent activity */}
          <AnimatedSection>
            <h3 className="font-semibold text-xl mb-6 text-center">Example: Last Night's Sync</h3>
            <div className="max-w-2xl mx-auto space-y-3">
              {recentActivity.map((item, i) => (
                <AnimatedDiv
                  key={item.time}
                  delay={i * 0.08}
                  className="flex items-start gap-4 glass-dark px-4 py-3"
                >
                  <span className="text-xs text-cream/40 font-mono whitespace-nowrap mt-0.5">
                    {item.time}
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{item.event}</p>
                    <p className="text-cream/50 text-sm">{item.detail}</p>
                  </div>
                  <span className="ml-auto text-sage text-xs font-semibold mt-0.5">&#10003;</span>
                </AnimatedDiv>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  )
}
