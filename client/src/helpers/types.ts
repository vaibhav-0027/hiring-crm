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

export interface RoleType {
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
    noticePeriod: string;
    location: string;
    experience: number;

    roleId: string;
    fileId: string;
}

export interface VacancyType {
    id: string;
    roleName: string;
    packageMin: number;
    packageMax: number;
    jobDescription: string;
    countOpen: number;
    countClosed: number;
    isOpen: boolean;
    stages: string;

    companyId: string;
    fileId: string;
}

export interface CandidateType {
    id: string;
    status: number;
    description: string;

    vacancyId: string;
    clientId: string;
}