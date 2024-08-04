'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/context/AuthContext'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isLoading } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
        if (!isLoggedIn && !token) {
            router.push('/login')
        }
    }, [isLoggedIn, router])

  return <>{children}</>
}

export default ProtectedRoute
