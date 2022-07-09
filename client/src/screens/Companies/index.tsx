import React, { useEffect, useState } from 'react';
import { CompanyType } from '../../helpers/types';
import { dummyCompanyList } from '../../helpers/dummyCompanyList';
import SearchFilterRow from './SearchFilterRow';
import SingleCompany from './SingleCompany';
import CompanyModal from './CompanyModal';

const Companies = () => {

    const [searchField, setSearchField] = useState<string>("");
    const [currentCompanyList, setCurrentCompanyList] = useState<CompanyType[]>([]);
    const [fullCompanyList, setFullCompanyList] = useState<CompanyType[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setCurrentCompanyList(dummyCompanyList);
        setFullCompanyList(dummyCompanyList);
    }, []);

    const _handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className='m-5 mt-20 w-full h-full'>
            <CompanyModal
                open={isModalOpen}
                handleClose={_handleCloseModal}
                currentSelected={selectedCompany}
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