import dash_api from "../../../helpers/dash_api"
import { CandidateType } from "../../../helpers/types";

export const fetchCandidatesForVacancy = async (id: string) => {
    return dash_api.get(`/candidate/vacancy/${id}`)
        .then((res) => {
            return res.data;
        })
        .then((data: CandidateType[]) => {
            return data;
        });
}

export const updateCandidate = async (id: string, updatedInfo: CandidateType) => {
    return dash_api.put(`/candidate/${id}`, updatedInfo)
        .then((res) => {
            return res.data;
        })
        .then((data: CandidateType) => {
            return data;
        });
}

export const addCandidateForVacancy = async (info: any) => {
    return dash_api.post(`/candidate/new`, info)
        .then((res) => {
            return res.data;
        })
        .then((data: any) => {
            return data;
        });
}