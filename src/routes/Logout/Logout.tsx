import { Navigate } from 'react-router-dom'
import { useAuthStore } from 'store/useAuthStore'

export default function Logout() {
  const store = useAuthStore()

  store.logout()

  return <Navigate to={'/login'} />
}
