import { ClientType, RoleListType } from "./types";

export const dummyRolesList: RoleListType[] = [
    {
        id: 'role-id1',
        name: 'SDE',
        description: 'does a whole lot of tech stuff',
    },
    {
        id: 'role-id2',
        name: 'PM',
        description: 'does a whole lot of tech stuff',
    },
    {
        id: 'role-id3',
        name: 'Gaming engineer',
        description: 'does a whole lot of tech stuff',
    },
    {
        id: 'role-id4',
        name: 'Sales',
        description: 'does a whole lot of tech stuff',
    },
];

export const dummyRoleIdNameMap: object = {
    'role-id1': 'SDE',
    'role-id2': 'PM',
    'role-id3': 'Gaming engineer',
    'role-id4': 'Sales',
}

export const dummyClientsList: ClientType[] = [
    {
        id: 'client-1',
        name: 'client-name-1',
        email: 'email-1',
        mobileNumber: 1234567890,
        currentPackage: 10.1,
        expectedPackage: 14.2,
        description: 'asdf',
        linkedinUrl: '',
        websiteUrl: '',
        noticePeriod: 10,
        roleListId: 'role-id1',
    },
    {
        id: 'client-2',
        name: 'client-name-2',
        email: 'email-2',
        mobileNumber: 2234567890,
        currentPackage: 20.2,
        expectedPackage: 24.2,
        description: 'asdfasdfasdf',
        linkedinUrl: '',
        websiteUrl: '',
        noticePeriod: 20,
        roleListId: 'role-id2',
    },
    {
        id: 'client-3',
        name: 'client-name-3',
        email: 'email-3',
        mobileNumber: 3234567890,
        currentPackage: 30.3,
        expectedPackage: 34.2,
        description: '',
        linkedinUrl: '',
        websiteUrl: '',
        noticePeriod: 30,
        roleListId: 'role-id3',
    },
    {
        id: 'client-4',
        name: 'client-name-4',
        email: 'email-4',
        mobileNumber: 1234567890,
        currentPackage: 10.1,
        expectedPackage: 14.2,
        description: '',
        linkedinUrl: '',
        websiteUrl: '',
        noticePeriod: 10,
        roleListId: 'role-id1',
    },
]
