'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { routes, isProtectedRoute } from '@/services/constants/routes';

interface AuthCheckerProps {
    children: ReactNode;
}

export function AuthChecker({ children }: AuthCheckerProps) {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!authLoading) {
            if (isProtectedRoute(pathname) && !isAuthenticated) {
                router.replace(routes.login);
            }
        }
    }, [isAuthenticated, authLoading, pathname, router]);

    if (authLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
    }

    if (isProtectedRoute(pathname) && !isAuthenticated) {
        return null; // Or a loading spinner, or a specific unauthorized message
    }

    return <>{children}</>;
} 