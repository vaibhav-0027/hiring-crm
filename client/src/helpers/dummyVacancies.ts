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
        name: 'SDE 1',
        packageMin: 15.5,
        packageMax: 20,
        description: '',
        countOpen: 3,
        countClosed: 0,
        isOpen: true,
        stages: 'Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired',
        companyId: 'company-id-1',
    },
    {
        id: 'vacancy-id-2',
        name: 'SDE 1',
        packageMin: 15.5,
        packageMax: 20,
        description: '',
        countOpen: 3,
        countClosed: 0,
        isOpen: true,
        stages: 'Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired',
        companyId: 'company-id-2',
    },
    {
        id: 'vacancy-id-3',
        name: 'SDE 2',
        packageMin: 15.5,
        packageMax: 20,
        description: '',
        countOpen: 3,
        countClosed: 0,
        isOpen: true,
        stages: 'Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired',
        companyId: 'company-id-1',
    },
    {
        id: 'vacancy-id-4',
        name: 'SDE 1',
        packageMin: 15.5,
        packageMax: 20,
        description: '',
        countOpen: 3,
        countClosed: 0,
        isOpen: true,
        stages: 'Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired',
        companyId: 'company-id-3',
    },
]

export const dummyCandidateList: CandidateType[] = [
    {
        id: 'candidate-id-1',
        vacancyId: 'vacancy-id-1',
        clientId: 'user-id-1',
        index: 0,
        description: "some lorem ipsum thing",
    },
    {
        id: 'candidate-id-2',
        vacancyId: 'vacancy-id-1',
        clientId: 'user-id-1',
        index: 0,
        description: "some lorem ipsum thing sometyhing longer lorem upsum shit",
    },
    {
        id: 'candidate-id-3',
        vacancyId: 'vacancy-id-1',
        clientId: 'user-id-1',
        index: 1,
        description: "some lorem ipsum thing",
    },
    {
        id: 'candidate-id-4',
        vacancyId: 'vacancy-id-1',
        clientId: 'user-id-1',
        index: 2,
        description: "some lorem ipsum thing",
    },
]