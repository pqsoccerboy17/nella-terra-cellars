import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

function renderHeader(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Header />
    </MemoryRouter>
  )
}

describe('Header', () => {
  it('renders the brand name', () => {
    renderHeader()
    expect(screen.getByText('Nella Terra Cellars')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Architecture' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('renders the theme toggle button', () => {
    renderHeader()
    const themeButton = screen.getByRole('button', { name: /mode/i })
    expect(themeButton).toBeInTheDocument()
  })

  it('renders the mobile menu toggle button', () => {
    renderHeader()
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('brand name links to home', () => {
    renderHeader()
    const brandLink = screen.getByText('Nella Terra Cellars').closest('a')
    expect(brandLink).toHaveAttribute('href', '/')
  })
})
