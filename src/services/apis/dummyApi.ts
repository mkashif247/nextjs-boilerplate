import apiClient from './apiClient';
import { User } from '@/types/index';

interface LoginResponse {
    user: User;
    token: string;
}

export const authApi = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                if (username === 'test@example.com' && password === 'password123') {
                    const user: User = { id: '1', email: 'test@example.com', name: 'Test User' };
                    const token = 'dummy-auth-token';
                    resolve({ user, token });
                } else {
                    throw new Error('Invalid credentials');
                }
            }, 1000);
        });
    },
    register: async (username: string, password: string): Promise<LoginResponse> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const user: User = { id: '2', email: username, name: 'New User' };
                const token = 'dummy-register-token';
                resolve({ user, token });
            }, 1000);
        });
    },
    logout: async (): Promise<void> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    },
}; 