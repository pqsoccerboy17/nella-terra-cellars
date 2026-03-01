import { getPlatformUrl, MCP_PROTOCOL_URL } from './platform-links'

describe('getPlatformUrl', () => {
  it('returns the API URL for a known platform by default', () => {
    expect(getPlatformUrl('Commerce7')).toBe('https://api-docs.commerce7.com')
  })

  it('returns the home URL when type is "home"', () => {
    expect(getPlatformUrl('Square', 'home')).toBe('https://squareup.com')
  })

  it('returns the MCP URL when available', () => {
    expect(getPlatformUrl('Square', 'mcp')).toBe(
      'https://github.com/modelcontextprotocol/servers/tree/main/src/square'
    )
  })

  it('falls back to API URL for an unknown type', () => {
    expect(getPlatformUrl('Tock', 'nonexistent')).toBe('https://www.exploretock.com/join')
  })

  it('returns "#" for an unknown platform', () => {
    expect(getPlatformUrl('UnknownPlatform')).toBe('#')
  })

  it('returns correct URLs for all platforms', () => {
    expect(getPlatformUrl('Tock')).toBe('https://www.exploretock.com/join')
    expect(getPlatformUrl('VinoShipper')).toBe('https://vinoshipper.com/account/api_integration')
    expect(getPlatformUrl('Google Sheets')).toBe('https://developers.google.com/sheets/api')
    expect(getPlatformUrl('QuickBooks')).toBe('https://developer.intuit.com/app/developer/qbo/docs/develop')
  })
})

describe('MCP_PROTOCOL_URL', () => {
  it('exports the correct MCP protocol URL', () => {
    expect(MCP_PROTOCOL_URL).toBe('https://modelcontextprotocol.io')
  })
})
