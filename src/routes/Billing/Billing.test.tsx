import { describe, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Billing from '.'

describe('<Billing />', () => {
  test('Renders properly', () => {
    const wrapper = render(<Billing />, { wrapper: MemoryRouter })
    expect(wrapper).toBeTruthy()
  })

  test('Displays all billing info', () => {
    render(<Billing />, { wrapper: MemoryRouter })

    // billing info subset
    const testIds = [
      'billername',
      'inquiryid',
      'paymenttype',
      'responsecode',
      'responsemsg',
      'subscriberid',
      'subscribername',
    ]

    testIds.forEach(id => {
      screen.queryByTestId(id)
    })
  })

  test('Displays billing details with all denominations correctly', () => {
    render(<Billing />, { wrapper: MemoryRouter })
    const allDenoms = screen.getAllByRole('row')
    expect(allDenoms).toHaveLength(5) // 4 billing info + thead
  })

  test('Displays high denomination billings correctly', () => {
    render(<Billing />, { wrapper: MemoryRouter })

    const highDenomSwitch = screen.getByRole('checkbox')
    fireEvent.click(highDenomSwitch)

    const allDenoms = screen.getAllByRole('row')
    expect(allDenoms).toHaveLength(3) // 2 high denom billing info + thead
  })
})
