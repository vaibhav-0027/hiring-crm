import { Button, MenuItem, Modal, TextareaAutosize, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { ContactType } from '../../helpers/types';
import SaveIcon from '@mui/icons-material/Save';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import { checkEmptyInput } from '../../helpers/emptyInputChecker';
import { toast } from 'react-toastify';
import { DUMMY_UUID } from '../../helpers/constants';
import { addContactInfo, updateContactInfo } from './apis';

interface ContactModalProps {
    open: boolean;
    handleClose: () => void;
    currentSelected: ContactType | null;
    companyIdNameMap: any;
    setUpdatedContactInfo: (value: ContactType) => void;
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
        companyIdNameMap,
        setUpdatedContactInfo } = props;

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [description, setDescription] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<number | undefined>(undefined);
    const [linkedinUrl, setLinkedinUrl] = useState<string>('');
    const [companyId, setCompanyId] = useState<string>('');

    useEffect(() => {
        if (!currentSelected) {
            setName('');
            setEmail('');
            setDescription('');
            setMobileNumber(undefined);
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

    const _emailChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const temp = event && event.target.value;
        setEmail(temp);
        setIsEmailValid(!isEmail(temp.trim()));
    }

    const _urlChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const temp = event && event.target.value;
        setLinkedinUrl(temp);
        setIsEmailValid(!isURL(temp.trim()));
    }

    const _mobileNumberChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const temp = parseInt(event && event.target.value);
        if (temp > 0) {
            setMobileNumber(temp);
        } else {
            setMobileNumber(undefined);
        }
    }

    const _companyChangeHandler = (event: SelectChangeEvent) => {
        setCompanyId(event.target.value as string);
    }

    const _saveButtonClickHandler = async () => {
        if (checkEmptyInput(name)) {
            toast.warning("Contact name cannot be empty!");
            return;
        }

        if (checkEmptyInput(email)) {
            toast.warning("Contact email cannot be empty!");
            return;
        }

        if (!isEmail(email)) {
            toast.warning("Email is not valid!");
            return;
        }

        if (!checkEmptyInput(linkedinUrl) && !isURL(linkedinUrl.trim())) {
            toast.warning("Linked in url is not valid");
            return;
        }

        if (("" + mobileNumber).length !== 10) {
            toast.warning("Enter a 10 digit mobile number!");
            return;
        }

        if (companyId === "") {
            toast.warning("Please select a company from dropdown!");
            return;
        }

        const info = {
            id: DUMMY_UUID,
            name: name?.trim(),
            email: email?.trim(),
            description: description?.trim(),
            mobileNumber: mobileNumber || 0,
            linkedinUrl: linkedinUrl?.trim(),
            companyId,
            fileId: DUMMY_UUID,
        }

        if (!currentSelected) {
            console.log("creating contact with info", info);
            let response = await addContactInfo(info);
            if (!response) {
                toast.error(`
                Something went wrong! 
                Possible reasons: 
                1. contact email already used.
                2. server issue`)
                return;
            }

            console.log("response from udpating", response);
            setUpdatedContactInfo(response);
            handleClose();
            return;
        }

        const updatedInfo = {
            ...info,
            id: currentSelected.id,
        }

        console.log("updating contact with info", info);
        let response = await updateContactInfo(currentSelected.id, updatedInfo);
        if (!response) {
            toast.error(`
            Something went wrong! 
            Possible reasons: 
            1. contact email already used.
            2. server issue`)
            return;
        }

        console.log("response from udpating", response);
        setUpdatedContactInfo(response);
        handleClose();
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
                            label='Contact name'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='w-1/2'
                        />
                    </div>
                    <div className='flex flex-row w-full mt-3'>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Email...'
                                label='Contact email'
                                required
                                value={email}
                                onChange={_emailChangeHandler}
                                className='w-11/12'
                            // error={isEmailValid}
                            />
                        </div>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Mobile number...'
                                label='Mobile number'
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
                                label='Linkedin url'
                                value={linkedinUrl}
                                onChange={_urlChangeHandler}
                                className='w-11/12'
                            />
                        </div>
                        <div className='w-2/4'>
                            <Select
                                onChange={_companyChangeHandler}
                                value={companyId}
                                label="Company"
                                required
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
                        <span>About</span>
                        <TextareaAutosize
                            placeholder='About the person...'
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