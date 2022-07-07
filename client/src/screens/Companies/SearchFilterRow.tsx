import { Button, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { CompanyType } from '../../helpers/types';
import { motion } from 'framer-motion';
import CompanyModal from './CompanyModal';

interface SearchFilterRowProps {
    searchField: string;
    setSearchField: (value: string) => void;
    companyList: CompanyType[];
    setCompanyList: any;
}

const SearchFilterRow = (props: SearchFilterRowProps) => {

    const { searchField, setSearchField, companyList, setCompanyList } = props;
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const ltrim = (str: string) => {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    useEffect(() => {
        const currentSearchField = ltrim(searchField).toLowerCase();

        if (currentSearchField === "") {
            setCompanyList(companyList);
            return;
        }

        setCompanyList((prev: CompanyType[]) => {
            return prev.filter((_company: CompanyType) => {
                if (_company.name.toLowerCase().includes(currentSearchField)) {
                    return _company;
                }
            });
        });
    }, [searchField]);

    const _searchFieldChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchField(event.target.value.trim());
    }

    const _handleOpenModal = () => setIsModalOpen(true);
    const _handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className='flex flex-row justify-between'>
            <CompanyModal
                open={isModalOpen}
                handleClose={_handleCloseModal}
            />
            <div className='w-10/12'>
                <TextField
                    label='Search company'
                    value={searchField}
                    onChange={_searchFieldChangeHandler}
                    className='w-4/6'
                />
                <SearchIcon
                    className='text-primary cursor-pointer ml-3'
                    sx={{
                        fontSize: '50px'
                    }}
                />
            </div>
            <div className='w-2/12'>
                <Button
                    onClick={_handleOpenModal}
                    onMouseOver={() => setIsHovering(!isHovering)}
                    variant='outlined'
                    className='flex flex-row items-center justify-center'>
                    <motion.div
                        animate={{
                            rotate: isHovering ? 360 : 0,
                            transition: { duration: 0.5 },
                        }}
                    >
                        <AddIcon />
                    </motion.div>
                    Add Company
                </Button>
            </div>
        </div >
    )
}

export default SearchFilterRow