import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'

export default function Login() {
  const navigate = useNavigate()

  function submitForm(e: React.FormEvent) {
    e.preventDefault()
    navigate('/')
  }

  return (
    <Stack className="vh-100 justify-content-center">
      <Container>
        <Row>
          <Col>
            <h1 className="mb-3">Welcome!</h1>
            <p>Please enter your credentials.</p>
          </Col>
          <Col sm>
            <Card>
              <Form noValidate onSubmit={e => submitForm(e)}>
                <Card.Header>Login</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer>
                  <Stack
                    direction="horizontal"
                    gap={4}
                    className="flex-row-reverse"
                  >
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                    <Button variant="link" type="button" className="ms-auto">
                      Register
                    </Button>
                  </Stack>
                </Card.Footer>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}
