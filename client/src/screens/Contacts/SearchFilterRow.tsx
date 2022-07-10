import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { ContactType } from '../../helpers/types';
import { motion } from 'framer-motion';

interface SearchFilterRowProps {
    searchField: string;
    setSearchField: (value: string) => void;
    contactList: ContactType[];
    companyIdList: any; // map[id]name
    setContactList: any;
    setIsModalOpen: (value: boolean) => void;
    setCurrentSelected: (value: null) => void;
}

const SearchFilterRow = (props: SearchFilterRowProps) => {

    const {
        searchField,
        setSearchField,
        contactList,
        companyIdList,
        setContactList,
        setIsModalOpen,
        setCurrentSelected } = props;
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const ltrim = (str: string) => {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    useEffect(() => {
        const currentSearchField = ltrim(searchField).toLowerCase();

        if (currentSearchField === "") {
            setContactList(contactList);
            return;
        }

        setContactList((prev: ContactType[]) => {
            return prev.filter((_contact: ContactType) => {
                if (_contact.name.toLowerCase().includes(currentSearchField)) {
                    return _contact;
                }

                if (companyIdList[_contact.companyId].toLowerCase().includes(currentSearchField)) {
                    return _contact;
                }

                return null;
            });
        });
        // eslint-disable-next-line
    }, [searchField]);

    const _searchFieldChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchField(event.target.value.trim());
    }

    const _handleAddCompanyClick = () => {
        setCurrentSelected(null);
        setIsModalOpen(true);
    }

    return (
        <div className='flex flex-row justify-between'>
            <div className='w-10/12'>
                <TextField
                    label='Search by name or company'
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
                    onClick={_handleAddCompanyClick}
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
                    Add New Contact
                </Button>
            </div>
        </div >
    )
}

export default SearchFilterRow