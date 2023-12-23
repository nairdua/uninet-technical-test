import React, { useState } from 'react'
import { Card, Stack, Button, Form } from 'react-bootstrap'

export interface LoginFormData {
  email: string
  password: string
}

export interface LoginFormProps {
  onLogin?: (data: LoginFormData) => void
  onRegister?: () => void
  error?: string
}

export default function LoginForm(props: LoginFormProps) {
  const { onLogin, onRegister, error } = props

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (onLogin) {
      onLogin(formData)
    }
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (onRegister) {
      onRegister()
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
      <Form noValidate onSubmit={handleLogin}>
        <Card.Header>Login</Card.Header>
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
              Login
            </Button>
            <Button
              variant="link"
              type="button"
              className="ms-auto"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Stack>
        </Card.Footer>
      </Form>
    </Card>
  )
}
