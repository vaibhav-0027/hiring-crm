import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { dummyClientsList, dummyRoleIdNameMap } from '../../../helpers/dummyClients';
import { ClientType, RoleType } from '../../../helpers/types';
import { fetchRolesIdNameMap } from '../RolesTab/apis';
import { fetchClientsListForRole } from './apis';
import ClientsModal from './ClientsModal';
import ClientsTable from './ClientsTable';
import SearchFilterRow from './SearchFilterRow';

interface ClientsTabProps {
    currentRole: RoleType | null;
}

const ClientsTab = (props: ClientsTabProps) => {

    const { currentRole } = props;

    const [fullClientsList, setFullClientsList] = useState<ClientType[]>([]);
    const [currentClientList, setCurrentClientList] = useState<ClientType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentSelected, setCurrentSelected] = useState<ClientType | null>(null);
    const [roleIdNameMap, setRoleIdNameMap] = useState<object>({});
    const [updatedClientInfo, setUpdatedClientInfo] = useState<ClientType | null>(null);

    useEffect(() => {
        if (!currentRole) {
            return;
        }

        (async () => {
            const data = await fetchClientsListForRole(currentRole.id);
            setFullClientsList(data);
            setCurrentClientList(data);
        })()
    }, [currentRole]);

    useEffect(() => {

        (async () => {
            const data = await fetchRolesIdNameMap();
            setRoleIdNameMap(data);
        })()
    }, []);

    useEffect(() => {
        if (!updatedClientInfo) {
            return;
        }

        let found = false;
        let tempFullList = fullClientsList;
        let tempCurrentList = currentClientList;

        tempFullList = tempFullList.map(_current => {
            if (_current.id === updatedClientInfo.id) {
                found = true;
                return updatedClientInfo;
            }

            return _current;
        });

        tempCurrentList = tempCurrentList.map(_current => {
            if (_current.id === updatedClientInfo.id) {
                return updatedClientInfo;
            }

            return _current;
        });

        if (!found) {
            tempFullList.push(updatedClientInfo);
            tempCurrentList.push(updatedClientInfo);
        }

        setFullClientsList(tempFullList);
        setCurrentClientList(tempCurrentList);
    }, [updatedClientInfo]);

    return (
        <div>
            <ToastContainer />

            <SearchFilterRow
                clientsList={fullClientsList}
                setClientsList={setCurrentClientList}
                setCurrentSelected={setCurrentSelected}
                setIsModalOpen={setIsModalOpen}
            />

            <ClientsTable
                clientsList={currentClientList}
                setCurrentSelected={setCurrentSelected}
                setIsModalOpen={setIsModalOpen}
                currentSelected={currentSelected}
            />

            <ClientsModal
                currentSelected={currentSelected}
                handleClose={() => setIsModalOpen(false)}
                open={isModalOpen}
                roleIdNameMap={roleIdNameMap}
                setUpdatedClientInfo={setUpdatedClientInfo}
            />
        </div>
    )
}

export default ClientsTab