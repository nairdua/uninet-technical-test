import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Login,
  NotFound,
  Home,
  Billing,
  Register,
  Logout,
  Posts,
  CreatePost,
} from './routes'
import { ProtectedRoute, ToastManager } from 'components'
import ModalManager from 'components/ModalManager/ModalManager'
import { PostDetail } from 'routes/Posts'

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
      {
        path: 'posts/*',
        children: [
          { index: true, Component: Posts },
          { path: ':postId', Component: PostDetail },
          {
            path: 'create',
            Component: CreatePost,
          },
        ],
      },
    ],
  },
])

function App() {
  return (
    <>
      <ToastManager />
      <ModalManager />
      <RouterProvider router={router} />
    </>
  )
}

export default App
