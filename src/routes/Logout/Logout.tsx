import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store/useAuthStore'
import { useToaastStore } from 'store/useToastStore'

export default function Logout() {
  const store = useAuthStore()
  const toast = useToaastStore()
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
