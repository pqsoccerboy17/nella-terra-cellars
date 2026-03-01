import { render, screen } from '@testing-library/react'
import ExternalLink from './ExternalLink'

describe('ExternalLink', () => {
  it('renders link with correct href', () => {
    render(<ExternalLink href="https://example.com">Example</ExternalLink>)
    const link = screen.getByRole('link', { name: /example/i })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('opens in a new tab', () => {
    render(<ExternalLink href="https://example.com">Click me</ExternalLink>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('has rel="noopener noreferrer" for security', () => {
    render(<ExternalLink href="https://example.com">Secure</ExternalLink>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders children text', () => {
    render(<ExternalLink href="https://example.com">My Link Text</ExternalLink>)
    expect(screen.getByText('My Link Text')).toBeInTheDocument()
  })

  it('applies additional className', () => {
    render(<ExternalLink href="https://example.com" className="extra-class">Styled</ExternalLink>)
    const link = screen.getByRole('link')
    expect(link.className).toContain('extra-class')
  })
})
