import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastManager, ModalManager } from 'components'
import routesConfig from 'routesConfig'

const router = createBrowserRouter(routesConfig)

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
