import React, { useEffect, useState } from 'react'
import { dummyRolesList } from '../../../helpers/dummyClients';
import { RoleType } from '../../../helpers/types';
import RolesTable from './RolesTable';
import SearchFilterRow from './SearchFilterRow';
import RolesModal from './RolesModal';
import { fetchAllRolesList } from './apis';

interface RolesTabProps {
    setTabIndex: (value: number) => void;
    setCurrentRole: (value: RoleType) => void;
}

const RolesTab = (props: RolesTabProps) => {

    const { setTabIndex, setCurrentRole } = props;

    const [fullRolesList, setFullRolesList] = useState<RoleType[]>([]);
    const [currentRolesList, setCurrentRolesList] = useState<RoleType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentSelected, setCurrentSelected] = useState<RoleType | null>(null);
    const [updatedRoleInfo, setUpdatedRoleInfo] = useState<RoleType | null>(null);

    useEffect(() => {

        (async () => {
            const data = await fetchAllRolesList();
            setFullRolesList(data);
            setCurrentRolesList(data);
        })()

    }, []);

    useEffect(() => {
        if (!updatedRoleInfo) {
            return;
        }

        let found = false;
        let tempFullList = fullRolesList;
        let tempCurrentList = currentRolesList;

        tempFullList = tempFullList.map(_current => {
            if (_current.id === updatedRoleInfo.id) {
                found = true;
                return updatedRoleInfo;
            }

            return _current;
        });

        tempCurrentList = tempCurrentList.map(_current => {
            if (_current.id === updatedRoleInfo.id) {
                return updatedRoleInfo;
            }

            return _current;
        });

        if (!found) {
            tempFullList.push(updatedRoleInfo);
            tempCurrentList.push(updatedRoleInfo);
        }

        setFullRolesList(tempFullList);
        setCurrentRolesList(tempCurrentList);
    }, [updatedRoleInfo]);

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
                setUpdatedRoleInfo={setUpdatedRoleInfo}
            />
        </div>
    )
}

export default RolesTab