'use client';

import { AuthChecker } from '@/components/auth-checker';
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    return (
        <AuthChecker>
            {children}
        </AuthChecker>
    );
} 