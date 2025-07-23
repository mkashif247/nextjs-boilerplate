'use client';

import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/context/theme-provider';
import { AuthProvider } from '@/context/authContext';
import { UserProvider } from '@/context/user-context';
import { queryClient } from '@/services/utils/queryClient';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <UserProvider>
                        <AuthProvider>
                            {children}
                            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                        </AuthProvider>
                    </UserProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
} 