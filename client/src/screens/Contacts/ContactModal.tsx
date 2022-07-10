import { Button, MenuItem, Modal, TextareaAutosize, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { ContactType } from '../../helpers/types';
import SaveIcon from '@mui/icons-material/Save';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ContactModalProps {
    open: boolean;
    handleClose: () => void;
    currentSelected: ContactType | null;
    companyIdNameMap: any;
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

const ContactModal = (props: ContactModalProps) => {

    const {
        open,
        handleClose,
        currentSelected,
        companyIdNameMap } = props;

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<number | null>(null);
    const [linkedinUrl, setLinkedinUrl] = useState<string>('');
    const [companyId, setCompanyId] = useState<string>('');

    useEffect(() => {
        if (!currentSelected) {
            setName('');
            setEmail('');
            setDescription('');
            setMobileNumber(null);
            setLinkedinUrl('');
            setCompanyId('');
            return;
        }

        setName(currentSelected.name);
        setEmail(currentSelected.email);
        setDescription(currentSelected.description);
        setMobileNumber(currentSelected.mobileNumber);
        setLinkedinUrl(currentSelected.linkedinUrl);
        setCompanyId(currentSelected.companyId);
    }, [currentSelected]);

    const _mobileNumberChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const temp = parseInt(event && event.target.value);
        if (temp > 0) {
            setMobileNumber(temp);
        } else {
            setMobileNumber(null);
        }
    }

    const _companyChangeHandler = (event: SelectChangeEvent) => {
        setCompanyId(event.target.value as string);
    }

    const _saveButtonClickHandler = () => {
        // TODO: connect with APIs.
    }
    // TODO: Style textarea similar to normal input fields.

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <div className='text-2xl text-primary ml-2 font-bold'>
                    {currentSelected ? 'Edit' : 'Add new'}
                    <span className='ml-2'>contact</span>
                </div>

                <form className='flex flex-col w-full p-2'>
                    <div className='flex flex-row'>
                        <TextField
                            placeholder='Contact name...'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='w-1/2'
                        />
                    </div>
                    <div className='flex flex-row w-full mt-3'>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Email...'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className='w-11/12'
                            />
                        </div>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Mobile number...'
                                value={mobileNumber}
                                onChange={_mobileNumberChangeHandler}
                                className='w-11/12'
                                type='number'
                            />
                        </div>
                    </div>
                    <div className='flex flex-row w-full mt-3'>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Linkedin url...'
                                value={linkedinUrl}
                                onChange={e => setLinkedinUrl(e.target.value)}
                                className='w-11/12'
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
                    <div className='mt-3'>
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

export default ContactModal