'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PrivilegeType, UserContextType, UserData, UserMembership } from '@/types';
import { ACCESS_TOKEN } from '@/services/constants/appConstants';
import { isProtectedRoute } from '@/services/constants/routes';
import { usePathname } from 'next/navigation';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const pathname = usePathname();

    const fetchUser = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        // Simulate API call for user data
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                setUserData(null);
                return;
            }

            // Mock user data
            const mockUserData: UserData = {
                id: 'user-123',
                user_memberships: [
                    {
                        id: 'mem-1',
                        planId: 'pro-plan',
                        membershipStatus: 'active',
                        nextUpdateScheduledAt: new Date().toISOString(),
                        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
                        payment_plans: {
                            title: 'Pro Plan',
                            plan_privileges: [
                                { privilegeType: PrivilegeType.EPISODE_MONITORING, privilegeValue: 30 },
                                { privilegeType: PrivilegeType.VIDEOS_ALLOWED, privilegeValue: 100 },
                                { privilegeType: PrivilegeType.CAN_EMBED, privilegeValue: true },
                                { privilegeType: PrivilegeType.AI_POWERED, privilegeValue: true },
                            ],
                        },
                    },
                ],
            };

            setUserData(mockUserData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            console.error('Error in fetchUser:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logoutUser = useCallback(() => {
        setUserData(null);
        localStorage.removeItem(ACCESS_TOKEN);
    }, []);

    const setUserMembership = useCallback(async () => {
        // Dummy implementation for setting membership
        console.log('Setting user membership - dummy function');
    }, []);

    const hasActiveMembership = useCallback(() => {
        return userData?.user_memberships?.some(
            (membership: UserMembership) => membership.membershipStatus === 'active'
        ) ?? false;
    }, [userData]);

    const maxVideosAllowed = useCallback(() => {
        if (!userData?.user_memberships) return 0;

        const activeMembership = userData.user_memberships.find(
            (membership: UserMembership) => membership.membershipStatus === 'active'
        );

        if (!activeMembership?.payment_plans?.plan_privileges?.length) return 0;

        for (const plan of activeMembership.payment_plans.plan_privileges) {
            if (plan.privilegeType === PrivilegeType.VIDEOS_ALLOWED) {
                return typeof plan.privilegeValue === 'number'
                    ? plan.privilegeValue
                    : 0; // Changed to 0 as per user requirement, if it's not a number
            }
        }

        return 0;
    }, [userData]);

    const canEmbedWidget = useCallback(() => {
        if (!userData?.user_memberships) return false;
        const activeMembership = userData.user_memberships.find(
            (membership: UserMembership) => membership.membershipStatus === 'active'
        );
        if (!activeMembership?.payment_plans?.plan_privileges?.length) return false;

        for (const plan of activeMembership.payment_plans.plan_privileges) {
            if (plan.privilegeType === PrivilegeType.CAN_EMBED) {
                return plan.privilegeValue as boolean;
            }
        }

        return false;
    }, [userData]);

    const isAiPowered = useCallback(() => {
        if (!userData?.user_memberships) return false;
        const activeMembership = userData.user_memberships.find(
            (membership: UserMembership) => membership.membershipStatus === 'active'
        );
        if (!activeMembership?.payment_plans?.plan_privileges?.length) return false;

        for (const plan of activeMembership.payment_plans.plan_privileges) {
            if (plan.privilegeType === PrivilegeType.AI_POWERED) {
                return plan.privilegeValue as boolean;
            }
        }

        return false;
    }, [userData]);

    useEffect(() => {
        (isProtectedRoute(pathname) && !userData) && fetchUser();
    }, [fetchUser, pathname, userData]); // Added userData to dependencies

    return (
        <UserContext.Provider value={{
            userData,
            isLoading,
            error,
            fetchUser,
            hasActiveMembership,
            maxVideosAllowed,
            canEmbedWidget,
            isAiPowered,
            setUserMembership,
            logoutUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 