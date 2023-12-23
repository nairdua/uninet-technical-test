import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, NotFound, Home, Billing, Register, Logout } from './routes'
import { ProtectedRoute, ToastManager } from 'components'

const router = createBrowserRouter([
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  { path: '/logout', Component: Logout },
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        Component: Home,
      },
      {
        path: 'billing',
        Component: Billing,
      },
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastManager />
    </>
  )
}

export default App
