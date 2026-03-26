import { api } from '@/lib/api-client';

export interface IntroducerAddress {
    houseNo?: string;
    area?: string;
    rural?: string;
    country?: string;
    state?: string;
    district?: string;
    cityArea?: string;
    landMark?: string;
    poSubCity?: string;
    pincode?: string;
}

export interface Introducer {
    _id?: string;
    introducerId?: string;
    bankId?: string;
    branchId?: string;
    postAppliedFor: string;
    employeeName: string;
    rural?: string;
    country?: string;
    gender?: string;
    poSubCity?: string;
    pincode?: string;
    houseNo?: string;
    district?: string;
    residenceNo?: string;
    area?: string;
    state?: string;
    mobileNo: string;
    ruralArea?: string;
    cityArea?: string;
    landMark?: string;
    mandal?: string;
    dob?: string;
    age?: number | string;
    photoUrl?: string;
    signatureUrl?: string;

    // Family Details
    fatherHusbandName?: string;
    motherMaidenName?: string;
    familyRuralArea?: string;
    familyState?: string;
    familyMandal?: string;

    nominee?: {
        name?: string;
        relation?: string;
        age?: string;
        mobileNo?: string;
        address?: IntroducerAddress;
    };

    // Other Details
    bankAccount?: {
        bankName?: string;
        branch?: string;
        branchCode?: string;
        accountNo?: string;
        ifscCode?: string;
        bankAddress?: string;
    };

    idProofType?: string;
    relateCode?: string;
    proposedArea?: string;
    introducerName?: string;
    introducerDesigCode?: string;
    issuedOn?: string;
    validUpto?: string;
    bloodGroup?: string;
    occupation?: string;
    qualification?: string;
    introducerAadhar?: string;

    // Past Experience
    experience?: {
        companyName?: string;
        joiningDate?: string;
        currentGrade?: string;
        operationArea?: string;
        joiningGrade?: string;
    };

    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    createdAt?: string;
}

export const introducerService = {
    createIntroducer: async (data: Introducer): Promise<Introducer> => {
        return api.post<Introducer>('/producer-company/introducers', data);
    },

    getAllIntroducers: async (params?: any): Promise<Introducer[]> => {
        return api.get<Introducer[]>('/producer-company/introducers', { params });
    },

    getIntroducerById: async (id: string): Promise<Introducer> => {
        return api.get<Introducer>(`/producer-company/introducers/${id}`);
    },

    updateIntroducer: async (id: string, data: Partial<Introducer>): Promise<Introducer> => {
        return api.patch<Introducer>(`/producer-company/introducers/${id}`, data);
    },

    deleteIntroducer: async (id: string): Promise<void> => {
        return api.delete(`/producer-company/introducers/${id}`);
    }
};
