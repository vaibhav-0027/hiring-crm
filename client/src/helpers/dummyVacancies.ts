import { VacancyType } from "./types"

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
        stages: '',
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
        stages: '',
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
        stages: '',
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
        stages: '',
        companyId: 'company-id-3',
    },
]