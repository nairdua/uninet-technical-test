import { Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Stack className="vh-100 vw-100 justify-content-center align-items-center">
      <h1>Sorry!</h1>
      <p>We couldn't find the route you requested.</p>
      <Link to="/">Return to home</Link>
    </Stack>
  )
}
