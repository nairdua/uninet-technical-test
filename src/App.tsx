import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, NotFound, Root, Home, Billing } from './routes'

const router = createBrowserRouter([
  { path: '/login', Component: Login },
  {
    path: '/',
    Component: Root,
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
  return <RouterProvider router={router} />
}

export default App
