import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('<Button />', () => {
  it('renders its children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('respects the disabled prop', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled()
  })

  it('applies a custom className', () => {
    render(
      <Button className="custom-class" data-testid="btn">
        Hi
      </Button>,
    )
    expect(screen.getByTestId('btn')).toHaveClass('custom-class')
  })
})
