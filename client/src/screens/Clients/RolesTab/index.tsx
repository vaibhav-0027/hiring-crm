import React, { useEffect, useState } from 'react'
import { dummyRolesList } from '../../../helpers/dummyClients';
import { RoleListType } from '../../../helpers/types';
import RolesTable from './RolesTable';
import SearchFilterRow from './SearchFilterRow';
import RolesModal from './RolesModal';

interface RolesTabProps {
    setTabIndex: (value: number) => void;
    setCurrentRole: (value: RoleListType) => void;
}

const RolesTab = (props: RolesTabProps) => {

    const { setTabIndex, setCurrentRole } = props;

    const [fullRolesList, setFullRolesList] = useState<RoleListType[]>([]);
    const [currentRolesList, setCurrentRolesList] = useState<RoleListType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentSelected, setCurrentSelected] = useState<RoleListType | null>(null);

    useEffect(() => {
        setFullRolesList(dummyRolesList);
        setCurrentRolesList(dummyRolesList);
    }, []);

    return (
        <div>
            <SearchFilterRow
                rolesList={fullRolesList}
                setRolesList={setCurrentRolesList}
                setIsModalOpen={setIsModalOpen}
                setCurrentSelected={setCurrentSelected}
            />

            <RolesTable
                rolesList={currentRolesList}
                setIsModalOpen={setIsModalOpen}
                setCurrentSelected={setCurrentSelected}
                setTabIndex={setTabIndex}
                setCurrentRole={setCurrentRole}
            />

            <RolesModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                currentSelected={currentSelected}
            />
        </div>
    )
}

export default RolesTab