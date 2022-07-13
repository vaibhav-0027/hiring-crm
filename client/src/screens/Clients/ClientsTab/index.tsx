import React, { useEffect, useState } from 'react'
import { dummyClientsList, dummyRoleIdNameMap } from '../../../helpers/dummyClients';
import { ClientType, RoleType } from '../../../helpers/types';
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

    useEffect(() => {
        if (!currentRole) {
            return;
        }
        // TODO: use currentRole to fetch clientsList from backend.

        setFullClientsList(dummyClientsList.filter((_client: ClientType) => {
            if (_client.roleId === currentRole.id) {
                return _client;
            } else {
                return null;
            }
        }));

        setCurrentClientList(dummyClientsList.filter((_client: ClientType) => {
            if (_client.roleId === currentRole.id) {
                return _client;
            } else {
                return null;
            }
        }));

        setRoleIdNameMap(dummyRoleIdNameMap);
    }, [currentRole]);

    return (
        <div>
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
            />

            <ClientsModal
                currentSelected={currentSelected}
                handleClose={() => setIsModalOpen(false)}
                open={isModalOpen}
                roleIdNameMap={roleIdNameMap}
            />
        </div>
    )
}

export default ClientsTab