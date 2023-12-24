import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Login from '.'
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom'
import routesConfig from 'routesConfig'

describe('<Login />', () => {
  test('Login screen mounts properly', () => {
    const wrapper = render(<Login />, { wrapper: MemoryRouter })
    expect(wrapper).toBeTruthy()
  })

  test('Can successfully log in', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/login'],
    })

    render(<RouterProvider router={router} />)

    const emailField = screen.getByLabelText('Email Address')
    const pwField = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(emailField, { target: { value: 'eve.holt@reqres.in' } })
    fireEvent.change(pwField, { target: { value: 'cityslicka' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const welcomeText = screen.getByText(/welcome/i)
      expect(welcomeText).toBeInTheDocument()
    })
  })

  test('Username not found', async () => {
    render(<Login />, { wrapper: MemoryRouter })

    const emailField = screen.getByLabelText('Email Address')
    const pwField = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(emailField, { target: { value: 'eva.holt@reqres.in' } })
    fireEvent.change(pwField, { target: { value: 'pistol' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const userNotFound = screen.getByText('user not found')
      expect(userNotFound).toBeInTheDocument()
    })
  })

  test('Missing email or username', async () => {
    render(<Login />, { wrapper: MemoryRouter })

    const emailField = screen.getByLabelText('Email Address')
    const pwField = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

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
    render(<Login />, { wrapper: MemoryRouter })

    const emailField = screen.getByLabelText('Email Address')
    const pwField = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Login' })

    fireEvent.change(emailField, { target: { value: 'eve.holt@reqres.in' } })
    fireEvent.change(pwField, { target: { value: '' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const missingPw = screen.getByText('Missing password')
      expect(missingPw).toBeInTheDocument()
    })
  })

  test('Register link works', async () => {
    render(<Login />, { wrapper: MemoryRouter })

    const registerBtn = screen.getByText(/register/i)

    fireEvent.click(registerBtn)

    await waitFor(() => {
      const register = screen.getByText(/register/i)
      expect(register).toBeInTheDocument()
    })
  })
})
