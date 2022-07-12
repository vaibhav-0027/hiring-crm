import React, { useEffect, useState } from 'react';
import { CompanyType } from '../../helpers/types';
import SearchFilterRow from './SearchFilterRow';
import SingleCompany from './SingleCompany';
import CompanyModal from './CompanyModal';
import { fetchCompanyList } from './apis';

const Companies = () => {

    const [searchField, setSearchField] = useState<string>("");
    const [currentCompanyList, setCurrentCompanyList] = useState<CompanyType[]>([]);
    const [fullCompanyList, setFullCompanyList] = useState<CompanyType[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [updatedCompanyInfo, setUpdatedCompanyInfo] = useState<CompanyType | null>(null);

    useEffect(() => {
        // Fetching company list 
        (async () => {
            const data = await fetchCompanyList();
            setCurrentCompanyList(data);
            setFullCompanyList(data);
        })()
    }, []);

    useEffect(() => {
        if (!updatedCompanyInfo) {
            return;
        }

        let found = false;
        let tempFullList = fullCompanyList;
        let tempCurrentList = currentCompanyList;

        tempFullList = tempFullList.map(_current => {
            if (_current.id === updatedCompanyInfo.id) {
                found = true;
                return updatedCompanyInfo;
            }

            return _current;
        });

        tempCurrentList = tempCurrentList.map(_current => {
            if (_current.id === updatedCompanyInfo.id) {
                return updatedCompanyInfo;
            }

            return _current;
        });

        if (!found) {
            tempFullList.push(updatedCompanyInfo);
            tempCurrentList.push(updatedCompanyInfo);
        }

        setFullCompanyList(tempFullList);
        setCurrentCompanyList(tempCurrentList);
    }, [updatedCompanyInfo]);

    const _handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className='m-5 mt-20 w-full h-full'>
            <CompanyModal
                open={isModalOpen}
                handleClose={_handleCloseModal}
                currentSelected={selectedCompany}
                setUpdatedCompanyInfo={setUpdatedCompanyInfo}
            />

            <SearchFilterRow
                searchField={searchField}
                setSearchField={setSearchField}
                companyList={fullCompanyList}
                setCompanyList={setCurrentCompanyList}
                setIsModalOpen={setIsModalOpen}
                setSelectedCompany={setSelectedCompany}
            />

            <div className='mt-5 grid grid-flow-row grid-cols-3'>
                {
                    currentCompanyList.map((_company: CompanyType, idx: number) => {
                        return (
                            <SingleCompany
                                key={idx}
                                info={_company}
                                setSelectedCompany={setSelectedCompany}
                                setIsEditCompanyModalOpen={setIsModalOpen}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Companies