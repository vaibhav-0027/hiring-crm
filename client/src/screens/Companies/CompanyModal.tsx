import { Box, Button, Modal, TextareaAutosize, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { CompanyType } from '../../helpers/types';
import { toast } from 'react-toastify';
import { checkEmptyInput } from '../../helpers/emptyInputChecker';
import { addCompanyInfo, updateCompanyInfo } from './apis';
import { DUMMY_UUID } from '../../helpers/constants';

interface NewCompanyModalProps {
    open: boolean;
    handleClose: () => void;
    currentSelected: CompanyType | null;
    setUpdatedCompanyInfo: (value: CompanyType) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '75vh',
    overflowX: 'scroll',
    bgcolor: 'background.paper',
    borderRaduis: '5px',
    boxShadow: 24,
    p: 4,
};

const CompanyModal = (props: NewCompanyModalProps) => {

    const {
        open,
        handleClose,
        currentSelected,
        setUpdatedCompanyInfo } = props;

    const [id, setId] = useState<string>('');
    const [openVacancies, setOpenVacancies] = useState<number>(0);
    const [companyName, setCompanyName] = useState<string>('');
    const [companyUrl, setCompanyUrl] = useState<string>('');
    const [companySize, setCompanySize] = useState<number>(0);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (!currentSelected) {
            setId('');
            setOpenVacancies(0);
            setCompanyName('');
            setCompanyUrl('');
            setCompanySize(0);
            setDescription('');
            return;
        }

        setId(currentSelected.id);
        setOpenVacancies(currentSelected.openVacancies);
        setCompanyName(currentSelected.name);
        setCompanyUrl(currentSelected.url);
        setCompanySize(currentSelected.companySize);
        setDescription(currentSelected.description);
    }, [currentSelected]);

    const _companySizeChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const temp = parseInt(event && event.target.value);
        if (temp > 0) {
            setCompanySize(temp);
        }
    }

    const _saveButtonClickHandler = async () => {
        if (checkEmptyInput(companyName)) {
            toast.warning("Company name cannot be empty!");
            return;
        }

        if (checkEmptyInput(companyUrl)) {
            toast.warning("Company url cannot be empty!");
            return;
        }

        const info = {
            name: companyName.trim(),
            url: companyUrl.trim(),
            description: description.trim(),
            companySize: companySize,
            openVacancies: 0,
            id: DUMMY_UUID,
        };

        if (!currentSelected) {
            let response = await addCompanyInfo(info);
            if (!response) {
                toast.error(`
                Something went wrong! 
                Possible reasons: 
                1. company url already used.
                2. server issue`)
                return;
            }

            setUpdatedCompanyInfo(response);
            handleClose();
            return;
        }

        const updatedInfo = {
            ...info,
            openVacancies: openVacancies,
            id: id,
        };

        let response = await updateCompanyInfo(id, updatedInfo);
        if (!response) {
            toast.error(`
            Something went wrong! 
            Possible reasons: 
            1. company url already used.
            2. server issue`)
            return;
        }

        setUpdatedCompanyInfo(response);
        handleClose();
    }
    // TODO: Style textarea similar to normal input fields.

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div className='text-2xl text-primary ml-2 font-bold'>
                    {currentSelected ? 'Edit' : 'Add'}
                    <span className='ml-2'>company info</span>
                </div>

                <form className='flex flex-col w-full p-2'>
                    <div className='flex flex-row'>
                        <TextField
                            placeholder='Company name...'
                            label='Company name'
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}
                            className='w-1/2'
                            required
                        />
                    </div>

                    <div className='flex flex-row w-full mt-3'>
                        <div className='w-3/4'>
                            <TextField
                                placeholder='Company url...'
                                label='Company url'
                                value={companyUrl}
                                onChange={e => setCompanyUrl(e.target.value)}
                                className='w-11/12'
                                required
                            />
                        </div>
                        <div className='w-1/4'>
                            <TextField
                                placeholder='Company size...'
                                label='Company size'
                                value={companySize}
                                onChange={_companySizeChangeHandler}
                                className='w-11/12'
                                type='number'
                                required
                            />
                        </div>
                    </div>

                    <div className='mt-3'>
                        <span>Company description</span>
                        <TextareaAutosize
                            placeholder='Company description...'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className='w-full company-description-modal'
                            minRows={5}
                            maxRows={5}
                        />
                    </div>
                    <div className='flex flex-row align-center mt-4 justify-end w-full'>
                        <div className='w-4/12 flex justify-between'>
                            <Button
                                variant='outlined'
                                className='text-lg'
                                onClick={() => handleClose()}>
                                Cancel
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={_saveButtonClickHandler}
                                className='flex flex-row justify-center text-lg'>
                                <SaveIcon />
                                Save
                            </Button>
                        </div>
                    </div>

                </form>
            </Box>
        </Modal>
    )
}

export default CompanyModal