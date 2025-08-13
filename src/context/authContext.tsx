'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { routes, isProtectedRoute, isPublicRoute } from '@/services/constants/routes'
import { ACCESS_TOKEN } from '@/constants/appConstants'

type AuthContextType = {
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
    loading: boolean; // Added loading property
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()
    const isCheckingRef = useRef(false)
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            if (isCheckingRef.current) return
            isCheckingRef.current = true

            try {
                const accessToken = localStorage.getItem(ACCESS_TOKEN)
                const authStatus = !!accessToken

                if (authStatus !== isAuthenticated) {
                    setIsAuthenticated(authStatus)
                }

                // Do nothing on public routes
                if (isPublicRoute(pathname)) {
                    return
                }

                // Redirect only when trying to access protected routes unauthenticated
                if (!authStatus && isProtectedRoute(pathname)) {
                    router.replace(routes.login)
                    return
                }

            } finally {
                isCheckingRef.current = false
                setLoading(false); // Set loading to false after check
            }
        }

        checkAuthAndRedirect()
    }, [pathname, isAuthenticated, router])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 