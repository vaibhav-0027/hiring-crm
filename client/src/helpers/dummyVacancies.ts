import { CandidateType, VacancyType } from "./types"

export const dummyCompanyIdNameMap: object = {
    'company-id-1': 'Google',
    'company-id-2': 'Microsoft',
    'company-id-3': 'Amazon',
    'company-id-4': 'Facebook',
    'company-id-5': 'Netflix',
}

export const dummyVacancyList: VacancyType[] = [
    {
        id: 'vacancy-id-1',
        roleName: 'SDE 1',
        packageMin: 15.5,
        packageMax: 20,
        jobDescription: '',
        countOpen: 3,
        countClosed: 0,
        isOpen: true,
        stages: 'Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired',
        companyId: 'company-id-1',
        fileId: '',
    },
    {
        id: 'vacancy-id-2',
        roleName: 'SDE 1',
        packageMin: 15.5,
        packageMax: 20,
        jobDescription: '',
        countOpen: 3,
        countClosed: 0,
        isOpen: true,
        stages: 'Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired',
        companyId: 'company-id-2',
        fileId: '',
    },
    {
        id: 'vacancy-id-3',
        roleName: 'SDE 2',
        packageMin: 15.5,
        packageMax: 20,
        jobDescription: '',
        countOpen: 3,
        countClosed: 0,
        isOpen: true,
        stages: 'Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired',
        companyId: 'company-id-1',
        fileId: '',
    },
    {
        id: 'vacancy-id-4',
        roleName: 'SDE 1',
        packageMin: 15.5,
        packageMax: 20,
        jobDescription: '',
        countOpen: 3,
        countClosed: 0,
        isOpen: true,
        stages: 'Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired',
        companyId: 'company-id-3',
        fileId: '',
    },
]

export const dummyCandidateList: CandidateType[] = [
    {
        id: 'candidate-id-1',
        vacancyId: 'vacancy-id-1',
        clientId: 'user-id-1',
        status: 0,
        description: "some lorem ipsum thing",
        name: 'random-person'
    },
    {
        id: 'candidate-id-2',
        vacancyId: 'vacancy-id-1',
        clientId: 'user-id-1',
        status: 0,
        description: "some lorem ipsum thing sometyhing longer lorem upsum shit",
        name: 'random-person'
    },
    {
        id: 'candidate-id-3',
        vacancyId: 'vacancy-id-1',
        clientId: 'user-id-1',
        status: 1,
        description: "some lorem ipsum thing",
        name: 'random-person'
    },
    {
        id: 'candidate-id-4',
        vacancyId: 'vacancy-id-1',
        clientId: 'user-id-1',
        status: 2,
        description: "some lorem ipsum thing",
        name: 'random-person'
    },
]