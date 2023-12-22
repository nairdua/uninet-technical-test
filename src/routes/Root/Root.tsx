import { Stack } from 'react-bootstrap'
import { NavbarComponent } from '../../components'
import { Outlet } from 'react-router-dom'

export default function AppShell() {
  return (
    <Stack className="vh-100">
      <NavbarComponent />
      <main>
        <Outlet />
      </main>
    </Stack>
  )
}
