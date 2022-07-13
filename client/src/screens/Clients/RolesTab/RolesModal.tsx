import { Button, Modal, TextareaAutosize, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { RoleType } from '../../../helpers/types';
import SaveIcon from '@mui/icons-material/Save';
import { checkEmptyInput } from '../../../helpers/emptyInputChecker';
import { toast, ToastContainer } from 'react-toastify';
import { DUMMY_UUID } from '../../../helpers/constants';
import { addRoleInfo, updateRoleInfo } from './apis';

interface RolesModalProps {
    open: boolean;
    handleClose: () => void;
    currentSelected: RoleType | null;
    setUpdatedRoleInfo: (value: RoleType) => void;
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

const RolesModal = (props: RolesModalProps) => {

    const {
        open,
        handleClose,
        currentSelected,
        setUpdatedRoleInfo } = props;

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (!currentSelected) {
            setName('');
            setDescription('');
            return;
        }

        setName(currentSelected.name);
        setDescription(currentSelected.description);
    }, [currentSelected]);

    const _saveButtonClickHandler = async () => {
        if (checkEmptyInput(name)) {
            toast.warning("Role name cannot be empty!");
            return;
        }

        const info = {
            name: name.trim(),
            description: description.trim(),
            id: DUMMY_UUID,
        };

        if (!currentSelected) {
            let response = await addRoleInfo(info);
            if (!response) {
                toast.error(`
                Something went wrong! 
                Possible reasons: 
                1. role name already used.
                2. server issue`)
                return;
            }

            setUpdatedRoleInfo(response);
            handleClose();
            return;
        }

        const updatedInfo = {
            ...info,
            id: currentSelected.id,
        }

        let response = await updateRoleInfo(currentSelected.id, updatedInfo);
        if (!response) {
            toast.error(`
            Something went wrong! 
            Possible reasons: 
            1. role name already used.
            2. server issue`)
            return;
        }

        setUpdatedRoleInfo(response);
        handleClose();
    }
    // TODO: Style textarea similar to normal input fields.

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <ToastContainer />
                <div className='text-2xl text-primary ml-2 font-bold'>
                    {currentSelected ? 'Edit' : 'Add new'}
                    <span className='ml-2'>role</span>
                </div>

                <form className='flex flex-col w-full p-2'>
                    <div className='flex flex-row'>
                        <TextField
                            placeholder='Role name...'
                            label='Role name'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='w-1/2'
                        />
                    </div>
                    <div className='mt-3'>
                        <span>Role description</span>
                        <TextareaAutosize
                            placeholder='Role description...'
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

export default RolesModal