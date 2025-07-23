import { PrivilegeType } from './privilege';

export interface UserPrivilege {
    privilegeType: PrivilegeType;
    privilegeValue: number | boolean;
}

export interface PaymentPlan {
    title: string;
    plan_privileges: UserPrivilege[];
}

export interface UserMembership {
    id: string;
    planId: string;
    membershipStatus: 'active' | 'inactive' | 'cancelled';
    nextUpdateScheduledAt: string;
    endDate: string;
    payment_plans: PaymentPlan;
}

export interface UserData {
    id: string;
    user_memberships: UserMembership[];
}

export interface UserContextType {
    userData: UserData | null;
    isLoading: boolean;
    error: string | null;
    fetchUser: () => Promise<void>;
    hasActiveMembership: () => boolean;
    maxVideosAllowed: () => number;
    canEmbedWidget: () => boolean;
    isAiPowered: () => boolean;
    setUserMembership: () => Promise<void>;
    logoutUser: () => void;
} 