import React, { useEffect, useState } from 'react'
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
    const [companyIdNameMap, setCompanyIdNameMap] = useState<any>({});
    const [searchField, setSearchField] = useState<string>('');
    const [updatedVacancyInfo, setUpdatedVacancyInfo] = useState<VacancyType | null>(null);

    useEffect(() => {

        (async () => {
            const data: any = await fetchCompanyIdNameMap();
            setCompanyIdNameMap(data);

            const data1 = await fetchVacanciesList();

            var query = window.location.search.split('query=')[1] || "";
            query = query.replace("%20", " ");
            setSearchField(query);

            setFullVacancyList(data1);
            if (query !== "") {
                setCurrentVacancyList(data1.filter(_current => {
                    if (data[_current.companyId] === query) {
                        return _current;
                    }
                }));
            } else {
                setCurrentVacancyList(data1);
            }
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
            <SearchFilterRow
                vacancyList={fullVacancyList}
                setVacancyList={setCurrentVacancyList}
                setIsModalOpen={setIsModalOpen}
                setCurrentSelected={setCurrentSelected}
                companyIdNameMap={companyIdNameMap}
                searchField={searchField}
                setSearchField={setSearchField}
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
