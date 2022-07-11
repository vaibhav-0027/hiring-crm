import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { VacancyType } from '../../../helpers/types';
import { motion } from 'framer-motion';

interface SearchFilterRowProps {
    vacancyList: VacancyType[];
    setVacancyList: any;
    setIsModalOpen: (value: boolean) => void;
    setCurrentSelected: (value: null) => void;
    companyIdNameMap: any;
}

const SearchFilterRow = (props: SearchFilterRowProps) => {

    const {
        vacancyList,
        setVacancyList,
        setIsModalOpen,
        setCurrentSelected,
        companyIdNameMap } = props;
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [searchField, setSearchField] = useState<string>('');

    const ltrim = (str: string) => {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    useEffect(() => {
        const currentSearchField = ltrim(searchField).toLowerCase();

        if (currentSearchField === "") {
            setVacancyList(vacancyList);
            return;
        }

        setVacancyList((prev: VacancyType[]) => {
            return prev.filter((_vacancy: VacancyType) => {
                if (_vacancy.name.toLowerCase().includes(currentSearchField)) {
                    return _vacancy;
                }

                if (_vacancy.description.toLowerCase().includes(currentSearchField)) {
                    return _vacancy;
                }

                if (companyIdNameMap[_vacancy.companyId].toLowerCase().includes(currentSearchField)) {
                    return _vacancy;
                }

                return null;
            });
        });
        // eslint-disable-next-line
    }, [searchField]);

    const _searchFieldChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchField(event.target.value.trim());
    }

    const _handleAddVacancyClick = () => {
        setCurrentSelected(null);
        setIsModalOpen(true);
    }

    return (
        <div className='flex flex-row justify-between'>
            <div className='w-10/12'>
                <TextField
                    label='Search by title or company or description'
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
                    onClick={_handleAddVacancyClick}
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
                    Add New Vacancy
                </Button>
            </div>
        </div >
    )
}

export default SearchFilterRow