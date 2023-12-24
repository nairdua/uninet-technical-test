import { ProtectedRoute } from 'components'
import {
  Login,
  Register,
  Logout,
  NotFound,
  Home,
  Billing,
  Posts,
  CreatePost,
} from 'routes'
import { PostDetail, EditPost } from 'routes/Posts'

const routesConfig = [
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
          {
            path: ':postId',
            children: [
              { path: '', Component: PostDetail },
              { path: 'edit', Component: EditPost },
            ],
          },
          {
            path: 'create',
            Component: CreatePost,
          },
        ],
      },
    ],
  },
]

export default routesConfig
