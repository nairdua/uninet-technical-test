import { Button, Card, Container, Form, Stack } from 'react-bootstrap'

export default function Login() {
  return (
    <Stack className="vw-100 vh-100 my-auto justify-content-center">
      <Container>
        <h1 className="mb-3">Welcome!</h1>
        <Card>
          <Form>
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
      </Container>
    </Stack>
  )
}
