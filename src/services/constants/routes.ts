export const routes = {
    login: '/login',
    signup: '/signup',
    dashboard: '/dashboard',
    membership: '/membership',
};

export const isProtectedRoute = (pathname: string) => {
    const protectedRoutes = [routes.dashboard, routes.membership];
    return protectedRoutes.some(route => pathname.startsWith(route));
};

export const isPublicRoute = (pathname: string) => {
    const publicRoutes = [routes.login, routes.signup];
    return publicRoutes.some(route => pathname.startsWith(route));
}; 