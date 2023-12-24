import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Register from '.'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

describe('<Register />', () => {
  test('Register screen mounts properly', () => {
    const wrapper = render(<Register />, { wrapper: BrowserRouter })
    expect(wrapper).toBeTruthy()
  })

  test('Missing email or username', async () => {
    render(<Register />, { wrapper: MemoryRouter })

    const emailField = screen.getByLabelText('Email Address')
    const pwField = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Register' })

    fireEvent.change(emailField, { target: { value: '' } })
    fireEvent.change(pwField, { target: { value: 'cityslicka' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const missingEmailOrUsername = screen.getByText(
        'Missing email or username',
      )
      expect(missingEmailOrUsername).toBeInTheDocument()
    })
  })

  test('Missing password', async () => {
    render(<Register />, { wrapper: MemoryRouter })

    const emailField = screen.getByLabelText('Email Address')
    const pwField = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Register' })

    fireEvent.change(emailField, { target: { value: 'eve.holt@reqres.in' } })
    fireEvent.change(pwField, { target: { value: '' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const missingPw = screen.getByText('Missing password')
      expect(missingPw).toBeInTheDocument()
    })
  })

  test('Can register properly', async () => {
    render(<Register />, { wrapper: MemoryRouter })

    const emailField = await screen.findByLabelText('Email Address')
    const pwField = await screen.findByLabelText('Password')
    const submitButton = await screen.findByRole('button', { name: 'Register' })

    await fireEvent.change(emailField, {
      target: { value: 'eve.holt@reqres.in' },
    })
    await fireEvent.change(pwField, { target: { value: 'cityslicka' } })
    await fireEvent.click(submitButton)

    waitFor(() => {
      const loginText = screen.findByText(/login/i)
      expect(loginText).toBeInTheDocument()
    })
  })
})
