import { render, screen } from '@testing-library/react'
import SectionHeading from './SectionHeading'

describe('SectionHeading', () => {
  it('renders as h2 by default', () => {
    render(<SectionHeading>Test Heading</SectionHeading>)
    const heading = screen.getByRole('heading', { level: 2, name: /Test Heading/ })
    expect(heading).toBeInTheDocument()
  })

  it('renders as h3 when level=3', () => {
    render(<SectionHeading level={3}>Sub Heading</SectionHeading>)
    const heading = screen.getByRole('heading', { level: 3, name: /Sub Heading/ })
    expect(heading).toBeInTheDocument()
  })

  it('generates anchor ID from children text', () => {
    render(<SectionHeading>My Cool Section</SectionHeading>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'my-cool-section')
  })

  it('uses provided id prop instead of generating one', () => {
    render(<SectionHeading id="custom-id">Some Heading</SectionHeading>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'custom-id')
  })

  it('renders an anchor link with hash href', () => {
    render(<SectionHeading id="test-anchor">Anchor Test</SectionHeading>)
    const anchor = screen.getByRole('link', { name: /link to anchor test/i })
    expect(anchor).toHaveAttribute('href', '#test-anchor')
  })
})
