import dash_api from "../../../helpers/dash_api"
import { VacancyType } from "../../../helpers/types"

export const fetchVacanciesList = async () => {
    return dash_api.get('/vacancy/all')
        .then((res) => {
            return res.data
        })
        .then((data: VacancyType[]) => {
            return data;
        });
}

export const updateVacancyInfo = async (id: string, updatedInfo: VacancyType) => {
    return dash_api.put(`/vacancy/${id}`, updatedInfo)
        .then((res) => {
            return res.data
        })
        .then((data: VacancyType) => {
            return data;
        });
}

export const addVacancyInfo = async (info: VacancyType) => {
    return dash_api.post('/vacancy/new', info)
        .then((res) => {
            return res.data
        })
        .then((data: VacancyType) => {
            return data;
        });
}