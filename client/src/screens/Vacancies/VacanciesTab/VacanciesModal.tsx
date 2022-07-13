import { Button, IconButton, MenuItem, Modal, Select, SelectChangeEvent, TextareaAutosize, TextField, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { VacancyType } from '../../../helpers/types';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import { addVacancyInfo, updateVacancyInfo } from './apis';
import { DUMMY_UUID } from '../../../helpers/constants';
import { toast } from 'react-toastify';
import { checkEmptyInput } from '../../../helpers/emptyInputChecker';

interface VacanciesModalProps {
    open: boolean;
    handleClose: () => void;
    currentSelected: VacancyType | null;
    companyIdNameMap: any;
    setUpdatedVacancyInfo: (value: VacancyType) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '75vh',
    overflowX: 'scroll',
    bgcolor: 'white',
    borderRaduis: '5px',
    boxShadow: 24,
    p: 4,
};

const VacanciesModal = (props: VacanciesModalProps) => {

    const {
        open,
        handleClose,
        currentSelected,
        companyIdNameMap,
        setUpdatedVacancyInfo } = props;

    const [name, setName] = useState<string>('');
    const [packageMin, setPackageMin] = useState<number>(0);
    const [packageMax, setPackageMax] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [countOpen, setCountOpen] = useState<number>(0);
    const [countClosed, setCountClosed] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [stages, setStages] = useState<string>('');
    const [companyId, setCompanyId] = useState<string>('');

    useEffect(() => {
        if (!currentSelected) {
            setName('');
            setPackageMin(0);
            setPackageMax(0);
            setDescription('');
            setCountOpen(1);
            setCountClosed(0);
            setIsOpen(true);
            setStages('Messaged, Called, Not interested, Interview scheduled, Round 1, Round 2, Round 3, Rejected, Hired');
            setCompanyId('');
            return;
        }

        setName(currentSelected.roleName);
        setPackageMin(currentSelected.packageMin);
        setPackageMax(currentSelected.packageMax);
        setDescription(currentSelected.jobDescription);
        setCountOpen(currentSelected.countOpen);
        setCountClosed(currentSelected.countClosed);
        setIsOpen(currentSelected.isOpen);
        setStages(currentSelected.stages);
        setCompanyId(currentSelected.companyId);
    }, [currentSelected]);

    const _companyChangeHandler = (event: SelectChangeEvent) => {
        setCompanyId(event.target.value as string);
    }

    const _handleCloseVacancy = async () => {

        if (!currentSelected) {
            return;
        }

        const info = {
            id: currentSelected.id,
            roleName: name,
            packageMin,
            packageMax,
            jobDescription: description,
            countOpen,
            countClosed,
            isOpen: false,
            stages,
            companyId,
            fileId: DUMMY_UUID,
        }

        const response = await updateVacancyInfo(currentSelected.id, info);
        if (!response) {
            toast.warning('Internal server error!')
            return;
        }

        setUpdatedVacancyInfo(response);
        handleClose();
    }

    const _saveButtonClickHandler = async () => {
        if (checkEmptyInput(name)) {
            toast.warning("Role name cannot be empty");
            return;
        }

        if (companyId === "") {
            toast.warning("Please select a company first.")
            return;
        }

        if (checkEmptyInput("" + packageMin)) {
            toast.warning("Min package cannot be empty");
            return;
        }

        const info = {
            id: DUMMY_UUID,
            roleName: name,
            packageMin,
            packageMax,
            jobDescription: description,
            countOpen,
            countClosed,
            isOpen,
            stages,
            companyId,
            fileId: DUMMY_UUID,
        }

        if (!currentSelected) {
            let response = await addVacancyInfo(info);
            if (!response) {
                toast.error(`
                Something went wrong! 
                Possible reasons: 
                1. server issue`)
                return;
            }

            setUpdatedVacancyInfo(response);
            handleClose();
            return;
        }

        const updatedInfo = {
            ...info,
            id: currentSelected.id,
        }

        let response = await updateVacancyInfo(currentSelected.id, updatedInfo);
        if (!response) {
            toast.error(`
            Something went wrong! 
            Possible reasons: 
            1. server issue`)
            return;
        }

        setUpdatedVacancyInfo(response);
        handleClose();
    }
    // TODO: Style textarea similar to normal input fields.

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <div className='text-2xl text-primary ml-2 font-bold'>
                    {currentSelected ? 'Edit' : 'Add new'}
                    <span className='ml-2'>vacancy</span>
                </div>

                <form className='flex flex-col w-full p-2'>
                    <div className='flex flex-row'>
                        <TextField
                            placeholder='Vacancy name...'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='w-1/2'
                            label='Vacancy name'
                        />
                    </div>
                    <div className='flex flex-row w-full mt-3'>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Package min...'
                                label='Package min'
                                value={packageMin}
                                onChange={e => setPackageMin(parseInt(e.target.value))}
                                className='w-11/12'
                                type='number'
                            />
                        </div>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Package max...'
                                label='Package max'
                                value={packageMax}
                                onChange={e => setPackageMax(parseInt(e.target.value))}
                                className='w-11/12'
                                type='number'
                            />
                        </div>
                    </div>
                    <div className='flex flex-row w-full mt-3'>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Count open...'
                                label='Count open'
                                value={countOpen}
                                onChange={e => setCountOpen(parseInt(e.target.value))}
                                className='w-11/12'
                                type='number'
                            />
                        </div>
                        <div className='w-2/4'>
                            <Select
                                onChange={_companyChangeHandler}
                                value={companyId}
                                label="Company"
                                className='w-11/12'
                            >
                                {
                                    Object.keys(companyIdNameMap).map((_value: any) => {
                                        return (
                                            <MenuItem key={_value} value={_value}>
                                                {companyIdNameMap[_value]}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className='mt-3 flex flex-col w-full'>
                        <span>Vacancy description</span>
                        <TextareaAutosize
                            placeholder='Vacancy description...'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className='w-full company-description-modal'
                            minRows={5}
                            maxRows={5}
                        />
                    </div>
                    <div className='mt-3 flex flex-col w-full'>
                        <div className='flex flex-row items-center'>
                            Stages
                            <Tooltip
                                title='List all the stages you need separated by comma(,). Caution: The last one has to be Hired. For eg: Messaged, Not interested, Round1, Round2, Rejected, Hired'
                            >
                                <IconButton>
                                    <InfoIcon sx={{ fontSize: 'small' }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <TextareaAutosize
                            placeholder='List all the stages you need separated by comma(,). Caution: The last one has to be Hired. For eg: Messaged, Not interested, Round1, Round2, Rejected, Hired'
                            value={stages}
                            onChange={e => setStages(e.target.value)}
                            className='w-full company-description-modal'
                            minRows={3}
                            maxRows={3}
                        />
                    </div>
                    <div className='flex flex-row align-center mt-4 w-full'>
                        <div className='w-8/12 flex justify-start'>
                            {
                                currentSelected &&
                                <Button
                                    color='error'
                                    variant='contained'
                                    onClick={_handleCloseVacancy}>
                                    Close Vacancy
                                </Button>
                            }
                        </div>
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

export default VacanciesModal