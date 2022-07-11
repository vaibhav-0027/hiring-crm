export interface CompanyType {
    id: string;
    name: string;
    url: string;
    description: string;
    companySize: number;
    openVacancies: number;
}

export interface ContactType {
    id: string;
    name: string;
    email: string;
    description: string;
    mobileNumber: number;
    linkedinUrl: string;

    companyId: string;
    fileId: string;
}

export interface RoleListType {
    id: string;
    name: string;
    description: string;
}
export interface ClientType {
    id: string;
    name: string;
    email: string;
    mobileNumber: number;
    currentPackage: number;
    expectedPackage: number;
    description: string;
    linkedinUrl: string;
    websiteUrl: string;
    noticePeriod: number;

    roleListId: string;
}