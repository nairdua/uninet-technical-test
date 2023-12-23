import React, { useState } from 'react'
import { Button, Card, Form, Stack } from 'react-bootstrap'

export interface RegisterFormData {
  email: string
  password: string
}

export interface RegisterFormProps {
  onRegister?: (data: RegisterFormData) => void
  error?: string
}

export default function RegisterForm(props: RegisterFormProps) {
  const { onRegister, error } = props

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (onRegister) {
      onRegister(formData)
    }
  }

  function handleForm(col: string, val: string) {
    setFormData(prev => ({
      ...prev,
      [col]: val,
    }))
  }

  return (
    <Card>
      <Form noValidate onSubmit={handleSubmit}>
        <Card.Header>Register</Card.Header>
        <Card.Body>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={e => handleForm('email', e.target.value)}
              isInvalid={!!error}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={e => handleForm('password', e.target.value)}
              isInvalid={!!error}
            />
          </Form.Group>
          {error && <span className="text-danger">{error}</span>}
        </Card.Body>
        <Card.Footer>
          <Stack direction="horizontal" gap={4} className="flex-row-reverse">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Stack>
        </Card.Footer>
      </Form>
    </Card>
  )
}
