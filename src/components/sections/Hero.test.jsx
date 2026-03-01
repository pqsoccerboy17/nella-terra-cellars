import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from './Hero'

function renderHero() {
  return render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  )
}

describe('Hero', () => {
  it('renders the main heading text', () => {
    renderHero()
    expect(screen.getByText(/Four platforms\. One/)).toBeInTheDocument()
    expect(screen.getByText(/Zero manual exports\./)).toBeInTheDocument()
  })

  it('renders the subtitle about automated revenue operations', () => {
    renderHero()
    expect(screen.getByText('Automated Revenue Operations')).toBeInTheDocument()
  })

  it('renders all four platform pills', () => {
    renderHero()
    // Platform names appear in both the description and the pills,
    // so use getAllByText and verify at least one instance each
    expect(screen.getAllByText('Commerce7').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Tock').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Square').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('VinoShipper').length).toBeGreaterThanOrEqual(1)
  })

  it('renders the CTA link pointing to /architecture', () => {
    renderHero()
    const cta = screen.getByRole('link', { name: /explore the architecture/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/architecture')
  })
})
