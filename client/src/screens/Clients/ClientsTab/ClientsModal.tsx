import { Button, MenuItem, Modal, TextareaAutosize, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { ClientType } from '../../../helpers/types';
import SaveIcon from '@mui/icons-material/Save';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast, ToastContainer } from 'react-toastify';
import { checkEmptyInput } from '../../../helpers/emptyInputChecker';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import { DUMMY_UUID } from '../../../helpers/constants';
import { addClientInfo, updateClientInfo } from './apis';

interface ClientModalProps {
    open: boolean;
    handleClose: () => void;
    currentSelected: ClientType | null;
    roleIdNameMap: any;
    setUpdatedClientInfo: (value: ClientType) => void;
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

const ClientsModal = (props: ClientModalProps) => {

    const {
        open,
        handleClose,
        currentSelected,
        roleIdNameMap,
        setUpdatedClientInfo } = props;

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<number | null>(null);
    const [linkedinUrl, setLinkedinUrl] = useState<string>('');
    const [currentPackage, setCurrentPackage] = useState<number>(0.0);
    const [expectedPackage, setExpectedPackage] = useState<number>(0.0);
    const [websiteUrl, setWebsiteUrl] = useState<string>('');
    const [noticePeriod, setNoticePeriod] = useState<number>(0);
    const [roleId, setRoleId] = useState<string>('');

    useEffect(() => {
        if (!currentSelected) {
            setName('');
            setEmail('');
            setDescription('');
            setMobileNumber(null);
            setLinkedinUrl('');
            setCurrentPackage(0);
            setExpectedPackage(0);
            setWebsiteUrl('');
            setNoticePeriod(0);
            setRoleId('');
            return;
        }

        setName(currentSelected.name);
        setEmail(currentSelected.email);
        setDescription(currentSelected.description);
        setMobileNumber(currentSelected.mobileNumber);
        setLinkedinUrl(currentSelected.linkedinUrl);
        setCurrentPackage(currentSelected.currentPackage);
        setExpectedPackage(currentSelected.expectedPackage);
        setWebsiteUrl(currentSelected.websiteUrl);
        setNoticePeriod(currentSelected.noticePeriod);
        setRoleId(currentSelected.roleId);
    }, [currentSelected]);

    const _mobileNumberChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const temp = parseInt(event && event.target.value);
        if (temp > 0) {
            setMobileNumber(temp);
        } else {
            setMobileNumber(null);
        }
    }

    const _roleChangeHandler = (event: SelectChangeEvent) => {
        setRoleId(event.target.value as string);
    }

    const _saveButtonClickHandler = async () => {
        if (checkEmptyInput(name)) {
            toast.warning("Client name cannot be empty!")
            return;
        }

        if (checkEmptyInput(email)) {
            toast.warning("Client email cannot be empty!")
            return;
        }

        if (!isEmail(email)) {
            toast.warning("Client email is not valid!")
            return;
        }

        if (!checkEmptyInput("" + mobileNumber) && ("" + mobileNumber).length !== 10) {
            toast.warning("Enter valid mobile number!")
            return;
        }

        if (!checkEmptyInput(linkedinUrl) && !isURL(linkedinUrl)) {
            toast.warning("Linkedin url is not valid!")
            return;
        }

        if (!checkEmptyInput(websiteUrl) && !isURL(websiteUrl)) {
            toast.warning("website url is not valid!")
            return;
        }

        if (roleId === "") {
            toast.warning("Select a role for the client!")
            return;
        }

        const info = {
            id: DUMMY_UUID,
            name: name.trim(),
            email: email.trim(),
            description: description.trim(),
            mobileNumber: mobileNumber || 0,
            linkedinUrl,
            currentPackage,
            expectedPackage,
            websiteUrl,
            noticePeriod,
            roleId,
            fileId: DUMMY_UUID,
        };

        if (!currentSelected) {
            let response = await addClientInfo(info);
            if (!response) {
                toast.error(`
                Something went wrong! 
                Possible reasons: 
                1. email already used.
                2. server issue`)
                return;
            }

            setUpdatedClientInfo(response);
            handleClose();
            return;
        }

        const updatedInfo = {
            ...info,
            id: currentSelected.id,
        }

        let response = await updateClientInfo(currentSelected.id, updatedInfo)
        if (!response) {
            toast.error(`
            Something went wrong! 
            Possible reasons: 
            1. email already used.
            2. server issue`)
            return;
        }

        setUpdatedClientInfo(response);
        handleClose();
    }
    // TODO: Style textarea similar to normal input fields.

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                {/* <ToastContainer /> */}

                <div className='text-2xl text-primary ml-2 font-bold'>
                    {currentSelected ? 'Edit' : 'Add new'}
                    <span className='ml-2'>client</span>
                </div>

                <form className='flex flex-col w-full p-2'>
                    <div className='flex flex-row'>
                        <TextField
                            placeholder='Client name...'
                            label='Client name'
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
                                label='Email'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className='w-11/12'
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
                                placeholder='Current package...'
                                label='Current package'
                                value={currentPackage}
                                onChange={e => setCurrentPackage(parseInt(e.target.value))}
                                className='w-11/12'
                                type='number'
                            />
                        </div>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Expected package...'
                                label='Expected package'
                                value={expectedPackage}
                                onChange={e => setExpectedPackage(parseInt(e.target.value))}
                                className='w-11/12'
                                type='number'
                            />
                        </div>
                    </div>

                    <div className='flex flex-row w-full mt-3'>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Website...'
                                label='Website url'
                                value={websiteUrl}
                                onChange={e => setWebsiteUrl(e.target.value)}
                                className='w-11/12'
                            />
                        </div>
                        <div className='w-2/4'>
                            <TextField
                                placeholder='Notice period...'
                                label='Notice period'
                                value={noticePeriod}
                                onChange={e => setNoticePeriod(parseInt(e.target.value))}
                                className='w-11/12'
                                type='number'
                            />
                        </div>
                    </div>

                    <div className='flex flex-row w-full mt-3'>
                        <div className='w-2/4'>
                            <TextField
                                label='Linkedin url'
                                placeholder='Linkedin url...'
                                value={linkedinUrl}
                                onChange={e => setLinkedinUrl(e.target.value)}
                                className='w-11/12'
                            />
                        </div>
                        <div className='w-2/4'>
                            <Select
                                onChange={_roleChangeHandler}
                                value={roleId}
                                label="Company"
                                className='w-11/12'
                            >
                                {
                                    Object.keys(roleIdNameMap).map((_value: any) => {
                                        return (
                                            <MenuItem key={_value} value={_value}>
                                                {roleIdNameMap[_value]}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>

                    <div className='mt-3'>
                        <span>About the client</span>
                        <TextareaAutosize
                            placeholder='Client description...'
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

export default ClientsModal