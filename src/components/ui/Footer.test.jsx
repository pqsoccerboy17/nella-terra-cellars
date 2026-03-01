import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  )
}

describe('Footer', () => {
  it('renders the heading', () => {
    renderFooter()
    expect(screen.getByText('Ready to build this for real?')).toBeInTheDocument()
  })

  it('renders the "Let\'s Talk" mailto link', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: /let.s talk/i })
    expect(link).toHaveAttribute('href', 'mailto:mike@yourco.dev')
  })

  it('renders all footer navigation links', () => {
    renderFooter()
    const expectedLinks = ['Home', 'Architecture', 'Integrations', 'Pipeline', 'Orchestration', 'Dashboard']
    expectedLinks.forEach((name) => {
      expect(screen.getByRole('link', { name })).toBeInTheDocument()
    })
  })

  it('renders attribution text', () => {
    renderFooter()
    expect(screen.getByText(/Built by Mike Duncan/)).toBeInTheDocument()
  })

  it('renders disclaimer text', () => {
    renderFooter()
    expect(screen.getByText(/Demo using representative data/)).toBeInTheDocument()
  })
})
