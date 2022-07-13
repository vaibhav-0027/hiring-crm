import dash_api from "../../helpers/dash_api"
import { ContactType } from "../../helpers/types"

export const fetchContactList = async () => {
    return dash_api.get('/contact/all')
        .then((res) => {
            return res.data
        })
        .then((data: ContactType[]) => {
            return data;
        });
}

export const updateContactInfo = async (id: string, updatedInfo: ContactType) => {
    return dash_api.put(`/contact/${id}`, updatedInfo)
        .then((res) => {
            return res.data;
        })
        .then((data: ContactType) => {
            return data;
        });
}

export const addContactInfo = async (info: ContactType) => {
    return dash_api.post(`/contact/new`, info)
        .then((res) => {
            return res.data;
        })
        .then((data: ContactType) => {
            return data;
        });
}