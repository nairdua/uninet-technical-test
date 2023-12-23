import { Stack } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

import { NavbarComponent } from 'components'

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
