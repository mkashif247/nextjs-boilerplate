'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui';
import { routes } from '@/services/constants/routes';
import {
    Moon,
    Sun,
    Menu,
    X,
    User,
    LogOut,
    Settings,
    Home,
    Shield,
    UserCircle
} from 'lucide-react';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { theme, setTheme } = useTheme();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        setIsAuthenticated(false);
        router.push(routes.login);
        setIsUserMenuOpen(false);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Navigation items for authenticated users
    const authenticatedNavItems = [
        { name: 'Home', href: routes.home, icon: Home },
        { name: 'Dashboard', href: routes.dashboard, icon: Home },
    ];

    // Navigation items for unauthenticated users
    const unauthenticatedNavItems = [
        { name: 'About', href: '/about', icon: Shield },
        { name: 'Contact', href: '/contact', icon: UserCircle },
    ];

    const navItems = isAuthenticated ? authenticatedNavItems : unauthenticatedNavItems;

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href={routes.home} className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">B</span>
                            </div>
                            <span className="font-bold text-xl text-foreground">Byline Media</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="w-9 h-9"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {isAuthenticated ? (
                            /* Authenticated User Menu */
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    className="flex items-center space-x-2 px-3"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                >
                                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">
                                        {'User'}
                                    </span>
                                </Button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-50">
                                        <div className="px-4 py-2 border-b border-border">
                                            <p className="text-sm font-medium text-foreground">
                                                {'User Name'}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {'user@example.com'}
                                            </p>
                                        </div>

                                        <Link
                                            href="/profile"
                                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            Profile
                                        </Link>

                                        <Link
                                            href="/settings"
                                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-accent"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Unauthenticated User Actions */
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" asChild>
                                    <Link href={routes.login}>Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={routes.signup}>Sign Up</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        {/* Mobile Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="w-9 h-9"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-9 h-9"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-4 w-4" />
                            ) : (
                                <Menu className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-border">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200"
                                        onClick={closeMobileMenu}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}

                            {isAuthenticated ? (
                                /* Mobile Authenticated Menu */
                                <div className="border-t border-border pt-4 mt-4">
                                    <div className="px-3 py-2">
                                        <p className="text-sm font-medium text-foreground">
                                            {'User Name'}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {'user@example.com'}
                                        </p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                                        onClick={closeMobileMenu}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Profile</span>
                                    </Link>

                                    <Link
                                        href="/settings"
                                        className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                                        onClick={closeMobileMenu}
                                    >
                                        <Settings className="w-4 h-4" />
                                        <span>Settings</span>
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 w-full px-3 py-2 text-destructive hover:bg-accent rounded-md"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign out</span>
                                    </button>
                                </div>
                            ) : (
                                /* Mobile Unauthenticated Menu */
                                <div className="border-t border-border pt-4 mt-4 space-y-2">
                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                        <Link href={routes.login} onClick={closeMobileMenu}>
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button className="w-full justify-start" asChild>
                                        <Link href={routes.signup} onClick={closeMobileMenu}>
                                            Sign Up
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Click outside to close user menu */}
            {isUserMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                />
            )}
        </nav>
    );
};
