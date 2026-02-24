import { api } from '@/lib/api-client';

// --- Types ---
export interface MemberAddress {
    houseNo?: string;
    area?: string;
    rural?: string;
    country?: string;
    state?: string;
    district?: string;
    mandal?: string;
    city?: string;
    landmark?: string;
    ruralArea?: string;
    cityArea?: string;
    pincode?: string;
}

export interface MemberNominee {
    name?: string;
    relation?: string;
    age?: number | string;
    mobileNo?: string;
    address?: MemberAddress;
    sameAsPermanent?: boolean;
}

export interface MemberKYC {
    idProofType?: string;
    idProofUrl?: string;
    addressProofType?: string;
    addressProofUrl?: string;
    otherDocumentLabel?: string;
    otherDocumentUrl?: string;
}

export interface Member {
    _id?: string;
    memberId?: string;
    memberType: 'MEMBER' | 'ASSOCIATE';
    registrationDate?: string;
    membershipFee?: number;
    // Customer Details
    name: string;
    fatherHusbandName?: string;
    motherName?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    dob?: string;
    age?: number | string;
    occupation?: string;
    aadharNo?: string;
    panNo?: string;
    photoUrl?: string;
    signatureUrl?: string;
    // Mobile Details
    mobile1: string;
    landline?: string;
    alternateMobile?: string;
    mobile4?: string;
    // Addresses
    permanentAddress?: MemberAddress;
    correspondenceAddress?: MemberAddress;
    sameAsPermanent?: boolean;
    // Nominee
    nominee?: MemberNominee;
    // KYC
    kyc?: MemberKYC;
    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    createdAt?: string;
    updatedAt?: string;
}

export interface MemberListResponse {
    success: boolean;
    data: Member[];
    count: number;
}

// --- Service ---
export const memberService = {
    // Create a new member
    createMember: async (data: Partial<Member>): Promise<Member> => {
        return api.post<Member>('/producer-company/members', data);
    },

    // Get all members (with optional filters)
    getAllMembers: async (filters?: {
        memberType?: string;
        status?: string;
        mobile?: string;
    }): Promise<Member[]> => {
        const params = new URLSearchParams();
        if (filters?.memberType) params.append('memberType', filters.memberType);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.mobile) params.append('mobile', filters.mobile);
        return api.get<Member[]>(`/producer-company/members?${params.toString()}`);
    },

    // Get a single member by ID
    getMemberById: async (memberId: string): Promise<Member> => {
        return api.get<Member>(`/producer-company/members/${memberId}`);
    },

    // Update member
    updateMember: async (memberId: string, data: Partial<Member>): Promise<Member> => {
        return api.put<Member>(`/producer-company/members/${memberId}`, data);
    },

    // Delete member (soft delete)
    deleteMember: async (memberId: string): Promise<void> => {
        return api.delete(`/producer-company/members/${memberId}`);
    },
};
