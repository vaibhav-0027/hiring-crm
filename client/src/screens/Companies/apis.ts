import dash_api from "../../helpers/dash_api";
import { CompanyType } from "../../helpers/types";

export const fetchCompanyList = async () => {
    return dash_api.get('/company/all')
        .then((res) => {
            return res.data
        })
        .then((data: CompanyType[]) => {
            return data;
        });
}

export const fetchCompanyIdNameMap = async () => {
    return dash_api.get('/company/all/map')
        .then((res) => {
            return res.data
        })
        .then((data: object) => {
            return data;
        });
}

export const updateCompanyInfo = async (id: string, updatedInfo: CompanyType) => {
    return dash_api.put(`/company/${id}`, updatedInfo)
        .then((res) => {
            return res.data
        })
        .then((data: CompanyType) => {
            return data;
        });
}

export const addCompanyInfo = async (info: CompanyType) => {
    return dash_api.post('/company/new', info)
        .then((res) => {
            return res.data
        })
        .then((data: CompanyType) => {
            return data;
        });
}