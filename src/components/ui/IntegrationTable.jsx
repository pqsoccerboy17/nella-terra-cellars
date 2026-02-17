import { integrations } from '../../data/dummy'

/** Integration feasibility table — extracted from HowItWorks for reuse. */
export default function IntegrationTable() {
  return (
    <div>
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
                <td className="px-4 py-3 font-semibold text-cream">{row.platform}</td>
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
    </div>
  )
}
