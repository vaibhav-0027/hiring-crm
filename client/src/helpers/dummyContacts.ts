import { ContactType } from "./types"

export const dummyContactList: ContactType[] = [
    {
        id: '1',
        name: 'user1',
        email: 'user1-email',
        description: 'describing user1 is something that I want to do because I want to check what happends when the description is pretty long!',
        mobileNumber: 1234567890,
        companyId: 'c1',
        linkedinUrl: 'https://google.com/dummy-url',
        fileId: '',
    },
    {
        id: '2',
        name: 'user2',
        email: 'user2-email',
        description: 'describing user2',
        mobileNumber: 1234567890,
        companyId: 'c3',
        linkedinUrl: 'dummy-url',
        fileId: '',
    },
    {
        id: '3',
        name: 'user3',
        email: 'user3-email',
        description: 'describing user3',
        mobileNumber: 3234567890,
        companyId: 'c1',
        linkedinUrl: 'dummy-url',
        fileId: '',
    },
    {
        id: '4',
        name: 'user4',
        email: 'user4-email',
        description: 'describing user4',
        mobileNumber: 4234567890,
        companyId: 'c2',
        linkedinUrl: 'dummy-url',
        fileId: '',
    },
    {
        id: '5',
        name: 'user5',
        email: 'user5-email',
        description: 'describing user5',
        mobileNumber: 1234567890,
        companyId: 'c1',
        linkedinUrl: 'dummy-url',
        fileId: '',
    },
]

export const dummyCompanyIdNameMap = {
    'c1': 'company1',
    'c2': 'company2',
    'c3': 'company3',
    'c4': 'company4',
}