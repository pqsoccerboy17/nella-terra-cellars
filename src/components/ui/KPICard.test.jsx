import { render, screen } from '@testing-library/react'
import KPICard from './KPICard'

describe('KPICard', () => {
  it('renders label and value', () => {
    render(<KPICard label="Revenue" value={50000} />)
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('50,000')).toBeInTheDocument()
  })

  it('renders prefix and suffix', () => {
    render(<KPICard label="Revenue" value={1234} prefix="$" suffix="/mo" />)
    expect(screen.getByText('$1,234/mo')).toBeInTheDocument()
  })

  it('renders string values directly', () => {
    render(<KPICard label="Status" value="Active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('shows up trend with arrow and percentage', () => {
    render(<KPICard label="Sales" value={100} trend={{ direction: 'up', value: 12 }} />)
    expect(screen.getByText(/12% vs last month/)).toBeInTheDocument()
  })

  it('shows down trend with arrow and percentage', () => {
    render(<KPICard label="Returns" value={5} trend={{ direction: 'down', value: 3 }} />)
    expect(screen.getByText(/3% vs last month/)).toBeInTheDocument()
  })

  it('renders without trend when not provided', () => {
    render(<KPICard label="Count" value={42} />)
    expect(screen.queryByText(/vs last month/)).not.toBeInTheDocument()
  })
})
