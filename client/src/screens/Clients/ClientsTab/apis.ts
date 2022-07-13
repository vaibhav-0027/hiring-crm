import dash_api from "../../../helpers/dash_api"
import { ClientType } from "../../../helpers/types";

export const fetchClientsListForRole = async (id: string) => {
    return dash_api.get(`/client/role/${id}`)
        .then((res) => {
            return res.data;
        })
        .then((data: ClientType[]) => {
            return data;
        });
}

export const updateClientInfo = async (id: string, updatedInfo: ClientType) => {
    return dash_api.put(`/client/${id}`, updatedInfo)
        .then((res) => {
            return res.data;
        })
        .then((data: ClientType) => {
            return data;
        });
}

export const addClientInfo = async (info: ClientType) => {
    return dash_api.post('/client/new', info)
        .then((res) => {
            return res.data;
        })
        .then((data: ClientType) => {
            return data;
        });
}