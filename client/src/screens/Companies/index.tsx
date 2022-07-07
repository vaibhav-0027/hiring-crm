import React, { useEffect, useState } from 'react';
import { CompanyType } from '../../helpers/types';
import { dummyCompanyList } from '../../helpers/dummyCompanyList';
import SearchFilterRow from './SearchFilterRow';
import SingleCompany from './SingleCompany';

const Companies = () => {

    const [searchField, setSearchField] = useState<string>("");
    const [currentCompanyList, setCurrentCompanyList] = useState<CompanyType[]>([]);
    const [fullCompanyList, setFullCompanyList] = useState<CompanyType[]>([]);

    useEffect(() => {
        setCurrentCompanyList(dummyCompanyList);
        setFullCompanyList(dummyCompanyList);
    }, []);

    return (
        <div className='m-5 mt-20 w-full h-full'>
            <SearchFilterRow
                searchField={searchField}
                setSearchField={setSearchField}
                companyList={fullCompanyList}
                setCompanyList={setCurrentCompanyList}
            />

            <div className='mt-5 grid grid-flow-row grid-cols-3'>
                {
                    currentCompanyList.map((_company: CompanyType, idx: number) => {
                        return <SingleCompany info={_company} key={idx} />
                    })
                }
            </div>
        </div>
    )
}

export default Companies