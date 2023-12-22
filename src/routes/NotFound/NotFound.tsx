import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <h1>Sorry!</h1>
      <p>We couldn't find the route you requested.</p>
      <Link to="/">Return to home</Link>
    </>
  )
}
