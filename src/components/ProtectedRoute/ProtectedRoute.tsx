import { Navigate, useLocation } from 'react-router-dom'
import { Root } from 'routes'
import { useAuthStore } from 'store/useAuthStore'

export default function ProtectedRoute() {
  const store = useAuthStore()
  const location = useLocation()

  if (store.token) {
    return <Root />
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}
