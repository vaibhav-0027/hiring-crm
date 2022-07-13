import dash_api from "../../../helpers/dash_api"
import { RoleType } from "../../../helpers/types";

export const fetchAllRolesList = async () => {
    return dash_api.get('/role/all')
        .then((res) => {
            return res.data;
        })
        .then((data: RoleType[]) => {
            return data;
        });
}

export const fetchRolesIdNameMap = async () => {
    return dash_api.get('/role/all/map')
        .then((res) => {
            return res.data;
        })
        .then((data: object) => {
            return data;
        });
}

export const updateRoleInfo = async (id: string, updatedInfo: RoleType) => {
    return dash_api.put(`/role/${id}`, updatedInfo)
        .then((res) => {
            return res.data;
        })
        .then((data: RoleType) => {
            return data;
        });
}

export const addRoleInfo = async (info: RoleType) => {
    return dash_api.post('/role/new', info)
        .then((res) => {
            return res.data;
        })
        .then((data: RoleType) => {
            return data;
        });
}