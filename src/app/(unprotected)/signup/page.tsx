'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { useUser } from '@/context/user-context';
import { authApi } from '@/services/apis/dummyApi';
import { routes } from '@/services/constants/routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signUpSchema } from '@/services/helpers/form-schemas';

type SignUpFormInputs = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();
    const { fetchUser } = useUser();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormInputs>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormInputs) => {
        try {
            const { user, token } = await authApi.register(data.email, data.password);
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            setIsAuthenticated(true);
            await fetchUser(); // Fetch user data after successful registration
            toast.success('Registration successful!');
            router.push(routes.dashboard);
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                {...register('email')}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register('password')}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                {...register('confirmPassword')}
                                required
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing up...' : 'Sign Up'}
                        </Button>
                    </form>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Already have an account? <a href={routes.login} className="text-primary hover:underline">Login</a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
} 