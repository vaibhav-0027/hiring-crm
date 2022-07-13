import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { dummyCompanyIdNameMap, dummyVacancyList } from '../../../helpers/dummyVacancies';
import { VacancyType } from '../../../helpers/types';
import { fetchCompanyIdNameMap } from '../../Companies/apis';
import { fetchVacanciesList } from './apis';
import SearchFilterRow from './SearchFilterRow';
import VacanciesModal from './VacanciesModal';
import VacanciesTable from './VacanciesTable';

interface VacancyTabProps {
    setTabIndex: (value: number) => void;
    setCurrentVacancy: (value: VacancyType) => void;
}

const VacanciesTab = (props: VacancyTabProps) => {

    const { setTabIndex, setCurrentVacancy } = props;

    const [fullVacancyList, setFullVacancyList] = useState<VacancyType[]>([]);
    const [currentVacancyList, setCurrentVacancyList] = useState<VacancyType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentSelected, setCurrentSelected] = useState<VacancyType | null>(null);
    const [companyIdNameMap, setCompanyIdNameMap] = useState<object>({});
    const [updatedVacancyInfo, setUpdatedVacancyInfo] = useState<VacancyType | null>(null);

    useEffect(() => {

        (async () => {
            const data = await fetchVacanciesList();
            setFullVacancyList(data);
            setCurrentVacancyList(data);
        })()

    }, []);

    useEffect(() => {

        (async () => {
            const data = await fetchCompanyIdNameMap();
            setCompanyIdNameMap(data);
        })()

    }, []);

    useEffect(() => {
        if (!updatedVacancyInfo) {
            return;
        }

        let found = false;
        let tempFullList = fullVacancyList;
        let tempCurrentList = currentVacancyList;

        tempFullList = tempFullList.map(_current => {
            if (_current.id === updatedVacancyInfo.id) {
                found = true;
                return updatedVacancyInfo;
            }

            return _current;
        });

        tempCurrentList = tempCurrentList.map(_current => {
            if (_current.id === updatedVacancyInfo.id) {
                return updatedVacancyInfo;
            }

            return _current;
        });

        tempFullList = tempFullList.filter(_current => {
            if (_current.isOpen) {
                return _current;
            } else {
                return null;
            }
        });

        tempCurrentList = tempCurrentList.filter(_current => {
            if (_current.isOpen) {
                return _current;
            } else {
                return null;
            }
        });

        if (!found) {
            tempFullList.push(updatedVacancyInfo);
            tempCurrentList.push(updatedVacancyInfo);
        }

        setFullVacancyList(tempFullList);
        setCurrentVacancyList(tempCurrentList);
    }, [updatedVacancyInfo]);

    return (
        <div>
            <ToastContainer />

            <SearchFilterRow
                vacancyList={fullVacancyList}
                setVacancyList={setCurrentVacancyList}
                setIsModalOpen={setIsModalOpen}
                setCurrentSelected={setCurrentSelected}
                companyIdNameMap={companyIdNameMap}
            />

            <VacanciesTable
                vacancyList={currentVacancyList}
                setIsModalOpen={setIsModalOpen}
                setCurrentSelected={setCurrentSelected}
                setTabIndex={setTabIndex}
                setCurrentVacancy={setCurrentVacancy}
                companyIdNameMap={companyIdNameMap}
            />

            <VacanciesModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                currentSelected={currentSelected}
                companyIdNameMap={companyIdNameMap}
                setUpdatedVacancyInfo={setUpdatedVacancyInfo}
            />
        </div>
    )
}

export default VacanciesTab
