/** Central URL registry for all platforms — contextual link types. */

const PLATFORMS = {
  'Commerce7': {
    api: 'https://api-docs.commerce7.com',
    home: 'https://commerce7.com',
  },
  'Tock': {
    api: 'https://www.exploretock.com/join',
    home: 'https://www.exploretock.com',
  },
  'Square': {
    api: 'https://developer.squareup.com/docs',
    home: 'https://squareup.com',
    mcp: 'https://github.com/modelcontextprotocol/servers/tree/main/src/square',
  },
  'VinoShipper': {
    api: 'https://vinoshipper.com/account/api_integration',
    home: 'https://vinoshipper.com',
  },
  'Google Sheets': {
    api: 'https://developers.google.com/sheets/api',
    home: 'https://sheets.google.com',
  },
  'QuickBooks': {
    api: 'https://developer.intuit.com/app/developer/qbo/docs/develop',
    home: 'https://quickbooks.intuit.com',
  },
}

export const MCP_PROTOCOL_URL = 'https://modelcontextprotocol.io'

/** Get a platform URL by name and type. Defaults to 'api'. */
export function getPlatformUrl(name, type = 'api') {
  const platform = PLATFORMS[name]
  if (!platform) return '#'
  return platform[type] || platform.api
}
