import React, { useEffect, useState } from 'react'
import { dummyCompanyIdNameMap, dummyVacancyList } from '../../../helpers/dummyVacancies';
import { VacancyType } from '../../../helpers/types';
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

    useEffect(() => {
        setCompanyIdNameMap(dummyCompanyIdNameMap);
        setFullVacancyList(dummyVacancyList);
        setCurrentVacancyList(dummyVacancyList);
    }, []);

    return (
        <div>
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
            />
        </div>
    )
}

export default VacanciesTab
