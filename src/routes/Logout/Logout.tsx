import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store/useAuthStore'
import { useToastStore } from 'store/useToastStore'

export default function Logout() {
  const store = useAuthStore()
  const toast = useToastStore()
  const navigate = useNavigate()

  useEffect(() => {
    async function doLogout() {
      await store.logout()
      toast.showToast('success', 'Successfully logged out')
      navigate('/login')
    }
    doLogout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
