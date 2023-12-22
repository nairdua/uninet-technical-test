import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Container>
      <h1 className="my-3">Welcome, User!</h1>
      <Container fluid>
        <Row className="g-2">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Posts</Card.Title>
                <Card.Text>
                  View latest user posts and manage your own posts
                </Card.Text>
                <Link to="/posts">
                  <Stack>
                    <Button variant="primary">Visit</Button>
                  </Stack>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Billing Information</Card.Title>
                <Card.Text>View latest billing information</Card.Text>
                <Link to="/posts">
                  <Stack>
                    <Button variant="primary">Visit</Button>
                  </Stack>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
