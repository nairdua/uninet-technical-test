import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { RegisterForm } from '.'

describe('<RegisterForm />', () => {
  test('Email and password forms exist', () => {
    render(<RegisterForm />)
    const emailField = screen.getByLabelText('Email Address')
    expect(emailField).toBeInTheDocument()

    const pwField = screen.getByLabelText('Password')
    expect(pwField).toBeInTheDocument()
  })
  test('Can fill out email and password input', () => {
    render(<RegisterForm />)
    const emailField = screen.getByLabelText('Email Address')
    const pwField = screen.getByLabelText('Password')

    fireEvent.change(emailField, { target: { value: 'eve.holt@reqres.in' } })
    fireEvent.change(pwField, { target: { value: 'pistol' } })

    expect(screen.getByDisplayValue('eve.holt@reqres.in')).toBeInTheDocument()
    expect(screen.getByDisplayValue('pistol')).toBeInTheDocument()
  })
})
