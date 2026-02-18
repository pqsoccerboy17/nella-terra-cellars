import { integrations } from '../../data/dummy'

/** Integration feasibility table. */
export default function IntegrationTable() {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Platform</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">API</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Auth</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">MCP</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {integrations.map((row) => (
              <tr key={row.platform} className="border-b border-border hover:bg-surface">
                <td className="px-4 py-3 font-semibold text-text">{row.platform}</td>
                <td className="px-4 py-3 text-text-secondary">{row.api}</td>
                <td className="px-4 py-3 text-text-secondary">{row.auth}</td>
                <td className="px-4 py-3">
                  {row.mcp.includes('Official') || row.mcp.includes('Intuit') ? (
                    <span className="text-success font-semibold">{row.mcp}</span>
                  ) : (
                    <span className="text-text-secondary">{row.mcp}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded text-sm font-semibold ${
                    row.status === 'Ready'
                      ? 'bg-success/20 text-success'
                      : row.status === 'Verify Plan'
                      ? 'bg-warning/20 text-warning'
                      : 'bg-border text-text-secondary'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center text-text-secondary text-sm mt-3">
        MCP = Model Context Protocol. Platforms with official MCPs have the smoothest integration path.
      </p>
    </div>
  )
}
