import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { RoleListType } from '../../../helpers/types';
import { motion } from 'framer-motion';

interface SearchFilterRowProps {
    rolesList: RoleListType[];
    setRolesList: any;
    setIsModalOpen: (value: boolean) => void;
    setCurrentSelected: (value: null) => void;
}

const SearchFilterRow = (props: SearchFilterRowProps) => {

    const {
        rolesList,
        setRolesList,
        setIsModalOpen,
        setCurrentSelected } = props;
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [searchField, setSearchField] = useState<string>('');

    const ltrim = (str: string) => {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    useEffect(() => {
        const currentSearchField = ltrim(searchField).toLowerCase();

        if (currentSearchField === "") {
            setRolesList(rolesList);
            return;
        }

        setRolesList((prev: RoleListType[]) => {
            return prev.filter((_role: RoleListType) => {
                if (_role.name.toLowerCase().includes(currentSearchField)) {
                    return _role;
                }

                return null;
            });
        });
        // eslint-disable-next-line
    }, [searchField]);

    const _searchFieldChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchField(event.target.value.trim());
    }

    const _handleAddRoleClick = () => {
        setCurrentSelected(null);
        setIsModalOpen(true);
    }

    return (
        <div className='flex flex-row justify-between'>
            <div className='w-10/12'>
                <TextField
                    label='Search by name'
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
                    onClick={_handleAddRoleClick}
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
                    Add New Role
                </Button>
            </div>
        </div >
    )
}

export default SearchFilterRow